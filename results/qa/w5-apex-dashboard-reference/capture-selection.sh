#!/bin/sh
set -eu
DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
B=/opt/homebrew/bin/agent-browser
for item in 'traces:agent=Support%20agent:How can I track my order?' 'trace:span=s1:classify-intent' 'agent:trace=trace_demo:Help customers with their orders.' 'workflow:run=run_demo:Please share your order number.' 'eval:score=score_1:Judge input unavailable.'; do
  view=${item%%:*}; rest=${item#*:}; query=${rest%%:*}; expected=${rest#*:}
  for theme in light dark; do
    for side in source target; do
      if [ "$side" = source ]; then session=w5dashsource; port=4222; else session=w5dashtarget; port=4221; fi
      "$B" --session "$session" eval 'localStorage.clear()' >/dev/null
      "$B" --session "$session" open "http://127.0.0.1:$port/?view=$view&theme=$theme&$query" >/dev/null
      "$B" --session "$session" set viewport 1280 800 >/dev/null
      "$B" --session "$session" wait --text "$expected" >/dev/null
      "$B" --session "$session" wait --fn 'window.__parity?.ready === true && document.fonts.status === "loaded"' >/dev/null
      "$B" --session "$session" eval --stdin < "$DIR/settle.js" >/dev/null
  "$B" --session "$session" wait 250 >/dev/null
      "$B" --session "$session" eval --stdin < "$DIR/styles.js" > "$DIR/$view-$side-$theme-selection-styles.txt"
      "$B" --session "$session" screenshot "$DIR/$view-$side-$theme-selection.png" >/dev/null
    done
  done
done
