# Wave 7 browser verification strategy

This directory is a **provisional current-state smoke**, not final acceptance. Antigravity owns every implementation change. The reviewer reads the live portal and writes only here. Freeze and record implementation HEAD plus changed-file fingerprints before the final run; a passing current page does not establish final-source fidelity.

## Current smoke

Use the isolated agent-browser session in server.md, existing `http://localhost:3000` (IPv6 localhost; IPv4 loopback is not equivalent here), fresh navigation and native pointer/keyboard interactions.

1. Homepage: 1440×900 and390×844, Light/Dark. Record hero heading and hero demo viewport rectangles above fold; one compact callout; normal punctuation flow; full tribute below hero; document scrollWidth<=clientWidth; no visible upstream product mark. Observe real first3.5s entrance with screenshots/video and sampled transformed bounds/hit-test clipping against the next section. Do not disable animation to manufacture noncollision. Geometry alone must distinguish clipped visual overflow from visible overlap.
2. Standalone `/stories/primitives/button`: navigate without a parent, wait for actual named buttons; capture rendered default controls and errors. Blank DOM/readyState is a failure, not a successful ready frame.
3. Progress: native range movement changes label/value and the single rendered progress indicator; Props has direct interactive fields, no opaque args/Args.
4. Radio Group: choose another option by real click and keyboard; selected value must change, with one selected radio. Exercise Props/presets too.
5. Sheet: no stray Close button in closed canvas; open, inspect dialog/footer, dismiss through its own Close and keyboard, reopen; side/Props controls must affect the frame.
6. Sonner: trigger actual success and error notices, observe visible toast content and dismiss; test placement/Props where exposed.
7. Toggle Group: change periods; selection and visible status must agree, including keyboard; direct controls/presets must alter the frame.
8. Item: actual direct Props controls and usable fixture, no args/Args fallback. No unrequested backend calls.

Record console/page errors, failed requests (separate canceled navigation/HMR from active failures), frame/document overflow, theme classes/foreground/background, rendered controls and exact interaction results. Screenshot failures with route, viewport, theme, action, expected and actual behavior. Recheck relevant cases only after a repair; retain the failing evidence.

## Final frozen-browser gate (later)

- Reuse the current smoke matrix, then cover the remaining explicit P0/P1 cases: all167 component pages have exactly one integrated provenance bar, one docs H1 and no repeated lead text or broken relative links; all175docs link surfaces and three required HTTP endpoints.
- Test global-theme initialization/change, independent per-workbench override and reset, Dark Lift foreground tokens, no empty Props header, no scale(0) initial frame. Exercise late mounting and direct story routes.
- Inspect all named trace/FlowMap/Scan/Eval/HUD blocks. Measure actual timeline width/column boundaries, graph node transformed bounds including RIGHT→DOWN reset, large-screen Scan map visibility; click each score for complete judge input; stream HUD and inspect distinct steps/tool redaction/no duplicate-key errors. Test the ten specified preset-state synchronization cases and provider-safe navigation.
- Verify actual scroll support/tall dimensions for Hero/CTA/AppShell and affected chart/widget/primitive frames, including offscreen controls/dialog portals, source animation timing and font settling.
- Verify component-purity/navbar/footer visually against the pinned source at matched props/native geometry; custom credit stays in portal chrome, and the Brazil flag remains in the source copyright composition. New Framerock branding is an explicit user-authorized visual exception; truthful upstream attribution remains.
- Coordinate static/source/header/registry/fresh-consumer type gates with root. Browser QA cannot establish strict/non-strict tsc, package closure, legal-header placement or source byte parity. Review their actual artifacts without replacing them with file counts.
- Final report gives explicit accepted/rejected requirements and preserves W5/W6 renderer/phase limits. Delivery requires both repository pushes/clean checkpoints verified separately by root. This reviewer does not emit a completion marker.
