#!/usr/bin/env bash
# Builds and starts the Next.js version of the site from a git ref in a
# separate worktree (.parity/next-baseline), fed by the fixtures server.
# This is the deterministic reference for the Nuxt port.
#
#   scripts/parity/next-baseline.sh [git-ref] [port]
#
# Defaults: ref 8625d93 (last Next.js commit), port 3100. Expects the fixtures
# server on 127.0.0.1:3999 (pnpm parity:fixtures). Set PNPM to override the
# pnpm binary, SKIP_BUILD=1 to restart without rebuilding.

set -euo pipefail

REF="${1:-8625d93}"
PORT="${2:-3100}"
PNPM="${PNPM:-pnpm}"
ROOT="$(git rev-parse --show-toplevel)"
DIR="$ROOT/.parity/next-baseline"
FIXTURES="${FIXTURES_URL:-http://127.0.0.1:3999}"

if [ ! -e "$DIR/.git" ]; then
  mkdir -p "$ROOT/.parity"
  git -C "$ROOT" worktree add --detach "$DIR" "$REF"
else
  git -C "$DIR" checkout --detach --quiet "$REF"
fi

cd "$DIR"

export EVENTS_API_URL="$FIXTURES/crossweb/events"
export SPEAKERS_API_URL="$FIXTURES/crossweb/speakers"
export SPEAKERS_API_TOKEN="fixture"
export SITE_URL="http://localhost:$PORT"
export DISCORD_SERVER_ID="735954756169760768"
export NEXT_TELEMETRY_DISABLED=1

if [ "${SKIP_BUILD:-0}" != "1" ]; then
  "$PNPM" install --frozen-lockfile --ignore-scripts
  "$PNPM" exec next build
fi

echo "Next.js baseline ($REF) on http://localhost:$PORT"
exec "$PNPM" exec next start -p "$PORT"
