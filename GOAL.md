# Master `/goal` Prompt: Foglamp Design System & Fumadocs + BaseUI + TanStack Start + Story Portal

Copy and run the `/goal` prompt below to execute the entire extraction and documentation portal build using the cost-optimized model & effort pyramid:

````markdown
/goal
Build the complete, reusable **Foglamp Design System** (`@foglamp/design-system` + `shadcn/ui`-compatible Registry) and its interactive **Documentation & Component Workbench Portal** (`Fumadocs` + `@fumadocs/base-ui` + `TanStack Start` + `@fumadocs/story`) extracted directly from `https://github.com/foglamp-labs/foglamp`.

---

## 1. NON-NEGOTIABLE CORE MANDATES

### 1.1 Prominent Shoutout & Attribution to the Original Creator (Everywhere!)
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

### 1.3 Cost-Optimized Model & Effort Pyramid (Strict Enforcement)
All tasks, steps, and subagent invocations MUST be executed **exclusively** using these three model families:
- **`GPT-6.1-Sol` (`low`, `medium`, `high`)** — **~68% of all work** *(Lowest Cost Bulk & Structured Tier)*
- **`GPT-6.1-Terra` (`low`, `medium`, `high`)** — **~24% of all work** *(Balanced Component Refactoring & Decoupling Tier)*
- **`GPT-6-Luna` (`low`, `medium`, `high`, `max`)** — **~8% of all work** *(High-Precision Physics, Layout Math & Apex QA Tier; `max` used on ONLY 2 tasks!)*

#### Exact Model + Effort Assignment Rules:
1. **`GPT-6.1-Sol (low)` (~28% of work — Ultra-Low Cost)**:
   - Use for verbatim file copies (48 zero-coupling Base UI primitives, 25 `BrandLogos`, `.woff2` fonts, `ai-workshop.webp`, 2,094-line `mock-data.ts`), barrel `index.ts` exports, `meta.json` navigation trees, portal homepage assembly, and running CLI checks (`tsc --noEmit`, `vitest run`, `shadcn build`, `bun run build`).
2. **`GPT-6.1-Sol (medium)` (~22% of work — Economical Structured Work)**:
   - Use for extracting pure TS utilities (`format.ts`, `range.ts`, `trace-timeline.ts`, `payload-messages.ts`, `hooks.ts`), simple leaf widgets (`ModelLogo`, `BrandMark`, `Logo`, `AgentIcon`, `ProjectIcon` `<Image>`→`<img>`, `CustomerAvatar`, `ToolIcon`, `SpanTypeChip`, `CopyIcon`, `CopyButton`, `Stat`, `RelativeTime`, `SunsetCard`, `NodeFlow`), generating all 56 UI primitive `.story.tsx` files, and building `registry.json`.
3. **`GPT-6.1-Sol (high)` (~18% of work — High-Throughput Docs & Story Authoring)**:
   - Use for authoring all **110+ `.mdx` documentation pages** (`index.mdx`, `credits.mdx`, `foundations/*`, 56 `primitives/*`, 35+ `widgets/*`, 12 `charts/*`, 22 `figures/*`, 18 `blocks/*`) and `.story.tsx` files for widgets, charts, figures, and blocks.
4. **`GPT-6.1-Terra (low)` (~7% of work — Economical Component Logic)**:
   - Use for verifying the 8 custom-logic primitives (`Button`, `Badge`, `DRAWER_BUTTON_CLASS`, `Select` recursive label collector, `Sheet` floating variant, `Table` `ResizeObserver` + `interactive` row, `Tooltip`, `Sonner`), `<FoglampLinkProvider>`, and unit test suites.
