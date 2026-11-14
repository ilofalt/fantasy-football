locals {
  auth_function_name = "fantasy-football-auth"
}

# Accounts and login sessions. Single string key; `ttl` expires old sessions.
resource "aws_dynamodb_table" "auth" {
  name         = "fantasy-football-auth"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"

  attribute {
    name = "pk"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }
}

# Built by `npm run build:lambda` (esbuild bundles lambda/auth/handler.ts).
data "archive_file" "auth" {
  type        = "zip"
  source_file = "${path.module}/build/auth/index.mjs"
  output_path = "${path.module}/build/auth.zip"
}

resource "aws_cloudwatch_log_group" "auth" {
  name              = "/aws/lambda/${local.auth_function_name}"
  retention_in_days = 14
}

data "aws_iam_policy_document" "auth_assume" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "auth" {
  name               = "${local.auth_function_name}-lambda"
  assume_role_policy = data.aws_iam_policy_document.auth_assume.json
}

# Least-privilege: only this table, only the calls the handler makes.
data "aws_iam_policy_document" "auth" {
  statement {
    effect    = "Allow"
    actions   = ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:DeleteItem", "dynamodb:UpdateItem", "dynamodb:Scan"]
    resources = [aws_dynamodb_table.auth.arn]
  }

  statement {
    effect    = "Allow"
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.auth.arn}:*"]
  }
}

resource "aws_iam_role_policy" "auth" {
  name   = "auth"
  role   = aws_iam_role.auth.id
  policy = data.aws_iam_policy_document.auth.json
}

resource "aws_lambda_function" "auth" {
  function_name    = local.auth_function_name
  role             = aws_iam_role.auth.arn
  runtime          = "nodejs24.x"
  handler          = "index.handler"
  filename         = data.archive_file.auth.output_path
  source_code_hash = data.archive_file.auth.output_base64sha256
  timeout          = 10
  memory_size      = 256

  environment {
    variables = {
      TABLE = aws_dynamodb_table.auth.name
    }
  }

  depends_on = [aws_cloudwatch_log_group.auth]
}

# CloudFront is the public entry point (/api/* on the site's own domain), so
# the session cookie is first-party. The URL itself is open; the handler does
# its own auth.
resource "aws_lambda_function_url" "auth" {
  function_name      = aws_lambda_function.auth.function_name
  authorization_type = "NONE"
}
