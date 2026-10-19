#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INFRA_DIR="$ROOT_DIR/infra"

BUCKET=$(terraform -chdir="$INFRA_DIR" output -raw s3_bucket_name)
DISTRIBUTION_ID=$(terraform -chdir="$INFRA_DIR" output -raw cloudfront_distribution_id)
SITE_URL=$(terraform -chdir="$INFRA_DIR" output -raw site_url)

echo "Building static export..."
(cd "$ROOT_DIR" && npm run build)

echo "Syncing out/ to s3://$BUCKET ..."
aws s3 sync "$ROOT_DIR/out" "s3://$BUCKET" --delete --exclude "data/*"

echo "Invalidating CloudFront cache ($DISTRIBUTION_ID)..."
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*" >/dev/null

echo "Deployed: $SITE_URL"