5. **`GPT-6.1-Terra (medium)` (~10% of work — Props Decoupling & Chart/Figure Extraction)**:
   - Use for decoupling moderate widgets (`ContextChip`, `ModelChip`, `PromptVersionChip`, `CodeBlock` Shiki singleton, `Markdown`, `AnimatedApiKey`, `PageHeader`, `StatCard` with `TickerValue`/`CardSparkline`/`PillMeter`, `RangePicker`, `RangeProvider`, `ProjectProvider`, `QuotaCardView`, `ThemeSwitcher`, `UserMenuView`), all 11 `evilcharts/*` files + `CostBreakdownView` & `ToolBreakdownView`, all **22 Landing Figures** (`FigureKit22Block`), `DriftingFogCtaBlock`, `CuttingMatFooterBlock`, `HudSimulatorBlock`, `LoginFormBlock`, `DeviceApproveBlock`, `OnboardingPanelBlock`, `InstrumentEmptyStateBlock`, `ButtonsBadgesPlaygroundBlock`, and `OriginalAuthorsBlock`.
6. **`GPT-6.1-Terra (high)` (~7% of work — Complex Multi-Pane Composites & Toolbars)**:
   - Use for `DataTable` + `Toolbar` (`ResizeObserver` + `motion.div layoutId` header portal-lifting + `useFilterGroupItem` + `FilterSelect` typeahead), `PayloadView` + `ClampedBody` + `RunExchange` drawers, `PromptProseView` (`SlotChip`) + `PromptVersionsView` (`TemplateDiff`), `EvalScores`, `AppShellBlock`, the 7 Dashboard Page Blocks, `ObservabilityGuideBlock` ("Warm Paper Field Guide" scrollytelling), `SetupBoardBlock` (sparse `PlanEdits` editor), and `FoglampStoryPanel`.
7. **`GPT-6-Luna (low)` (~2% of work — Inter-Wave Gatekeeper)**:
   - Use between waves for fast inspection of exports and verifying zero `next/*` or `trpc` leakage.
8. **`GPT-6-Luna (medium)` (~2% of work — CSS Token Harmony & Layout/Diff Algorithms)**:
   - Use in Wave 0 to wire TanStack Start + `@fumadocs/base-ui` + `@fumadocs/story` + Tailwind v4 CSS tokens (`globals.css` + `effects.css`), and in Wave 1D to extract `@foglamp/prompts` (LCS `diffLines`, `inferVersions`, `slotValues`) and `scan/layout.ts` (2-pass `elkjs` orthogonal layout engine + `SNAP_TOL = 20px` row snap + `BAND_KEEP = 72px` empty-band squeeze).
9. **`GPT-6-Luna (high)` (~2.5% of work — Sub-Pixel Timelines, WAAPI Comets, SVG Notch & Shadow DOM Physics)**:
   - Use for `TraceTimeline` (multi-phase LLM bars, `groupRepeatedSiblings` `×N` folding, imperative hover cursor, `1.2s` reveal), `FlowMapBlock` + `ScanBoardBlock` (`<BeamPulse>` WAAPI `offsetPath` comets, imperative `hitRings`, `<AgentBeam>`, crisp zoom, BFS trace), and `FoggyLauncher` (SVG `NOTCH_FILL`/`NOTCH_EDGE` carved corner shelf) + `FoggyWidgetView` (`rubberBand` resize) + `FoglampHUD` (Shadow DOM 240Hz `useSizeSpring` + sub-pixel `translateX` timeline).
10. **`GPT-6-Luna (max)` (~1.5% of work — Strictly Reserved for ONLY 2 Apex Tasks)**:
    - **Apex Task 1**: `Hero3DDemoBlock` (`hero.tsx`, `hero-demo.tsx`, `entrance.ts`, `piece.tsx`, and the 7-tab / 5-detail interactive `DashboardDemo` with 3-Beat `transform-3d` perspective assembly, Beat 0 dark-mode 8-bit sRGB anti-flicker tween, and `ENTRANCE_TABLE` separated cell shadows).
    - **Apex Task 2**: Wave 5 Final Whole-Portal Light/Dark Pixel-Parity, Hydration & Attribution Audit.

**Dynamic Escalation Rule**: Always start every subagent at its assigned tier above. Only escalate **one step up** if a subagent fails to resolve a bundler/type/rendering edge case after 2 attempts.

