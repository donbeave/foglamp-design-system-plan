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
| **[`MODEL-EFFORT-COST-ANALYSIS.md`](./MODEL-EFFORT-COST-ANALYSIS.md)** | Deep research & cost-optimization pyramid across **`GPT-6-Luna` (`low`/`medium`/`high`/`max`)**, **`GPT-6.1-Terra` (`low`/`medium`/`high`)**, and **`GPT-6.1-Sol` (`low`/`medium`/`high`)** — showing how **~75% of work runs on `Luna`** (smallest/cheapest Moon worker), **~19% on `Terra`** (mid-tier Earth engineer), and **only ~6% on `Sol`** (flagship Sun model: `Sol (low)` as Lead Orchestrator/Coordinator, `Sol (medium)` for high-risk reviews, and `Sol (high)` on only 2 apex tasks). |
| **[`COMPONENT-MATRIX.md`](./COMPONENT-MATRIX.md)** | Complete file-by-file inventory of all **56 Base UI primitives**, **49 App Widgets**, **11 EvilCharts**, **22 Landing Figures**, **18 Full-Page Blocks**, **Shadow DOM HUD**, and **Utilities**, with exact decoupling rules and assigned Model + Effort tiers. |
| **[`TASKS.md`](./TASKS.md)** | Granular wave-by-wave parallel subagent task checklist (`Wave 0` through `Wave 5`) with explicit model and effort badges on every task. |

---

## Cost-Optimized Model & Effort Pyramid Summary (`Luna` < `Terra` < `Sol`)

Following the celestial model size hierarchy (**`Luna` = Moon** smallest/cheapest worker, **`Terra` = Earth** mid-tier engineer, **`Sol` = Sun** largest/most expensive flagship), this plan enforces a strict **Inverted Cost Pyramid**:

| Tier & Model Family | Effort Tiers Used | Share of Work | What It Executes |
| :--- | :--- | :---: | :--- |
| **Tier 1: `GPT-6-Luna`** *(Smallest / Lowest-Cost Worker — "Moon")* | `low`, `medium`, `high`, `max` | **~75%** | • **`low` (~28%)**: Verbatim copies (48 decoupled Base UI primitives, 25 `BrandLogos`, `.woff2` fonts, `ai-workshop.webp`, 2,094-line `mock-data.ts`), barrel `index.ts` files, `meta.json` trees, CLI checks (`tsc`, `vitest`, `shadcn build`, `bun run build`).<br>• **`medium` (~22%)**: Pure TS utilities (`format.ts`, `range.ts`, `trace-timeline.ts`, `payload-messages.ts`, `hooks.ts`), simple leaf widgets (`ModelLogo`, `AgentIcon`, `ProjectIcon`, `CustomerAvatar`, `ToolIcon`, `SpanTypeChip`, `CopyIcon`, `CopyButton`, `Stat`, `RelativeTime`, `SunsetCard`, `NodeFlow`), all 56 UI primitive `.story.tsx` files, and `registry.json` generation.<br>• **`high` (~18%)**: Authoring all **110+ `.mdx` documentation pages**, standard widget/figure `.story.tsx` files, and decoupling moderate single-file widgets (`PageHeader`, `StatCard`, `RangePicker`, `CodeBlock`, `Markdown`, `AnimatedApiKey`, `ContextChip`, `QuotaCardView`, `ThemeSwitcher`, `UserMenuView`, Auth/Onboarding blocks, `OriginalAuthorsBlock`).<br>• **`max` (~7%)**: Deepest worker reasoning — verifying the 8 custom-logic primitives (`Button`, `Badge`, `DRAWER_BUTTON_CLASS`, `Select` auto-label collector, `Sheet` floating variant, `Table` `ResizeObserver` + `interactive` row, `Tooltip`, `Sonner`), `<FoglampLinkProvider>`, all 11 `evilcharts/*` files + `CostBreakdownView` & `ToolBreakdownView`, all **22 Landing Figures**, `DriftingFogCtaBlock`, `CuttingMatFooterBlock`, and `HudSimulatorBlock`. |
| **Tier 2: `GPT-6.1-Terra`** *(Mid-Tier Engineer — "Earth")* | `low`, `medium`, `high` | **~19%** | • **`low` (~4%)**: Fast inter-wave architectural gatekeeper verifying zero `next/*` or `trpc` leaks (and optional ultra-lean wave sub-coordinator).<br>• **`medium` (~8%)**: Wave 0 TanStack Start + `@fumadocs/base-ui` + `@fumadocs/story` + Tailwind v4 CSS token pipeline, `@foglamp/prompts` LCS diff/slot inference, `scan/layout.ts` 2-pass `elkjs` orthogonal layout math, `PayloadView` + `RunExchange` drawers, `PromptProseView` + `PromptVersionsView`, `EvalScores`, `AppShellBlock`, 7 Dashboard Page Blocks, and `FoglampStoryPanel`.<br>• **`high` (~7%)**: Complex multi-component state, DOM measurement, WAAPI & Shadow DOM physics: `DataTable` + `Toolbar` (portal-lifting), `TraceTimeline` waterfall, `FlowMapBlock` + `ScanBoardBlock` (`<BeamPulse>` WAAPI comets + crisp zoom), `ObservabilityGuideBlock` scrollytelling, `SetupBoardBlock` patch editor, `FoggyLauncher` SVG corner shelf + `FoggyWidgetView` rubber-band resize, and `FoglampHUD` Shadow DOM 240Hz spring. |
| **Tier 3: `GPT-6.1-Sol`** *(Flagship Orchestrator & Apex Escalation — "Sun")* | `low`, `medium`, `high` | **~6%** | • **`low` (~2% — Lead Orchestrator / Coordinator)**: Dispatches parallel subagents (`invoke_subagent`), tracks `TASKS.md` state, enforces wave gates, and handles escalations. **Never writes implementation code** (keeping token output tiny while maximizing orchestration reliability).<br>• **`medium` (~2.5%)**: Targeted architectural review and subtle bug resolution on high-risk subsystems (`TraceTimeline`, `FlowMap` WAAPI + `elkjs`, `FoglampHUD` 240Hz spring).<br>• **`high` (~1.5% — ONLY 2 APEX TASKS)**: (1) `Hero3DDemoBlock` 3-Beat `transform-3d` perspective assembly + Beat 0 dark-mode 8-bit sRGB anti-flicker tween + 7-tab/5-detail `DashboardDemo`; (2) Wave 5 Final Whole-Portal Light/Dark Pixel-Parity & Attribution Sign-Off. |

---

## Original Project Links

- **Original Repository**: [https://github.com/foglamp-labs/foglamp](https://github.com/foglamp-labs/foglamp)
- **Original Creator**: **Gustavo Fior** — [GitHub (`@gustavo-fior`)](https://github.com/gustavo-fior) · [Website (`gustavofior.com`)](https://gustavofior.com) · [X (`@heyimgustavo`)](https://x.com/heyimgustavo) · [LinkedIn](https://www.linkedin.com/in/gustavofior)
- **Co-Founder**: **Abdul Haidar** — [LinkedIn](https://www.linkedin.com/in/abdulhdr/)
- **Foglamp Website**: [https://foglamp.dev](https://foglamp.dev)
