variable "yahoo_league_id" {
  description = "Yahoo Fantasy league ID — the number in football.fantasysports.yahoo.com/f1/<league_id>. Required before enabling the schedule."
  type        = string
  default     = ""

  validation {
    condition     = var.yahoo_league_id == "" || can(regex("^[0-9]+$", var.yahoo_league_id))
    error_message = "yahoo_league_id must be the numeric league ID."
  }
}

variable "scoreboard_schedule" {
  description = "How often the scoreboard Lambda refreshes data/scoreboard.json"
  type        = string
  # Weekly, Tuesdays 12:00 UTC (8am ET) — after Monday Night Football, once
  # the new week's matchups are set.
  default = "cron(0 12 ? * TUE *)"
}

variable "scoreboard_schedule_enabled" {
  description = "Whether the schedule runs the scoreboard Lambda. Off until Yahoo grants the app Fantasy API access."
  type        = bool
  default     = false
}

locals {
  scoreboard_function_name = "fantasy-football-scoreboard"
  scoreboard_object_key    = "data/scoreboard.json"
  # Values are written by scripts/yahoo-auth.mjs, not Terraform, so the
  # secrets never end up in Terraform state.
  yahoo_param_prefix = "/fantasy-football/yahoo"
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

# Built by `npm run build:lambda` (esbuild bundles lambda/scoreboard/handler.ts).
data "archive_file" "scoreboard" {
  type        = "zip"
  source_file = "${path.module}/build/scoreboard/index.mjs"
  output_path = "${path.module}/build/scoreboard.zip"
}

resource "aws_cloudwatch_log_group" "scoreboard" {
  name              = "/aws/lambda/${local.scoreboard_function_name}"
  retention_in_days = 14
}

data "aws_iam_policy_document" "scoreboard_assume" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "scoreboard" {
  name               = "${local.scoreboard_function_name}-lambda"
  assume_role_policy = data.aws_iam_policy_document.scoreboard_assume.json
}

# Least-privilege: read the Yahoo credentials, rotate the refresh token,
# write the one scoreboard object, and log.
data "aws_iam_policy_document" "scoreboard" {
  statement {
    effect  = "Allow"
    actions = ["ssm:GetParameters"]
    resources = [
      "arn:aws:ssm:${data.aws_region.current.region}:${data.aws_caller_identity.current.account_id}:parameter${local.yahoo_param_prefix}/*"
    ]
  }

  statement {
    effect  = "Allow"
    actions = ["ssm:PutParameter"]
    resources = [
      "arn:aws:ssm:${data.aws_region.current.region}:${data.aws_caller_identity.current.account_id}:parameter${local.yahoo_param_prefix}/refresh_token"
    ]
  }

  statement {
    effect    = "Allow"
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.site.arn}/${local.scoreboard_object_key}"]
  }

  statement {
    effect    = "Allow"
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.scoreboard.arn}:*"]
  }
}

resource "aws_iam_role_policy" "scoreboard" {
  name   = "scoreboard"
  role   = aws_iam_role.scoreboard.id
  policy = data.aws_iam_policy_document.scoreboard.json
}

resource "aws_lambda_function" "scoreboard" {
  function_name    = local.scoreboard_function_name
  role             = aws_iam_role.scoreboard.arn
  runtime          = "nodejs24.x"
  handler          = "index.handler"
  filename         = data.archive_file.scoreboard.output_path
  source_code_hash = data.archive_file.scoreboard.output_base64sha256
  timeout          = 30
  memory_size      = 256

  environment {
    variables = {
      LEAGUE_KEY = "nfl.l.${var.yahoo_league_id}"
      BUCKET     = aws_s3_bucket.site.id
      OBJECT_KEY = local.scoreboard_object_key
      # Must match the Redirect URI registered on the Yahoo app.
      YAHOO_REDIRECT_URI = "oob"
    }
  }

  depends_on = [aws_cloudwatch_log_group.scoreboard]
}

resource "aws_cloudwatch_event_rule" "scoreboard" {
  name                = "${local.scoreboard_function_name}-schedule"
  schedule_expression = var.scoreboard_schedule
  state               = var.scoreboard_schedule_enabled ? "ENABLED" : "DISABLED"

  lifecycle {
    precondition {
      condition     = !var.scoreboard_schedule_enabled || var.yahoo_league_id != ""
      error_message = "Set yahoo_league_id before enabling the scoreboard schedule."
    }
  }
}

resource "aws_cloudwatch_event_target" "scoreboard" {
  rule = aws_cloudwatch_event_rule.scoreboard.name
  arn  = aws_lambda_function.scoreboard.arn
}

resource "aws_lambda_permission" "scoreboard_schedule" {
  statement_id  = "AllowEventBridgeInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.scoreboard.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.scoreboard.arn
}