---

## 2. STEP-BY-STEP PARALLEL EXECUTION WAVES

### WAVE 0: Source Clone & Workspace Initialization
1. **Task 0.1 (`GPT-6.1-Sol (low)`)**:
   - Clone `https://github.com/foglamp-labs/foglamp` into `.reference/foglamp`.
   - Scaffold the Bun + Turborepo workspace (`package.json`, `turbo.json`, `tsconfig.base.json`, `packages/design-system`, `packages/registry`, `apps/docs`).
   - Copy static assets (`InterVariable.woff2`, `InterVariable-Italic.woff2`, `public/illustrations/ai-workshop.webp`, `/avatar.jpg`, `/abdul-haidar.jpg`) and `apps/web/src/components/marketing/demo/mock-data.ts` (`2,094` lines).
2. **Task 0.2 (`GPT-6-Luna (medium)`)**:
   - Configure `packages/design-system/src/styles/globals.css` and `effects.css` with all 18 `--custom-shadow*` tokens (`:root` + `.dark`), `@plugin "@toolwind/corner-shape"`, `@custom-variant squircle (@supports (corner-shape: squircle))`, keyframes, autofill neutralizer, and thin scrollbars.
   - Configure `apps/docs` (`vite.config.ts`, `source.config.ts`, `src/routes/__root.tsx`, `src/styles/app.css`) with **TanStack Start** (`@tanstack/react-start`), **Fumadocs Base UI** (`"fumadocs-ui": "npm:@fumadocs/base-ui@latest"`, `RootProvider` from `fumadocs-ui/provider/tanstack`), and **Fumadocs Story** (`@fumadocs/story/vite`).

---

### WAVE 1: Foundations, Utilities, Engines & 56 UI Primitives (Launch 5 Parallel Subagents + 1 Gatekeeper)

- **Subagent 1A (`GPT-6.1-Sol (low)`) — 48 Pure Base UI Primitives & Brand Logos**:
  - Copy the 48 zero-coupling Base UI primitives from `.reference/foglamp/packages/ui/src/components/` into `packages/design-system/src/ui/`.
  - Copy `brand-logos.tsx` (25 SVGs), `hooks/use-mobile.ts`, `hooks/use-copied.ts`, and `lib/utils.ts` (`cn`).

- **Subagent 1B (`GPT-6.1-Terra (low)`) — 8 Custom-Logic Primitives & `<FoglampLinkProvider>`**:
  - Extract and verify `button.tsx` (7 variants, 8 sizes, `<span>` child wrapping, `nativeButton` heuristic), `badge.tsx` (14 variants + `<span>` wrapping), `button-styles.ts` (`DRAWER_BUTTON_CLASS`), `select.tsx` (recursive `collectSelectItemLabels`), `sheet.tsx` (`variant="floating"`), `table.tsx` (`ResizeObserver` overflow + `interactive` row hover border suppression), `tooltip.tsx` (non-inverted `bg-popover`), and `sonner.tsx`.
  - Create `packages/design-system/src/lib/link-context.tsx` (`<FoglampLinkProvider>`, `<FoglampLink>`).

- **Subagent 1C (`GPT-6.1-Sol (medium)`) — Formatters, Time Ranges, Timeline Math, Payload Normalizer & Leaf Widgets**:
  - Extract `lib/format.ts` (14 cached formatters), `lib/range.ts` (9 presets + `customRange` + `exactRange`), `lib/trace-timeline.ts` (`toMs`, `orderSpans`, `computeWindow`), `lib/payload-messages.ts` (+ `payload-messages.test.ts`), and `hooks/use-app-hooks.ts`.
  - Extract leaf widgets: `model-logo.tsx`, `brand-mark.tsx`, `logo.tsx`, `scan/brand.tsx`, `agent-icon.tsx`, `project-icon.tsx` (`<Image>` → `<img>`), `customer-avatar.tsx`, `tool-icon.tsx`, `span-type.tsx`, `preset-meta.ts`, `copy-icon.tsx`, `copy-button.tsx`, `stat.tsx`, `relative-time.tsx`, `sunset-card.tsx`, `node-flow.tsx`.

