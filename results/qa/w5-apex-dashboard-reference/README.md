# Dashboard reference review

`coverage.json` records a strict exact-pixel and recorded-computed-style matrix for eight original source views against the extracted blocks. All four states (default, loading, empty, selected) are recorded in both themes. PASS is bounded to the 1280×800 frame, the fixtures and the 18 recorded computed-style properties. It does not establish full functional or pixel parity beyond these cases. `computed-style-report.json` includes positional per-node comparisons and examples; portal HUD ShadowRoot styles require the separate Apex check. `inventory.py` records original and extracted input hashes and direct source tRPC sites.

The harness imports original source bodies and uses endpoint-specific fixtures, throws on unadapted query execution, and scans the original application, UI, SDK and frozen Streamdown CSS sources. It adapts Next Link, Image, navigation, development analytics, backend queries, ProjectGate and HUD SSE at their nonvisual boundaries. Its source ProjectGate mirrors the original AppShell's gate for the known fixture project. The target renders the portal CSS with the production source-surface marker. Original and target use frozen wall time, seeded random skeleton data, a shared 60 Hz 8-second frame clock, explicit ShadowRoot animation seeking and cleared per-origin storage. Screenshots are native 1280×800; screenshots after interactions use 16 seconds. `runtime.json` records versions and fixture metadata.

Start the two isolated servers from `harness`:

```sh
mise exec bun@latest -- bun ./node_modules/vite/bin/vite.js --config vite.config.ts
PARITY_SIDE=source mise exec bun@latest -- bun ./node_modules/vite/bin/vite.js --config vite.config.ts
```

They listen on ports 4221/4222. `capture.sh`, `capture-loading.sh`, `capture-empty.sh`, `capture-selection.sh`, `capture-session-selection.sh`, `capture-overview-selection.sh`, `capture-shell-states.sh` and `capture-shell-selection.sh` reproduce the recorded cases with agent-browser. After capture, run `python3 compare.py`, evaluate `pixels.js` in an isolated local browser, save its output to `pixel-report.txt`, then run `python3 make-coverage.py`.

Exact-zero failures are preserved in the matrix. The gold-icon clone-only experiment and its before/after DOM/style/rect assertions are in `clone-check.*` and `*-clone-assert.json`; workflow's red ghost remains different even after cloning. Isolated common-background gold, ghost and CPU SVG raster checks match; same-browser captures do not remove all page-level differences. None of those experiments modifies product code or replaces the original raw frames. See `pixel-details.txt`, `workflow-clone-details.txt`, `traces-empty-details.txt` and `same-browser-result.json` for precise residuals. Agent loading has zero raster differences after the product fix, with 21 offscreen shimmer opacity differences of roughly 0.000006 still recorded as strict failures.
