# The hosted zone is owned by the isaiahofalt-website stack — look it up
# rather than creating a second zone for the same domain.
data "aws_route53_zone" "primary" {
  name = var.root_domain
}
