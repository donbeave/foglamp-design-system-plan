#!/bin/sh
set -eu
DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
B=/opt/homebrew/bin/agent-browser
for n in 1 2 3; do
 "$B" --session w5dashmetrics eval 'localStorage.clear()' >/dev/null
 "$B" --session w5dashmetrics open 'http://127.0.0.1:4221/?view=agent&theme=dark' >/dev/null
 "$B" --session w5dashmetrics set viewport 1280 800 >/dev/null
 "$B" --session w5dashmetrics wait --text 'Support agent' >/dev/null
 "$B" --session w5dashmetrics wait --fn 'window.__parity?.ready === true && document.fonts.status === "loaded"' >/dev/null
 "$B" --session w5dashmetrics eval --stdin < "$DIR/settle.js" >/dev/null
 "$B" --session w5dashmetrics screenshot "$DIR/agent-target-dark-aa$n.png" >/dev/null
done
