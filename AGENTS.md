# Foglamp Design System — Codex Launch & Orchestration Rules

## 1. Original Creator Attribution (Mandatory on Every Surface)
- This design system is extracted **100% AS-IS** from **[Foglamp (`foglamp-labs/foglamp`)](https://github.com/foglamp-labs/foglamp)**, created by **Gustavo Fior ([@gustavo-fior](https://github.com/gustavo-fior) · [gustavofior.com](https://gustavofior.com) · [@heyimgustavo](https://x.com/heyimgustavo) · [LinkedIn](https://www.linkedin.com/in/gustavofior))** and co-founder **Abdul Haidar ([LinkedIn](https://www.linkedin.com/in/abdulhdr/))** at **Foglamp Labs** ([foglamp.dev](https://foglamp.dev)).
- Follow [CREDITS.md](CREDITS.md) without exception: prominently shout out **Gustavo Fior (`@gustavo-fior`)**, **Abdul Haidar**, and **Foglamp Labs** in the root `README.md`, portal homepage hero, `OriginalAuthorsBlock` (`about/page.tsx` AS-IS), `MarketingNavbar`, `CuttingMatFooterBlock`, `FoglampStoryPanel` footer, `registry.json` metadata, and `/docs/credits`.

## 2. Start & Scope
- Read [README.md](README.md), [GOAL.md](GOAL.md), [PLAN.md](PLAN.md), [MODEL-EFFORT-COST-ANALYSIS.md](MODEL-EFFORT-COST-ANALYSIS.md), [COMPONENT-MATRIX.md](COMPONENT-MATRIX.md), [TASKS.md](TASKS.md), [task-index.json](task-index.json), and [AGENT-RUNBOOK.md](AGENT-RUNBOOK.md) before dispatching any task.
- **Visual & Behavioral Immutability ("AS-IS")**: Never break or alter visual classes, the 18 `--custom-shadow*` tokens (`:root` + `.dark`), `@toolwind/corner-shape` progressive squircles (`squircle:*`), dual-mode form controls, `DRAWER_BUTTON_CLASS`, `@base-ui/react` `render` prop polymorphism, `@tabler/icons-react` `*Filled` icons, or animations.

## 3. Permitted Models, Prohibition & 10-Rung Cost Pyramid
- **Prohibited Models**: Never use `gpt-6-astra` or any model outside the three approved families below under any circumstance (including fallbacks).
- **Approved Models Only**:
  1. **`gpt-6-luna` (`low`, `medium`, `high`, `max`)** — **~72% of all work** (`$0.10 / $0.50` per 1M tokens, `180M TPM`).
  2. **`gpt-6.1-terra` (`low`, `medium`, `high`)** — **~21% of all work** (`$1.00 / $5.00` per 1M tokens, >3× faster visual reasoning, natural writing & computer use).
  3. **`gpt-6.1-sol` (`low`, `medium`, `high`)** — **~7% of all work** (`$2.00 / $10.00` per 1M tokens).
- **Coordinator Rule**: Run the root coordinator session on **`gpt-6.1-sol` with `model_reasoning_effort="low"`** (configured in [.codex/config.toml](.codex/config.toml)). **The coordinator never writes bulk implementation code** — it dispatches parallel subagents from [.codex/agents/](.codex/agents/), tracks state in `results/run-state.json`, and enforces gatekeeper checks.
- **Subagent Delegation Rule**: Always set `model` and `reasoning_effort` (or select the exact custom profile from [.codex/agents/](.codex/agents/)) matching [task-index.json](task-index.json). Use `fork_turns="none"` and pass the complete task contract and owned file paths so subagents start with a clean, bounded context.

## 4. Target GitHub Repository Creation & Wave-by-Wave Push Mandate (`donbeave/foglamp-design-system`)
- **Create & Land All Work in `https://github.com/donbeave/foglamp-design-system`**:
  - In **Wave 0 (`Task W0-0.1`)**, create the target GitHub repository under the **`donbeave`** GitHub account if it does not already exist:
    ```sh
    gh repo view donbeave/foglamp-design-system >/dev/null 2>&1 || \
      gh repo create donbeave/foglamp-design-system --public \
        --description "Foglamp Design System (@foglamp/design-system) + shadcn Registry + Fumadocs/BaseUI/TanStack Start/Story Portal — Original UI & Design by Gustavo Fior (@gustavo-fior) & Foglamp Labs"
    ```
  - Initialize the local target repository at `/Users/donbeave/Projects/donbeave/foglamp-design-system` connected to `https://github.com/donbeave/foglamp-design-system.git` on branch `main` (and ensure `.gitignore` excludes `.reference/`, `node_modules/`, `dist/`, `.turbo/`, `.output/`, `.vinxi/`, `.tanstack/`).
- **Wave Gates, Continuous Git Push & Completion**:
  - Execute **Wave 0 → Wave 1 → Wave 2 → Wave 3 → Wave 4 → Wave 5** in order according to [task-index.json](task-index.json).
  - Within each wave, spawn all ready subagents concurrently (up to `max_concurrent_threads_per_session = 8`) with strictly non-overlapping `owned_paths`.
  - **Mandatory Commit & Push After Every Wave**: At the end of **Wave 0 (`W0-0.2`)**, **Wave 1 (`W1-GATE`)**, **Wave 2 (`W2-GATE`)**, **Wave 3 (`W3-GATE`)**, **Wave 4 (`W4-4H`)**, and **Wave 5 (`W5-5.2`)**, stage all target changes, create a clean conventional commit, and run `git push -u origin main` to **`https://github.com/donbeave/foglamp-design-system`** (plus update `results/run-state.json` in `donbeave/foglamp-design-system-plan`).
  - Run `foglamp_terra_low` as the inter-wave gatekeeper after Waves 1, 2, and 3 to verify barrel exports, unit tests, zero `next/*` or `trpc` leakage, and push the verified wave commit to `donbeave/foglamp-design-system`.
  - In Wave 5, run `Task 5.1A` (`foglamp_luna_low` static/build checks), `Task 5.1B` (`foglamp_terra_high` live-browser Computer-Use visual QA), and `Task 5.2` (`foglamp_sol_high` final whole-portal Light/Dark pixel-parity & attribution sign-off), confirm `HEAD` is pushed to `origin/main` on `https://github.com/donbeave/foglamp-design-system` with a clean working tree, and only then emit `<!-- GOAL_COMPLETE -->`.

## Wave 6 extension — superseding earlier instructions

The complete, controlling Wave 6 task contract and exact attribution/header templates are in [GOAL-WAVE-6-FRAMEROCK.md](GOAL-WAVE-6-FRAMEROCK.md). Preserve Waves 0–5 and finish and commit all Wave 5 fixes and W5-5.2 before beginning W6-6A. Wave 5 no longer completes the extended goal. Execute W6-6A → W6-6B → W6-6C → W6-6D → W6-GATE in order; each task has exclusive ownership during its sequential turn, as recorded in task-index.json. The existing foglamp_sol_high final whole-portal sign-off role continues through W6-GATE; this does not authorize unrelated Apex work.

Framerock (`@tailrocks/framerock`) is Tailrocks’ Web UI sibling to Termrock. Supersede earlier package/portal branding, registry publisher/homepage, and OriginalAuthorsBlock/photo requirements as specified in the contract. Preserve all other extracted visual and behavioral work, including all 18 shadows, corner-squircle and corner-bevel, DRAWER_BUTTON_CLASS, Hero 3-beat choreography, TraceTimeline, FlowMap and HUD physics. Maintain prominent truthful credit and Apache-2.0 compliance. Founder photo/file checks apply to project files and generated assets; the ignored, read-only `.reference/foglamp` upstream checkout remains intact. Tailrocks package metadata does not authorize moving or renaming the existing implementation GitHub remote.

W6-GATE verifies provenance against pinned upstream bodies, registry payload notices, public attribution, anti-impersonation and the full build/test suite. The coordinator records accepted task states, commits and pushes both repositories, verifies implementation HEAD equals origin/main and the working tree is clean, then alone emits `<!-- GOAL_COMPLETE -->`.
