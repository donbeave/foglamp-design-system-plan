#!/bin/sh
set -eu
# Run from foglamp-design-system-plan on macOS, with Chrome, curl, Python and mise installed.
# Font files are OFL 1.1; Google binaries remain under /tmp.
work=/tmp/foglamp-raster
mkdir -p "$work"
curl -fsSL 'https://fonts.gstatic.com/s/hostgrotesk/v5/co3BmWBnlCJ3U42vbbfdwMjZpFjmw07Arg.woff2' -o "$work/host-google.woff2"
curl -fsSL 'https://fonts.gstatic.com/s/geistmono/v6/or3nQ6H-1_WfwkMZI_qYFrcdmhHkjko.woff2' -o "$work/geist-google.woff2"
fonts=../foglamp-design-system/apps/docs/node_modules/@fontsource-variable
cp "$fonts/host-grotesk/files/host-grotesk-latin-wght-normal.woff2" "$work/host-portal.woff2"
cp "$fonts/geist-mono/files/geist-mono-latin-wght-normal.woff2" "$work/geist-portal.woff2"
python3 -m http.server 4269 --bind 127.0.0.1 --directory "$work" > /tmp/foglamp-raster-http.log 2>&1 & server=$!
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless --disable-gpu --remote-debugging-port=9347 --user-data-dir=/tmp/foglamp-raster-repro-chrome --no-first-run about:blank > /tmp/foglamp-raster-chrome.log 2>&1 & browser=$!
trap 'kill "$server" "$browser" 2>/dev/null || true' EXIT INT TERM
for i in $(seq 1 100); do curl -fsS http://127.0.0.1:9347/json/version >/dev/null 2>&1 && break; sleep 0.1; done
mise exec bun@latest -- bun results/qa/w5-font-source-identity/raster.mjs
