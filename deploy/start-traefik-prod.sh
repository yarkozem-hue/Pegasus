#!/usr/bin/env bash
set -euo pipefail

# Script to start production stack with Traefik
# Usage: copy .env.example to .env and edit values, then run this script as a user with docker permissions.

HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/.." && pwd)

if [ ! -f "$ROOT/.env" ]; then
  echo ".env file not found. Copy .env.example -> .env and fill values before running." >&2
  exit 1
fi

echo "Ensuring deploy/traefik/acme.json exists and has correct permissions..."
mkdir -p "$ROOT/deploy/traefik"
touch "$ROOT/deploy/traefik/acme.json"
chmod 600 "$ROOT/deploy/traefik/acme.json"

echo "Starting docker-compose production stack..."
docker compose -f "$ROOT/docker-compose.prod.yml" up -d --build

echo "Done. Traefik dashboard is available on port 8080 if enabled, and your domain should be served via HTTPS once Let's Encrypt completes." 