- **Subagent 1D (`GPT-6-Luna (medium)`) — `@foglamp/prompts` Diff/Slot Engine & Scan 2-Pass `elkjs` Layout Engine**:
  - Extract `packages/prompts/src/{diff,normalize,infer,slots,index}.ts` (+ unit tests) into `packages/design-system/src/lib/prompts/`.
  - Extract `components/scan/{fold-graph,layout,diff,personality,favicon}.ts` and contract types (`packages/contracts/src/{scan,alerts,instrumentation,v1}.ts`) into `packages/design-system/src/lib/scan/` and `lib/types.ts`.

- **Subagent 1E (`GPT-6.1-Terra (high)`) — Custom `FoglampStoryPanel` Workbench with Creator Attribution**:
  - Build `apps/docs/src/components/story-panel.tsx` and `apps/docs/src/lib/story.tsx` using `defineStoryFactory({ WithControl: FoglampStoryPanel })` from `@fumadocs/story/vite/client`.
  - Include variant preset tabs, live prop controls (`useStoryArgs()`), surface background toggle (`Default`, `Muted`, `Dark Lift`, plus isolated Light/Dark preview toggle), `npx shadcn@latest add` CLI command bar, and a visible footer badge: *"Original Design by Gustavo Fior (@gustavo-fior) · foglamp-labs/foglamp"*.

- **Gatekeeper 1 (`GPT-6-Luna (low)`)**:
  - Verify all Wave 1 exports, run unit tests (`payload-messages`, `prompts`), and confirm zero `next/*` or `trpc` imports in `packages/design-system`.

---

### WAVE 2: Application Widgets, EvilCharts & Live HUD (Launch 5 Parallel Subagents + 1 Gatekeeper)

- **Subagent 2A (`GPT-6.1-Terra (medium)`) — EvilCharts Suite (11 Files), TrendCharts, Breakdowns & Chips/Code Widgets**:
  - Extract all 11 `evilcharts/*` files (`EvilAreaChart` with `BufferDash`, `EvilBarChart` with `GlowFilter`, `EvilLineChart`, `EvilDonutChart`, `EvilBrush`, `ChartBackground` 11 SVG patterns, `ChartDot`, `ChartLegend`, `ChartTooltip`, `useZoomDrag`, `chart.tsx`), `trend-charts.tsx`, `<CostBreakdownView>`, and `<ToolBreakdownView>`.
  - Extract `context-chip.tsx`, `model-chip.tsx`, `prompt-version-chip.tsx`, `code-block.tsx` (Shiki dual-theme singleton), `markdown.tsx` (`Streamdown`), and `animated-api-key.tsx` (`SlotText` chromatic roll).

- **Subagent 2B (`GPT-6.1-Terra (medium)`) — KPI StatCards, Headers, RangePicker & Context Providers**:
  - Extract `page-parts.tsx` (`PageHeader`, `StatCard` with `TickerValue` & `DeltaBadge`, `CardSparkline`, `PillMeter`, `ScrollFade`, `EmptyState`, `NoProjectView`, skeletons), `nav.ts`, `route-header.tsx`, `header-slot.tsx`, `range-picker.tsx` (with `ResizeObserver` compact width morph), `range-context.tsx`, `project-context.tsx`, `quota-card.tsx` (`QuotaCardView`), `theme-switcher.tsx`, and `user-menu.tsx` (`UserMenuView`).

