/goal Build the complete, reusable **Foglamp Design System** (`@foglamp/design-system` + `shadcn/ui`-compatible Registry) and its interactive **Documentation & Component Workbench Portal** (`Fumadocs` + `@fumadocs/base-ui` + `TanStack Start` + `@fumadocs/story`) extracted directly from `https://github.com/foglamp-labs/foglamp`.

## 0. READ YOUR CODEX RUNBOOK & INDEX FIRST
Before taking any action, read these local repository files:
1. `AGENTS.md` — Global workspace rules, creator attribution mandate, AS-IS visual invariants, and Codex custom agent profiles.
2. `AGENT-RUNBOOK.md` — Codex multi-agent orchestration rules, how to dispatch custom `.codex/agents/*.toml` profiles (`foglamp_luna_low`, `foglamp_luna_medium`, `foglamp_luna_high`, `foglamp_luna_max`, `foglamp_terra_low`, `foglamp_terra_medium`, `foglamp_terra_high`, `foglamp_sol_medium`, `foglamp_sol_high`), file-ownership isolation, and 1-step escalation ladder.
3. `task-index.json` — Machine-readable wave/task manifest mapping every task ID to its exact Codex `agent_profile`, `model`, `reasoning_effort`, and `depends_on` graph.
4. `PLAN.md`, `COMPONENT-MATRIX.md`, `TASKS.md`, `CREDITS.md`, and `MODEL-EFFORT-COST-ANALYSIS.md` — Full component inventory, decoupling rules, and visual contracts.

---

## 1. NON-NEGOTIABLE CORE MANDATES

### 1.1 Target GitHub Repository Creation & Wave-by-Wave Push Mandate (`donbeave/foglamp-design-system`)
1. **Create & Land All Work in `https://github.com/donbeave/foglamp-design-system`**:
   - Create the target repository under the **`donbeave`** GitHub account if it does not already exist:
     ```sh
     gh repo view donbeave/foglamp-design-system >/dev/null 2>&1 || \
       gh repo create donbeave/foglamp-design-system --public \
         --description "Foglamp Design System (@foglamp/design-system) + shadcn Registry + Fumadocs/BaseUI/TanStack Start/Story Portal — Original UI & Design by Gustavo Fior (@gustavo-fior) & Foglamp Labs"
     ```
   - Land the entire extracted workspace (`packages/design-system`, `packages/registry`, `apps/docs`, `README.md`, `CREDITS.md`, `package.json`, `turbo.json`, `.gitignore`) into `/Users/donbeave/Projects/donbeave/foglamp-design-system` connected to `https://github.com/donbeave/foglamp-design-system.git` (`main` branch). Ensure `.gitignore` excludes `.reference/`, `node_modules/`, `dist/`, `.turbo/`, `.output/`, `.vinxi/`, and `.tanstack/`.
2. **Continuous Commit & Push After Every Wave**:
   - At the end of **Wave 0 (`W0-0.2`)**, **Wave 1 (`W1-GATE`)**, **Wave 2 (`W2-GATE`)**, **Wave 3 (`W3-GATE`)**, **Wave 4 (`W4-4H`)**, and **Wave 5 (`W5-5.2`)**, stage all target changes in `/Users/donbeave/Projects/donbeave/foglamp-design-system`, create a clean conventional commit, and run `git push -u origin main` so every wave's work is pushed and landed in `https://github.com/donbeave/foglamp-design-system`.

