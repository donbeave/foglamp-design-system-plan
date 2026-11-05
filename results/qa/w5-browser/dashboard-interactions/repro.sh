#!/bin/sh
# Run against the ce01e3a production server, in an isolated agent-browser session.
set -eu
S=w5-dashboard-repro
agent-browser --session "$S" open http://127.0.0.1:4178/docs/blocks/traces-explorer-block
agent-browser --session "$S" snapshot -i
# In the iframe click the Any agent combobox, then hover Any model. Observe the open list moving to the hovered sibling.
agent-browser --session "$S" open http://127.0.0.1:4178/docs/widgets/prompt-versions-view
agent-browser --session "$S" snapshot -i
# Click Diff vs v1; observe the minus and plus template lines.
agent-browser --session "$S" open http://127.0.0.1:4178/docs/charts/evil-brush
agent-browser --session "$S" scroll down 350
# At 1280x720, drag the left brush handle from (447,265) to (530,265).
agent-browser --session "$S" mouse move 447 265
agent-browser --session "$S" mouse down
agent-browser --session "$S" mouse move 530 265 --steps 12
agent-browser --session "$S" mouse up
agent-browser --session "$S" snapshot
agent-browser --session "$S" console
agent-browser --session "$S" errors
agent-browser --session "$S" close