- **Subagent 2C (`GPT-6.1-Terra (high)`) — DataTable Portal-Lifting Toolbar, PayloadView, RunExchange, Prompts & Evals**:
  - Extract `data-table.tsx` (`Toolbar` with `ResizeObserver` + `motion.div layoutId` header portal-lifting, `useFilterGroupItem` instant sibling menu switching, `SearchInput`, `ToggleChip`, `FilterSelect` `>8` option typeahead, `SortableHead`, `PaginationFooter`) and `heat-cell.tsx`.
  - Extract `payload-view.tsx` (`PayloadView`, `ClampedBody`, `JsonBlock`, `Prose`), `run-exchange.tsx` (`DrawerRow`, `DrawerColumns`, `Conversation`, `Bubble`, `JsonBubble`, `ToolChips`), `prompt-prose.tsx` (`PromptProseView`, `SlotChip`), `prompt-versions-card.tsx` (`PromptVersionsView`, `TemplateDiff`), and `eval-scores.tsx` (`SpanScoreDots`, `TraceScorePill`, `ScoreRow`).

- **Subagent 2D (`GPT-6-Luna (high)`) — `TraceTimeline` Multi-Phase Waterfall**:
  - Extract `trace-timeline.tsx` preserving the 3-column `@container` waterfall, `<SpanIconChip>`, `<TimeRuler>`, imperative hover time cursor (`moveCursor`), multi-phase LLM bars (`TtftWait`, vendor brand fill, `modelCallWidthPct`, `thinkingWidthPct`), `groupRepeatedSiblings` `×N` loop folding with vertical tick marks, and `1.2s` linear reveal animation.

- **Subagent 2E (`GPT-6-Luna (high)`) — `FoggyLauncher` Carved SVG Notch, `FoggyWidgetView` Rubber-Band Resize & `FoglampHUD` Shadow DOM**:
  - Extract `foggy/foggy-widget.tsx` (`FoggyLauncher` with `NOTCH_FILL` & `NOTCH_EDGE` 6px border-overlapping SVG corner shelf + `FoggyWidgetView` with `[320..640px]` left-edge pointer drag resize and `rubberBand(excess)` physics), `foggy/foggy-message.tsx`, and `dev-toolbar.tsx` (`DevBarView`).
  - Extract `packages/sdk/src/hud/react/*` (`FoglampHUD` Shadow DOM `<foglamp-hud>` with 240Hz fixed-substep `useSizeSpring`, 8-pixel comet `<Diamond />`, 1-min live timeline with sub-pixel `translateX` remainder, and dotted-leader waterfall, plus `HudInlinePreview` for docs).

- **Gatekeeper 2 (`GPT-6-Luna (low)`)**:
  - Verify all Wave 2 widget exports and run `tsc --noEmit`.

---

### WAVE 3: Full-Page Blocks, 22 Visual Figures, Scan/Setup, Scrollytelling & 3D Hero Demo (Launch 5 Parallel Subagents + 1 Gatekeeper)

- **Subagent 3A (`GPT-6.1-Terra (medium)`) — `FigureKit22Block`, Marketing Chrome, Drifting Fog, Cutting Mat, HUD Sim, Auth & `OriginalAuthorsBlock`**:
  - Extract all **22 landing figures** (`figure-reveal.tsx`, `figure-kit.tsx`, `figures-scenes.tsx`, `figures-costs.tsx`, `figures-traces.tsx`, `figures.tsx`, `figure-picker.tsx`) + `feature/{product-hero,feature-section,visuals}.tsx` + `landing/features.tsx`.
  - Extract `DriftingFogCtaBlock` (`noise-overlay.tsx` 1/4-res `<feTurbulence>` `FogBank`, `cta.tsx`, `cta-agent-details.tsx`, `copy-prompt-button.tsx`, `faq.tsx`, `ask-foggy.tsx`), `CuttingMatFooterBlock` (`navbar.tsx`, `footer.tsx`, `cutting-mat.tsx`), `HudSimulatorBlock` (`hud-landing.tsx`), `LoginFormBlock`, `DeviceApproveBlock`, `OnboardingPanelBlock`, `InstrumentEmptyStateBlock`, `ButtonsBadgesPlaygroundBlock`, and **`OriginalAuthorsBlock` (`about/page.tsx` celebrating Gustavo Fior & Abdul Haidar)**.

