# Parallel Subagent Task Checklist (Official OpenAI Cost-Optimized `Luna` → `Terra` → `Sol` Pyramid)

> **Lead Orchestrator / Root Coordinator (`/root`)**: **`GPT-6.1-Sol (low)`** *(`$2.00/$0.10 cached/$10.00` — official OpenAI `multi_agent` root model with `2.1%` broken-tool failure rate vs `28.7%` on `Luna` and `-32%` factual errors at `low` effort. Coordinates waves, dispatches subagents, tracks state — never writes bulk implementation code).*
> **Worker Cost Hierarchy (`Luna` < `Terra` < `Sol`)**:
> - **`GPT-6-Luna` (`$0.10 / $0.50`, `180M TPM`, `low | medium | high | max`)**: Executes **~72% of all work** (verbatim copies, utilities, all 56 primitives, `@foglamp/prompts`, moderate widgets, EvilCharts, 22 figures, `.story.tsx` files, 100+ component reference `.mdx` docs, `registry.json`, CLI builds).
> - **`GPT-6.1-Terra` (`$1.00 / $5.00`, `>3× faster`, `low | medium | high`)**: Executes **~21% of all work** (flagship narrative prose in `low`, Wave 0 CSS/Vite pipeline & `elkjs` layout math & multi-pane drawers in `medium`, `DataTable` layout-shift toolbar & `ObservabilityGuideBlock` & Live Browser Computer-Use QA in `high`).
> - **`GPT-6.1-Sol` (`$2.00 / $10.00`, `low | medium | high`)**: Executes **~7% of all work** (`low` for Root Orchestration, `medium` for `DeepSWE` `75.2%` imperative physics subsystems `TraceTimeline`, `FlowMap`, & `FoglampHUD`, and `high` for **only 2 apex connected-visual-system tasks**: `Hero3DDemoBlock` and Final Whole-Portal Sign-Off).
> **Mandatory Attribution Rule**: Every surface in the repository, package, stories, and documentation portal must prominently credit **Gustavo Fior (`@gustavo-fior` · [gustavofior.com](https://gustavofior.com) · [@heyimgustavo](https://x.com/heyimgustavo))**, **Abdul Haidar**, and **[Foglamp Labs (`foglamp-labs/foglamp`)](https://github.com/foglamp-labs/foglamp)**.

---

## Wave 0: Target GitHub Repository (`donbeave/foglamp-design-system`), Workspace & CSS Token Pipeline (2 Sequential Setup Tasks)

- [ ] **Task 0.1** — `GPT-6-Luna (low)` (`foglamp_luna_low`):
  - Create the target GitHub repository **`https://github.com/donbeave/foglamp-design-system`** under the **`donbeave`** GitHub account (`gh repo view donbeave/foglamp-design-system || gh repo create donbeave/foglamp-design-system --public --description "Foglamp Design System (@foglamp/design-system) + shadcn Registry + Fumadocs/BaseUI/TanStack Start/Story Portal — Original UI & Design by Gustavo Fior (@gustavo-fior) & Foglamp Labs"`).
  - Initialize `/Users/donbeave/Projects/donbeave/foglamp-design-system` (`git init -b main`, `git remote add origin https://github.com/donbeave/foglamp-design-system.git`) with `.gitignore` excluding `.reference/`, `node_modules/`, `dist/`, `.turbo/`, `.output/`, `.vinxi/`, `.tanstack/`.
  - Clone `https://github.com/foglamp-labs/foglamp` into `/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp`.
  - Scaffold the Bun + Turborepo workspace (`package.json`, `turbo.json`, `tsconfig.base.json`, `packages/design-system`, `packages/registry`, `apps/docs`, `CREDITS.md`, `README.md`).
  - Copy static assets (`InterVariable.woff2`, `InterVariable-Italic.woff2`, `public/illustrations/ai-workshop.webp`, `/avatar.jpg`, `/abdul-haidar.jpg`) and `apps/web/src/components/marketing/demo/mock-data.ts` (`2,094` lines).
- [ ] **Task 0.2** — `GPT-6.1-Terra (medium)` (`foglamp_terra_medium`):
  - Configure `packages/design-system/src/styles/globals.css` and `effects.css` with all 18 `--custom-shadow*` tokens (`:root` + `.dark`), `@plugin "@toolwind/corner-shape"`, `@custom-variant squircle (@supports (corner-shape: squircle))`, keyframes, autofill neutralizer, and thin scrollbars.
  - Configure `apps/docs` (`vite.config.ts`, `source.config.ts`, `src/routes/__root.tsx`, `src/styles/app.css`) with **TanStack Start** (`@tanstack/react-start`), **Fumadocs Base UI** (`"fumadocs-ui": "npm:@fumadocs/base-ui@latest"`, `RootProvider` from `fumadocs-ui/provider/tanstack`), and **Fumadocs Story** (`@fumadocs/story/vite`), ensuring zero CSS variable collision between Fumadocs UI chrome and Foglamp surfaces.
  - Stage, commit (`feat(wave-0): initialize monorepo, Tailwind v4 tokens, and TanStack Start + Fumadocs portal`), and **`git push -u origin main` to `https://github.com/donbeave/foglamp-design-system`**.

---

## Wave 1: Foundations, Utilities, Engines & 56 UI Primitives (5 Parallel Subagents + 1 Gatekeeper)

- [ ] **Subagent 1A (48 Pure Base UI Primitives & Brand Logos)** — `GPT-6-Luna (low)`:
  - Copy the 48 zero-coupling Base UI primitives from `.reference/foglamp/packages/ui/src/components/` into `packages/design-system/src/ui/`.
  - Copy `brand-logos.tsx` (25 SVGs), `hooks/use-mobile.ts`, `hooks/use-copied.ts`, and `lib/utils.ts` (`cn`).
- [ ] **Subagent 1B (8 Custom-Logic Primitives, `<FoglampLinkProvider>` & `@foglamp/prompts` Diff/Slot Engine)** — `GPT-6-Luna (max)` *(66.6% DeepSWE at $0.10/$0.50)*:
  - Extract and verify `button.tsx` (7 variants, 8 sizes, `<span>` child wrapping, `nativeButton` heuristic), `badge.tsx` (14 variants + `<span>` wrapping), `button-styles.ts` (`DRAWER_BUTTON_CLASS`), `select.tsx` (recursive `collectSelectItemLabels`), `sheet.tsx` (`variant="floating"`), `table.tsx` (`ResizeObserver` overflow + `interactive` row hover border suppression), `tooltip.tsx` (non-inverted surface), and `sonner.tsx`.
  - Create `packages/design-system/src/lib/link-context.tsx` (`<FoglampLinkProvider>`, `<FoglampLink>`).
  - Extract `packages/prompts/src/{diff,normalize,infer,slots,index}.ts` (+ unit tests) into `packages/design-system/src/lib/prompts/`.
- [ ] **Subagent 1C (Formatters, Time Ranges, Timeline Math, Payload Normalizer & Leaf Widgets)** — `GPT-6-Luna (medium)`:
  - Extract `lib/format.ts` (14 cached formatters), `lib/range.ts` (9 presets + `customRange` + `exactRange`), `lib/trace-timeline.ts` (`toMs`, `orderSpans`, `computeWindow`), `lib/payload-messages.ts` (+ `payload-messages.test.ts`), and `hooks/use-app-hooks.ts`.
  - Extract leaf widgets: `model-logo.tsx`, `brand-mark.tsx`, `logo.tsx`, `scan/brand.tsx`, `agent-icon.tsx`, `project-icon.tsx` (`<Image>` → `<img>`), `customer-avatar.tsx`, `tool-icon.tsx`, `span-type.tsx`, `preset-meta.ts`, `copy-icon.tsx`, `copy-button.tsx`, `stat.tsx`, `relative-time.tsx`, `sunset-card.tsx`, `node-flow.tsx`.
- [ ] **Subagent 1D (Scan 2-Pass `elkjs` Layout Engine & Contract Types)** — `GPT-6.1-Terra (medium)`:
  - Extract `components/scan/{fold-graph,layout,diff,personality,favicon}.ts` and contract types (`packages/contracts/src/{scan,alerts,instrumentation,v1}.ts`) into `packages/design-system/src/lib/scan/` and `lib/types.ts`.
- [ ] **Subagent 1E (Custom `FoglampStoryPanel` Workbench with Creator Attribution)** — `GPT-6.1-Terra (medium)`:
  - Build `apps/docs/src/components/story-panel.tsx` and `apps/docs/src/lib/story.tsx` using `defineStoryFactory({ WithControl: FoglampStoryPanel })` from `@fumadocs/story/vite/client`.
  - Include variant preset tabs, live prop controls (`useStoryArgs()`), surface background toggle (`Default`, `Muted`, `Dark Lift`, plus isolated Light/Dark preview toggle), `npx shadcn@latest add` CLI command bar, and a visible footer badge: *"Original Design by Gustavo Fior (@gustavo-fior) · foglamp-labs/foglamp"*.
- [ ] **Gatekeeper 1** — `GPT-6.1-Terra (low)` (`foglamp_terra_low`):
  - Verify all Wave 1 exports, run unit tests (`payload-messages`, `prompts`), confirm zero `next/*` or `trpc` imports in `packages/design-system`, commit all Wave 1 work, and **`git push origin main` to `https://github.com/donbeave/foglamp-design-system`**.

---

## Wave 2: Application Widgets, EvilCharts & Live HUD (5 Parallel Subagents + 1 Gatekeeper)

- [ ] **Subagent 2A (EvilCharts Suite [11 Files], TrendCharts & Cost/Tool Breakdowns)** — `GPT-6-Luna (max)`:
  - Extract all 11 `evilcharts/*` files (`EvilAreaChart` with `BufferDash`, `EvilBarChart` with `GlowFilter`, `EvilLineChart`, `EvilDonutChart`, `EvilBrush`, `ChartBackground` 11 SVG patterns, `ChartDot`, `ChartLegend`, `ChartTooltip`, `useZoomDrag`, `chart.tsx`), `trend-charts.tsx`, `<CostBreakdownView>`, and `<ToolBreakdownView>`.
- [ ] **Subagent 2B (KPI StatCards, Headers, RangePicker, Context Providers & Chips/Code Widgets)** — `GPT-6-Luna (high)`:
  - Extract `page-parts.tsx` (`PageHeader`, `StatCard` with `TickerValue` & `DeltaBadge`, `CardSparkline`, `PillMeter`, `ScrollFade`, `EmptyState`, `NoProjectView`, skeletons), `nav.ts`, `route-header.tsx`, `header-slot.tsx`, `range-picker.tsx` (with `ResizeObserver` compact width morph), `range-context.tsx`, `project-context.tsx`, `quota-card.tsx` (`QuotaCardView`), `theme-switcher.tsx`, and `user-menu.tsx` (`UserMenuView`).
  - Extract `context-chip.tsx`, `model-chip.tsx`, `prompt-version-chip.tsx`, `code-block.tsx` (Shiki dual-theme singleton), `markdown.tsx` (`Streamdown`), and `animated-api-key.tsx` (`SlotText` chromatic roll).
- [ ] **Subagent 2C (DataTable Portal-Lifting Toolbar, PayloadView, RunExchange, Prompts & Evals)** — `GPT-6.1-Terra (high)` *(Terminal-Bench 4.0 layout-shift mastery)*:
  - Extract `data-table.tsx` (`Toolbar` with `ResizeObserver` + `motion.div layoutId` header portal-lifting, `useFilterGroupItem` instant sibling menu switching, `SearchInput`, `ToggleChip`, `FilterSelect` `>8` option typeahead, `SortableHead`, `PaginationFooter`) and `heat-cell.tsx`.
  - Extract `payload-view.tsx` (`PayloadView`, `ClampedBody`, `JsonBlock`, `Prose`), `run-exchange.tsx` (`DrawerRow`, `DrawerColumns`, `Conversation`, `Bubble`, `JsonBubble`, `ToolChips`), `prompt-prose.tsx` (`PromptProseView`, `SlotChip`), `prompt-versions-card.tsx` (`PromptVersionsView`, `TemplateDiff`), and `eval-scores.tsx` (`SpanScoreDots`, `TraceScorePill`, `ScoreRow`).
- [ ] **Subagent 2D (`TraceTimeline` Multi-Phase Waterfall)** — `GPT-6.1-Sol (medium)` *(DeepSWE 75.2% complex technical work)*:
  - Extract `trace-timeline.tsx` preserving the 3-column `@container` waterfall, `<SpanIconChip>`, `<TimeRuler>`, imperative hover time cursor (`moveCursor`), multi-phase LLM bars (`TtftWait`, vendor brand fill, `modelCallWidthPct`, `thinkingWidthPct`), `groupRepeatedSiblings` `×N` loop folding with vertical tick marks, and `1.2s` linear reveal animation.
- [ ] **Subagent 2E (`FoggyLauncher` Carved SVG Notch, `FoggyWidgetView` Rubber-Band Resize & `FoglampHUD` Shadow DOM)** — `GPT-6.1-Sol (medium)`:
  - Extract `foggy/foggy-widget.tsx` (`FoggyLauncher` with `NOTCH_FILL` & `NOTCH_EDGE` 6px border-overlapping SVG corner shelf + `FoggyWidgetView` with `[320..640px]` left-edge pointer drag resize and `rubberBand(excess)` physics), `foggy/foggy-message.tsx`, and `dev-toolbar.tsx` (`DevBarView`).
  - Extract `packages/sdk/src/hud/react/*` (`FoglampHUD` Shadow DOM `<foglamp-hud>` with 240Hz fixed-substep `useSizeSpring`, 8-pixel comet `<Diamond />`, 1-min live timeline with sub-pixel `translateX` remainder, and dotted-leader waterfall, plus `HudInlinePreview` for docs).
- [ ] **Gatekeeper 2** — `GPT-6.1-Terra (low)` (`foglamp_terra_low`):
  - Verify all Wave 2 widget exports, run `tsc --noEmit`, commit all Wave 2 work, and **`git push origin main` to `https://github.com/donbeave/foglamp-design-system`**.

---

## Wave 3: Full-Page Blocks, 22 Visual Figures, Scan/Setup, Scrollytelling & 3D Hero Demo (5 Parallel Subagents + 1 Gatekeeper)

- [ ] **Subagent 3A (`FigureKit22Block`, Marketing Chrome, Drifting Fog, Cutting Mat, HUD Sim, Auth & `OriginalAuthorsBlock`)** — `GPT-6-Luna (max)`:
  - Extract all **22 landing figures** (`figure-reveal.tsx`, `figure-kit.tsx`, `figures-scenes.tsx`, `figures-costs.tsx`, `figures-traces.tsx`, `figures.tsx`, `figure-picker.tsx`) + `feature/{product-hero,feature-section,visuals}.tsx` + `landing/features.tsx`.
  - Extract `DriftingFogCtaBlock` (`noise-overlay.tsx` 1/4-res `<feTurbulence>` `FogBank`, `cta.tsx`, `cta-agent-details.tsx`, `copy-prompt-button.tsx`, `faq.tsx`, `ask-foggy.tsx`), `CuttingMatFooterBlock` (`navbar.tsx`, `footer.tsx`, `cutting-mat.tsx`), `HudSimulatorBlock` (`hud-landing.tsx`), `LoginFormBlock`, `DeviceApproveBlock`, `OnboardingPanelBlock`, `InstrumentEmptyStateBlock`, `ButtonsBadgesPlaygroundBlock`, and **`OriginalAuthorsBlock` (`about/page.tsx` celebrating Gustavo Fior & Abdul Haidar)**.
- [ ] **Subagent 3B (`AppShellBlock` & 7 Canonical Dashboard Page Blocks)** — `GPT-6.1-Terra (medium)`:
  - Extract `AppShellBlock` (`app-shell.tsx`) and the 7 reusable Dashboard Page Blocks (`OverviewDashboardBlock`, `TracesExplorerBlock`, `TraceWaterfallInspectorBlock`, `AgentDetailInspectorBlock`, `WorkflowDetailBlock`, `SessionConversationInspectorBlock`, `EvalDetailBlock`) with pre-wired default mock data.
- [ ] **Subagent 3C (`ObservabilityGuideBlock` Scrollytelling & `SetupBoardBlock`)** — `GPT-6.1-Terra (high)`:
  - Extract `ObservabilityGuideBlock` (`observability-guide.tsx`, `observability-guide.module.css`, `chapters.ts` with sticky `Workshop` map, courier envelope, 8 station pins incl. ringing Watchtower bell, and 8 interactive chapter widgets).
  - Extract `SetupBoardBlock` (`setup-board.tsx`, `setup-summary.tsx`, `decision-list.tsx` inline sparse `PlanEdits` editor, `verification-report.tsx`).
- [ ] **Subagent 3D (`FlowMapBlock`, `ScanBoardBlock` & `PersonalityCard`)** — `GPT-6.1-Sol (medium)`:
  - Extract `scan/flow-map.tsx` (preserving `<BeamPulse>` WAAPI `offsetPath` comets, imperative `hitRings` DOM flashes, `<AgentBeam>` staggered `--beam-phase`, `150ms` `will-change: auto` crisp zoom re-rasterization, `flyTo` camera flights, downstream BFS trace spotlighting), `scan-board.tsx`, `left-rail.tsx`, `changes-card.tsx`, `personality-card.tsx` (7 archetypes + `<feTurbulence>` grain), `share-bar.tsx`, `powered-by.tsx`, and `scan-landing.tsx`.
- [ ] **Subagent 3E (`Hero3DDemoBlock` — *Apex Task #1*)** — **`GPT-6.1-Sol (high)`** *(Connected visual systems)*:
  - Extract `landing/hero.tsx`, `hero-demo.tsx`, `demo/entrance.ts`, `demo/piece.tsx`, `demo/index.tsx`, `demo-context.tsx`, `demo-shell.tsx`, `demo-sidebar.tsx`, `demo-chrome.tsx`, all 7 `demo/tabs/*.tsx`, and all 5 `demo/detail/*.tsx` connected to `demo/mock-data.ts`.
  - Verify `transformPerspective: 2400`, unbroken `transform-3d` ancestry, Beat 0's 2-phase dark-mode 8-bit sRGB anti-flicker tween, Beat 1 & Beat 2 `<Piece>` / `<PieceRow>` staggers with `ENTRANCE_TABLE` separated cell shadows, Beat 3 `TILT` → `FLAT` swing, and `DARK_LIFT` tokens.
- [ ] **Gatekeeper 3** — `GPT-6.1-Terra (low)` (`foglamp_terra_low`):
  - Verify all Wave 3 block exports, run `tsc --noEmit`, commit all Wave 3 work, and **`git push origin main` to `https://github.com/donbeave/foglamp-design-system`**.

---

## Wave 4: Interactive Stories, MDX Documentation Portal & `shadcn` Registry (8 Parallel Subagents)

- [ ] **Subagent 4A (56 UI Primitive `.story.tsx` Files)** — `GPT-6-Luna (medium)`:
  - Generate `apps/docs/src/stories/primitives/<name>.story.tsx` for all 56 primitives in `packages/design-system/src/ui/`.
- [ ] **Subagent 4B (49 App Widget & 11 EvilCharts `.story.tsx` Files)** — `GPT-6-Luna (high)`:
  - Generate `apps/docs/src/stories/widgets/*.story.tsx` and `apps/docs/src/stories/charts/*.story.tsx` with rich presets and interactive controls.
- [ ] **Subagent 4C (18 Block & 22 Figure `.story.tsx` Files)** — `GPT-6-Luna (high)`:
  - Generate `apps/docs/src/stories/blocks/*.story.tsx` covering all 18 blocks and all 22 landing figures.
- [ ] **Subagent 4D-Lead (Flagship Narrative Prose: `index.mdx`, `credits.mdx` & `foundations/*.mdx`)** — `GPT-6.1-Terra (low)` *(Clear, natural writing)*:
  - Author `content/docs/index.mdx`, **`content/docs/credits.mdx` (prominent tribute to Gustavo Fior `@gustavo-fior`, Abdul Haidar, and Foglamp Labs embedding `<OriginalAuthorsBlock />`)**, and `foundations/*.mdx` (Shadow-as-Border system, Progressive Squircles, Typography, Dual-Mode Form Controls).
- [ ] **Subagent 4D-Ref (56 UI Primitives `.mdx` Reference Docs)** — `GPT-6-Luna (high)`:
  - Author all 56 `content/docs/primitives/*.mdx` pages.
- [ ] **Subagent 4E (App Widgets, AI Inspectors & EvilCharts `.mdx` Docs)** — `GPT-6-Luna (high)`:
  - Author all `content/docs/widgets/*.mdx` and `content/docs/charts/*.mdx` pages with `<story.WithControl />`, prop tables, and attribution footers.
- [ ] **Subagent 4F (22 Figures, Blocks, Scan/Setup, Scrollytelling & HUD `.mdx` Docs)** — `GPT-6-Luna (high)`:
  - Author all `content/docs/figures/*.mdx` and `content/docs/blocks/*.mdx` pages.
- [ ] **Subagent 4G (`shadcn/ui` Registry Manifest & `/public/r/*.json` Builder)** — `GPT-6-Luna (medium)`:
  - Build `packages/registry/registry.json` (with `author: "Gustavo Fior (@gustavo-fior) & Foglamp Labs"`, `homepage: "https://github.com/foglamp-labs/foglamp"`) and `scripts/build-registry.ts`, emitting static `/r/<name>.json` files into `apps/docs/public/r/`.
- [ ] **Subagent 4H (Portal Homepage with Prominent Creator Shoutout, Navigation `meta.json` Trees & Wave 4 Git Push)** — `GPT-6-Luna (low)` (`foglamp_luna_low`):
  - Build `apps/docs/src/routes/index.tsx` featuring a top attribution banner & hero callout honoring **Gustavo Fior (`@gustavo-fior` / `gustavofior.com` / `@heyimgustavo`)** and **Foglamp Labs (`foglamp-labs/foglamp`)**, the live 3-Beat `Hero3DDemoBlock`, interactive component showcase, `OriginalAuthorsBlock`, `DriftingFogCtaBlock`, and `CuttingMatFooterBlock`.
  - Generate all `meta.json` navigation files and barrel `index.ts` exports.
  - Once all Wave 4 subagents finish, commit all Wave 4 stories, MDX docs, registry outputs, and portal routes, and **`git push origin main` to `https://github.com/donbeave/foglamp-design-system`**.

---

## Wave 5: Build Verification, Computer-Use Browser QA, Final Pixel-Parity Sign-Off & GitHub Release Push (3 Tasks)

- [ ] **Task 5.1A (Static Typecheck, Unit Tests, Registry Build & Prod Build)** — `GPT-6-Luna (low)` (`foglamp_luna_low`):
  - Run `bun run check-types`, `bun test`, `bun run build:registry`, and `bun run build` across the workspace.
- [ ] **Task 5.1B (Automated Live-Browser Computer-Use Visual QA)** — `GPT-6.1-Terra (high)` (`foglamp_terra_high` — *>3× faster Computer Use & MMMU-Pro visual reasoning*):
  - Drive the live `apps/docs` browser across component stories and blocks in both Light and Dark modes, verifying zero layout shifts, broken imports, or hydration warnings.
- [ ] **Task 5.2 (Final Whole-Portal Connected Visual System, Attribution Sign-Off & Final Push to `donbeave/foglamp-design-system` — *Apex Task #2*)** — **`GPT-6.1-Sol (high)`** (`foglamp_sol_high`):
  - Final architectural sign-off on all 18 `--custom-shadow*` tokens, `squircle:*` geometry, 3-Beat `Hero3DDemoBlock`, `TraceTimeline`, `EvilCharts`, `FlowMap` (`elkjs` + `BeamPulse`), `ObservabilityGuideBlock`, `FoggyLauncher` carved corner shelf, `FoglampHUD` Shadow DOM spring morph, and prominent attribution to **Gustavo Fior (`@gustavo-fior`)** and **Foglamp Labs** across every surface.
  - Commit any final polish, **`git push origin main` to `https://github.com/donbeave/foglamp-design-system`**, verify `git status --porcelain` is empty and `HEAD == origin/main`, and emit `<!-- GOAL_COMPLETE -->`.

## Wave 6 extension — superseding earlier instructions

The complete, controlling Wave 6 task contract and exact attribution/header templates are in [GOAL-WAVE-6-FRAMEROCK.md](GOAL-WAVE-6-FRAMEROCK.md). Preserve Waves 0–5 and finish and commit all Wave 5 fixes and W5-5.2 before beginning W6-6A. Wave 5 no longer completes the extended goal. Execute W6-6A → W6-6B → W6-6C → W6-6D → W6-GATE in order; each task has exclusive ownership during its sequential turn, as recorded in task-index.json. The earlier two-task reservation for foglamp_sol_high is superseded solely to authorize W6-GATE as a third task.

Framerock (`@tailrocks/framerock`) is Tailrocks’ Web UI sibling to Termrock. Supersede earlier package/portal branding, registry publisher/homepage, and OriginalAuthorsBlock/photo requirements as specified in the contract. Preserve all other extracted visual and behavioral work, including all 18 shadows, corner-squircle and corner-bevel, DRAWER_BUTTON_CLASS, Hero 3-beat choreography, TraceTimeline, FlowMap and HUD physics. Maintain prominent truthful credit and Apache-2.0 compliance. Founder photo/file checks apply to project files and generated assets; the ignored, read-only `.reference/foglamp` upstream checkout remains intact. Tailrocks package metadata does not authorize moving or renaming the existing implementation GitHub remote.

W6-GATE verifies provenance against pinned upstream bodies, registry payload notices, public attribution, anti-impersonation and the full build/test suite. The coordinator records accepted task states, commits and pushes both repositories, verifies implementation HEAD equals origin/main and the working tree is clean, then alone emits `<!-- GOAL_COMPLETE -->`.
