#!/usr/bin/env bash
set -eu

# Simple helper to run Pegasus locally (Docker) and optionally expose with ngrok.
# Usage:
#   NGROK_AUTHTOKEN=your_token ./scripts/start-public.sh
# or without ngrok:
#   ./scripts/start-public.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "Building and starting Docker stack..."
if command -v docker >/dev/null 2>&1; then
  docker compose up -d --build
else
  echo "docker not found: falling back to direct node run"
  npm ci --production
  ADMIN_USER=${ADMIN_USER:-admin} ADMIN_PASS=${ADMIN_PASS:-password} PORT=${PORT:-5174} node server.js &
fi

if [ -n "${NGROK_AUTHTOKEN:-}" ]; then
  if command -v npx >/dev/null 2>&1; then
    echo "Starting ngrok tunnel (this will print the public URL)..."
    # run ngrok in background and print the web UI url
    npx --yes ngrok http 5174 --authtoken "$NGROK_AUTHTOKEN" &
    sleep 2
    echo "ngrok started. Check http://127.0.0.1:4040 for tunnel details."
  else
    echo "npx not found; cannot start ngrok. Install npm / npx or run ngrok manually."
  fi
else
  echo "No NGROK_AUTHTOKEN provided — app is available on host only (port 5174)."
fi

echo "Done."