- **Subagent 3B (`GPT-6.1-Terra (high)`) — `AppShellBlock` & 7 Canonical Dashboard Page Blocks**:
  - Extract `AppShellBlock` (`app-shell.tsx`) and the 7 reusable Dashboard Page Blocks (`OverviewDashboardBlock`, `TracesExplorerBlock`, `TraceWaterfallInspectorBlock`, `AgentDetailInspectorBlock`, `WorkflowDetailBlock`, `SessionConversationInspectorBlock`, `EvalDetailBlock`) with pre-wired default mock data.

- **Subagent 3C (`GPT-6.1-Terra (high)`) — `ObservabilityGuideBlock` Scrollytelling & `SetupBoardBlock`**:
  - Extract `ObservabilityGuideBlock` (`observability-guide.tsx`, `observability-guide.module.css`, `chapters.ts` with sticky `Workshop` map, courier envelope, 8 station pins incl. ringing Watchtower bell, and 8 interactive chapter widgets).
  - Extract `SetupBoardBlock` (`setup-board.tsx`, `setup-summary.tsx`, `decision-list.tsx` inline sparse `PlanEdits` editor, `verification-report.tsx`).

- **Subagent 3D (`GPT-6-Luna (high)`) — `FlowMapBlock`, `ScanBoardBlock` & `PersonalityCard`**:
  - Extract `scan/flow-map.tsx` (preserving `<BeamPulse>` WAAPI `offsetPath` comets, imperative `hitRings` DOM flashes, `<AgentBeam>` staggered `--beam-phase`, `150ms` `will-change: auto` crisp zoom re-rasterization, `flyTo` camera flights, downstream BFS trace spotlighting), `scan-board.tsx`, `left-rail.tsx`, `changes-card.tsx`, `personality-card.tsx` (7 archetypes + `<feTurbulence>` grain), `share-bar.tsx`, `powered-by.tsx`, and `scan-landing.tsx`.

