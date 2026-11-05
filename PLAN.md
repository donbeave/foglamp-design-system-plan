# Foglamp Design System Extraction: Deep Analysis & Cost-Optimized Execution Plan

> [!IMPORTANT]
> **Massive Shoutout & Credit to the Original Creator:**
> This entire design system is extracted AS-IS from **[Foglamp (`foglamp-labs/foglamp`)](https://github.com/foglamp-labs/foglamp)**, created by **Gustavo Fior ([@gustavo-fior](https://github.com/gustavo-fior) · [gustavofior.com](https://gustavofior.com) · [@heyimgustavo](https://x.com/heyimgustavo) · [LinkedIn](https://www.linkedin.com/in/gustavofior))** together with co-founder **Abdul Haidar ([LinkedIn](https://www.linkedin.com/in/abdulhdr/))** at **Foglamp Labs** ([foglamp.dev](https://foglamp.dev)).
> Every surface in this repository, the extracted `@foglamp/design-system` package, the `shadcn` registry, and the `Fumadocs + BaseUI + TanStack Start + Fumadocs Story` documentation portal must prominently credit **Gustavo Fior** and **Foglamp Labs**.

> [!CAUTION]
> **Golden Rule — Visual & Behavioral Immutability ("AS-IS"):**
> Every primitive, widget, chart, block, animation, shadow token, squircle curve, and interaction extracted from [`foglamp-labs/foglamp`](https://github.com/foglamp-labs/foglamp) **must remain 100% visually and behaviorally identical** to the source project in both Light and Dark modes. Never replace custom shadows with CSS borders, never alter easing curves or spring physics, and never substitute icon sets or font axes.

---

## 1. Deep Architectural & Visual DNA Analysis of `foglamp`

### 1.1 Core Stack & Design Philosophy
Foglamp's interface is built on a highly disciplined, custom-tokenized foundation documented in `FRONTEND.md`, `packages/ui/src/styles/globals.css`, and `apps/web/src/index.css`:

| Layer | Source Technology in `foglamp` | Design System Extraction Target |
| :--- | :--- | :--- |
| **Headless UI Primitives** | `@base-ui/react` (`^1.4.0`) + `shadcn` (`^4.12.0`, `style: "base-vega"`) using Base UI `render` prop polymorphism (never Radix `asChild`) | Preserve `@base-ui/react` + `render` prop pattern 1:1 across all 56 primitives |
| **Styling Engine** | Tailwind CSS v4 (`@tailwindcss/postcss`) + `tw-animate-css` (`^1.4.0`) + `class-variance-authority` (`^0.7.1`) | Identical Tailwind v4 `@theme inline` + `@custom-variant` pipeline |
| **Corner Geometry** | `@toolwind/corner-shape` (`^0.0.8-3`) + `@custom-variant squircle (@supports (corner-shape: squircle))` | Progressive squircle radii (`rounded-lg squircle:rounded-3xl corner-squircle`, etc.) |
| **Surface Separation** | **Shadow-as-Border System**: 18 multi-layered `box-shadow` CSS variables (`--custom-shadow*`) instead of CSS `border` / `divide-*` | Full 18-token `--custom-shadow*` system in Light & Dark modes + `.border-overlay` + `.foggy-inset-closed` |
| **Typography** | Self-hosted `InterVariable.woff2` + `InterVariable-Italic.woff2` (`rsms/inter` with full `opsz` axis) as `--font-sans`; `Geist Mono` as `--font-mono`; `Host Grotesk` as `--font-display` | Bundle canonical `InterVariable` `.woff2` files + `Geist Mono` + `Host Grotesk` variables |
| **Iconography** | `@tabler/icons-react` (`^3.41.1`) — **filled variant (`*Filled`) preferred** at `size-3.5` default (`size-3` compact, `size-4` emphasis) + 25 custom vector `BrandLogos` | Preserve `@tabler/icons-react` + `BrandLogos` + `ModelLogo` |
| **Motion & Physics** | `tw-animate-css`, `motion/react` (`^12.40.0`), WAAPI (`el.animate`), custom 240Hz rAF spring (`useSizeSpring`), `slot-text` (`^0.2.2`), `border-beam` (`^1.2.0`) | Preserve every spring, keyframe, 3D assembly beat, and WAAPI animation |

---

### 1.2 The 5 Visual Signatures That Make Foglamp Unique (Must Never Break)

#### Signature 1: Multi-Layer Optical Shadow-as-Border Tokens (`--custom-shadow*`)
Foglamp forbids `border`, `border-*`, and `divide-*` on cards, popovers, buttons, and badges. Instead, it uses multi-stop `box-shadow` tokens that adapt physically between Light and Dark modes:
- **Light Mode (`:root`)**: Crisp `0.5px` perimeter ring (`0px 0px 0px 0.5px rgba(0, 0, 0, 0.06)`) + two-stage micro drop shadow (`0px 0.5px 2px -0.5px rgba(0, 0, 0, 0.06), 0px 1px 4px 0px rgba(0, 0, 0, 0.04)`).
- **Dark Mode (`.dark`)**: Flips to a top specular bevel (`inset 0 0.75px 0 0 rgba(255, 255, 255, 0.03)`), inner highlight ring (`inset 0 0 0 0.75px rgba(255, 255, 255, 0.03)`), outer dark hairline (`0 0 0 0.75px rgba(0, 0, 0, 0.1)`), and 3-stage elevation shadow (`2px`, `4px`, `8px`).
- **Complete 18-Token Shadow Palette**:
  1. `--custom-shadow` (default card/popover/surface)
  2. `--custom-shadow-chrome` (hero demo frame with upward `-1px 4px` cast + deep drop)
  3. `--custom-shadow-lifted` (floating cards above cards)
  4. `--custom-outline-shadow` (outline buttons: crisp 0.5px light ring / dark inset highlight ring)
  5. `--custom-shadow-primary` (primary button & badge: `inset 0 0.5px 0 rgba(255,255,255,0.45)` top bevel in dark mode)
  6. `--custom-shadow-secondary` (secondary button & badge)
  7. `--custom-shadow-destructive` (destructive rose-tinted hairline + drop)
  8. **11 Chromatic Shadow Tokens**: `--custom-shadow-green`, `--custom-shadow-blue`, `--custom-shadow-amber`, `--custom-shadow-orange`, `--custom-shadow-emerald`, `--custom-shadow-rose`, `--custom-shadow-red`, `--custom-shadow-slate`, `--custom-shadow-violet`, `--custom-shadow-fuchsia`, `--custom-shadow-sky`.

#### Signature 2: Dual-Mode Form Control Surface Strategy
Form controls (`Input`, `Textarea`, `SelectTrigger`, `InputGroup`, `NativeSelect`, `ComboboxChips`, `InputOTPSlot`, `Toggle` outline, `ToggleGroup`, `Kbd`) use a distinct light-vs-dark recipe:
- **Light mode**: Borderless `bg-background` or `bg-transparent` with `shadow-(--custom-shadow)`.
- **Dark mode**: Turns off the shadow (`dark:shadow-none`) and switches to a hairline translucent border (`dark:border-[0.5px] dark:border-border/50` or `dark:border dark:border-border/50`) over `dark:bg-input/30`.
- **Recessed Drawer Surface Override (`DRAWER_BUTTON_CLASS`)**: Secondary buttons inside muted expandable run drawers use `bg-background shadow-(--custom-outline-shadow)` in light mode (so they don't wash out against `bg-neutral-100`) and `dark:bg-secondary dark:shadow-[var(--custom-shadow-secondary)]` in dark mode.

#### Signature 3: Progressive Squircle Hierarchy (`@toolwind/corner-shape`)
Because CSS `corner-shape: squircle` curves look less round than circular arcs at the same radius, Foglamp pairs a smaller circular fallback radius with a larger squircle radius under `@custom-variant squircle (@supports (corner-shape: squircle))`:
- **Dialogs, AlertDialogs, Floating Sheets**: `rounded-2xl squircle:rounded-[40px] corner-squircle`
- **Quota Cards, Scan LeftRail/ChangesCard**: `rounded-3xl squircle:rounded-[40px] corner-squircle` / `rounded-[36px]`
- **Empty States, Foggy Composer**: `rounded-xl squircle:rounded-4xl corner-squircle`
- **Cards, Alerts, Popovers, Command, SidebarInset, User Bubbles**: `rounded-lg squircle:rounded-3xl corner-squircle`
- **Inputs, Selects, Dropdowns, ContextMenus, Tooltips, HoverCards, Skeletons, TabsList, Toggle**: `rounded-md squircle:rounded-2xl corner-squircle`
- **InputGroups, Textareas, SidebarMenuButtons, TabsTriggers**: `rounded-md squircle:rounded-xl corner-squircle`
- **Kbd**: `rounded-sm squircle:rounded-[14px] corner-squircle`
- **Buttons, Badges, SearchInputs, Menubars**: Full circular pills (`rounded-full` / `corner-round!`).

#### Signature 4: Tactile Button & Badge Optical Engineering
- **`Button`** (`packages/ui/src/components/button.tsx`):
  - Full pill (`rounded-full`), tactile press scale (`active:scale-[0.97]`), 7 variants (`default`, `outline`, `secondary`, `ghost`, `ghost-destructive`, `destructive`, `link`), 8 sizes (`default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`).
  - Wraps bare string/number children in `<span>{child}</span>` so CSS `has-[>svg:first-child]` and `has-[>svg:last-child]` accurately detect leading/trailing icons and tighten padding on the icon side (`pl-2.5` vs `px-3`).
  - Auto-infers Base UI `nativeButton={nativeButton ?? props.render === undefined}` so `<Button render={<Link href="..." />}>` never triggers `<button>`-inside-`<a>` warnings.
- **`Badge`** (`packages/ui/src/components/badge.tsx`):
  - 14 variants (`default`, `secondary`, `destructive`, `outline`, plus 10 chromatic variants `green`, `blue`, `amber`, `orange`, `emerald`, `rose`, `red`, `violet`, `fuchsia`, `sky`), 3 sizes (`sm`, `md`, `lg`), with matching `<span>` child wrapping.
- **Tinted Icon Chips (Light vs. Dark Mode Recipe)**:
  - Small icon badges (`nav.ts`, `span-type.tsx`, `trace-timeline.tsx`, `eval-scores.tsx`, `foggy-widget.tsx`) use `bg-<color>-500/15 text-<color>-600 dark:text-<color>-400` with an accent-tinted inset ring + drop shadow in light mode (`shadow-[inset_0_0_0_1px_rgba(R,G,B,0.14),0_2px_6px_-2px_rgba(R,G,B,0.25)]`) and `dark:shadow-(--custom-shadow)` in dark mode.

#### Signature 5: Zero-Flash Loading & High-Craft Micro-Interactions
- **120ms Delayed Skeleton + One-Shot Page Entrance**: `useDelayedLoading(loading, 120)` prevents skeleton flashes on fast responses; `useEntranceOnce()` + `useSkeletonShown()` ensure `.page-fade-in` (`75ms ease-out`) plays once on initial load and never re-triggers when data replaces a skeleton.
- **Table Hover Border Suppression**: `TableRow` with `interactive` hides both its own bottom border and the **previous row's** bottom border on hover (`has-[+tr[data-interactive]:not([aria-expanded=true]):hover]:border-transparent`) so row hover highlights look seamlessly floating.
- **Carved SVG Corner Shelf (`FoggyLauncher`)**: When the Foggy AI panel is closed, `SidebarInset` sets `borderBottomRightRadius: 0` (`.foggy-inset-closed`) and `FoggyLauncher` overlays two SVG paths (`NOTCH_FILL` + `NOTCH_EDGE`) that overlap the inset's `0.5px` ring by `6px` so the panel border appears to bend continuously around the launcher button.

---

## 2. Official OpenAI Cost-Optimized Model & Effort Pyramid (`Luna` < `Terra` < `Sol`)

Backed by OpenAI's official pricing and benchmark reports ([GPT-6 Luna `$0.10/$0.50`](https://developers.openai.com/api/docs/models/gpt-6-luna), [GPT-6.1 Terra `$1.00/$5.00`](https://developers.openai.com/api/docs/models/gpt-6.1-terra), [GPT-6.1 Sol `$2.00/$10.00`](https://developers.openai.com/api/docs/models/gpt-6.1-sol), [Model Selection Guide](https://developers.openai.com/api/docs/guides/model-selection), and [Responses Multi-Agent Guide](https://developers.openai.com/api/docs/guides/responses-multi-agent)), work is distributed across a **10-Rung Inverted Cost Pyramid** so **`GPT-6-Luna` handles ~72% of the total work**, **`GPT-6.1-Terra` handles ~21%**, and **`GPT-6.1-Sol` handles ~7%**:

| Model & Effort Tier | Share of Total Work | API Price (In / Cached / Out) | Official OpenAI Strength & Assigned Workload |
| :--- | :---: | :---: | :--- |
| **`GPT-6-Luna (low)`** | **~26%** | `$0.10 / $0.01 / $0.50` | *"Fine-grained edits, well-scoped problem-solving, and simple data extraction"* (`180M TPM`): Verbatim file copies (48 decoupled Base UI primitives, 25 `BrandLogos`, `.woff2` fonts, `ai-workshop.webp`, 2,094-line `mock-data.ts`), barrel `index.ts` files, `meta.json` navigation trees, and running `tsc` / `vitest` / `shadcn build` / `bun run build`. |
| **`GPT-6-Luna (medium)`** | **~20%** | `$0.10 / $0.01 / $0.50` | Balanced default worker reasoning: Pure TS utilities (`format.ts`, `range.ts`, `trace-timeline.ts`, `payload-messages.ts`, `hooks.ts`), simple leaf widgets (`ModelLogo`, `AgentIcon`, `ProjectIcon`, `CustomerAvatar`, `ToolIcon`, `SpanTypeChip`, `CopyIcon`, `CopyButton`, `Stat`, `RelativeTime`, `SunsetCard`, `NodeFlow`), all 56 UI primitive `.story.tsx` files, and `registry.json` generation. |
| **`GPT-6-Luna (high)`** | **~16%** | `$0.10 / $0.01 / $0.50` | High-volume template-driven docs & single-file widget decoupling: Component reference `.mdx` pages (`primitives/*`, `widgets/*`, `charts/*`, `figures/*`, `blocks/*`), standard widget/figure `.story.tsx` files, and decoupling single-file moderate widgets (`PageHeader`, `StatCard`, `RangePicker`, `CodeBlock`, `Markdown`, `AnimatedApiKey`, `ContextChip`, `QuotaCardView`, `ThemeSwitcher`, `UserMenuView`). |
| **`GPT-6-Luna (max)`** | **~10%** | `$0.10 / $0.01 / $0.50` | **`66.6%` DeepSWE v1.1 at 1/10th `Terra`'s token rate** (*"Solving problems with clear constraints"*): Verifying the 8 custom-logic primitives (`Button`, `Badge`, `DRAWER_BUTTON_CLASS`, `Select` auto-label collector, `Sheet` floating variant, `Table` `ResizeObserver` + `interactive` row, `Tooltip`, `Sonner`), `<FoglampLinkProvider>`, `@foglamp/prompts` LCS diff/slot engine, all 11 `evilcharts/*` files + `CostBreakdownView` & `ToolBreakdownView`, all **22 Landing Figures**, `DriftingFogCtaBlock`, `CuttingMatFooterBlock`, `HudSimulatorBlock`, Auth/Onboarding blocks, and `OriginalAuthorsBlock`. |
| **`GPT-6.1-Terra (low)`** | **~5%** | `$1.00 / $0.05 / $5.00` | *"Clear, natural writing based on supplied material"* + **>3× faster** gatekeeper checks: Flagship narrative prose (`index.mdx`, `credits.mdx` tribute to **Gustavo Fior** `@gustavo-fior` & **Foglamp Labs**, `foundations/*.mdx`) + inter-wave architectural gatekeeper verifying zero `next/*` or `trpc` leaks. |
| **`GPT-6.1-Terra (medium)`** | **~9%** | `$1.00 / $0.05 / $5.00` | **`MMMU-Pro` Visual Reasoning & Scoped Multi-Component Engineering**: Wave 0 TanStack Start + `@fumadocs/base-ui` + `@fumadocs/story` + Tailwind v4 CSS token pipeline (`globals.css` + `effects.css`), `scan/layout.ts` 2-pass `elkjs` orthogonal layout math, `FoglampStoryPanel`, `PayloadView` + `RunExchange` drawers, `PromptProseView` (`SlotChip`) + `PromptVersionsView` (`TemplateDiff`), `EvalScores`, `AppShellBlock`, and 7 Dashboard Page Blocks. |
| **`GPT-6.1-Terra (high)`** | **~7%** | `$1.00 / $0.05 / $5.00` | **`Terminal-Bench 4.0` (`50.3%` layout-shift mastery) & `Agents' Last Exam` Computer-Use QA**: `DataTable` + `Toolbar` (`ResizeObserver` + `motion.div layoutId` header portal-lifting + `FilterSelect` typeahead), `ObservabilityGuideBlock` sticky scrollytelling, `SetupBoardBlock` patch editor, and **Live Browser Computer-Use Visual QA** across Light & Dark modes. |
| **`GPT-6.1-Sol (low)`** | **~2%** | `$2.00 / $0.10 / $10.00` | **Official `multi_agent` Root Coordinator (`/root`)** (`2.1%` broken-tool failure rate vs `28.7%` on `Luna`; `-32%` factual error reduction at `low` effort): Dispatches parallel subagent waves, tracks `TASKS.md` state, enforces wave gates, and handles escalations. **Never writes implementation code.** |
| **`GPT-6.1-Sol (medium)`** | **~3.5%** | `$2.00 / $0.10 / $10.00` | **`DeepSWE v1.1` (`75.2%`) — *"Complex technical work and coordinated deliverables"* **: `TraceTimeline` multi-phase waterfall, `FlowMapBlock` + `ScanBoardBlock` (`<BeamPulse>` WAAPI comets + crisp zoom) + `PersonalityCard`, `FoggyLauncher` 6px SVG corner shelf + `FoggyWidgetView` rubber-band resize, and `FoglampHUD` Shadow DOM 240Hz spring. |
| **`GPT-6.1-Sol (high)`** | **~1.5%** *(2 Tasks Only)* | `$2.00 / $0.10 / $10.00` | *"Polished deliverables, connected visual systems, and decisions built from conflicting evidence"*: **Apex Task 1**: `Hero3DDemoBlock` (3-Beat `transform-3d` perspective assembly + Beat 0 dark-mode 8-bit sRGB anti-flicker tween + 7-tab / 5-detail interactive `DashboardDemo`).<br>**Apex Task 2**: Final Whole-Portal Connected Visual System & Attribution Sign-Off. |

---

## 3. Documentation Portal Architecture (`apps/docs`)

- **Framework**: **TanStack Start** (`@tanstack/react-start`, `@tanstack/react-router`, Vite)
- **Documentation UI**: **Fumadocs Base UI** (`"fumadocs-ui": "npm:@fumadocs/base-ui@latest"`, `@base-ui/react`, `RootProvider` from `fumadocs-ui/provider/tanstack`)
- **Component Workbench**: **Fumadocs Story** (`@fumadocs/story`, `@fumadocs/story/vite`, `defineStoryFactory({ WithControl: FoglampStoryPanel })`)
- **shadcn Registry**: Static JSON payloads emitted to `apps/docs/public/r/<name>.json` so any primitive, widget, chart, figure, or block can be installed via `npx shadcn@latest add`.
- **Prominent Creator Attribution**:
  - Top banner & Hero callout on `/`: *"Original Design & Engineering by **Gustavo Fior (@gustavo-fior)** & **Foglamp Labs** ([foglamp-labs/foglamp](https://github.com/foglamp-labs/foglamp))"*
  - Dedicated `/docs/credits` page rendering `<OriginalAuthorsBlock />` (`about/page.tsx` AS-IS honoring **Gustavo Fior** and **Abdul Haidar**)
  - Attribution link in `FoglampStoryPanel`, `MarketingNavbar`, and `CuttingMatFooterBlock`.

## Wave 6 extension — superseding earlier instructions

The complete, controlling Wave 6 task contract and exact attribution/header templates are in [GOAL-WAVE-6-FRAMEROCK.md](GOAL-WAVE-6-FRAMEROCK.md). Preserve Waves 0–5 and finish and commit all Wave 5 fixes and W5-5.2 before beginning W6-6A. Wave 5 no longer completes the extended goal. Execute W6-6A → W6-6B → W6-6C → W6-6D → W6-GATE in order; each task has exclusive ownership during its sequential turn, as recorded in task-index.json. The earlier two-task reservation for foglamp_sol_high is superseded solely to authorize W6-GATE as a third task.

Framerock (`@tailrocks/framerock`) is Tailrocks’ Web UI sibling to Termrock. Supersede earlier package/portal branding, registry publisher/homepage, and OriginalAuthorsBlock/photo requirements as specified in the contract. Preserve all other extracted visual and behavioral work, including all 18 shadows, corner-squircle and corner-bevel, DRAWER_BUTTON_CLASS, Hero 3-beat choreography, TraceTimeline, FlowMap and HUD physics. Maintain prominent truthful credit and Apache-2.0 compliance. Founder photo/file checks apply to project files and generated assets; the ignored, read-only `.reference/foglamp` upstream checkout remains intact. Tailrocks package metadata does not authorize moving or renaming the existing implementation GitHub remote.

W6-GATE verifies provenance against pinned upstream bodies, registry payload notices, public attribution, anti-impersonation and the full build/test suite. The coordinator records accepted task states, commits and pushes both repositories, verifies implementation HEAD equals origin/main and the working tree is clean, then alone emits `<!-- GOAL_COMPLETE -->`.
