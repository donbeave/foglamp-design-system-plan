# W5-5.2 independent source fidelity and attribution sign-off

**Decision: ACCEPTED for Wave 5, with the bounded capture limitations below.** Final commit/push integrity is verified separately after the coordinator lands the wave. Wave 6 remains pending; this report emits no goal-completion marker.

Source revision: `7d7e6609108019a74902858d4b07c24825c6318b`. Target reviewed: the Wave 4 base `ce01e3aa72515a8c557336ac174d9428e17c7046` plus the frozen W5 corrections and final successful production build.

## Actual reference rendering

`verification-matrix.json` contains 322 native cases: the 160 non-dashboard stories in both themes, plus a separate sheet rendering all 25 source SVG logos in both themes. The eight dashboard/AppShell views are covered by the separate 64-cell default/loading/empty/selection × Light/Dark reference matrix in `../w5-apex-dashboard-reference/coverage.json`.

The reference imports original readonly frontend/UI/SDK modules and original CSS. It does not use extracted visual components as its own baseline. Story fixtures, viewport, input timestamps, randomness, fonts and animation observation times are shared. Native frames use matched geometry. The fixture clock executes original rAF callbacks at 60 Hz and seeks actual CSS/WAAPI animations, including open ShadowRoots. Original easing, duration, spring code, classes and token values are unchanged.

Latest native dispositions:

- **312 cases:** exact pixels and recorded computed styles.
- **6 cases:** required attribution additions in navbar, footer and OriginalAuthorsBlock; the original founder data/cards remain and Next/Image fill geometry is reproduced by the native image adapter.
- **2 Guide cases:** exact pixels; the differing computed animation identifier is the generated CSS-module filename hash. The original CSS declarations/timing remain unchanged.
- **2 bounded capture cases:** ScanLanding light retains 4 composite pixels with equal recorded DOM/styles; HUD simulator light retains 950 pixels in its otherwise matching empty overlay during independent transport/viewport initialization. The standalone original-vs-target HUD rendering, including ShadowRoot styles and shared typed event inputs, compares exactly. The upstream always-on SSE demo is deliberately replaced by a typed local fixture and host callback.

The dashboard raw strict matrix retains dark composite deltas of 68/11/19/8 pixels in four cells and two pixel-exact loading cells with 21 offscreen skeleton-opacity differences of approximately 0.000006. These are preserved as strict mismatches. Effective SVG/ancestor CSS, geometry, SVG bytes, local backgrounds and isolated SVG rasters match; unchanged SVG clone/repaint changes the cached composite result. Same-browser captures exclude browser-process isolation as the cause. No component CSS was changed, masked or threshold-relaxed to erase them. These bounded renderer/phase observations do not establish a source-code visual regression. See the raw pixel, CSS, A/A, clone assertion and raster artifacts in the dashboard reference directory.

## Source and boundary review

The 233-pair source audit and current per-path residual dispositions are in `../w5-apex-static/full-report.json` and `residual-classification.json/.md`. The current 46 body differences and six import-boundary records have explicit source paths, hashes and reasons. They comprise host callbacks/data views, framework imports, renamed exports, browser/server prompt entry separation, source helper inlining, React lazy/Suspense loading, image fill adaptation, and mandated credit regions. Source API names absent from the pinned source were reconciled rather than invented.

All 36 shadow declarations (18 each theme, including custom-outline-shadow), source effects, progressive squircle/fallback class recipes, form strategies, DRAWER_BUTTON_CLASS, Base UI render polymorphism and filled icon bodies are preserved. Source behavioral constants are corroborated by source-body comparison plus live interaction evidence: Hero perspective/ancestry/entrance table/dark lift, Timeline phases/folding/cursor/reveal, chart brush/zoom/reset, prompt LCS/slots, toolbar portal lifting and reserve anticipation, Foggy notch/resize, ELK/WAAPI/camera behavior, Guide pins/courier/bell, and HUD Shadow DOM/spring/timeline.

