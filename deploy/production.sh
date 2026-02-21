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

echo "🏷️  Tagging image as agency-front"
docker tag "$DEPLOY_IMAGE" agency-front

echo "▶️  Recreating agency-front service"
DEPLOY_IMAGE="agency-front" docker compose up -d agency-front --force-recreate --no-deps --remove-orphans

echo "🔄 Reloading nginx"
make nginx_reload

echo "✅ Deployment finished successfully!"