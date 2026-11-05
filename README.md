# Foglamp Design System — Extraction Architecture, Cost-Optimized Model Plan & `/goal` Runbook

> [!IMPORTANT]
> ### Huge Shoutout to the Original Creator of Foglamp!
> **All credit for the extraordinary visual design, component engineering, custom shadow-as-border system, squircle geometry, EvilCharts, TraceTimeline, FlowMap, HUD, and scrollytelling experience goes to [Gustavo Fior (`@gustavo-fior`)](https://github.com/gustavo-fior) ([gustavofior.com](https://gustavofior.com) · [@heyimgustavo](https://x.com/heyimgustavo) · [LinkedIn](https://www.linkedin.com/in/gustavofior)), co-founder [Abdul Haidar](https://www.linkedin.com/in/abdulhdr/), and [Foglamp Labs (`foglamp-labs/foglamp`)](https://github.com/foglamp-labs/foglamp) ([foglamp.dev](https://foglamp.dev)).**
>
> Foglamp is one of the most thoughtfully designed open-source developer tools ever shipped (Apache-2.0). This repository contains the complete technical analysis, component inventory, cost-optimized multi-agent model strategy, and `/goal` master prompt to extract Foglamp's UI **100% AS-IS** into a reusable `shadcn/ui`-style design system (`@foglamp/design-system`) and a **Fumadocs + `@fumadocs/base-ui` + TanStack Start + `@fumadocs/story`** documentation & component workbench portal.

---

## Repository Contents

| Document | Purpose |
| :--- | :--- |
| **[`CREDITS.md`](./CREDITS.md)** | Dedicated tribute & mandatory attribution guide for **Gustavo Fior (`@gustavo-fior`)**, **Abdul Haidar**, and **Foglamp Labs (`foglamp-labs/foglamp`)** across every surface of the design system and documentation portal. |
| **[`GOAL.md`](./GOAL.md)** | Ready-to-run, self-contained **`/goal ... /goal` master prompt** for autonomous multi-wave execution. |
| **[`PLAN.md`](./PLAN.md)** | Deep architectural & visual DNA analysis of `foglamp-labs/foglamp` (5 visual signatures, 18 `--custom-shadow*` tokens, progressive squircles, dual-mode form controls, 3D entrance choreography) and portal architecture. |
| **[`MODEL-EFFORT-COST-ANALYSIS.md`](./MODEL-EFFORT-COST-ANALYSIS.md)** | Deep research & cost-optimization pyramid across **`GPT-6.1-Sol` (`low`/`medium`/`high`)**, **`GPT-6.1-Terra` (`low`/`medium`/`high`)**, and **`GPT-6-Luna` (`low`/`medium`/`high`/`max`)** — showing how **~68% of work runs on `Sol`**, **~24% on `Terra`**, and **only ~8% on `Luna`** (with `Luna (max)` used on only 2 apex tasks). |
| **[`COMPONENT-MATRIX.md`](./COMPONENT-MATRIX.md)** | Complete file-by-file inventory of all **56 Base UI primitives**, **49 App Widgets**, **11 EvilCharts**, **22 Landing Figures**, **18 Full-Page Blocks**, **Shadow DOM HUD**, and **Utilities**, with exact decoupling rules and assigned Model + Effort tiers. |
| **[`TASKS.md`](./TASKS.md)** | Granular wave-by-wave parallel subagent task checklist (`Wave 0` through `Wave 5`) with explicit model and effort badges on every task. |

---

## Cost-Optimized Model & Effort Pyramid Summary

Rather than burning high-cost flagship tokens on verbatim copies or template-driven stories/docs, this plan enforces a strict **Inverted Cost Pyramid**:

| Tier & Model Family | Effort Tiers Used | Share of Work | What It Executes |
| :--- | :--- | :---: | :--- |
| **Tier 1: `GPT-6.1-Sol`** *(Lowest Cost)* | `low`, `medium`, `high` | **~68%** | • **`low` (~28%)**: Verbatim copies (48 decoupled Base UI primitives, 25 `BrandLogos`, `.woff2` fonts, `ai-workshop.webp`, 2,094-line `mock-data.ts`), barrel `index.ts` files, `meta.json` trees, CLI checks (`tsc`, `vitest`, `shadcn build`, `bun run build`).<br>• **`medium` (~22%)**: Pure TS utilities (`format.ts`, `range.ts`, `trace-timeline.ts`, `payload-messages.ts`, `hooks.ts`), simple leaf widgets (`ModelLogo`, `AgentIcon`, `ProjectIcon`, `CustomerAvatar`, `ToolIcon`, `SpanTypeChip`, `CopyIcon`, `CopyButton`, `Stat`, `RelativeTime`, `SunsetCard`, `NodeFlow`), all 56 UI primitive `.story.tsx` files, and `registry.json` generation.<br>• **`high` (~18%)**: Authoring all **110+ `.mdx` documentation pages** and standard widget/figure `.story.tsx` files. |
| **Tier 2: `GPT-6.1-Terra`** *(Balanced Engineering)* | `low`, `medium`, `high` | **~24%** | • **`low` (~7%)**: Verifying the 8 custom-logic primitives (`Button`, `Badge`, `DRAWER_BUTTON_CLASS`, `Select` auto-label collector, `Sheet` floating variant, `Table` `ResizeObserver` + `interactive` row, `Tooltip`, `Sonner`), `<FoglampLinkProvider>`, and unit tests.<br>• **`medium` (~10%)**: Decoupling moderate widgets (`PageHeader`, `StatCard`, `RangePicker`, `CodeBlock`, `Markdown`, `AnimatedApiKey`, `ContextChip`, `QuotaCardView`, `ThemeSwitcher`, `UserMenuView`), all 11 `evilcharts/*` files + `CostBreakdownView` & `ToolBreakdownView`, all **22 Landing Figures**, `DriftingFogCtaBlock`, `CuttingMatFooterBlock`, `HudSimulatorBlock`, Auth/Onboarding blocks, and `OriginalAuthorsBlock`.<br>• **`high` (~7%)**: Complex multi-component state & DOM measurement: `DataTable` + `Toolbar` (portal-lifting), `PayloadView` + `RunExchange` drawers, `PromptProseView` + `PromptVersionsView`, `EvalScores`, `AppShellBlock`, 7 Dashboard Page Blocks, `ObservabilityGuideBlock`, `SetupBoardBlock`, and `FoglampStoryPanel`. |
| **Tier 3: `GPT-6-Luna`** *(High Precision Escalation)* | `low`, `medium`, `high`, `max` | **~8%** | • **`low` (~2%)**: Fast inter-wave architectural gatekeeper verifying zero `next/*` or `trpc` leaks.<br>• **`medium` (~2%)**: Wave 0 TanStack Start + `@fumadocs/base-ui` + `@fumadocs/story` + Tailwind v4 CSS token pipeline, plus `@foglamp/prompts` LCS diff/slot inference and `scan/layout.ts` 2-pass `elkjs` orthogonal layout math.<br>• **`high` (~2.5%)**: `TraceTimeline` waterfall, `FlowMapBlock` + `ScanBoardBlock` (`<BeamPulse>` WAAPI comets + crisp zoom), `FoggyLauncher` SVG corner shelf + `FoggyWidgetView` rubber-band resize, and `FoglampHUD` Shadow DOM 240Hz spring.<br>• **`max` (~1.5% — ONLY 2 TASKS)**: (1) `Hero3DDemoBlock` 3-Beat `transform-3d` perspective assembly + Beat 0 dark-mode 8-bit sRGB anti-flicker tween + 7-tab/5-detail `DashboardDemo`; (2) Wave 5 Final Whole-Portal Light/Dark Pixel-Parity & Attribution Audit. |

---

## Original Project Links

- **Original Repository**: [https://github.com/foglamp-labs/foglamp](https://github.com/foglamp-labs/foglamp)
- **Original Creator**: **Gustavo Fior** — [GitHub (`@gustavo-fior`)](https://github.com/gustavo-fior) · [Website (`gustavofior.com`)](https://gustavofior.com) · [X (`@heyimgustavo`)](https://x.com/heyimgustavo) · [LinkedIn](https://www.linkedin.com/in/gustavofior)
- **Co-Founder**: **Abdul Haidar** — [LinkedIn](https://www.linkedin.com/in/abdulhdr/)
- **Foglamp Website**: [https://foglamp.dev](https://foglamp.dev)
