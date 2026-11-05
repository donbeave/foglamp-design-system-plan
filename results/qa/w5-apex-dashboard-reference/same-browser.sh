#!/bin/sh
set -eu
DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
B=/opt/homebrew/bin/agent-browser
for view in agent workflow traces; do
 if [ "$view" = traces ]; then extra='&state=empty'; else extra=''; fi
 for side in source target; do
  if [ "$side" = source ]; then port=4222; else port=4221; fi
  "$B" --session w5dashmetrics open "http://127.0.0.1:$port/?view=$view&theme=dark$extra" >/dev/null
  "$B" --session w5dashmetrics eval 'localStorage.clear()' >/dev/null
  "$B" --session w5dashmetrics open "http://127.0.0.1:$port/?view=$view&theme=dark$extra" >/dev/null
  "$B" --session w5dashmetrics set viewport 1280 800 >/dev/null
  "$B" --session w5dashmetrics wait --fn 'window.__parity?.ready === true && document.fonts.status === "loaded" && !!document.querySelector("h1")' >/dev/null
  "$B" --session w5dashmetrics eval --stdin < "$DIR/settle.js" >/dev/null
  "$B" --session w5dashmetrics wait 250 >/dev/null
  "$B" --session w5dashmetrics screenshot "$DIR/$view-$side-dark-same-browser.png" >/dev/null
 done
done
