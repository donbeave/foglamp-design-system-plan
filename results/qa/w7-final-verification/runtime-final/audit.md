# Wave 7 P1-1 Runtime Final Recheck

Read-only recheck of the source tree after the implementation freeze. The source tree was not edited by this audit.

## P1-1 Matrix

| Area | Status | Evidence |
|---|---|---|
| HUD duplicate span keys and zero-based steps | PASS | `packages/design-system/src/hud/model.ts:257-272` uses the filtered LLM index when a span ID has no `:step:N` suffix. `blocks/marketing/hud-landing.tsx:88-107` uses step IDs 0/1 and `:tool:docs-1`; `apps/docs/src/stories/widgets/foglamp-hud.story.tsx:17-67` emits zero-based step events and a tool start/end pair, so redaction has input/output to mask. |
| Eval score judge input drawer | PASS | `blocks/dashboard/eval-detail-block.tsx:253-304` defines complete `score_1`–`score_3` prompts, fields, and segments; `:324` merges caller overrides, and `:991-1001` consumes the selected score input. |
| Preset/state synchronization | PASS | HUD default-open effect: `hud/FoglampHUD.tsx:270-312,319-332`; DeviceApprove prop effect: `blocks/auth/device-approve.tsx:105-112,154-159` (story also keys by code at `stories/blocks/device-approve-block.story.tsx:5`); PayloadView all three dependencies: `widgets/payload-view.tsx:381-386`; RunExchange: `stories/widgets/run-exchange.story.tsx:28-32`; Calendar: `stories/primitives/calendar.story.tsx:5-10`; Collapsible: `stories/primitives/collapsible.story.tsx:6-11`; ToggleChip: `stories/widgets/toggle-chip.story.tsx:5-10`; FigureKit section/variant validation and keyed remount: `stories/blocks/figure-kit-22-block.story.tsx:6-14`. HUD story also remounts for open/theme/redaction preset changes at `stories/widgets/foglamp-hud.story.tsx:69-86`. |
| PromptProse callbacks / preset behavior | NOT APPLICABLE | `stories/widgets/prompt-prose.story.tsx:34-51` passes the current `loading` and `label` args directly without local state. `widgets/prompt-prose.tsx:245-264` is a display view over template/slot examples; slot values are inspectable through the hover card (`:185-221`). There is no model selector, slot editor, or `onSelectModel`/`onCommitSlot` API to wire, so no capability was invented. |
| DevBar story controls | PASS | `stories/widgets/dev-bar.story.tsx:6-24,35-61` syncs preset props, controls network state, and gives invalidate and clear-cache actions visible effects by clearing the mock query list and incrementing status counts. Both callbacks are consumed by `widgets/dev-toolbar.tsx:331-337,464-496`. |
| FoggyWidget story send/reopen | PASS | `stories/widgets/foggy-widget.story.tsx:16-48` controls open state, offers a reopen action, and appends visible user and mock assistant messages when sent. |
| Hero trace inspector follows selected node | PASS | `blocks/marketing/demo/detail/trace-detail.tsx:260-278` derives the active span and I/O from the selected ID; `:337-344` passes the selection to `TraceTimeline`; `:347-501` renders selected span metadata and input/output in the adjacent inspector. Previous/next and Whole trace navigation update the same selection at `:366-411`. |
| SSE URL/port props and provider/dependency impact | PASS | `hud/FoglampHUD.tsx:45-61,319-324` and `hud/useHudStream.ts:43-47,64-94` expose, forward, connect using URL precedence or the port `/events` endpoint, and clean up EventSource. No new dependency is needed; `packages/design-system/package.json:111,125-127` pins Recharts 3.8.1 and React/ReactDOM peer ranges `^19.0.0`. The scan favicon context is a single shared context module (`blocks/scan/favicon-context.tsx:16-30`), and both scan-brand paths import it. |
| EvilBrush Recharts size warning | PASS | `charts/evilcharts/ui/evil-brush.tsx:646,675,701` supplies `minWidth={0}` and `minHeight={0}` to each chart variant's `ResponsiveContainer`. |
| `/api/favicon` request removal | PASS | No `/api/favicon` literal remains in `packages/design-system/src`, `apps/docs/public/r`, or `packages/registry/registry.json`. Scan-brand resolves through `useScanFavicon()` (`widgets/leaf/scan-brand.tsx:27,64-73`); the provider's default resolver is `getGoogleFavicon` (`blocks/scan/favicon-context.tsx:16-30`). |

## Duplicate-Path API Matrix

| Pair | Status | Evidence |
|---|---|---|
| `blocks/scan/brand.tsx` / `widgets/leaf/scan-brand.tsx` | PASS | Both export `BrandMark`, `Favicon`, `ModelIcon` with matching props/body. They differ only in the relative import path to the same `favicon-context.tsx`; exports at `:30,54,82`. |
| `blocks/marketing/chrome/logo.tsx` / `icons/logo.tsx` | PASS | Both expose `Logo` with `brandName?: string`, defaulting to `Framerock` (`:28` in each); matching body, relative import paths differ. This follows the current remove-Foglamp-visible-branding requirement. |
| `widgets/leaf/sunset-card.tsx` / `blocks/app-shell/sunset-card.tsx` | PASS | The app-shell path now re-exports the leaf component and `SunsetCardProps` (`blocks/app-shell/sunset-card.tsx:21`); the app-shell block imports that path at `blocks/app-shell/app-shell-block.tsx:41` and passes its server URL at `:131`. Package aliases resolve to the same implementation (`src/index.ts:127,174`). |
| `widgets/markdown.tsx` / `widgets/foggy/markdown.tsx` | PASS | Same `markdownComponents` export and behavior; current body differences are import alias/path and comments. |
| `icons/brand-mark.tsx` / `blocks/marketing/chrome/brand-mark.tsx` | PASS | Same `BrandMark({ className? })` API and implementation. |
| `blocks/marketing/chrome/noise-overlay.tsx` / `blocks/scan/noise-overlay.tsx` | PASS | Matching `FilmGrain`, `FogBank`, and `HeroGrain` exports and implementation; only relative imports differ. |
| `lib/scan/favicon.ts` / `widgets/leaf/favicon.ts` | PASS | `lib/scan/favicon.ts:19-25` now re-exports `getGoogleFavicon` and keeps `faviconUrl(domain)` as a compatibility wrapper delegating to it; the canonical implementation remains `widgets/leaf/favicon.ts:17-23`. `modelDomain` remains available from the scan helper. The pure probe below confirms that both entrypoints produce the same output for a bare domain and a full URL, preserving their public APIs. |

## Pure Smoke and Commands

- `bun -e` reducer smoke fed two non-colon LLM IDs and one tool ID through `reduce()`/`rows()`: exit 0; output keys `s0,s1,tlegacy-tool`, step numbers `[0,1]`, and the original tool ID.
- `bun -e` SunsetCard entrypoint smoke compared the leaf export to the app-shell re-export: exit 0; `sameImplementation: true`.
- `bun -e` favicon compatibility smoke: exit 0; `faviconUrl()` and `getGoogleFavicon()` return identical `t3.gstatic.com/faviconV2` URLs for both `example.com` and a full URL with query parameters; `modelDomain("Gemini 2", "google.com")` still returns `gemini.google.com`.
- Static `rg` scans for the P1-1 items and module interfaces: exit 0.
- `rg -n -F '/api/favicon' packages/design-system/src apps/docs/public/r packages/registry/registry.json`: exit 1, expected no matches.
- No browser run, package build, or full test suite was performed. Runtime UI behavior is supported by the source wiring and the pure smokes above; no P1-1 source item remains open in this audit.
