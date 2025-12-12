#!/usr/bin/env bash
set -euo pipefail

# Simple backup script: copies data/messages.json to deploy/backups with timestamp and gzips it.
# Intended to be called from project root (WorkingDirectory) or via full path.

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DATA_DIR="$PROJECT_DIR/data"
BACKUP_DIR="$PROJECT_DIR/deploy/backups"

mkdir -p "$BACKUP_DIR"

TS=$(date -u +%Y%m%dT%H%M%SZ)
SRC="$DATA_DIR/messages.json"
DEST="$BACKUP_DIR/messages-$TS.json"

if [ -f "$SRC" ]; then
  cp -f "$SRC" "$DEST"
  gzip -f "$DEST"
  # rotate: keep backups for 30 days
  find "$BACKUP_DIR" -type f -name 'messages-*.json.gz' -mtime +30 -delete
  echo "Backup created: $DEST.gz"
  exit 0
else
  echo "No messages.json found at $SRC" >&2
  exit 2
fi