### 1.2 Prominent Shoutout & Attribution to the Original Creator (Everywhere!)
1. **Honor the Original Creator**: This interface was designed and built by **Gustavo Fior** ([@gustavo-fior](https://github.com/gustavo-fior) · [gustavofior.com](https://gustavofior.com) · [@heyimgustavo](https://x.com/heyimgustavo) · [LinkedIn](https://www.linkedin.com/in/gustavofior)) and co-founder **Abdul Haidar** ([LinkedIn](https://www.linkedin.com/in/abdulhdr/)) at **[Foglamp Labs (`foglamp-labs/foglamp`)](https://github.com/foglamp-labs/foglamp)** ([foglamp.dev](https://foglamp.dev)).
2. **Visible Attribution on Every Surface**:
   - **Root `README.md` & `CREDITS.md`**: Place a prominent top callout banner and dedicated section shouting out **Gustavo Fior (`@gustavo-fior`)**, **Abdul Haidar**, and **Foglamp Labs** for creating such an extraordinary open-source project and visual design.
   - **Portal Homepage (`apps/docs/src/routes/index.tsx`)**: Include a highly visible credit pill in the Hero and embed `<OriginalAuthorsBlock />` (extracted AS-IS from `apps/web/src/app/(marketing)/about/page.tsx` with Gustavo Fior & Abdul Haidar's founder cards and Curitiba story).
   - **Portal Navbar & Footer (`MarketingNavbar` & `CuttingMatFooterBlock`)**: Display a visible *"Design by Gustavo Fior (@gustavo-fior) · Foglamp Labs"* badge with direct links to `https://github.com/foglamp-labs/foglamp`, `https://gustavofior.com`, and `https://foglamp.dev`.
   - **Story Workbench (`FoglampStoryPanel`)**: Display a subtle *"Crafted by @gustavo-fior · foglamp-labs/foglamp"* attribution link in the bottom toolbar of every interactive component story.
   - **Fumadocs Sidebar (`content/docs/credits.mdx` & `index.mdx`)**: Pin a top-level **"Credits & Original Creator"** page in the documentation sidebar and include a shoutout callout at the top of `index.mdx`.

### 1.2 Visual & Behavioral Immutability ("AS-IS" Mandate)
1. **Zero Visual Drift**: Every extracted primitive, widget, chart, block, figure, and HUD element MUST look, animate, and behave **100% AS-IS** compared to `foglamp-labs/foglamp` in both **Light Mode** and **Dark Mode**.
2. **Shadow-as-Border System**: Never replace `--custom-shadow*` tokens with CSS `border`, `border-*`, or `divide-*`. All 18 custom shadow tokens (`--custom-shadow`, `--custom-shadow-chrome`, `--custom-shadow-lifted`, `--custom-outline-shadow`, `--custom-shadow-primary`, `--custom-shadow-secondary`, `--custom-shadow-destructive`, and the 11 chromatic shadow tokens `green`, `blue`, `amber`, `orange`, `emerald`, `rose`, `red`, `slate`, `violet`, `fuchsia`, `sky`) must be preserved verbatim in `:root` and `.dark`.
3. **Progressive Squircle Geometry**: Preserve `@plugin "@toolwind/corner-shape"` and `@custom-variant squircle (@supports (corner-shape: squircle))` across all surfaces (`rounded-2xl squircle:rounded-[40px] corner-squircle`, `rounded-lg squircle:rounded-3xl corner-squircle`, `rounded-md squircle:rounded-2xl corner-squircle`, etc.), while keeping `Button`, `Badge`, `SearchInput`, and `Menubar` as circular pills (`rounded-full`).
4. **Dual-Mode Form Controls & Drawer Buttons**:
   - Form controls (`Input`, `Textarea`, `SelectTrigger`, `InputGroup`, `NativeSelect`, `ComboboxChips`, `InputOTPSlot`, `Toggle` outline, `ToggleGroup`, `Kbd`) must use `shadow-(--custom-shadow)` in light mode and `dark:shadow-none dark:border-[0.5px] dark:border-border/50 dark:bg-input/30` in dark mode.
   - Preserve `DRAWER_BUTTON_CLASS` (`button-styles.ts`) for secondary buttons on recessed drawer surfaces (`bg-background shadow-(--custom-outline-shadow)` in light mode, `dark:bg-secondary dark:shadow-[var(--custom-shadow-secondary)]` in dark mode).
5. **Base UI Polymorphism**: All primitives use `@base-ui/react` (`^1.4.0`) and the `render={<Element />}` prop pattern. Never introduce Radix UI or `asChild`.
6. **Typography & Iconography**:
   - Bundle canonical self-hosted `InterVariable.woff2` and `InterVariable-Italic.woff2` (`--font-sans`), `Geist Mono` (`--font-geist-mono` / `--font-mono`), and `Host Grotesk` (`--font-host-grotesk` / `--font-display`).
   - Use `@tabler/icons-react` (`^3.41.1`) preferring `*Filled` icons at `size-3.5` default (`size-3` compact, `size-4` emphasis) plus the 25 custom vector `BrandLogos` and `ModelLogo`.

---

### 1.3 Official OpenAI Cost-Optimized Model & Effort Pyramid (`Luna` < `Terra` < `Sol` — Strict Codex Enforcement)
All tasks, steps, and Codex subagent invocations MUST be executed **exclusively** using the 9 custom Codex agent profiles in `.codex/agents/*.toml` (never use `gpt-6-astra` or any other model):
- **`GPT-6-Luna` (`low`, `medium`, `high`, `max`)** — **~72% of all work** *(`$0.10/$0.50` per 1M tokens, `180M TPM` — 20× cheaper than Sol; `66.6%` DeepSWE v1.1 at `max` effort)*
- **`GPT-6.1-Terra` (`low`, `medium`, `high`)** — **~21% of all work** *(`$1.00/$5.00` per 1M tokens, >3× faster than Sol — specialized in `MMMU-Pro` visual reasoning, `Terminal-Bench 4.0` layout-shift fixes, clear natural writing, and `Agents' Last Exam` Computer Use)*
- **`GPT-6.1-Sol` (`low`, `medium`, `high`)** — **~7% of all work** *(`$2.00/$10.00` per 1M tokens — `Sol (low)` as native `multi_agent` Root Orchestrator with `2.1%` tool-error rate & `-32%` factual errors; `Sol (medium)` for `75.2%` DeepSWE physics subsystems; `Sol (high)` on ONLY 2 apex connected-visual-system tasks!)*

#### Exact 10-Rung Codex Agent Profile Assignment Rules:
1. **`GPT-6.1-Sol (low)` (`.codex/config.toml` Root Session — ~2% of work)**:
   - You (the Root Codex session) act solely as the **Lead Orchestrator / Root Coordinator**. Dispatch parallel subagents using the `.codex/agents/foglamp_*.toml` profiles, track wave completion against `task-index.json` and `TASKS.md`, enforce gatekeeper checks, and manage escalations. **NEVER write bulk implementation code in the root session.**
2. **`foglamp_luna_low` (`gpt-6-luna`, `low` — ~26% of work)**:
   - Use for verbatim file copies (48 zero-coupling Base UI primitives, 25 `BrandLogos`, `.woff2` fonts, `ai-workshop.webp`, 2,094-line `mock-data.ts`), barrel `index.ts` exports, `meta.json` navigation trees, portal homepage assembly, and running CLI checks (`tsc --noEmit`, `vitest run`, `shadcn build`, `bun run build`).
3. **`foglamp_luna_medium` (`gpt-6-luna`, `medium` — ~20% of work)**:
   - Use for extracting pure TS utilities (`format.ts`, `range.ts`, `trace-timeline.ts`, `payload-messages.ts`, `hooks.ts`), simple leaf widgets (`ModelLogo`, `BrandMark`, `Logo`, `AgentIcon`, `ProjectIcon` `<Image>`→`<img>`, `CustomerAvatar`, `ToolIcon`, `SpanTypeChip`, `CopyIcon`, `CopyButton`, `Stat`, `RelativeTime`, `SunsetCard`, `NodeFlow`), generating all 56 UI primitive `.story.tsx` files, and building `registry.json`.
4. **`foglamp_luna_high` (`gpt-6-luna`, `high` — ~16% of work)**:
   - Use for authoring the **100+ component reference `.mdx` pages** (`primitives/*`, `widgets/*`, `charts/*`, `figures/*`, `blocks/*`), `.story.tsx` files for widgets/charts/figures/blocks, and decoupling single-file moderate widgets (`ContextChip`, `ModelChip`, `PromptVersionChip`, `CodeBlock` Shiki singleton, `Markdown`, `AnimatedApiKey`, `PageHeader`, `StatCard` with `TickerValue`/`CardSparkline`/`PillMeter`, `RangePicker`, `RangeProvider`, `ProjectProvider`, `QuotaCardView`, `ThemeSwitcher`, `UserMenuView`).
5. **`foglamp_luna_max` (`gpt-6-luna`, `max` — ~10% of work, `66.6%` DeepSWE v1.1 at 1/10th Terra's Token Rate)**:
   - Push `Luna` to `max` effort before paying `10×` more for `Terra`! Use for verifying the 8 custom-logic primitives (`Button`, `Badge`, `DRAWER_BUTTON_CLASS`, `Select` recursive label collector, `Sheet` floating variant, `Table` `ResizeObserver` + `interactive` row, `Tooltip`, `Sonner`), `<FoglampLinkProvider>`, `@foglamp/prompts` (LCS `diffLines`, `inferVersions`, `slotValues` + unit tests), all 11 `evilcharts/*` files + `CostBreakdownView` & `ToolBreakdownView`, all **22 Landing Figures** (`FigureKit22Block`), `DriftingFogCtaBlock`, `CuttingMatFooterBlock`, `HudSimulatorBlock`, Auth/Onboarding blocks, and `OriginalAuthorsBlock`.
6. **`foglamp_terra_low` (`gpt-6.1-terra`, `low` — ~5% of work)**:
   - Use to author & polish the flagship narrative docs (`content/docs/index.mdx`, `content/docs/credits.mdx` honoring **Gustavo Fior** `@gustavo-fior` & **Foglamp Labs**, and `content/docs/foundations/*.mdx`), plus fast (>3× faster than `Sol`) inter-wave gatekeeper checks verifying zero `next/*` or `trpc` leakage.
7. **`foglamp_terra_medium` (`gpt-6.1-terra`, `medium` — ~9% of work)**:
   - Use in Wave 0 to wire TanStack Start + `@fumadocs/base-ui` + `@fumadocs/story` + Tailwind v4 CSS tokens (`globals.css` 18 `--custom-shadow*` tokens + `@toolwind/corner-shape` squircles + `effects.css`), in Wave 1D/1E to extract `scan/layout.ts` (2-pass `elkjs` orthogonal layout engine + `SNAP_TOL = 20px` row snap + `BAND_KEEP = 72px` empty-band squeeze) and `FoglampStoryPanel`, and in Wave 2/3 for `PayloadView` + `ClampedBody` + `RunExchange` drawers, `PromptProseView` (`SlotChip`) + `PromptVersionsView` (`TemplateDiff`), `EvalScores`, `AppShellBlock`, and the 7 Dashboard Page Blocks.
8. **`foglamp_terra_high` (`gpt-6.1-terra`, `high` — ~7% of work)**:
   - Use for `DataTable` + `Toolbar` (`ResizeObserver` + `motion.div layoutId` header portal-lifting + `useFilterGroupItem` + `FilterSelect` typeahead), `ObservabilityGuideBlock` ("Warm Paper Field Guide" sticky scrollytelling), `SetupBoardBlock` (sparse `PlanEdits` editor), and **Wave 5 Automated Live-Browser Computer-Use Visual QA** (>3× faster than `Sol`).
9. **`foglamp_sol_medium` (`gpt-6.1-sol`, `medium` — ~3.5% of work)**:
   - Use for `TraceTimeline` (multi-phase LLM bars, `groupRepeatedSiblings` `×N` folding, imperative hover cursor, `1.2s` reveal), `FlowMapBlock` + `ScanBoardBlock` (`<BeamPulse>` WAAPI `offsetPath` comets, imperative `hitRings`, `<AgentBeam>`, crisp zoom, BFS trace), and `FoggyLauncher` (SVG `NOTCH_FILL`/`NOTCH_EDGE` carved corner shelf) + `FoggyWidgetView` (`rubberBand` resize) + `FoglampHUD` (Shadow DOM 240Hz `useSizeSpring` + sub-pixel `translateX` timeline).
10. **`foglamp_sol_high` (`gpt-6.1-sol`, `high` — ~1.5% of work, Strictly Reserved for ONLY 2 Connected-Visual-System Apex Tasks)**:
    - **Apex Task 1 (`W3-3E`)**: `Hero3DDemoBlock` (`hero.tsx`, `hero-demo.tsx`, `entrance.ts`, `piece.tsx`, and the 7-tab / 5-detail interactive `DashboardDemo` with 3-Beat `transform-3d` perspective assembly, Beat 0 dark-mode 8-bit sRGB anti-flicker tween, and `ENTRANCE_TABLE` separated cell shadows).
    - **Apex Task 2 (`W5-5.2`)**: Wave 5 Final Whole-Portal Connected Visual System, Light/Dark Pixel-Parity & Attribution Sign-Off.

**Dynamic Escalation Rule**: Always start every subagent at its assigned profile in `task-index.json` (`Luna` first!). Only escalate **one step up** if a subagent fails to resolve a bundler/type/rendering edge case after 2 attempts.

---

## 2. STEP-BY-STEP PARALLEL EXECUTION WAVES (Orchestrated by Root `GPT-6.1-Sol (low)`)

### WAVE 0: Target GitHub Repo (`donbeave/foglamp-design-system`), Source Clone & Workspace Initialization
1. **Task `W0-0.1` (`foglamp_luna_low` — `gpt-6-luna` @ `low`)**:
   - Create `https://github.com/donbeave/foglamp-design-system` under `@donbeave` via `gh repo view donbeave/foglamp-design-system || gh repo create donbeave/foglamp-design-system --public --description "Foglamp Design System (@foglamp/design-system) + shadcn Registry + Fumadocs/BaseUI/TanStack Start/Story Portal — Original UI & Design by Gustavo Fior (@gustavo-fior) & Foglamp Labs"`.
   - Initialize `/Users/donbeave/Projects/donbeave/foglamp-design-system` (`git init -b main`, `git remote add origin https://github.com/donbeave/foglamp-design-system.git`) with `.gitignore` excluding `.reference/`, `node_modules/`, `dist/`, `.turbo/`, `.output/`, `.vinxi/`, `.tanstack/`.
   - Clone `https://github.com/foglamp-labs/foglamp` into `/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp`.
   - Scaffold the Bun + Turborepo workspace (`package.json`, `turbo.json`, `tsconfig.base.json`, `packages/design-system`, `packages/registry`, `apps/docs`, `CREDITS.md`, `README.md`).
   - Copy static assets (`InterVariable.woff2`, `InterVariable-Italic.woff2`, `public/illustrations/ai-workshop.webp`, `/avatar.jpg`, `/abdul-haidar.jpg`) and `apps/web/src/components/marketing/demo/mock-data.ts` (`2,094` lines).
2. **Task `W0-0.2` (`foglamp_terra_medium` — `gpt-6.1-terra` @ `medium`)**:
   - Configure `packages/design-system/src/styles/globals.css` and `effects.css` with all 18 `--custom-shadow*` tokens (`:root` + `.dark`), `@plugin "@toolwind/corner-shape"`, `@custom-variant squircle (@supports (corner-shape: squircle))`, keyframes, autofill neutralizer, and thin scrollbars.
   - Configure `apps/docs` (`vite.config.ts`, `source.config.ts`, `src/routes/__root.tsx`, `src/styles/app.css`) with **TanStack Start** (`@tanstack/react-start`), **Fumadocs Base UI** (`"fumadocs-ui": "npm:@fumadocs/base-ui@latest"`, `RootProvider` from `fumadocs-ui/provider/tanstack`), and **Fumadocs Story** (`@fumadocs/story/vite`).
   - Stage, commit (`feat(wave-0): initialize monorepo, Tailwind v4 tokens, and TanStack Start + Fumadocs portal`), and **`git push -u origin main` to `https://github.com/donbeave/foglamp-design-system`**.

---

### WAVE 1: Foundations, Utilities, Engines & 56 UI Primitives (Launch 5 Parallel Subagents + 1 Gatekeeper)

- **Subagent `W1-1A` (`foglamp_luna_low` — `gpt-6-luna` @ `low`) — 48 Pure Base UI Primitives & Brand Logos**:
  - Copy the 48 zero-coupling Base UI primitives from `.reference/foglamp/packages/ui/src/components/` into `packages/design-system/src/ui/`.
  - Copy `brand-logos.tsx` (25 SVGs), `hooks/use-mobile.ts`, `hooks/use-copied.ts`, and `lib/utils.ts` (`cn`).

- **Subagent `W1-1B` (`foglamp_luna_max` — `gpt-6-luna` @ `max`) — 8 Custom-Logic Primitives, `<FoglampLinkProvider>` & `@foglamp/prompts` Diff/Slot Engine**:
  - Extract and verify `button.tsx` (7 variants, 8 sizes, `<span>` child wrapping, `nativeButton` heuristic), `badge.tsx` (14 variants + `<span>` wrapping), `button-styles.ts` (`DRAWER_BUTTON_CLASS`), `select.tsx` (recursive `collectSelectItemLabels`), `sheet.tsx` (`variant="floating"`), `table.tsx` (`ResizeObserver` overflow + `interactive` row hover border suppression), `tooltip.tsx` (non-inverted `bg-popover`), and `sonner.tsx`.
  - Create `packages/design-system/src/lib/link-context.tsx` (`<FoglampLinkProvider>`, `<FoglampLink>`).
  - Extract `packages/prompts/src/{diff,normalize,infer,slots,index}.ts` (+ unit tests) into `packages/design-system/src/lib/prompts/`.

- **Subagent `W1-1C` (`foglamp_luna_medium` — `gpt-6-luna` @ `medium`) — Formatters, Time Ranges, Timeline Math, Payload Normalizer & Leaf Widgets**:
  - Extract `lib/format.ts` (14 cached formatters), `lib/range.ts` (9 presets + `customRange` + `exactRange`), `lib/trace-timeline.ts` (`toMs`, `orderSpans`, `computeWindow`), `lib/payload-messages.ts` (+ `payload-messages.test.ts`), and `hooks/use-app-hooks.ts`.
  - Extract leaf widgets: `model-logo.tsx`, `brand-mark.tsx`, `logo.tsx`, `scan/brand.tsx`, `agent-icon.tsx`, `project-icon.tsx` (`<Image>` → `<img>`), `customer-avatar.tsx`, `tool-icon.tsx`, `span-type.tsx`, `preset-meta.ts`, `copy-icon.tsx`, `copy-button.tsx`, `stat.tsx`, `relative-time.tsx`, `sunset-card.tsx`, `node-flow.tsx`.

- **Subagent `W1-1D` (`foglamp_terra_medium` — `gpt-6.1-terra` @ `medium`) — Scan 2-Pass `elkjs` Layout Engine & Contract Types**:
  - Extract `components/scan/{fold-graph,layout,diff,personality,favicon}.ts` and contract types (`packages/contracts/src/{scan,alerts,instrumentation,v1}.ts`) into `packages/design-system/src/lib/scan/` and `lib/types.ts`.

- **Subagent `W1-1E` (`foglamp_terra_medium` — `gpt-6.1-terra` @ `medium`) — Custom `FoglampStoryPanel` Workbench with Creator Attribution**:
  - Build `apps/docs/src/components/story-panel.tsx` and `apps/docs/src/lib/story.tsx` using `defineStoryFactory({ WithControl: FoglampStoryPanel })` from `@fumadocs/story/vite/client`.
  - Include variant preset tabs, live prop controls (`useStoryArgs()`), surface background toggle (`Default`, `Muted`, `Dark Lift`, plus isolated Light/Dark preview toggle), `npx shadcn@latest add` CLI command bar, and a visible footer badge: *"Original Design by Gustavo Fior (@gustavo-fior) · foglamp-labs/foglamp"*.

- **Gatekeeper `W1-GATE` (`foglamp_terra_low` — `gpt-6.1-terra` @ `low`)**:
  - Verify all Wave 1 exports, run unit tests (`payload-messages`, `prompts`), confirm zero `next/*` or `trpc` imports in `packages/design-system`, commit all Wave 1 work, and **`git push origin main` to `https://github.com/donbeave/foglamp-design-system`**.

---

### WAVE 2: Application Widgets, EvilCharts & Live HUD (Launch 5 Parallel Subagents + 1 Gatekeeper)

- **Subagent `W2-2A` (`foglamp_luna_max` — `gpt-6-luna` @ `max`) — EvilCharts Suite (11 Files), TrendCharts & Breakdowns**:
  - Extract all 11 `evilcharts/*` files (`EvilAreaChart` with `BufferDash`, `EvilBarChart` with `GlowFilter`, `EvilLineChart`, `EvilDonutChart`, `EvilBrush`, `ChartBackground` 11 SVG patterns, `ChartDot`, `ChartLegend`, `ChartTooltip`, `useZoomDrag`, `chart.tsx`), `trend-charts.tsx`, `<CostBreakdownView>`, and `<ToolBreakdownView>`.

- **Subagent `W2-2B` (`foglamp_luna_high` — `gpt-6-luna` @ `high`) — KPI StatCards, Headers, RangePicker, Context Providers & Chips/Code Widgets**:
  - Extract `page-parts.tsx` (`PageHeader`, `StatCard` with `TickerValue` & `DeltaBadge`, `CardSparkline`, `PillMeter`, `ScrollFade`, `EmptyState`, `NoProjectView`, skeletons), `nav.ts`, `route-header.tsx`, `header-slot.tsx`, `range-picker.tsx` (with `ResizeObserver` compact width morph), `range-context.tsx`, `project-context.tsx`, `quota-card.tsx` (`QuotaCardView`), `theme-switcher.tsx`, and `user-menu.tsx` (`UserMenuView`).
  - Extract `context-chip.tsx`, `model-chip.tsx`, `prompt-version-chip.tsx`, `code-block.tsx` (Shiki dual-theme singleton), `markdown.tsx` (`Streamdown`), and `animated-api-key.tsx` (`SlotText` chromatic roll).

- **Subagent `W2-2C` (`foglamp_terra_high` — `gpt-6.1-terra` @ `high`) — DataTable Portal-Lifting Toolbar, PayloadView, RunExchange, Prompts & Evals**:
  - Extract `data-table.tsx` (`Toolbar` with `ResizeObserver` + `motion.div layoutId` header portal-lifting, `useFilterGroupItem` instant sibling menu switching, `SearchInput`, `ToggleChip`, `FilterSelect` `>8` option typeahead, `SortableHead`, `PaginationFooter`) and `heat-cell.tsx`.
  - Extract `payload-view.tsx` (`PayloadView`, `ClampedBody`, `JsonBlock`, `Prose`), `run-exchange.tsx` (`DrawerRow`, `DrawerColumns`, `Conversation`, `Bubble`, `JsonBubble`, `ToolChips`), `prompt-prose.tsx` (`PromptProseView`, `SlotChip`), `prompt-versions-card.tsx` (`PromptVersionsView`, `TemplateDiff`), and `eval-scores.tsx` (`SpanScoreDots`, `TraceScorePill`, `ScoreRow`).

- **Subagent `W2-2D` (`foglamp_sol_medium` — `gpt-6.1-sol` @ `medium`) — `TraceTimeline` Multi-Phase Waterfall**:
  - Extract `trace-timeline.tsx` preserving the 3-column `@container` waterfall, `<SpanIconChip>`, `<TimeRuler>`, imperative hover time cursor (`moveCursor`), multi-phase LLM bars (`TtftWait`, vendor brand fill, `modelCallWidthPct`, `thinkingWidthPct`), `groupRepeatedSiblings` `×N` loop folding with vertical tick marks, and `1.2s` linear reveal animation.

- **Subagent `W2-2E` (`foglamp_sol_medium` — `gpt-6.1-sol` @ `medium`) — `FoggyLauncher` Carved SVG Notch, `FoggyWidgetView` Rubber-Band Resize & `FoglampHUD` Shadow DOM**:
  - Extract `foggy/foggy-widget.tsx` (`FoggyLauncher` with `NOTCH_FILL` & `NOTCH_EDGE` 6px border-overlapping SVG corner shelf + `FoggyWidgetView` with `[320..640px]` left-edge pointer drag resize and `rubberBand(excess)` physics), `foggy/foggy-message.tsx`, and `dev-toolbar.tsx` (`DevBarView`).
  - Extract `packages/sdk/src/hud/react/*` (`FoglampHUD` Shadow DOM `<foglamp-hud>` with 240Hz fixed-substep `useSizeSpring`, 8-pixel comet `<Diamond />`, 1-min live timeline with sub-pixel `translateX` remainder, and dotted-leader waterfall, plus `HudInlinePreview` for docs).

- **Gatekeeper `W2-GATE` (`foglamp_terra_low` — `gpt-6.1-terra` @ `low`)**:
  - Verify all Wave 2 widget exports, run `tsc --noEmit`, commit all Wave 2 work, and **`git push origin main` to `https://github.com/donbeave/foglamp-design-system`**.

---

### WAVE 3: Full-Page Blocks, 22 Visual Figures, Scan/Setup, Scrollytelling & 3D Hero Demo (Launch 5 Parallel Subagents + 1 Gatekeeper)

- **Subagent `W3-3A` (`foglamp_luna_max` — `gpt-6-luna` @ `max`) — `FigureKit22Block`, Marketing Chrome, Drifting Fog, Cutting Mat, HUD Sim, Auth & `OriginalAuthorsBlock`**:
  - Extract all **22 landing figures** (`figure-reveal.tsx`, `figure-kit.tsx`, `figures-scenes.tsx`, `figures-costs.tsx`, `figures-traces.tsx`, `figures.tsx`, `figure-picker.tsx`) + `feature/{product-hero,feature-section,visuals}.tsx` + `landing/features.tsx`.
  - Extract `DriftingFogCtaBlock` (`noise-overlay.tsx` 1/4-res `<feTurbulence>` `FogBank`, `cta.tsx`, `cta-agent-details.tsx`, `copy-prompt-button.tsx`, `faq.tsx`, `ask-foggy.tsx`), `CuttingMatFooterBlock` (`navbar.tsx`, `footer.tsx`, `cutting-mat.tsx`), `HudSimulatorBlock` (`hud-landing.tsx`), `LoginFormBlock`, `DeviceApproveBlock`, `OnboardingPanelBlock`, `InstrumentEmptyStateBlock`, `ButtonsBadgesPlaygroundBlock`, and **`OriginalAuthorsBlock` (`about/page.tsx` celebrating Gustavo Fior & Abdul Haidar)**.

- **Subagent `W3-3B` (`foglamp_terra_medium` — `gpt-6.1-terra` @ `medium`) — `AppShellBlock` & 7 Canonical Dashboard Page Blocks**:
  - Extract `AppShellBlock` (`app-shell.tsx`) and the 7 reusable Dashboard Page Blocks (`OverviewDashboardBlock`, `TracesExplorerBlock`, `TraceWaterfallInspectorBlock`, `AgentDetailInspectorBlock`, `WorkflowDetailBlock`, `SessionConversationInspectorBlock`, `EvalDetailBlock`) with pre-wired default mock data.

- **Subagent `W3-3C` (`foglamp_terra_high` — `gpt-6.1-terra` @ `high`) — `ObservabilityGuideBlock` Scrollytelling & `SetupBoardBlock`**:
  - Extract `ObservabilityGuideBlock` (`observability-guide.tsx`, `observability-guide.module.css`, `chapters.ts` with sticky `Workshop` map, courier envelope, 8 station pins incl. ringing Watchtower bell, and 8 interactive chapter widgets).
  - Extract `SetupBoardBlock` (`setup-board.tsx`, `setup-summary.tsx`, `decision-list.tsx` inline sparse `PlanEdits` editor, `verification-report.tsx`).

- **Subagent `W3-3D` (`foglamp_sol_medium` — `gpt-6.1-sol` @ `medium`) — `FlowMapBlock`, `ScanBoardBlock` & `PersonalityCard`**:
  - Extract `scan/flow-map.tsx` (preserving `<BeamPulse>` WAAPI `offsetPath` comets, imperative `hitRings` DOM flashes, `<AgentBeam>` staggered `--beam-phase`, `150ms` `will-change: auto` crisp zoom re-rasterization, `flyTo` camera flights, downstream BFS trace spotlighting), `scan-board.tsx`, `left-rail.tsx`, `changes-card.tsx`, `personality-card.tsx` (7 archetypes + `<feTurbulence>` grain), `share-bar.tsx`, `powered-by.tsx`, and `scan-landing.tsx`.

- **Subagent `W3-3E` (`foglamp_sol_high` — `gpt-6.1-sol` @ `high`) — `Hero3DDemoBlock` *(Apex Task #1)***:
  - Extract `landing/hero.tsx`, `hero-demo.tsx`, `demo/entrance.ts`, `demo/piece.tsx`, `demo/index.tsx`, `demo-context.tsx`, `demo-shell.tsx`, `demo-sidebar.tsx`, `demo-chrome.tsx`, all 7 `demo/tabs/*.tsx`, and all 5 `demo/detail/*.tsx` connected to `demo/mock-data.ts`.
  - Verify `transformPerspective: 2400`, unbroken `transform-3d` ancestry, Beat 0's 2-phase dark-mode 8-bit sRGB anti-flicker tween, Beat 1 & Beat 2 `<Piece>` / `<PieceRow>` staggers with `ENTRANCE_TABLE` separated cell shadows, Beat 3 `TILT` → `FLAT` swing, and `DARK_LIFT` tokens.

- **Gatekeeper `W3-GATE` (`foglamp_terra_low` — `gpt-6.1-terra` @ `low`)**:
  - Verify all Wave 3 block exports, run `tsc --noEmit`, commit all Wave 3 work, and **`git push origin main` to `https://github.com/donbeave/foglamp-design-system`**.

---

### WAVE 4: Interactive `@fumadocs/story` Files, MDX Documentation & `shadcn` Registry (Launch 9 Parallel Subagents)

- **Subagent `W4-4A` (`foglamp_luna_medium` — `gpt-6-luna` @ `medium`) — 56 UI Primitive `.story.tsx` Files**:
  - Generate `apps/docs/src/stories/primitives/<name>.story.tsx` for all 56 primitives in `packages/design-system/src/ui/`.

- **Subagent `W4-4B` (`foglamp_luna_high` — `gpt-6-luna` @ `high`) — 49 App Widget & 11 EvilCharts `.story.tsx` Files**:
  - Generate `apps/docs/src/stories/widgets/*.story.tsx` and `apps/docs/src/stories/charts/*.story.tsx` with rich presets and interactive controls.

- **Subagent `W4-4C` (`foglamp_luna_high` — `gpt-6-luna` @ `high`) — 18 Block & 22 Figure `.story.tsx` Files**:
  - Generate `apps/docs/src/stories/blocks/*.story.tsx` covering all 18 blocks and all 22 landing figures.

- **Subagent `W4-4D-Lead` (`foglamp_terra_low` — `gpt-6.1-terra` @ `low`) — Flagship Narrative Prose (`index.mdx`, `credits.mdx` & `foundations/*.mdx`)**:
  - Author `content/docs/index.mdx`, **`content/docs/credits.mdx` (prominent tribute to Gustavo Fior `@gustavo-fior`, Abdul Haidar, and Foglamp Labs embedding `<OriginalAuthorsBlock />`)**, and `foundations/*.mdx`.

- **Subagent `W4-4D-Ref` (`foglamp_luna_high` — `gpt-6-luna` @ `high`) — 56 UI Primitives `.mdx` Reference Docs**:
  - Author all 56 `content/docs/primitives/*.mdx` pages.

- **Subagent `W4-4E` (`foglamp_luna_high` — `gpt-6-luna` @ `high`) — App Widgets, AI Inspectors & EvilCharts `.mdx` Docs**:
  - Author all `content/docs/widgets/*.mdx` and `content/docs/charts/*.mdx` pages with `<story.WithControl />`, prop tables, and attribution footers.

- **Subagent `W4-4F` (`foglamp_luna_high` — `gpt-6-luna` @ `high`) — 22 Figures, Blocks, Scan/Setup, Scrollytelling & HUD `.mdx` Docs**:
  - Author all `content/docs/figures/*.mdx` and `content/docs/blocks/*.mdx` pages.

- **Subagent `W4-4G` (`foglamp_luna_medium` — `gpt-6-luna` @ `medium`) — `shadcn/ui` Registry Manifest & `/public/r/*.json` Builder**:
  - Build `packages/registry/registry.json` (with `author: "Gustavo Fior (@gustavo-fior) & Foglamp Labs"`, `homepage: "https://github.com/foglamp-labs/foglamp"`) and `scripts/build-registry.ts`, emitting static `/r/<name>.json` files into `apps/docs/public/r/`.

- **Subagent `W4-4H` (`foglamp_luna_low` — `gpt-6-luna` @ `low`) — Portal Homepage with Prominent Creator Shoutout, Navigation `meta.json` Trees & Wave 4 Git Push**:
  - Build `apps/docs/src/routes/index.tsx` featuring a top attribution banner & hero callout honoring **Gustavo Fior (`@gustavo-fior` / `gustavofior.com` / `@heyimgustavo`)** and **Foglamp Labs (`foglamp-labs/foglamp`)**, the live 3-Beat `Hero3DDemoBlock`, interactive component showcase, `OriginalAuthorsBlock`, `DriftingFogCtaBlock`, and `CuttingMatFooterBlock`.
  - Generate all `meta.json` navigation files and barrel `index.ts` exports.
  - Once all Wave 4 subagents finish, commit all Wave 4 stories, MDX docs, registry outputs, and portal routes, and **`git push origin main` to `https://github.com/donbeave/foglamp-design-system`**.

---

### WAVE 5: End-to-End Build, Computer-Use Browser QA, Connected Visual System Sign-Off & Final GitHub Release Push
1. **Task `W5-5.1A` (`foglamp_luna_low` — `gpt-6-luna` @ `low`) — Static & Build Verification**:
   - Run `bun run check-types` (`tsc --noEmit`), `bun test` / `vitest run`, `bun run build:registry`, and `bun run build` in `apps/docs`.
2. **Task `W5-5.1B` (`foglamp_terra_high` — `gpt-6.1-terra` @ `high`) — Automated Live-Browser Computer-Use Visual QA**:
   - Drive the live `apps/docs` browser (>3× faster than `Sol`) across rendered stories and pages in Light and Dark modes, verifying zero layout shifts, console errors, or broken imports.
3. **Task `W5-5.2` (`foglamp_sol_high` — `gpt-6.1-sol` @ `high`) — Final Whole-Portal Connected Visual System, Attribution Sign-Off & Final Push to `donbeave/foglamp-design-system` *(Apex Task #2)***:
   - Verify prominent shoutout & links to **Gustavo Fior (`@gustavo-fior`)**, **Abdul Haidar**, and **Foglamp Labs (`foglamp-labs/foglamp`)** on the homepage hero, navbar, footer, `/docs/credits`, `/docs`, and every `FoglampStoryPanel`.
   - Verify all 18 `--custom-shadow*` tokens, `squircle:*` corner shapes, 3-Beat `Hero3DDemoBlock`, `TraceTimeline`, `EvilCharts`, `FlowMap` (`elkjs` + `BeamPulse`), `PromptVersionsView`, `FoggyLauncher` carved corner notch, `FoggyWidgetView` rubber-band resize, `ObservabilityGuideBlock`, and `FoglampHUD` work interactively with zero visual drift.
   - Commit any final polish, **`git push origin main` to `https://github.com/donbeave/foglamp-design-system`**, verify `git status --porcelain` is empty and `HEAD == origin/main`, and only emit `<!-- GOAL_COMPLETE -->` once every single check passes./goal

## Wave 6 extension — superseding earlier instructions

The complete, controlling Wave 6 task contract and exact attribution/header templates are in [GOAL-WAVE-6-FRAMEROCK.md](GOAL-WAVE-6-FRAMEROCK.md). Preserve Waves 0–5 and finish and commit all Wave 5 fixes and W5-5.2 before beginning W6-6A. Wave 5 no longer completes the extended goal. Execute W6-6A → W6-6B → W6-6C → W6-6D → W6-GATE in order; each task has exclusive ownership during its sequential turn, as recorded in task-index.json. The earlier two-task reservation for foglamp_sol_high is superseded solely to authorize W6-GATE as a third task.

Framerock (`@tailrocks/framerock`) is Tailrocks’ Web UI sibling to Termrock. Supersede earlier package/portal branding, registry publisher/homepage, and OriginalAuthorsBlock/photo requirements as specified in the contract. Preserve all other extracted visual and behavioral work, including all 18 shadows, corner-squircle and corner-bevel, DRAWER_BUTTON_CLASS, Hero 3-beat choreography, TraceTimeline, FlowMap and HUD physics. Maintain prominent truthful credit and Apache-2.0 compliance. Founder photo/file checks apply to project files and generated assets; the ignored, read-only `.reference/foglamp` upstream checkout remains intact. Tailrocks package metadata does not authorize moving or renaming the existing implementation GitHub remote.

W6-GATE verifies provenance against pinned upstream bodies, registry payload notices, public attribution, anti-impersonation and the full build/test suite. The coordinator records accepted task states, commits and pushes both repositories, verifies implementation HEAD equals origin/main and the working tree is clean, then alone emits `<!-- GOAL_COMPLETE -->`.
