# Wave 7 P1-1 Runtime Source Audit

Read-only source audit of the live implementation tree at `/Users/donbeave/Projects/donbeave/foglamp-design-system`. The tree was being edited during the audit; this matrix describes the observed source snapshot and needs a final post-freeze pass.

## P1-1 Matrix

| Area | Status | Source evidence |
|---|---|---|
| HUD span IDs, step numbering, duplicate-key fallback | PASS | `src/hud/model.ts:257-272` assigns the parsed step suffix or filtered LLM index. `src/blocks/marketing/hud-landing.tsx:88-107` uses `:step:0`, `:tool:docs-1`, `:step:1` and emits steps 0/1. `apps/docs/src/stories/widgets/foglamp-hud.story.tsx:17-67` supplies step 0/1 plus `tool.start`/`tool.end`, making redaction observable. |
| Eval judge inputs | PASS | `src/blocks/dashboard/eval-detail-block.tsx:253-304` supplies `score_1`, `score_2`, and `score_3` with a prompt, input/output fields, and segments; lines 324 and 993-1001 merge and read these defaults. |
| HUD, DeviceApprove, PayloadView, RunExchange, Calendar, Collapsible, ToggleChip preset sync | PASS | `src/hud/FoglampHUD.tsx:328-332`; `src/blocks/auth/device-approve.tsx:105-112`; `src/widgets/payload-view.tsx:381-386`; stories `run-exchange.story.tsx:28-32`, `primitives/calendar.story.tsx:5-10`, `primitives/collapsible.story.tsx:6-11`, and `toggle-chip.story.tsx:5-10`. |
| FigureKit section/variant story sync | PASS | `apps/docs/src/stories/blocks/figure-kit-22-block.story.tsx:6-14` syncs props, checks the variant against the requested section, and passes both props to the block. |
| PromptProse story callbacks/state | NOT APPLICABLE | `apps/docs/src/stories/widgets/prompt-prose.story.tsx:34-39` is stateless and passes only `template`, `slots`, and `loading`; `src/widgets/prompt-prose.tsx:245-264` exposes no model-selection or slot-commit callbacks. No `onSelectModel` or `onCommitSlot` API exists in these files. There is no callback to wire without expanding the component surface. |
| DevBar story controls | OPEN | Network delay/failure/loading callbacks are stateful (`apps/docs/src/stories/widgets/dev-bar.story.tsx:32-40`), and invalidation clears mock queries and reports the action (`:27-49`). However, the story does not pass `onClearQueries`; `src/widgets/dev-toolbar.tsx:335` defaults it to `noop`, while the trash button invokes it at `:482-496`. The visible cache-clear control remains inert. |
| FoggyWidget story send and reopen | PASS | `apps/docs/src/stories/widgets/foggy-widget.story.tsx:16-18,23-27,30-48` keeps controlled open state, offers a reopen button, and appends the submitted user message plus a local demo response. |
| Hero trace inspector follows selected node | OPEN | `src/widgets/trace-timeline.tsx:260-261` documents that a selected bar drives the parent inspector. `src/blocks/marketing/demo/detail/trace-detail.tsx:232-240,301-319` stores selection and passes it to the timeline, but the adjacent inspector title/content remains fixed to “Whole trace”; no inspector rendering reads `selected`. Clicking a span changes the timeline selection only. |
| Optional HUD SSE URL/port | PASS, boundary risk OPEN | `src/hud/FoglampHUD.tsx:45-60` and `src/hud/useHudStream.ts:43-47,74-94` expose and consume `port`/`url`; URL wins, otherwise port forms `http://127.0.0.1:<port>/events`, and the `EventSource` is closed on cleanup. No dependency was added: `package.json:111,125-127` pins Recharts 3.8.1 and React/ReactDOM peers `^19.0.0`. The message handler at `useHudStream.ts:84-88` only catches JSON parse errors and asserts `JSON.parse(msg.data) as HudEvent`; syntactically valid but malformed event objects can reach the reducer (for example `trace.end` dereferences `event.trace.spans` at `src/hud/model.ts:198-206`). This remains an unvalidated network boundary. |
| EvilBrush zero-size container mitigation | PASS | `src/charts/evilcharts/ui/evil-brush.tsx:646,675,701` sets `minWidth={0}` and `minHeight={0}` on all three chart-variant `ResponsiveContainer`s. The package pins Recharts 3.8.1 (`package.json:111`). |
| Favicon route removal and provider wiring | PASS with cleanup note | No `/api/favicon` literal remains in implementation or generated registry payloads. Both scan-brand modules call `useScanFavicon`; `src/blocks/scan/favicon-context.tsx:16-30` defaults that shared context to `getGoogleFavicon` from `src/widgets/leaf/favicon.ts:17-22` and exposes a provider via the scan barrel. `src/lib/scan/favicon.ts:19-20` still exports an unused alternate `faviconUrl` helper; its old same-origin-proxy comments in `widgets/leaf/scan-brand.tsx:49-52,67` are stale. |

## Seven Duplicate-Path API Matrix

| Pair | Status | Findings |
|---|---|---|
| `blocks/scan/brand.tsx` / `widgets/leaf/scan-brand.tsx` | PASS | Both export `BrandMark`, `Favicon`, and `ModelIcon` with matching props/behavior; only the relative `favicon-context` import differs. Both use the same context module. |
| `blocks/marketing/chrome/logo.tsx` / `icons/logo.tsx` | PASS | Both export `Logo` with `brandName?: string` defaulting to `"Framerock"`; body matches apart from relative import path. |
| `widgets/leaf/sunset-card.tsx` / `blocks/app-shell/sunset-card.tsx` | OPEN | Both export `SunsetCard`, but leaf accepts `serverUrl?: string | null` and reads `NEXT_PUBLIC_SERVER_URL` when omitted (`leaf/sunset-card.tsx:28-47`); app-shell accepts only `serverUrl?: string` and has no environment fallback (`app-shell/sunset-card.tsx:22-23`). The package exposes both as `LeafSunsetCard` and `AppShellSunsetCard` (`src/index.ts:127,174`), so this is a public behavior/type divergence. |
| `widgets/markdown.tsx` / `widgets/foggy/markdown.tsx` | PASS | Both export `markdownComponents`; current implementation differs only in import alias/path and comments. |
| `icons/brand-mark.tsx` / `blocks/marketing/chrome/brand-mark.tsx` | PASS | Same `BrandMark({ className? })` export and component body. |
| `blocks/marketing/chrome/noise-overlay.tsx` / `blocks/scan/noise-overlay.tsx` | PASS | Both export `FilmGrain`, `FogBank`, and `HeroGrain` with matching API/body; only relative import paths differ. |
| `lib/scan/favicon.ts` / `widgets/leaf/favicon.ts` | OPEN | These are still distinct helper APIs: `faviconUrl(domain)` plus `modelDomain(label, domain?)` versus `getGoogleFavicon(domain)`. The URL helpers use different Google endpoints (`www.google.com/s2/favicons` vs `t3.gstatic.com/faviconV2`); source consumers currently use `getGoogleFavicon` through the context. Neither requests `/api/favicon`. |

## Commands and Limits

- Static `rg` scans for the HUD IDs/events, judge defaults, state-sync hooks, package peers/exports, and module exports: exit code 0.
- `rg -n -F '/api/favicon' packages/design-system/src apps/docs/public/r packages/registry/registry.json`: exit code 1, expected no matches.
- No tests, builds, or browser runs were performed. The Hero inspector, DevBar clear-cache action, the two duplicate-path divergences, and SSE runtime payload validation remain open for implementation/final verification.
