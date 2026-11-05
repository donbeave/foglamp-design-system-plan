#!/bin/sh
set -eu
DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
B=/opt/homebrew/bin/agent-browser
for theme in light dark; do
 for side in source target; do
  if [ "$side" = source ]; then session=w5dashsource; port=4222; else session=w5dashtarget; port=4221; fi
  "$B" --session "$session" eval 'localStorage.clear()' >/dev/null
  "$B" --session "$session" open "http://127.0.0.1:$port/?view=shell&theme=$theme" >/dev/null
  "$B" --session "$session" set viewport 1280 800 >/dev/null
  "$B" --session "$session" wait --text 'Alex Rivera' >/dev/null
  "$B" --session "$session" eval --stdin < "$DIR/settle.js" >/dev/null
  "$B" --session "$session" find role button click --name 'AL Alex Rivera' >/dev/null
  "$B" --session "$session" eval --stdin < "$DIR/settle-interaction.js" >/dev/null
  "$B" --session "$session" wait --text 'Log out' >/dev/null
  "$B" --session "$session" mouse move 0 0 >/dev/null
  "$B" --session "$session" wait 250 >/dev/null
  "$B" --session "$session" eval --stdin < "$DIR/styles-portal.js" > "$DIR/shell-$side-$theme-selection-styles.txt"
  "$B" --session "$session" screenshot "$DIR/shell-$side-$theme-selection.png" >/dev/null
 done
done
