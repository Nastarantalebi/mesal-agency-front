#!/bin/bash
set -e

# Validate required variables
if [ -z "$DEPLOY_IMAGE" ]; then
  echo "❌ ERROR: DEPLOY_IMAGE is not set"
  exit 1
fi

if [ -z "$CI_ENVIRONMENT" ]; then
  echo "⚠️  WARNING: CI_ENVIRONMENT is not set, using 'unknown'"
  CI_ENVIRONMENT="unknown"
fi

echo "🚀 Starting deployment to $CI_ENVIRONMENT"
echo "📦 Image: $DEPLOY_IMAGE"
echo "🆔 Pipeline: ${CI_PIPELINE_ID:-unknown}"
echo "---"

echo "📂 Changing working directory to /home/production/server_deploy/"
cd /home/production/server_deploy/

echo "🐳 Pulling image: $DEPLOY_IMAGE"
docker pull "$DEPLOY_IMAGE"

echo "🏷️  Tagging image as erp-front"
docker tag "$DEPLOY_IMAGE" erp-front

echo "🛑 Stopping erp-front service"
docker compose stop erp-front

echo "🗑️  Removing old erp-front container"
docker compose rm -f erp-front

echo "▶️ Starting erp-front service"
# Note: DEPLOY_IMAGE is overridden here - is this intentional?
DEPLOY_IMAGE="erp-front" docker compose up -d erp-front --remove-orphans

echo "🔄 Reloading nginx"
make nginx_reload

echo "✅ Deployment finished successfully!"