- **Subagent 3E (`GPT-6-Luna (max)`) — `Hero3DDemoBlock` *(Apex Task #1)***:
  - Extract `landing/hero.tsx`, `hero-demo.tsx`, `demo/entrance.ts`, `demo/piece.tsx`, `demo/index.tsx`, `demo-context.tsx`, `demo-shell.tsx`, `demo-sidebar.tsx`, `demo-chrome.tsx`, all 7 `demo/tabs/*.tsx`, and all 5 `demo/detail/*.tsx` connected to `demo/mock-data.ts`.
  - Verify `transformPerspective: 2400`, unbroken `transform-3d` ancestry, Beat 0's 2-phase dark-mode 8-bit sRGB anti-flicker tween, Beat 1 & Beat 2 `<Piece>` / `<PieceRow>` staggers with `ENTRANCE_TABLE` separated cell shadows, Beat 3 `TILT` → `FLAT` swing, and `DARK_LIFT` tokens.

- **Gatekeeper 3 (`GPT-6-Luna (low)`)**:
  - Verify all Wave 3 block exports and run `tsc --noEmit`.

---

### WAVE 4: Interactive `@fumadocs/story` Files, MDX Documentation & `shadcn` Registry (Launch 8 Parallel Subagents)

- **Subagent 4A (`GPT-6.1-Sol (medium)`) — 56 UI Primitive `.story.tsx` Files**:
  - Generate `apps/docs/src/stories/primitives/<name>.story.tsx` for all 56 primitives in `packages/design-system/src/ui/`.

- **Subagent 4B (`GPT-6.1-Sol (high)`) — 49 App Widget & 11 EvilCharts `.story.tsx` Files**:
  - Generate `apps/docs/src/stories/widgets/*.story.tsx` and `apps/docs/src/stories/charts/*.story.tsx` with rich presets and interactive controls.

- **Subagent 4C (`GPT-6.1-Sol (high)`) — 18 Block & 22 Figure `.story.tsx` Files**:
  - Generate `apps/docs/src/stories/blocks/*.story.tsx` covering all 18 blocks and all 22 landing figures.

- **Subagent 4D (`GPT-6.1-Sol (high)`) — Credits, Foundations & 56 UI Primitives `.mdx` Docs**:
  - Author `content/docs/index.mdx`, **`content/docs/credits.mdx` (prominent tribute to Gustavo Fior `@gustavo-fior`, Abdul Haidar, and Foglamp Labs embedding `<OriginalAuthorsBlock />`)**, `foundations/*.mdx`, and all 56 `primitives/*.mdx` pages.

- **Subagent 4E (`GPT-6.1-Sol (high)`) — App Widgets, AI Inspectors & EvilCharts `.mdx` Docs**:
  - Author all `content/docs/widgets/*.mdx` and `content/docs/charts/*.mdx` pages with `<story.WithControl />`, prop tables, and attribution footers.

- **Subagent 4F (`GPT-6.1-Sol (high)`) — 22 Figures, Blocks, Scan/Setup, Scrollytelling & HUD `.mdx` Docs**:
  - Author all `content/docs/figures/*.mdx` and `content/docs/blocks/*.mdx` pages.

- **Subagent 4G (`GPT-6.1-Sol (medium)`) — `shadcn/ui` Registry Manifest & `/public/r/*.json` Builder**:
  - Build `packages/registry/registry.json` (with `author: "Gustavo Fior (@gustavo-fior) & Foglamp Labs"`, `homepage: "https://github.com/foglamp-labs/foglamp"`) and `scripts/build-registry.ts`, emitting static `/r/<name>.json` files into `apps/docs/public/r/`.

- **Subagent 4H (`GPT-6.1-Sol (low)`) — Portal Homepage with Prominent Creator Shoutout & Navigation `meta.json` Trees**:
  - Build `apps/docs/src/routes/index.tsx` featuring a top attribution banner & hero callout honoring **Gustavo Fior (`@gustavo-fior` / `gustavofior.com` / `@heyimgustavo`)** and **Foglamp Labs (`foglamp-labs/foglamp`)**, the live 3-Beat `Hero3DDemoBlock`, interactive component showcase, `OriginalAuthorsBlock`, `DriftingFogCtaBlock`, and `CuttingMatFooterBlock`.
  - Generate all `meta.json` navigation files and barrel `index.ts` exports.

---

### WAVE 5: End-to-End Verification, Build & Pixel-Parity Audit
1. **Task 5.1 (`GPT-6.1-Sol (low)`) — Static & Build Verification**:
   - Run `bun run check-types` (`tsc --noEmit`) across `packages/design-system`, `packages/registry`, and `apps/docs` until 0 errors remain.
   - Run `bun test` / `vitest run` on all extracted unit tests (`prompts`, `payload-messages`, `format`, `range`, `scan/diff`).
   - Verify all `/public/r/*.json` registry files are generated and valid JSON.
   - Run `bun run build` in `apps/docs` to confirm the TanStack Start + Fumadocs MDX + `@fumadocs/story` production build succeeds cleanly.
2. **Task 5.2 (`GPT-6-Luna (max)`) — Final Whole-Portal Pixel-Parity & Attribution Audit *(Apex Task #2)***:
   - Start the `apps/docs` server and inspect the rendered portal in both **Light Mode** and **Dark Mode**:
     - Verify prominent shoutout & links to **Gustavo Fior (`@gustavo-fior`)**, **Abdul Haidar**, and **Foglamp Labs (`foglamp-labs/foglamp`)** on the homepage hero, navbar, footer, `/docs/credits`, `/docs`, and every `FoglampStoryPanel`.
     - Verify all 18 `--custom-shadow*` tokens, `squircle:*` corner shapes, 3-Beat `Hero3DDemoBlock`, `TraceTimeline`, `EvilCharts`, `FlowMap` (`elkjs` + `BeamPulse`), `PromptVersionsView`, `FoggyLauncher` carved corner notch, `FoggyWidgetView` rubber-band resize, `ObservabilityGuideBlock`, and `FoglampHUD` work interactively with zero console or hydration errors.
   - Only emit `<!-- GOAL_COMPLETE -->` once every single check passes.
/goal
````
