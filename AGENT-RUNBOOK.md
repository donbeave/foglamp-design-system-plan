# Codex Multi-Agent Execution Runbook (`AGENT-RUNBOOK.md`)

## 1. Purpose
Use this runbook when executing [GOAL.md](GOAL.md) in **OpenAI Codex** (`codex-cli`, Codex Desktop App, or Codex IDE Extension).
- Read [GOAL.md](GOAL.md) for the complete objective.
- Read [TASKS.md](TASKS.md) and [task-index.json](task-index.json) for task dependencies, owned files, and model/effort assignments.
- Read [COMPONENT-MATRIX.md](COMPONENT-MATRIX.md) for file-by-file decoupling rules.
- Read [CREDITS.md](CREDITS.md) for mandatory attribution to **Gustavo Fior (`@gustavo-fior`)**, **Abdul Haidar**, and **Foglamp Labs (`foglamp-labs/foglamp`)**.

---

## 2. Prohibited Models
Never use `gpt-6-astra` or any non-listed model under any circumstance (including fallbacks, reviews, or escalations). Only these exact model IDs and effort ranges are permitted:
- `gpt-6-luna`: `low`, `medium`, `high`, `max`
- `gpt-6.1-terra`: `low`, `medium`, `high`
- `gpt-6.1-sol`: `low`, `medium`, `high`

---

## 3. Codex Custom Agent Profiles (`.codex/agents/*.toml`)

The root session runs as **`gpt-6.1-sol` (`low` effort)** via [.codex/config.toml](.codex/config.toml) and delegates all implementation, documentation, gatekeeping, and QA work to these 9 project-scoped custom agent profiles:

| Profile Name (`.codex/agents/`) | Model ID | `model_reasoning_effort` | Share of Work | Assigned Role |
| :--- | :--- | :---: | :---: | :--- |
| *(Root Coordinator `/root`)* | `gpt-6.1-sol` | `low` | **~2%** | **Lead Orchestrator**: Spawns parallel subagent waves, tracks `results/run-state.json`, enforces gates. **Never writes implementation code.** |
| [`foglamp_luna_low`](.codex/agents/foglamp_luna_low.toml) | `gpt-6-luna` | `low` | **~26%** | Verbatim copies (48 decoupled Base UI primitives, 25 `BrandLogos`, `.woff2` fonts, `ai-workshop.webp`, 2,094-line `mock-data.ts`), barrel `index.ts` exports, `meta.json` trees, portal homepage route, CLI checks (`tsc`, `vitest`, `shadcn build`, `bun run build`). |
| [`foglamp_luna_medium`](.codex/agents/foglamp_luna_medium.toml) | `gpt-6-luna` | `medium` | **~20%** | Pure TS utilities (`format`, `range`, `trace-timeline`, `payload-messages`, `hooks`), 15 simple leaf widgets, 56 UI primitive `.story.tsx` files, and `registry.json` + `/public/r/*.json` builder. |
| [`foglamp_luna_high`](.codex/agents/foglamp_luna_high.toml) | `gpt-6-luna` | `high` | **~16%** | 100+ component reference `.mdx` pages (`primitives/*`, `widgets/*`, `charts/*`, `figures/*`, `blocks/*`), widget/chart/figure/block `.story.tsx` files, and single-file moderate widget decoupling (`PageHeader`, `StatCard`, `RangePicker`, `CodeBlock`, `Markdown`, `AnimatedApiKey`, `ContextChip`, `QuotaCardView`, `ThemeSwitcher`, `UserMenuView`). |
| [`foglamp_luna_max`](.codex/agents/foglamp_luna_max.toml) | `gpt-6-luna` | `max` | **~10%** | `66.6%` DeepSWE v1.1 worker reasoning at `$0.10/$0.50`: 8 custom-logic primitives (`Button`, `Badge`, `DRAWER_BUTTON_CLASS`, `Select` auto-label, `Sheet` floating, `Table` `ResizeObserver` + `interactive` row, `Tooltip`, `Sonner`), `<FoglampLinkProvider>`, `@foglamp/prompts` LCS diff/slot engine, 11 `evilcharts/*` files, 22 Landing Figures, `DriftingFogCtaBlock`, `CuttingMatFooterBlock`, `HudSimulatorBlock`, Auth/Onboarding blocks, and `OriginalAuthorsBlock`. |
| [`foglamp_terra_low`](.codex/agents/foglamp_terra_low.toml) | `gpt-6.1-terra` | `low` | **~5%** | Fast (>3× speed) inter-wave architectural gatekeeper (`Gatekeeper 1`, `Gatekeeper 2`, `Gatekeeper 3`) + flagship narrative prose writer (`content/docs/index.mdx`, `content/docs/credits.mdx` honoring **Gustavo Fior** `@gustavo-fior`, `content/docs/foundations/*.mdx`). |
| [`foglamp_terra_medium`](.codex/agents/foglamp_terra_medium.toml) | `gpt-6.1-terra` | `medium` | **~9%** | Wave 0 TanStack Start + `@fumadocs/base-ui` + `@fumadocs/story` + Tailwind v4 CSS token pipeline (18 `--custom-shadow*` tokens + `@toolwind/corner-shape` squircles), `scan/layout.ts` 2-pass `elkjs` orthogonal layout math, `FoglampStoryPanel`, `PayloadView` + `RunExchange` drawers, `PromptProseView` + `PromptVersionsView`, `EvalScores`, `AppShellBlock`, and 7 Dashboard Page Blocks. |
| [`foglamp_terra_high`](.codex/agents/foglamp_terra_high.toml) | `gpt-6.1-terra` | `high` | **~7%** | `Terminal-Bench 4.0` (`50.3%` layout-shift mastery) & `Agents' Last Exam` Computer Use: `DataTable` + `Toolbar` (`ResizeObserver` + `motion.div layoutId` header portal-lifting), `ObservabilityGuideBlock` sticky scrollytelling, `SetupBoardBlock` patch editor, and **Wave 5 Live-Browser Computer-Use Visual QA**. |
| [`foglamp_sol_medium`](.codex/agents/foglamp_sol_medium.toml) | `gpt-6.1-sol` | `medium` | **~3.5%** | `75.2%` DeepSWE v1.1 complex imperative & physics subsystems: `TraceTimeline` multi-phase waterfall, `FlowMapBlock` + `ScanBoardBlock` (`<BeamPulse>` WAAPI `offsetPath` comets + crisp zoom) + `PersonalityCard`, `FoggyLauncher` 6px SVG corner notch + `FoggyWidgetView` rubber-band resize, and `FoglampHUD` Shadow DOM 240Hz spring. |
| [`foglamp_sol_high`](.codex/agents/foglamp_sol_high.toml) | `gpt-6.1-sol` | `high` | **~1.5%** *(2 Tasks)* | Strictly reserved for **ONLY 2 Connected-Visual-System Apex Tasks**: (1) `Subagent 3E` `Hero3DDemoBlock` 3-Beat `transform-3d` perspective assembly + Beat 0 dark-mode 8-bit sRGB anti-flicker tween + 7-tab/5-detail `DashboardDemo`; (2) `Task 5.2` Final Whole-Portal Pixel-Parity & Attribution Sign-Off. |

