variable "root_domain" {
  description = "Root domain whose Route 53 hosted zone already exists (managed by isaiahofalt-website)"
  type        = string
  default     = "isaiahofalt.com"
}

variable "subdomain" {
  description = "Subdomain label the site is served on"
  type        = string
  default     = "ff"
}

locals {
  domain_name = "${var.subdomain}.${var.root_domain}"
}
