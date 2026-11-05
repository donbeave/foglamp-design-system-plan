#!/bin/sh
set -eu
DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
B=/opt/homebrew/bin/agent-browser
for side in source target; do
 if [ "$side" = source ]; then port=4222; else port=4221; fi
 "$B" --session w5dashmetrics open "http://127.0.0.1:$port/?view=agent&theme=dark" >/dev/null
 "$B" --session w5dashmetrics eval 'localStorage.clear()' >/dev/null
 "$B" --session w5dashmetrics open "http://127.0.0.1:$port/?view=agent&theme=dark" >/dev/null
 "$B" --session w5dashmetrics set viewport 1280 800 >/dev/null
 "$B" --session w5dashmetrics wait --text 'Support agent' >/dev/null
 "$B" --session w5dashmetrics eval --stdin < "$DIR/settle.js" >/dev/null
 "$B" --session w5dashmetrics eval '(()=>{let e=document.querySelector("svg.tabler-icon-coin-filled");e.replaceWith(e.cloneNode(true));return true})()' >/dev/null
 "$B" --session w5dashmetrics wait 250 >/dev/null
 "$B" --session w5dashmetrics screenshot "$DIR/agent-$side-dark-clone.png" >/dev/null
done