Public/default callbacks were exercised in `../w5-apex-callbacks/report.md`: login, device claim/approve/deny/error, onboarding copy, new-project creation/selection, AppShell action, signout, calendar/range persistence and measured resize. HUD storm rejection restores the original invisible down state; success returns idle after the source 8000 ms delay. The source has no failure-message UI. Callback evidence is a host-boundary proof, not a claim to reproduce the removed backend.

Reference adapters are retained under `harness/`: original import-path mapping, Next Link/native image/client-only lazy loading, source backend query data and auth/chat boundaries, original favicon GET proxy, typed fixture EventSource, browser-only original prompt exports, and an external inline HUD embedding frame. The reference CSS explicitly scans original source and the frozen Streamdown dist because it runs outside the upstream workspace.

`dependency-resolution-final.json` records real module resolutions. Base UI is 1.4.1 throughout the source/DS rendering; Fumadocs uses its separate dependency. An initial unmeasured suspicion about Base UI 1.9 was corrected. The harness shadcn stylesheet was subsequently pinned from 4.23 to source 4.12; its prior difference was an inactive reduced-motion shimmer addition plus comments, with normal-mode declarations unchanged. React, Motion, Recharts, SlotText, Tailwind and corner-shape resolve to the frozen source-compatible pins. Canonical Inter comes directly from the readonly source. Host/Geist outline/raster equivalence and its Latin/discrete-weight/browser limits remain documented in `../w5-font-source-identity/`.

## Corrections proven by the source comparison

The wave fixes restore source behavior rather than redesign components: source auth handoff instead of an invented success card; HUD down/callback handling; internal markdown link provider routing; AgentDetail loading/updating flags; exact 11-item source badge playground order; source font fallbacks/preloads; and portal isolation from Fumadocs base/Shiki rules. The original `dark` custom-variant specificity is restored after Fumadocs imports. Open Collapsible and the bounded control matrix now compare exactly. Copied primitive classes/tokens are unchanged.

## Production and attribution

The final production preview was restarted on port 4203. `production-attribution.json` and its summary record actual homepage, /docs, /docs/credits and Button workbench DOM links/title. The fresh independent desktop/mobile Light/Dark credit probe is in `../w5-final-credit-probe/`. It confirms Gustavo Fior/@gustavo-fior, Abdul Haidar and Foglamp Labs, the required GitHub/site/X/LinkedIn destinations, exact Credits & Original Creator heading/sidebar label, and the required workbench creator/repository links. The shared footer invariant and earlier full route coverage account for all 169 workbenches. README/CREDITS, package/registry metadata, Apache LICENSE and NOTICE were also checked.

`cold-production.json` observes fresh desktop/mobile × Light/Dark browser contexts with CPU 4× and Geist requests delayed 3 seconds: all four have zero top-document layout shifts, zero runtime/network/console errors, loaded fonts and no overflow. Desktop keycap boxes remain constant through observed loading→loaded phases (Chrome 157 reports group 46.8125 px; individual boxes 22.421875/22.390625 px). Mobile uses its hidden full-search control. The original rare opposite font transition remains historically indeterminate; fixed authored search boxes eliminate its layout dependency. Original progress-bar and HUD/key motion remain source animations, distinct from settled document movement. Existing 708-case settled production QA and final static/type/test/registry/build results remain in their original evidence directories.

Raw preliminary harness failures and pre-fix comparisons are retained and excluded from acceptance. This sign-off is bounded to the supplied fixtures/states, source-code invariants and recorded browser/platform; it does not claim universal Unicode or every browser raster is byte-identical.

## Delivery verification

Independently verified pushed W5 commit `5b1d9f423647a92fce0d0c15d7e69f6ed54848d1`: local HEAD, tracking origin/main and live remote main match; target working tree was clean at verification. Original reference HEAD remains pinned and clean. See `delivery.json`. Later authorized W6 changes belong to the next phase.
