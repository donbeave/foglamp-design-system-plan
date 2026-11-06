# Wave 7 story frame dimensions and primitive args scan

Read-only provisional snapshot of current source; no final acceptance implied. Contract source: `GOAL-WAVE-7-REVIEW-FIXES.md` P0-7. Frame values below are read directly from each `*.story.tsx` `frame` property.

## Required block and shell frames

| Story | Required | Current | Result |
|---|---:|---:|---|
| `agent-detail-inspector-block` | 1280×800 | 1280×800 | PASS |
| `eval-detail-block` | 1280×800 | 1280×800 | PASS |
| `overview-dashboard-block` | 1280×800 | 1280×800 | PASS |
| `session-conversation-inspector-block` | 1280×800 | 1280×800 | PASS |
| `trace-waterfall-inspector-block` | 1280×800 | 1280×800 | PASS |
| `traces-explorer-block` | 1280×800 | 1280×800 | PASS |
| `workflow-detail-block` | 1280×800 | 1280×800 | PASS |
| `flow-map-block` | 1280×800 | 1280×720 | FAIL — height 80px short |
| `scan-landing-block` | 1280×800 | 1280×820 | FAIL — height 20px over |
| `hero-3d-demo-block` | 1280×1280 | 1440×1280 | FAIL — width 160px over |
| `drifting-fog-cta-block` | 1280×900 | 1280×900 | PASS |
| `cutting-mat-footer-block` | 1280×560 | 1280×560 | PASS |
| `marketing-navbar` | 1280×360 | 1280×320 | FAIL — height 40px short |
| `buttons-badges-playground-block` | 1280×760 | 1280×760 | PASS |
| `device-approve-block` | height 520 | 1040×680 | FAIL — height 160px over (width is not specified) |
| `instrument-empty-state-block` | height 580 | 1040×580 | PASS — required height matches (width is not specified) |
| `login-form-block` | height 560 | 1040×680 | FAIL — height 120px over (width is not specified) |
| `onboarding-panel-block` | height 460 | 1040×520 | FAIL — height 60px over (width is not specified) |
| `app-shell-block` | 1280×800 shell | 1280×840 | FAIL — height 40px over |

## Chart frames

P0-7 requires all 11 chart stories at height 440px. It does not give a chart width requirement. Current source check confirms none of the 11 currently has height 440px.

| Story | Required height | Current frame | Result |
|---|---:|---:|---|
| `area-chart` | 440 | 960×480 | FAIL |
| `background` | 440 | 960×480 | FAIL |
| `bar-chart` | 440 | 960×480 | FAIL |
| `chart` | 440 | 960×480 | FAIL |
| `donut-chart` | 440 | 960×480 | FAIL |
| `dot` | 440 | 960×480 | FAIL |
| `evil-brush` | 440 | 960×320 | FAIL |
| `legend` | 440 | 960×480 | FAIL |
| `line-chart` | 440 | 960×480 | FAIL |
| `tooltip` | 440 | 960×480 | FAIL |
| `zoom` | 440 | 960×520 | FAIL |

## Primitive nested `args` scan

P0-7 names 28 primitive files (not 29): item, kbd, label, loader, menubar, native-select, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toggle-group, toggle, tooltip. All 28 files exist. A targeted scan found no nested pattern `args: { initial: { args: ... } }` or function parameter `{ args }: { args: ... }` in this list. The directory has 56 primitive story files total.

## Correction

Auth frame requirements specify only heights for these four stories; their 1040px widths are not a failure. `instrument-empty-state-block` passes its required 580px height. The other three auth frames fail only because their heights do not match.

## Snapshot limits

No implementation files were changed, and no full tests/types/build were run. The source was being edited concurrently; rerun these checks after edits settle.
