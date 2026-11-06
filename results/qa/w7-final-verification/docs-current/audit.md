# Wave 7 docs current audit

Read-only audit of `/Users/donbeave/Projects/donbeave/foglamp-design-system` on 2026-11-06. This pass made no changes to the implementation checkout. The companion `check-examples.mjs` uses the TypeScript parser to inspect TSX fences and report identifiers not imported or declared in each fence; `example-diagnostics.json` is its raw output.

## Coverage

| Check | Result |
| --- | ---: |
| MDX pages under `apps/docs/content/docs` | 175 |
| Duplicate body H1 headings | 0 |
| MDX `StoryProvenance` tags/imports | 0 |
| Legacy relative story/registry links | 0 |
| Component pages missing a `Usage` or `Example` section | 0 |
| Targeted defensive disclaimer phrases | 0 |
| TSX usage fences | 172 |
| Component TSX fences with likely unbound names | 41 |
| TypeScript diagnostics in component TSX fences | 100 |

The requested cleanup is present in the current files: primitive titles are not repeated as body H1s; duplicate page-level provenance and broken `../../../src/stories` / `../../../public/r` links are gone; widget/chart/figure/block pages have examples and package import paths. Targeted API corrections are present for span-type, brand-logos (25 exported logos), toolbar, and the named prop semantics. The chart background API table now lists `ChartBackground` and `BackgroundVariant`, with variant values matching the source module.

## Example issues to fix

The harness runs both a quick AST scan and a TypeScript program with all 172 fences supplied as virtual TSX files located beside their MDX pages. The TypeScript program resolves workspace package imports and checks component props and local declarations. It reported 102 total diagnostics: 100 in component examples and two in foundation snippets. The foundation alias error is expected when a consumer-install example is compiled as though it lived in this docs app; the architecture snippet also leaves its router adapter illustrative. The raw, line-specific diagnostics are in `example-diagnostics.json`.

| Pages | Unbound names |
| --- | --- |
| `blocks/embed-board-block.mdx`, `blocks/flow-map-block.mdx`, `blocks/scan-board-block.mdx` | `resolveStoryFavicon`, `scanFixture` |
| `blocks/scan-landing-block.mdx` | `resolveStoryFavicon` |
| `blocks/setup-board-block.mdx` | `planFixture`, `resolveStoryFavicon` |
| `blocks/traces-explorer-block.mdx` | `DashboardStoryShell` |
| `charts/area-chart.mdx`, `charts/background.mdx`, `charts/bar-chart.mdx`, `charts/chart.mdx`, `charts/dot.mdx`, `charts/legend.mdx`, `charts/line-chart.mdx`, `charts/tooltip.mdx` | `observabilityConfig`, `observabilityData` |
| `charts/donut-chart.mdx` | `config`, `slices` |
| `charts/evil-brush.mdx` | `initialRange`, `observabilityConfig`, `observabilityData`, `StorySurface` |
| `charts/zoom.mdx` | `observabilityConfig`, `observabilityData`, `StorySurface` |
| `primitives/combobox.mdx` | `models` |
| `primitives/direction.mdx` | `DirectionContent` |
| `primitives/spinner.mdx` | `sizeClasses` |
| `widgets/context-chip.mdx` | `ChipMark` |
| `widgets/cost-breakdown.mdx` | `costFixture` |
| `widgets/data-table.mdx`, `widgets/toolbar.mdx` | `HeaderActionsHost`, `projects`, `statuses`; `data-table.mdx` also uses `rows` |
| `widgets/eval-scores.mdx` | `meta`, `scores` |
| `widgets/filter-select.mdx` | `statusOptions` |
| `widgets/foggy-widget.mdx` | `messages` |
| `widgets/foglamp-hud.mdx`, `widgets/hud-inline-preview.mdx` | `stream` |
| `widgets/node-flow.mdx` | `nodes` |
| `widgets/payload-view.mdx` | `conversation`, `previousConversation` |
| `widgets/project-provider.mdx` | `ProjectProviderPreview`, `ProjectStoryFrame` |
| `widgets/prompt-prose.mdx` | `slots`, `template` |
| `widgets/prompt-versions-view.mdx` | `promptVersionsFixture` |
| `widgets/range-provider.mdx` | `RangeProviderPreview` |
| `widgets/run-exchange.mdx` | `input`, `output` |
| `widgets/sunset-card.mdx` | `SunsetCard`, `HOSTED_SERVER_URL` |
| `widgets/tool-breakdown.mdx` | `toolBreakdownFixture` |
| `widgets/trace-timeline.mdx` | `spans` |
| `widgets/trend-charts.mdx` | `config` |

The other foundation diagnostics are expected context mismatches: the installation snippet imports `@/components/framerock/ui/button`, which is a target-consumer path and not present in the docs app; the architecture snippet leaves `YourRouterLink` undefined. A type-only `ReactNode` import and a clear router-adapter placeholder would make that example easier to reuse.

Other verified example defects: the compiler reports 9 `TS2367` literal comparisons against impossible values, one malformed JSX root in `widgets/sunset-card.mdx`, one nonexistent import (`FoggyAssistantMessage` from `widgets/foggy/foggy-message`), one `EvalScores` call missing required `evalMeta` and `presetName`, and 9 implicit-`any` callback parameters caused by missing/untyped example data. `widgets/brand-logos.mdx` also uses `as string` casts in its mapping example instead of a typed list. The `rounded-square` chart legend value was initially suspected but is not a TS error; the snippet uses a different chart-wrapper `Legend` API than the standalone legend table, so it is not counted as a confirmed defect.

## Reproduce

From the plan repository root:

```sh
node results/qa/w7-final-verification/docs-current/check-examples.mjs \
  /Users/donbeave/Projects/donbeave/foglamp-design-system \
  > results/qa/w7-final-verification/docs-current/example-diagnostics.json
```

Exit code: `0`. The main repository receives no writes; virtual `.tsx` roots exist only in the TypeScript compiler host.

## Follow-up

Make the snippets self-contained with small local data arrays/configs and direct package imports. Where a package provider is required, show its actual exported provider and a complete minimal setup. Add a repeatable docs-quality check that runs MDX parsing, checks internal `/r/<item>.json` links, and flags likely unbound identifiers in TSX code fences. API tables should remain tied to the exact target module exports and declared prop types; add semantic descriptions only where grounded in behavior.