---

## 4. Spawning a Subagent in Codex

When the `gpt-6.1-sol (low)` Coordinator spawns a subagent:
1. Select the custom profile name from `task-index.json` (e.g., `foglamp_luna_low`, `foglamp_luna_max`, `foglamp_terra_medium`, `foglamp_sol_medium`, `foglamp_sol_high`) AND pass explicit `model` and `reasoning_effort` fields if supported by the tool call.
2. Use `fork_turns="none"` so the worker starts with a clean, isolated context window rather than inheriting the coordinator's history.
3. Supply this complete task contract in the spawn message:

~~~text
Profile: [profile name from task-index.json]
Model: [gpt-6-luna | gpt-6.1-terra | gpt-6.1-sol]
Effort: [low | medium | high | max]
Task ID: [e.g., W1-1A]
Task Title: [title from TASKS.md]
Reference Source Path: [exact paths under .reference/foglamp/]
Owned Target Paths: [exact files/directories this worker is authorized to create or edit]
Contract & Decoupling Rules: [exact rules from COMPONENT-MATRIX.md and PLAN.md]
Attribution Requirement: [exact credit requirement for Gustavo Fior @gustavo-fior & Foglamp Labs]
Verification Commands: [exact commands to run before returning]
Do not edit files outside Owned Target Paths.
Return one structured JSON result matching AGENT-RUNBOOK.md Section 5.
~~~

---

## 5. Structured Worker Output Schema

Every subagent must return a concise JSON summary (preventing context pollution in the root coordinator thread):

~~~json
{
  "task_id": "W1-1A",
  "profile": "foglamp_luna_low",
  "model": "gpt-6-luna",
  "effort": "low",
  "changed_paths": [
    "packages/design-system/src/ui/accordion.tsx"
  ],
  "commands": [
    {
      "command": "bun x tsc --noEmit -p packages/design-system/tsconfig.json",
      "exit_code": 0
    }
  ],
  "attribution_verified": true,
  "visual_parity_preserved": true,
  "limits": [],
  "state": "REVIEW"
}
~~~

---

## 6. Checkpoint & State Tracking (`results/run-state.json`)

The Coordinator maintains `results/run-state.json` with task states (`NOT_STARTED`, `READY`, `ACTIVE`, `REVIEW`, `CORRECTION`, `ACCEPTED`, `BLOCKED`), recorded agent IDs, and gatekeeper decisions (`ACCEPT`, `CORRECTION`, `BLOCKED`).
- If a subagent fails to resolve a bundler/type/rendering edge case after 2 attempts, escalate **one rung up** the 10-rung ladder in [MODEL-EFFORT-COST-ANALYSIS.md](MODEL-EFFORT-COST-ANALYSIS.md) and record the escalation in `results/run-state.json`.
