# Wave 7 deep runtime checks

Browser: isolated agent-browser Chrome sessions, localhost:3000, cold navigations. Source freeze observed. Commands and outputs: `commands.jsonl`; scripts: `check.py`, `details.py`, `redaction.py`; captures alongside this report.

| Check | Result | Evidence |
| --- | --- | --- |
| Trace waterfall columns | PASS | Computed grid columns 240px / 196px / 104px, `results.json`, `trace.png`. |
| Flow map direction change | PASS | Horizontal SVG 835×170, vertical 488×380 after clicking Vertical flow preset; both fit 1280×640 iframe. `results.json`, `flow-horizontal.png`, `flow-vertical.png`. |
| Scan landing | PASS | Rendered 909×315 graph with visible node labels; `results.json`, `scan.png`. |
| Eval score inspection | PASS | All four native-clicked rows opened; first three captured with complete individual input/output, and fourth inspected live with complete input/output. No unavailable message. `interaction-details.json`, `eval-*.png`. |
| HUD storm | PASS | Storm completed; trace opens with distinct Step 1 and Step 2, searchDocs input and output. No duplicate-key or other error in HUD session console. `interaction-details.json`, `hud-open.png`. |
| HUD tool redaction | PASS | lookupCustomerAccount input/output become `•••` after checking redact and reopening trace. `redaction.json`, `widget-unredacted.png`, `widget-redacted.png`. |
| HUD widget control console | PASS after fix | Initial `redact` checkbox interaction produced a Base UI uncontrolled Checkbox console error, reproduced twice (`redaction.json`). A cold fresh-session retest after the fix showed zero console errors and preserved masked input/output (`redaction-fixed.json`, `widget-fixed-*.png`). |

The `errors` command does not include console.error messages; `console` captures this defect explicitly.

Theme observation: all six isolated runtime sessions were opened with Light parent and each had Light iframe; no conclusion on dark navigation inheritance from these sessions.
