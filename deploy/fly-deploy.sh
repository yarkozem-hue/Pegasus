#!/usr/bin/env bash
set -euo pipefail

# Helper script to deploy Pegasus to Fly.io
# Usage: ensure flyctl is installed and you're logged in, then run this script

HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/.." && pwd)

if ! command -v flyctl >/dev/null 2>&1; then
  echo "flyctl is not installed. Install from https://fly.io/docs/flyctl/" >&2
  exit 1
fi

echo "Building Docker image and deploying to Fly..."
cd "$ROOT"

# Build and deploy using local Dockerfile
flyctl deploy --config fly.toml --remote-only

echo "Deployment complete. Get app URL with: flyctl info -a $(awk -F 'name = ' '/name =/ {print $2; exit}' fly.toml | tr -d '"')"
