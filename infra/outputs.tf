output "s3_bucket_name" {
  description = "S3 bucket that holds the built site"
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (needed for cache invalidation on deploy)"
  value       = aws_cloudfront_distribution.site.id
}

output "site_url" {
  description = "Live site URL"
  value       = "https://${local.domain_name}"
}
