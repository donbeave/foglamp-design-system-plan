# Foglamp Design System — Extraction Architecture, Cost-Optimized Codex Multi-Agent Plan & `/goal` Runbook

> [!IMPORTANT]
> ### Huge Shoutout to the Original Creator of Foglamp!
> **All credit for the extraordinary visual design, component engineering, custom shadow-as-border system, squircle geometry, EvilCharts, TraceTimeline, FlowMap, HUD, and scrollytelling experience goes to [Gustavo Fior (`@gustavo-fior`)](https://github.com/gustavo-fior) ([gustavofior.com](https://gustavofior.com) · [@heyimgustavo](https://x.com/heyimgustavo) · [LinkedIn](https://www.linkedin.com/in/gustavofior)), co-founder [Abdul Haidar](https://www.linkedin.com/in/abdulhdr/), and [Foglamp Labs (`foglamp-labs/foglamp`)](https://github.com/foglamp-labs/foglamp) ([foglamp.dev](https://foglamp.dev)).**
>
> Foglamp is one of the most thoughtfully designed open-source developer tools ever shipped (Apache-2.0). This repository contains the complete technical analysis, component inventory, cost-optimized **OpenAI Codex (`codex-cli`)** multi-agent configuration, and `/goal` master prompt to extract Foglamp's UI **100% AS-IS** into a reusable `shadcn/ui`-style design system (`@foglamp/design-system`) and a **Fumadocs + `@fumadocs/base-ui` + TanStack Start + `@fumadocs/story`** documentation & component workbench portal.

---

## Quick Launch with OpenAI Codex (`codex-cli`)

This repository is pre-configured with project-scoped [`.codex/config.toml`](./.codex/config.toml), 9 custom subagent profiles in [`.codex/agents/*.toml`](./.codex/agents/), [`AGENTS.md`](./AGENTS.md), [`AGENT-RUNBOOK.md`](./AGENT-RUNBOOK.md), and [`task-index.json`](./task-index.json).

Run the entire multi-wave extraction from the repository root with:

```sh
cd /Users/donbeave/Projects/donbeave/foglamp-design-system-plan

# Option 1: Start immediately with GOAL.md passed as the initial prompt
codex-openai-zhokhov-yolo --strict-config -m gpt-6.1-sol -c 'model_reasoning_effort="low"' "$(cat GOAL.md)"

# Option 2: Open interactive TUI first, then run `/goal Follow GOAL.md end-to-end`
codex-openai-zhokhov-yolo --strict-config -m gpt-6.1-sol -c 'model_reasoning_effort="low"'
```

- **Root Orchestrator Session**: Runs on `gpt-6.1-sol` at `low` reasoning effort (~2% of total work; `-32%` factual error reduction & `2.1%` broken-tool disclosure rate) and **never writes bulk code itself**.
- **Default Subagent Fallback**: Configured in `.codex/config.toml` as `default_subagent_model = "gpt-6-luna"` and `default_subagent_reasoning_effort = "low"`, with up to `8` concurrent subagent threads (`max_concurrent_threads_per_session = 8`).
- **Target GitHub Repository & Continuous Wave Push**: In Wave 0 (`W0-0.1`), Codex creates **`https://github.com/donbeave/foglamp-design-system`** under `@donbeave` (local checkout `/Users/donbeave/Projects/donbeave/foglamp-design-system`) and automatically commits + runs `git push origin main` after **every completed wave** (`W0-0.2`, `W1-GATE`, `W2-GATE`, `W3-GATE`, `W4-4H`, and `W5-5.2`) so all work is durably landed on GitHub.

---

## Pre-Configured `.codex/agents/*.toml` Profiles

| Custom Agent Profile (`name`) | File | Model (`model`) | Effort (`model_reasoning_effort`) | Share of Work | Assigned Role |
| :--- | :--- | :--- | :---: | :---: | :--- |
| *(Root Session)* | [`.codex/config.toml`](./.codex/config.toml) | `gpt-6.1-sol` | `low` | **~2%** | Lead Orchestrator / Root Coordinator (`/root`). Dispatches waves & verifies gates; never writes bulk code. |
| **`foglamp_luna_low`** | [`.codex/agents/foglamp_luna_low.toml`](./.codex/agents/foglamp_luna_low.toml) | `gpt-6-luna` | `low` | **~26%** | Verbatim file copies (48 Base UI primitives, 25 `BrandLogos`, fonts, `mock-data.ts`), barrel `index.ts`, `meta.json` trees, homepage route assembly, CLI verification (`tsc`, `vitest`, `shadcn build`, `bun run build`). |
| **`foglamp_luna_medium`** | [`.codex/agents/foglamp_luna_medium.toml`](./.codex/agents/foglamp_luna_medium.toml) | `gpt-6-luna` | `medium` | **~20%** | Pure TS utilities (`format.ts`, `range.ts`, `trace-timeline.ts`, `payload-messages.ts`, `hooks.ts`), 16 leaf widgets, all 56 UI primitive `.story.tsx` files, and `registry.json` generation. |
| **`foglamp_luna_high`** | [`.codex/agents/foglamp_luna_high.toml`](./.codex/agents/foglamp_luna_high.toml) | `gpt-6-luna` | `high` | **~16%** | 100+ component reference `.mdx` pages, widget/chart/block `.story.tsx` files, and single-file moderate widget decoupling (`PageHeader`, `StatCard`, `RangePicker`, `CodeBlock`, `Markdown`, `AnimatedApiKey`, `ContextChip`, `QuotaCardView`, `ThemeSwitcher`, `UserMenuView`). |
| **`foglamp_luna_max`** | [`.codex/agents/foglamp_luna_max.toml`](./.codex/agents/foglamp_luna_max.toml) | `gpt-6-luna` | `max` | **~10%** | `66.6%` DeepSWE v1.1 at 1/10th `Terra`'s price: 8 custom-logic primitives, `<FoglampLinkProvider>`, `@foglamp/prompts` LCS diff/slot engine, all 11 `evilcharts/*` files + Breakdowns, all **22 Landing Figures**, `DriftingFogCtaBlock`, `CuttingMatFooterBlock`, `HudSimulatorBlock`, Auth blocks, and `OriginalAuthorsBlock`. |
| **`foglamp_terra_low`** | [`.codex/agents/foglamp_terra_low.toml`](./.codex/agents/foglamp_terra_low.toml) | `gpt-6.1-terra` | `low` | **~5%** | Flagship narrative prose (`index.mdx`, `credits.mdx` tribute to **Gustavo Fior** `@gustavo-fior`, `foundations/*.mdx`) and fast (>3× faster than `Sol`) inter-wave gatekeeper checks (`W1-GATE`, `W2-GATE`, `W3-GATE`). |
| **`foglamp_terra_medium`** | [`.codex/agents/foglamp_terra_medium.toml`](./.codex/agents/foglamp_terra_medium.toml) | `gpt-6.1-terra` | `medium` | **~9%** | `MMMU-Pro` visual token harmony: Wave 0 TanStack Start + `@fumadocs/base-ui` + `@fumadocs/story` + Tailwind v4 CSS tokens (`18` `--custom-shadow*` tokens + `@toolwind/corner-shape` squircles), `scan/layout.ts` 2-pass `elkjs` layout engine, `FoglampStoryPanel`, `AppShellBlock`, and 7 Dashboard Page Blocks. |
| **`foglamp_terra_high`** | [`.codex/agents/foglamp_terra_high.toml`](./.codex/agents/foglamp_terra_high.toml) | `gpt-6.1-terra` | `high` | **~7%** | `Terminal-Bench 4.0` layout-shift mastery & `Agents' Last Exam` Computer Use: `DataTable` + `Toolbar` portal-lifting, `PayloadView` + `RunExchange` drawers, `PromptVersionsView`, `EvalScores`, `ObservabilityGuideBlock` scrollytelling, `SetupBoardBlock`, and **Wave 5 Live-Browser Computer-Use Visual QA**. |
| **`foglamp_sol_medium`** | [`.codex/agents/foglamp_sol_medium.toml`](./.codex/agents/foglamp_sol_medium.toml) | `gpt-6.1-sol` | `medium` | **~3.5%** | `75.2%` DeepSWE v1.1 physics & SVG/WAAPI subsystems: `TraceTimeline` waterfall, `FlowMapBlock` + `ScanBoardBlock` (`<BeamPulse>` WAAPI comets + crisp zoom), `FoggyLauncher` carved 6px SVG corner notch + `FoggyWidgetView` rubber-band resize, and `FoglampHUD` Shadow DOM 240Hz spring. |
| **`foglamp_sol_high`** | [`.codex/agents/foglamp_sol_high.toml`](./.codex/agents/foglamp_sol_high.toml) | `gpt-6.1-sol` | `high` | **~1.5%** | **Strictly reserved for ONLY 2 Apex Tasks**: (`W3-3E`) `Hero3DDemoBlock` 3-Beat `transform-3d` perspective assembly + Beat 0 dark-mode 8-bit sRGB anti-flicker tween + 7-tab/5-detail `DashboardDemo`, and (`W5-5.2`) Final Whole-Portal Connected Visual System & Attribution Sign-Off. |

---

## Repository Contents

| Document | Purpose |
| :--- | :--- |
| **[`GOAL.md`](./GOAL.md)** | Ready-to-run **`/goal ... /goal` master prompt** for `codex --strict-config -m gpt-6.1-sol -c 'model_reasoning_effort="low"' "$(cat GOAL.md)"`. |
| **[`AGENTS.md`](./AGENTS.md)** | Automatically loaded by Codex on startup; defines workspace non-negotiables, creator attribution mandates, visual invariants, and custom subagent routing. |
| **[`AGENT-RUNBOOK.md`](./AGENT-RUNBOOK.md)** | Step-by-step Codex orchestration runbook, parallel wave dispatch instructions, file-ownership isolation, and 1-step escalation protocol. |
| **[`task-index.json`](./task-index.json)** | Machine-readable wave & task index (`W0-0.1` through `W5-5.2`) with `agent_profile`, `model`, `reasoning_effort`, `depends_on`, and `outputs`. |
| **[`.codex/config.toml`](./.codex/config.toml)** | Project-scoped Codex CLI configuration (`gpt-6.1-sol` @ `low` root, `gpt-6-luna` @ `low` default subagent, `8` concurrent threads). |
| **[`.codex/agents/*.toml`](./.codex/agents/)** | 9 custom Codex subagent definitions covering every allowed `(model, reasoning_effort)` rung. |
| **[`CREDITS.md`](./CREDITS.md)** | Dedicated tribute & mandatory attribution guide for **Gustavo Fior (`@gustavo-fior`)**, **Abdul Haidar**, and **Foglamp Labs (`foglamp-labs/foglamp`)** across every surface of the design system and documentation portal. |
| **[`PLAN.md`](./PLAN.md)** | Deep architectural & visual DNA analysis of `foglamp-labs/foglamp` (5 visual signatures, 18 `--custom-shadow*` tokens, progressive squircles, dual-mode form controls, 3D entrance choreography) and portal architecture. |
| **[`MODEL-EFFORT-COST-ANALYSIS.md`](./MODEL-EFFORT-COST-ANALYSIS.md)** | Deep research & cost-optimization pyramid backed by official OpenAI pricing & benchmarks across **`GPT-6-Luna` (`$0.10/$0.50`, `low`/`medium`/`high`/`max`)**, **`GPT-6.1-Terra` (`$1.00/$5.00`, `low`/`medium`/`high`)**, and **`GPT-6.1-Sol` (`$2.00/$10.00`, `low`/`medium`/`high`)**, achieving **~90% total API cost savings (`~$14.80` vs `~$145.00`)**. |
| **[`COMPONENT-MATRIX.md`](./COMPONENT-MATRIX.md)** | Complete file-by-file inventory of all **56 Base UI primitives**, **49 App Widgets**, **11 EvilCharts**, **22 Landing Figures**, **18 Full-Page Blocks**, **Shadow DOM HUD**, and **Utilities**, with exact decoupling rules and assigned Model + Effort tiers. |
| **[`TASKS.md`](./TASKS.md)** | Granular wave-by-wave parallel subagent task checklist (`Wave 0` through `Wave 5`) with explicit model and effort badges on every task. |

---

## Original Project Links

- **Original Repository**: [https://github.com/foglamp-labs/foglamp](https://github.com/foglamp-labs/foglamp)
- **Original Creator**: **Gustavo Fior** — [GitHub (`@gustavo-fior`)](https://github.com/gustavo-fior) · [Website (`gustavofior.com`)](https://gustavofior.com) · [X (`@heyimgustavo`)](https://x.com/heyimgustavo) · [LinkedIn](https://www.linkedin.com/in/gustavofior)
- **Co-Founder**: **Abdul Haidar** — [LinkedIn](https://www.linkedin.com/in/abdulhdr/)
- **Foglamp Website**: [https://foglamp.dev](https://foglamp.dev)
