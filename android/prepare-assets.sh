#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS_DIR="$ROOT_DIR/android/app/src/main/assets"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

SUPABASE_VERSION="2.57.0"
PACKAGE_TGZ="$TMP_DIR/supabase-js.tgz"
PACKAGE_DIR="$TMP_DIR/supabase-package"

mkdir -p "$PACKAGE_DIR"
curl --fail --silent --show-error --location \
  "https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-${SUPABASE_VERSION}.tgz" \
  --output "$PACKAGE_TGZ"
tar -xzf "$PACKAGE_TGZ" -C "$PACKAGE_DIR"
test -s "$PACKAGE_DIR/package/dist/umd/supabase.js"
cp "$PACKAGE_DIR/package/dist/umd/supabase.js" "$ASSETS_DIR/supabase.min.js"

cd "$ROOT_DIR"
npm exec --yes --package=tailwindcss@3.4.17 -- tailwindcss \
  -i android/tailwind.input.css \
  -o android/app/src/main/assets/tailwind.min.css \
  --content android/app/src/main/assets/game.html android/app/src/main/assets/app-hub.js

test -s "$ASSETS_DIR/supabase.min.js"
test -s "$ASSETS_DIR/tailwind.min.css"
