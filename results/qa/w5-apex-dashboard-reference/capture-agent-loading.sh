#!/bin/sh
set -eu
DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
B=/opt/homebrew/bin/agent-browser
for view in agent; do
  for theme in light dark; do
    for side in source target; do
      if [ "$side" = source ]; then session=w5dashsource; port=4222; else session=w5dashtarget; port=4221; fi
      "$B" --session "$session" eval 'localStorage.clear()' >/dev/null
      "$B" --session "$session" open "http://127.0.0.1:$port/?view=$view&theme=$theme&state=loading" >/dev/null
      "$B" --session "$session" set viewport 1280 800 >/dev/null
      "$B" --session "$session" wait --fn 'window.__parity?.ready === true && document.fonts.status === "loaded" && document.querySelectorAll("[data-slot=skeleton]").length > 0' >/dev/null
      "$B" --session "$session" eval --stdin < "$DIR/settle.js" > /dev/null
      "$B" --session "$session" wait 250 >/dev/null
      "$B" --session "$session" eval --stdin < "$DIR/styles.js" > "$DIR/$view-$side-$theme-loading-styles.txt"
      "$B" --session "$session" screenshot "$DIR/$view-$side-$theme-loading.png" >/dev/null
    done
  done
done
