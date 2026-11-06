# Extend the Current Running `/goal`: Wave 7 — Exhaustive Post-Review Remediation, Component Purity, Consumer TypeScript, Story Workbench & Portal Polish (`@tailrocks/framerock`)

> **IMPORTANT — EXTEND THE CURRENT RUNNING GOAL:**
> Do **not** discard the completed Waves 0–6 implementation in `/Users/donbeave/Projects/donbeave/foglamp-design-system` (`fa5da0c04cb9275db076e2128d9feb81d4fce839`) or the planning/QA tracking in `/Users/donbeave/Projects/donbeave/foglamp-design-system-plan`.
> An exhaustive 8-subagent deep review (static AST/diff against `.reference/foglamp` at `7d7e6609108019a74902858d4b07c24825c6318b`, all 266 extracted source files, all 167 `.story.tsx` workbenches, all 175 `.mdx` docs pages, all 290 registry JSON files, package exports, strict/non-strict consumer `tsc`, and headless-Chrome live interactive stress testing on `http://localhost:3000`) uncovered **15 critical/major defect groups (`P0`–`P2`)** that must be fixed in **Wave 7** before final sign-off.
> Extend `results/run-state.json` and `PLAN.md` in `/Users/donbeave/Projects/donbeave/foglamp-design-system-plan` with **Wave 7: Post-Review Remediation & Polish**, fix every issue listed below at the root cause, verify in a real headless browser and fresh consumer project, and commit/push both repositories.

---

## Core Invariant Reminder: 100% Visual & Behavioral Parity (`AS-IS` Extraction)

Every extracted UI primitive, widget, chart, figure, HUD component, and block in `packages/design-system/src/` must look, animate, and behave **100% AS-IS** compared to `.reference/foglamp` (`7d7e6609108019a74902858d4b07c24825c6318b`).
- **NEVER inject custom attribution banners, extra links, or extra DOM nodes inside reusable design-system components.**
- Attribution and provenance belong in:
  1. SPDX file headers (`LICENSE`, `NOTICE`, `THIRD-PARTY-NOTICES.md`, top-of-file comment),
  2. Registry item metadata (`packages/registry/registry.json`, `apps/docs/public/r/*.json`), and
  3. **Portal chrome / documentation layout** (`apps/docs/`) — **never** hardcoded inside the reusable components in `packages/design-system/src/`.

---

## P0-1. Restore 1:1 Component Purity in `MarketingNavbar` and `CuttingMatFooterBlock` (Remove Injected Attribution DOM)

### What Is Broken
1. **`packages/design-system/src/blocks/marketing/chrome/navbar.tsx:146-158` and `:201-213`**:
   - Wave 6 injected a hardcoded `<div className="hidden min-w-0 flex-col items-end text-right text-[10px] leading-tight text-muted-foreground lg:flex">` (`"Original Design by Gustavo Fior · Foglamp Labs..."`) inside the desktop `<header>` flex container and a second `<div className="border-t border-border/50 px-5 py-1.5 text-[11px] text-muted-foreground lg:hidden">` mobile sub-bar at the bottom of `<header>`.
   - This corrupts the visual layout of `MarketingNavbar` for every consumer of `@tailrocks/framerock` and violates 1:1 visual parity with `.reference/foglamp/apps/web/src/components/marketing/navbar.tsx`.
2. **`packages/design-system/src/blocks/marketing/chrome/footer.tsx:113-139` and `:168-190`**:
   - Lines `168-190` inject an extra `<div className="relative z-10 mx-auto max-w-7xl px-5 pb-5 text-center sm:px-8">` with 5 external attribution links right above `<CuttingMat />`.
   - Lines `113-139` leave `function BrazilFlag()` as **unused dead code** because its call site in the copyright row (`line 151`) was deleted when replacing upstream's `"Crafted by Gustavo Fior"` + `<BrazilFlag />`!
3. **`scripts/verify-portal.ts:236-237`**:
   - Hardcodes a check that `navbar.tsx` and `footer.tsx` contain those injected strings.

### Required Fix
1. In `packages/design-system/src/blocks/marketing/chrome/navbar.tsx`, remove the injected desktop and mobile attribution `<div>` blocks (`lines 146-158` and `201-213`) so `MarketingNavbar` renders 100% identically to `.reference/foglamp/apps/web/src/components/marketing/navbar.tsx` (while keeping configurable props `brandName`, `links`, `homeHref`, `loginHref`, `dashboardHref`).
2. In `packages/design-system/src/blocks/marketing/chrome/footer.tsx`, remove the injected attribution `<div>` (`lines 168-190`) and restore the `<BrazilFlag />` call site in the copyright row (`line 151`) so `CuttingMatFooterBlock` renders 100% identically to `.reference/foglamp/apps/web/src/components/marketing/footer.tsx` (and add optional configurable props `brandName?: string`, `columns?: FooterColumn[]`, `copyrightText?: string` defaulting to upstream values).
3. Update `scripts/verify-portal.ts:236-237` to assert that portal attribution lives in `apps/docs/src/routes/index.tsx` and `apps/docs/content/docs/credits.mdx`, **not** inside `packages/design-system/src/blocks/marketing/chrome/{navbar,footer}.tsx`.

---

## P0-2. Fix Portal Homepage (`/`) Clutter, Mobile Horizontal Overflow, Broken Punctuation Spacing, & 3D Hero Overlap (`apps/docs/src/routes/index.tsx`)

### What Is Broken
1. **4 Stacked Attribution Blocks Above `<Hero3DDemoBlock />` (`apps/docs/src/routes/index.tsx:58-74`)**:
   - Currently `/` renders: (1) the mutated `MarketingNavbar` attribution banner, (2) a top attribution pill (`lines 60-63`), (3) a huge 4-paragraph `<section aria-label="Original authorship and attribution">` card (`lines 64-72`), and (4) an orphan `<p>` tagline (`line 73`) — pushing `<Hero3DDemoBlock />` (`line 75`) below the fold (`y = 668px` on desktop, `y = 1138px` on mobile).
2. **Mobile Horizontal Viewport Overflow (`408px > 390px`)**:
   - On `390×844` mobile viewports, the unbreakable 40-character commit SHA `7d7e6609108019a74902858d4b07c24825c6318b` inside `<code>` at `apps/docs/src/routes/index.tsx:66` overflows the card (`scrollWidth = 408px > 390px`), causing horizontal page scrolling.
3. **Broken Punctuation Spacing in Top Pill (`apps/docs/src/routes/index.tsx:60-63`)**:
   - Because the `<p>` has `inline-flex flex-wrap items-center gap-x-1.5`, every child `<a>` and text node is a flex item separated by `6px` gaps, rendering `"Foglamp Labs ,"` and `"Apache-2.0 ."` with awkward spaces before commas and periods.
4. **3D Hero Entrance Animation Overlaps `"INTERACTIVE STORY"` Section Below (`apps/docs/src/routes/index.tsx:75-78`)**:
   - During the first ~3.5 seconds of page load, `<Hero3DDemoBlock />`'s 3D tilted perspective transform (`scale: 1.15, y: 60, rotateZ: -6`) visually overflows downward and collides directly on top of the `"INTERACTIVE STORY / Inspect the live workbench..."` heading in `<section className="mx-auto max-w-6xl px-6 py-16">`.
5. **Duplicate Links to `/docs/primitives/button` (`apps/docs/src/routes/index.tsx:13-17` & `:28`)**:
   - Both `"Primitives"` and `"Components"` link to `/docs/primitives/button`.

### Required Fix
1. **Above the Fold on `/`**: Render `<MarketingNavbar brandName="Framerock" ... />` followed by **one** compact, tasteful attribution callout bar (single `<p>` with normal inline text flow — **not** `inline-flex gap-x-1.5` — crediting **Gustavo Fior (`@gustavo-fior`)**, **Abdul Haidar**, and **Foglamp Labs (`foglamp-labs/foglamp`)** under Apache-2.0 with a `"Read full origin & credits →"` link to `/docs/credits`), and then **immediately render `<Hero3DDemoBlock />`** so the 3D hero is front-and-center above the fold!
2. **Relocate the Full 4-Paragraph Origin & Tribute Card**: Move the detailed 4-paragraph Origin & Tribute card (with the Steve Jobs quote, Gustavo Fior & Abdul Haidar links, short commit link `7d7e660` with `break-all`/`font-mono` pointing to the full 40-char GitHub commit URL so it never overflows `390px` mobile screens, Tailrocks humility note, and non-affiliation disclaimer) to a dedicated section **below `<Hero3DDemoBlock />`** (above `<ObservabilityGuideBlock />` or `<CuttingMatFooterBlock />`). Remove the orphan `<p>` at line 73.
3. **Prevent 3D Hero Overlap**: Add sufficient bottom spacing/margin or overflow containment below `<Hero3DDemoBlock />` on `apps/docs/src/routes/index.tsx:75-78` so the 3D tilted hero entrance never overlaps the `"INTERACTIVE STORY"` section below it.
4. **Fix Navigation Links (`apps/docs/src/routes/index.tsx:13-31`)**: Point `"Components"` or `"Blocks"` to `/docs/blocks/hero-3d-demo-block` or `/docs/widgets/data-table` so no two items duplicate `/docs/primitives/button`.

---

## P0-3. Eliminate Quadruple Attribution & Duplicate `<StoryProvenance />` Cards on All 167 Component Pages (`story-panel.tsx`, `provenance.tsx`, & `scripts/docs-provenance/sync.mjs`)

### What Is Broken
Every single one of the 167 component pages (`/docs/primitives/*`, `/docs/widgets/*`, `/docs/charts/*`, `/docs/figures/*`, `/docs/blocks/*`) renders **4 attribution/provenance blocks**:
1. `apps/docs/src/components/story-panel.tsx:62`: `<div className="border-t px-3 py-2"><StoryProvenance ... /></div>` (which renders an `<aside className="not-prose my-6 rounded-lg border bg-card p-4 ...">` card nested inside a `px-3 py-2` workbench row!).
2. `apps/docs/src/components/story-panel.tsx:63`: `<footer className="border-t px-3 py-2 text-xs text-muted-foreground">Original Design by Gustavo Fior...</footer>`.
3. Every `.mdx` file (`primitives/*.mdx:21`, `widgets/*.mdx:17`, `charts/*.mdx:17`, `figures/*.mdx:17`, `blocks/*.mdx:17`): A **second identical `<StoryProvenance />` card** right below `<story.WithControl />` (confirmed in `results/qa/w6-final-signoff/ssr-proof.json`: `"asideCount": 2`).
4. Every `.mdx` file: A **fourth `## Attribution` section / trailing paragraph** at the bottom of all 167 component MDX files (plus trailing blockquotes in all 6 `foundations/*.mdx` files).

### Required Fix
1. **Single Integrated Provenance Footer Bar Inside `FoglampStoryPanel` (`apps/docs/src/components/story-panel.tsx:62-63` & `apps/docs/src/components/provenance.tsx`)**:
   - Replace lines `62-63` of `story-panel.tsx` with **one** clean, compact footer bar at the bottom of the workbench card (`<StoryProvenance />` redesigned as a sleek `border-t bg-muted/20 px-3 py-2 text-xs text-muted-foreground` bar, **not** a nested `my-6 p-4 border rounded-lg` box).
   - That single bar must display:
     - The provenance badge pill (`1:1 Copied` | `Modified (Import/Prop Decoupled)` | `Newly Added by Tailrocks`),
     - Clickable link to the exact upstream source file at `7d7e6609108019a74902858d4b07c24825c6318b` (or explicit `"Tailrocks original utility — not from upstream Foglamp"` when `upstreamUrl` is absent), and
     - Compact links to **Gustavo Fior (`@gustavo-fior`)**, **Abdul Haidar**, **Foglamp Labs (`foglamp-labs/foglamp`)**, and **`foglamp.dev`**.
2. **Remove Duplicate MDX-Level `<StoryProvenance />` and `## Attribution` Sections Across All 173 `.mdx` Files**:
   - Update `scripts/docs-provenance/sync.mjs` (and run it across `apps/docs/content/docs/**/*.mdx`) to **remove** the duplicate `<StoryProvenance ... />` JSX tag, unused `import { StoryProvenance }`, and trailing `## Attribution` / `---` attribution boilerplate from all 167 component `.mdx` files and 6 `foundations/*.mdx` files.
   - Update `scripts/verify-portal.ts` so it verifies that `<StoryProvenance />` is rendered **once** per component page (via `story-panel.tsx`, `asideCount === 1`), not twice.

---

## P0-4. Fix Duplicate `# Title` H1s, Duplicate Opening Descriptions, 139 Broken Relative Links, Unformatted 1-Line Code Blocks, Corrupted API Tables & AI-Slop Across All 175 `.mdx` Pages

### What Is Broken
1. **Duplicate `# Title` H1 in 58 of 175 `.mdx` Files**:
   - `apps/docs/src/routes/docs/$.tsx:32` already renders `<DocsTitle>{page.title}</DocsTitle>` and `<DocsDescription>{page.description}</DocsDescription>`.
   - Yet `apps/docs/content/docs/index.mdx:8`, `apps/docs/content/docs/credits.mdx:6`, and **all 56 `apps/docs/content/docs/primitives/*.mdx:13`** contain a `# <Title>` heading in the MDX body, rendering **two `<h1>` headings** on every page!
2. **Verbatim Duplicate Opening Description Paragraph in 145 of 175 `.mdx` Files (+ 22 near-duplicates in `figures/*.mdx`)**:
   - All 56 `primitives/*.mdx:15`, all 53 `widgets/*.mdx:13`, all 11 `charts/*.mdx:13`, and all 25 `blocks/*.mdx:13` repeat `frontmatter.description` character-for-character as their first body paragraph right below `<DocsDescription>{page.description}</DocsDescription>`.
   - All 22 `figures/*.mdx:13` open with a robotic restatement of `frontmatter.description` (`"CostAlert is the alert entry in FIGURES.costs. The story selects it with FigureVariant; the selected figure itself takes no props."`).
   - All 167 component `.mdx` files have 4 consecutive blank lines after frontmatter (`lines 5-8`).
   - `apps/docs/content/docs/index.mdx:6-16` duplicates the entire 4-paragraph blockquote from `apps/docs/content/docs/credits.mdx:6-14` right below another attribution callout on line 6.
3. **139 Broken Relative Links (`../../../src/stories/...` and `../../../public/r/...`) Across 64 `.mdx` Files**:
   - All **53 `apps/docs/content/docs/widgets/*.mdx`** files (`106` links) and all **11 `apps/docs/content/docs/charts/*.mdx`** files (`33` links) contain markdown links to `[src/stories/...](../../../src/stories/...)` and `[public/r/story-items.json](../../../public/r/story-items.json)` (and `[registry payload](../../../public/r/<id>.json)` in `charts/*.mdx`), which resolve to `/src/stories/...` and `/public/r/...` in the browser and **return 404**!
4. **Unformatted Single-Line `## Example` Code Blocks in All 56 `primitives/*.mdx` Files (and Missing Code Examples in `widgets`, `charts`, `figures`, `blocks`)**:
   - Every file in `apps/docs/content/docs/primitives/*.mdx` collapses its `## Example` JSX function onto a **single unformatted line up to 988 characters long** (e.g., `primitives/chart.mdx:58` is 988 chars on one line; `collapsible.mdx:48` is 862 chars; `drawer.mdx:53` is 824 chars; `button.mdx:47` is 520 chars).
   - Meanwhile, `widgets/*.mdx` (53), `charts/*.mdx` (11), `figures/*.mdx` (22), and `blocks/*.mdx` (25) have **no usage code block at all**.
5. **Broken Installation & Architecture Docs (`installation.mdx` & `architecture.mdx`)**:
   - `apps/docs/content/docs/foundations/installation.mdx:60`: `import '@/components/foglamp/styles/globals.css';` (broken — registry installs to `@/components/framerock/styles/globals.css`).
   - `apps/docs/content/docs/foundations/installation.mdx:65`: `The button is installed at src/components/foglamp/ui/button.tsx.` (wrong — actual path is `src/components/framerock/ui/button.tsx`).
   - `apps/docs/content/docs/foundations/installation.mdx:68`: `import { Button } from '@/components/foglamp/ui/button';` (broken — actual path is `@/components/framerock/ui/button`).
   - `apps/docs/content/docs/foundations/architecture.mdx:8,11,13,15`: Uses deprecated `FoglampLink` and `FoglampLinkProvider` instead of `FramerockLink` and `FramerockLinkProvider` (also update `apps/docs/src/stories/blocks/fixtures.tsx:7,60`).
   - `apps/docs/content/docs/foundations/{architecture,geometry,motion,tokens,typography}.mdx`: Replace self-referential `"Foglamp"` portal/package descriptions (`architecture.mdx:3`, `tokens.mdx:3,8`, `typography.mdx:3,8`, `geometry.mdx:6`, `motion.mdx:6`) with `"Framerock"`.
6. **Corrupted `## Public API` Tables & False Dictionary Prop Descriptions in `charts/*.mdx`, `widgets/*.mdx`, and `blocks/*.mdx`**:
   - **6 of 11 `charts/*.mdx` files** (`background.mdx:25-80`, `chart.mdx:25-81`, `dot.mdx:25-77`, `legend.mdx:25-80`, `tooltip.mdx:25-76`, `zoom.mdx:25-76`) dump 45–57 rows of unrelated story imports (`EvilAreaChart`, `EvilLineChart`, `Area`, `Line`, `Grid`, `XAxis`, `YAxis`) into `## Public API` instead of documenting only the exports of that chart module!
   - **False prop descriptions from naive prop-name dictionary lookup**:
     - `widgets/span-type.mdx:25,27`: `SpanTypeBadge.type` / `SpanTypeChip.type` is falsely described as *"Selects whether the axis interprets values as numeric or categorical."* (Recharts `XAxis.type`!).
     - `widgets/code-block.mdx:26`: `CodeBlock.lang` is falsely described as *"Sets the language attribute on the rendered SVG."* (it sets the Shiki syntax highlighting language!).
     - `widgets/sortable-head.mdx:28` & `widgets/data-table.mdx:41`: `SortableHead.align` is falsely described as *"Horizontal legend alignment."* (it sets table column alignment `"left" | "right"`!).
     - `widgets/stat-card.mdx:34`: `StatCard.size` is falsely described as *"Selects the rendered icon size."* (it sets card size `"sm" | "default"`!).
     - `widgets/copy-button.mdx:26`: `CopyButton.title` is falsely described as *"Sets the component heading or SVG title."* (it sets the button tooltip/aria-label!).
     - `charts/*.mdx` (`Area.isClickable`, `Bar.isClickable`, `Line.isClickable`): Falsely described as *"Enables pointer selection for legend items."*
   - **`widgets/brand-logos.mdx:25-28`**: Lists only 4 logos (`AnthropicLogo`, `GoogleLogo`, `OpenAILogo`, `MistralLogo`) out of the **25** logos exported by `packages/design-system/src/icons/brand-logos.tsx`.
   - **`widgets/toolbar.mdx:25-31`**: Pollutes `Toolbar`'s table with `SearchInput` and `ToggleChip`.
   - **`blocks/*.mdx` (all 25 files)**: Document internal `.story.tsx` wrapper state (`Story arguments`, `Fixture and callback wiring`) instead of the actual exported Block component's props and usage (and `blocks/hud-simulator-block.mdx:27-28` contradicts itself on consecutive lines; `blocks/flow-map-block.mdx:25` has an unmatched backtick `` `direction: 'RIGHT' ``).
7. **236+ Robotic / Defensive AI-Slop Sentences Across All 175 `.mdx` Files**:
   - Strip all defensive meta-commentary (*"This page does not claim that the package is published to npm"*, *"These settings describe the verified consumer setup; a plain tsc invocation with different compiler options is not the same check"*, *"The example is the portal story fixture without its story registration"*, *"This URL is local to the running portal, not a public registry address"*, *"The table lists values exported from... The declared type comes from the component source"*).

### Required Fix
1. Strip duplicate `# <Title>` H1s (`index.mdx:8`, `credits.mdx:6`, `primitives/*.mdx:13`) and duplicate opening description paragraphs (`primitives/*.mdx:15`, `widgets/*.mdx:13`, `charts/*.mdx:13`, `figures/*.mdx:13`, `blocks/*.mdx:13`).
2. Format every `## Usage` / `## Example` code block across all `primitives/*.mdx` with clean multi-line indentation (2 spaces, max ~80 chars/line), and add a clean, multi-line `@tailrocks/framerock` import + JSX usage snippet to every `widgets/*.mdx`, `charts/*.mdx`, `figures/*.mdx`, and `blocks/*.mdx` page.
3. Remove all 139 broken `../../../src/stories/...` and `../../../public/r/...` relative links; link registry payloads to `/r/<item>.json`.
4. Regenerate `## Public API` tables from the **actual target module's exports** in `packages/design-system/src/` (not the `.story.tsx` imports), fix all false prop descriptions (`span-type.mdx`, `code-block.mdx`, `sortable-head.mdx`, `data-table.mdx`, `stat-card.mdx`, `copy-button.mdx`, `charts/*.mdx`), list all 25 exported logos in `brand-logos.mdx`, and document the real block component props in `blocks/*.mdx`.
5. Fix `installation.mdx:60,65,68` (`@/components/framerock/...`) and `architecture.mdx:8-15` (`FramerockLinkProvider` / `FramerockLink`), and strip all defensive AI-slop disclaimers.

---

## P0-5. Fix Duplicate Source Headers, Spliced Mid-Import Registry Headers, 6x SIL Font License Duplication, Fake `inspirationPath`, & Missing `public/r/registry.json`

### What Is Broken
1. **65 Source Files in `packages/design-system/src/` Have Two Back-to-Back Comment Headers (Including 8 Files Marked `copied-1-to-1`)**:
   - `scripts/provenance/headers.py:45` used `LEADING_COMMENT_RE = re.compile(r"\A/\*.*?\*/\s*", re.DOTALL)`, which only matched comments at byte 0 (`\A`).
   - In 65 files that had `"use client";` followed by a Wave 1–5 `/* Original design... */` or `/** @source ... */` block comment at lines 19–26, `headers.py` prepended the new 17-line SPDX header above `"use client";` and left the old header below `"use client";`!
   - Even worse, **8 of those 65 files are marked `@provenance copied-1-to-1`**: `blocks/marketing/demo/demo-context.tsx:19-24`, `charts/evilcharts/ui/background.tsx:19-21`, `charts/evilcharts/ui/zoom.tsx:19-21`, `hooks/use-app-hooks.ts:19-21`, `hooks/use-copied.ts:19-21`, `ui/collapsible.tsx:19-21`, `ui/direction.tsx:19-21`, `ui/sonner.tsx:19-22`.
2. **`retainInstalledNotice()` in `packages/registry/scripts/build-registry.ts:269-278` Splices a Duplicate 17-Line Header in the Middle of `import` Statements**:
   - `retainInstalledNotice()` finds `ast.statements[0]` and injects a second copy of the 17-line header after `first.end`.
   - For the 140+ files without `"use client";` (such as `ui/button.tsx`, `lib/scan/layout.ts`, `index.ts`), `ast.statements[0]` is the **first `import` statement**, so `retainInstalledNotice()` splices a 17-line JSDoc block comment **right between `import` #1 and `import` #2**!
   - Combined with the 65 source files that already have 2 headers, `/r/*.json` payloads contain **2 to 3 license headers per file**.
3. **6 Copies of the Full SIL Open Font License in `style-globals.json` (`font-setup.css`)**:
   - `THIRD-PARTY-NOTICES.md` repeats the full SIL Open Font License text 3 times (for Inter Variable, Host Grotesk, and Geist Mono).
   - `build-registry.ts:94-105` embeds all of `THIRD-PARTY-NOTICES.md` into the top comment of `font-setup.css` (3 copies), and `retainInstalledNotice()` at `build-registry.ts:344` appends the entire comment block a second time at EOF — resulting in **6 full copies of the SIL Open Font License** (~28 KB) inside `style-globals.json`!
4. **Fake `inspirationPath` Fallback on All 20 `tailrocks-original` Items (`packages/registry/scripts/build-registry.ts:306`) & False `lib/types.ts` Upstream Mapping (`scripts/provenance/manifest.json:1126-1135`)**:
   - `build-registry.ts:306` has:
     `const inspirationPath = manifestEntry?.inspiration_path ?? "apps/web/src/components/marketing/landing/figure-picker.tsx";`
   - This makes every `tailrocks-original` utility (`lib/link-context.tsx`, `blocks/scan/favicon-context.tsx`, `lib/provider.tsx`, etc.) falsely claim in `/r/*.json` and `<StoryProvenance />` that it was inspired by `figure-picker.tsx`!
   - Also, `scripts/provenance/manifest.json:1126-1135` falsely maps `packages/design-system/src/lib/types.ts` to `upstream_path: "apps/web/src/lib/trace-timeline.ts"`.
5. **Missing `apps/docs/public/r/registry.json` & Polluted Registry Items (`build-registry.ts:144-150, 311-315, 474`)**:
   - `build-registry.ts:474` writes `apps/docs/public/r/framerock.json` but never writes `apps/docs/public/r/registry.json` (the standard `shadcn` registry index endpoint).
   - `isPublicEntry()` (`build-registry.ts:144-150`) and the empty `if (relative.includes("/")) {}` block (`lines 312-315`) fail to exclude non-installable/barrel files, emitting:
     - `framerock-source.json` (`src/index.ts` — 3.95 MB bundle of 252 files with `title: "Index"`),
     - `block-guide-css-modules-d.json` (`blocks/guide/css-modules.d.ts` with `title: "Css Modules.D"`),
     - `block-guide-observability-guide-module.json` (`blocks/guide/observability-guide.module.css` with `title: "Observability Guide.Module"`), and
     - 12 pure barrel `*-index.json` items (`block-app-shell-index`, `block-auth-index`, `block-dashboard-index`, `block-guide-index`, `block-marketing-chrome-index`, `block-marketing-cta-index`, `block-marketing-figures-index`, `block-marketing-hero-index`, `block-scan-index`, `block-setup-index`, `hud-index`, `widget-foggy-index`, all with `title: "Index"`). *(Note: `blocks/marketing/demo/index.tsx` is the actual `DashboardDemo` component implementation, so give it a proper title `"Dashboard Demo"` instead of `"Index"`.)*
6. **3-Runtime Provenance Script Sprawl (`scripts/provenance/audit.py`, `headers.py`, `generate.mjs`, `verify.ts`)**:
   - Consolidate into clean TypeScript scripts invoked by `bun`.

### Required Fix
1. Strip all leftover Wave 1–5 `/* Original design... */` and `/** @source ... */` secondary comment blocks after `"use client";` across all 65 affected files in `packages/design-system/src/` so every source file has **strictly one** SPDX/provenance header at the top of the file (and the 8 `copied-1-to-1` files truly have zero body modifications).
2. In `packages/registry/scripts/build-registry.ts:269-278`:
   - Never splice a comment after `ast.statements[0]` in the middle of imports!
   - Either keep a single header at the top of each file, or if a backup notice is needed so `shadcn`'s `ts-morph` import transform cannot strip it when rewriting the first statement, place a compact `/* @license Apache-2.0 — Original Foglamp design by Gustavo Fior (@gustavo-fior), Abdul Haidar & Foglamp Labs (https://foglamp.dev); extracted in @tailrocks/framerock. */` comment **at EOF** (or after the **last** `ImportDeclaration`), and in `THIRD-PARTY-NOTICES.md` / `font-setup.css` include the SIL Open Font License text **once** (listing all three font copyright lines above the single license text) without duplicating it via `retainInstalledNotice`.
3. In `packages/registry/scripts/build-registry.ts:306`, remove the fake `"apps/web/src/components/marketing/landing/figure-picker.tsx"` fallback (`const inspirationPath = manifestEntry?.inspiration_path ?? null;`). Only set `inspirationPath` / `inspirationUrl` when the file genuinely has a specific upstream inspiration file, and reclassify `src/lib/types.ts` in `manifest.json` accurately.
4. In `packages/registry/scripts/build-registry.ts:144-150` & `:474`:
   - Write **both** `apps/docs/public/r/registry.json` and `apps/docs/public/r/framerock.json`.
   - Exclude `index.ts` (`framerock-source`), the 12 pure `.ts` barrel `*/index.ts` files, `blocks/guide/css-modules.d.ts` (`block-guide-css-modules-d`), and `blocks/guide/observability-guide.module.css` (`block-guide-observability-guide-module`) from standalone `isPublicEntry()` items (while ensuring `closure()` automatically includes `blocks/guide/css-modules.d.ts` and `blocks/guide/observability-guide.module.css` inside `block-guide-observability-guide.json`!).

---

## P0-6. Fix All Consumer TypeScript Compilation Failures (Both Strict & Default Non-Strict `tsc --noEmit`) & Package Export Hygiene

### What Is Broken
1. **`packages/design-system/src/lib/scan/layout.ts:52` Fails Default `tsc --noEmit` (`TS2578: Unused '@ts-expect-error' directive`)**:
   - Recorded in `results/qa/w6-final-static/final-record.json:53-56` (`exit_code: 2`).
   - Under `noImplicitAny: false` (default `tsc` without `"strict": true`), `await import("elkjs/lib/elk-worker.min.js")` does not emit `TS7016`, making `// @ts-expect-error` on line 52 fail with `TS2578: Unused '@ts-expect-error' directive` even when `--skipLibCheck` is passed!
2. **`packages/design-system/src/blocks/guide/observability-guide.tsx:35` Fails Even With `--strict --skipLibCheck` in Consumers (`TS2307: Cannot find module './observability-guide.module.css'`)**:
   - `observability-guide.tsx:35` has `import styles from "./observability-guide.module.css";`, while `packages/design-system/src/blocks/guide/css-modules.d.ts` is never referenced (`/// <reference path="./css-modules.d.ts" />`) by `observability-guide.tsx` and is omitted from `block-guide-observability-guide.json`'s `files` closure in `build-registry.ts`!
3. **`packages/design-system/src/blocks/auth/login-form.tsx:345-346, 377-378, 425-426, 482-483` Fails Non-Strict `tsc` (`TS2339: Property 'message' does not exist on type 'unknown'`)**:
   - Under `strictNullChecks: false`, Zod 4's Standard Schema v1 union collapses in `@tanstack/form-core`, inferring `field.state.meta.errors` as `unknown[]`. Accessing `error?.message` at lines 345, 346, 377, 378, 425, 426, 482, 483 fails with 8 `TS2339` errors.
4. **`@tabler/icons-react` React 19 `ReactSVG` Error When `skipLibCheck: false` (`TS2305: Module '"react"' has no exported member 'ReactSVG'`)**:
   - `@tabler/icons-react@3.41.1`'s `dist/tabler-icons-react.d.ts:2` imports `ReactSVG` from `'react'`, which `@types/react@19` removed from top-level named exports.
5. **Test/Internal Files & Crashing `./blocks/scan/verify-source` Export Shipped in `@tailrocks/framerock` (`packages/design-system/package.json:41, 156-161`)**:
   - `package.json:41` exports `"./blocks/scan/verify-source": "./src/blocks/scan/verify-source.ts"`, which has no exports, imports `node:fs`, and executes `readFileSync(".reference/foglamp/...")` at top level!
   - `npm pack` ships `src/blocks/scan/verify-source.ts`, `src/blocks/scan/tsconfig.json`, and 6 `bun:test` files (`src/blocks/scan/scan.test.tsx`, `src/hud/model.test.ts`, `src/lib/payload-messages.test.ts`, `src/lib/prompts/{infer,normalize,slots}.test.ts`) inside `tailrocks-framerock-0.1.0.tgz`.
6. **Missing Public Exports in Root Barrel `packages/design-system/src/index.ts`**:
   - `src/index.ts` omits `DashboardDemo` (`./blocks/marketing/demo`), `FigureKit` & `FigureReveal` (`./blocks/marketing/figures`), `useDelayedLoading`, `useEntranceOnce`, `useSkeletonShown`, `useDebouncedValue`, `useTextFilter` (`./hooks/use-app-hooks`), `useThemeHotkey` (`./hooks/use-theme-hotkey`), `CostBreakdownCard` alias (`./widgets/cost-breakdown`), and `ToolBreakdownCard` alias (`./widgets/tool-breakdown`).
7. **Hardcoded Monorepo `@source` Glob in `packages/design-system/src/styles/globals.css:28`**:
   - `globals.css:28` has `@source "../../../apps/**/*.{ts,tsx}";`, which leaks into installed consumer CSS via `style-globals.json`.

### Required Fix
1. **Fix `layout.ts:52` Without `@ts-expect-error`**:
   - Remove `// @ts-expect-error — no types for the worker entry` at `packages/design-system/src/lib/scan/layout.ts:52`.
   - Create or reference an ambient declaration file (e.g., `packages/design-system/src/lib/scan/elk-worker.d.ts` with `declare module "elkjs/lib/elk-worker.min.js";` and `/// <reference path="./elk-worker.d.ts" />` at the top of `layout.ts`, and include `.d.ts` references in `build-registry.ts` `closure()`) so `await import("elkjs/lib/elk-worker.min.js")` compiles with **zero errors** under both `strict: true` and `strict: false`!
2. **Fix `observability-guide.tsx:35` CSS Module Types**:
   - Add `/// <reference path="./css-modules.d.ts" />` to `packages/design-system/src/blocks/guide/observability-guide.tsx` and update `closure()` in `packages/registry/scripts/build-registry.ts:280-296` so `blocks/guide/css-modules.d.ts` is included in the `files` array whenever `blocks/guide/observability-guide.tsx` is installed.
3. **Fix `login-form.tsx` Non-Strict Error Narrowing**:
   - In `packages/design-system/src/blocks/auth/login-form.tsx:344-347, 376-379, 424-427, 481-484`, type or narrow `error` (e.g. `const message = (error as { message?: string } | undefined)?.message;`) so it compiles cleanly under both `strictNullChecks: true` and `strictNullChecks: false`.
4. **Fix `@tabler/icons-react` `ReactSVG` Compatibility**:
   - Upgrade `@tabler/icons-react` if a newer version fixes the React 19 import, OR include `declare module "react" { export type ReactSVG = unknown; }` in a referenced ambient `.d.ts` file shipped with the package and registry closure so `tsc --noEmit` passes even without `--skipLibCheck`.
5. **Clean Up `packages/design-system/package.json`, `src/index.ts`, & `globals.css`**:
   - Move or exclude `verify-source.ts`, `blocks/scan/tsconfig.json`, and the 6 `*.test.ts`/`*.test.tsx` files out of the published `src/` surface (or exclude them in `package.json` `"files"` and remove `"./blocks/scan/verify-source"` from `package.json:41`).
   - Add `"peerDependencies"` for `react` (`"^19.0.0"`) and `react-dom` (`"^19.0.0"`).
   - Export `DashboardDemo`, `FigureKit`, `FigureReveal`, `useDelayedLoading`, `useEntranceOnce`, `useSkeletonShown`, `useDebouncedValue`, `useTextFilter`, `useThemeHotkey`, `CostBreakdownCard`, and `ToolBreakdownCard` from `packages/design-system/src/index.ts`.
   - Remove `@source "../../../apps/**/*.{ts,tsx}";` from `packages/design-system/src/styles/globals.css:28` (keep monorepo scanning in `apps/docs/src/styles/app.css`).

---

## P0-7. Fix All 29 Broken Primitive Stories (`item.story.tsx` – `tooltip.story.tsx`), 15 Unframed Block Stories, 48 Clipping Stories, & Blank Standalone `/stories/$` Route

### What Is Broken
1. **29 Primitive Stories (`item.story.tsx` through `tooltip.story.tsx`) Render Non-Interactive `args | Args` Text Instead of Controls**:
   - All 29 files (`item`, `kbd`, `label`, `loader`, `menubar`, `native-select`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `table`, `tabs`, `textarea`, `toggle-group`, `toggle`, `tooltip` in `apps/docs/src/stories/primitives/`) define `type Args = { ... }` and `function XStory({ args }: { args: Args })` with `args: { initial: { args: { ... } } }`.
   - Because `story-panel.tsx:125-135` only renders controls for top-level primitive/union properties and falls through to `<span className="text-muted-foreground">{type.displayName || type.type}</span>` for `type: 'object'`, **all 29 stories render `args | Args` with zero interactive controls**, and **25 of the 29 never even read `args` in their JSX**!
   - **5 of these primitive stories have broken runtime/JSX implementations**:
     - `primitives/progress.story.tsx:7-9`: Range slider updates unused `value` state while `<Progress value={args.value}>` stays stuck at `68`, AND passing `<ProgressTrack><ProgressIndicator /></ProgressTrack>` as children duplicates the internal track already rendered by `packages/design-system/src/ui/progress.tsx:42-44` (rendering two stacked progress bars!).
     - `primitives/radio-group.story.tsx:3,9`: Imports `RadioGroup, RadioGroupItem` but renders bare `<RadioGroupItem>` inside a `<fieldset>` without `<RadioGroup>`, so clicking radio buttons cannot change selection!
     - `primitives/sheet.story.tsx:9`: Places `<SheetFooter><SheetClose ...>Close</SheetClose></SheetFooter>` **outside** `</SheetContent>`, rendering the Close button permanently on the main canvas!
     - `primitives/sonner.story.tsx:9`: Dispatches an unhandled `CustomEvent("foglamp:toast")` instead of calling `toast.success(...)` and `toast.error(...)` from `sonner`, so clicking the toast buttons does nothing!
     - `primitives/toggle-group.story.tsx:8-9`: Declares `const [period, setPeriod] = useState("24h")` and renders `Showing activity for {period}.`, but never passes `value` or `onValueChange` to `<ToggleGroup>`!
2. **15 of 25 Block Stories Omit `frame` Entirely (Crushing Desktop Blocks Into an `810×318` `?layout=center` Iframe)**:
   - **All 7 `DashboardStoryShell` block stories** (`agent-detail-inspector-block`, `eval-detail-block`, `overview-dashboard-block`, `session-conversation-inspector-block`, `trace-waterfall-inspector-block`, `traces-explorer-block`, `workflow-detail-block`) omit `frame: { width: 1280, height: 800 }` and `DashboardStoryShell` (`apps/docs/src/stories/blocks/fixtures.tsx:64`) lacks `w-full`. In `trace-waterfall-inspector-block`, this crushes `<TraceTimeline>` to **`6px` wide (`w: 6, h: 312`)**!
   - **`flow-map-block.story.tsx:6-8`**: Omits `frame: { width: 1280, height: 800 }` and renders `<div className="h-[720px] overflow-hidden rounded-lg">` without `relative w-full`, collapsing the wrapper to `width: 0px`, while `<FlowMap>`'s default `padL = 432px` (`packages/design-system/src/blocks/scan/flow-map.tsx:543`, reserved for `ScanBoard`'s absent sidebar) pushes **3 of 4 graph nodes off the right edge**! Also in `flow-map.tsx:503,541`, `fitted.current` is never reset when `direction` changes (`"RIGHT"` -> `"DOWN"`).
   - **`scan-landing-block.story.tsx:6`**: Omits `frame: { width: 1280, height: 800 }`, so inside an `810px` iframe (`< 1024px` `lg:block`), the embedded `FlowMap` is completely hidden (`display: none`).
   - **6 additional block stories omitting `frame`**: `buttons-badges-playground-block.story.tsx`, `device-approve-block.story.tsx`, `instrument-empty-state-block.story.tsx`, `login-form-block.story.tsx`, `marketing-navbar.story.tsx`, `onboarding-panel-block.story.tsx`.
3. **Tall Blocks (`Hero3DDemoBlock`, `DriftingFogCtaBlock`, `AppShellBlock`), All 11 Chart Stories, 19 Primitive Stories, and 18 Widget Stories Clip Vertically or Shrink Horizontally**:
   - In `apps/docs/src/routes/stories/$.tsx:29`, `centered` renders `<div className="flex min-h-screen items-center justify-center p-8"><Frame /></div>` without a `w-full` inner container, causing flex items without explicit `w-full` to shrink-to-fit horizontally, while `p-8` (`64px`) reduces the `320px` default iframe height to `256px`.
   - In `apps/docs/src/components/story-panel.tsx:73,79,114-115`:
     - `viewportWidth` initializes to `0`, causing an initial `scale(0)` flash on scaled frames.
     - `hero-3d-demo-block.story.tsx:4` sets `height: 800` for a `1,276px`-tall block, clipping the bottom 42% (`304px`) of the interactive dashboard demo.
     - `drifting-fog-cta-block.story.tsx:4` sits at the top of a non-scrolling `800px` iframe, so `useScroll` in `cta.tsx:122-138` stays at `0`, leaving `<AgentDetails />` permanently blurred (`blur(4px)`) and dimmed (`opacity: 0.25`).
     - `app-shell-block.story.tsx:32` and `blocks/fixtures.tsx:64` use `h-[760px] overflow-hidden` while `AppShellBlock` uses `h-svh` (`800px`), clipping the bottom `40px` of the sidebar footer and `FoggyLauncher`.
     - All 11 `charts/*.story.tsx` (`396px–428px` tall), 18 `widgets/*.story.tsx` (`data-table`, `foggy-widget`, `foglamp-hud`, `hud-inline-preview`, `run-exchange`, `payload-view`, `eval-scores`, `cost-breakdown`, `tool-breakdown`, `trace-timeline`, `prompt-prose`, `prompt-versions-view`, `trend-charts`, `sunset-card`, `range-picker`, `filter-select`, `user-menu`, `foggy-launcher`), and 19 `primitives/*.story.tsx` (`calendar`, `command`, `dialog`, `drawer`, `empty`, `field`, `popover`, `sheet`, `sidebar`, `table`, `alert-dialog`, `combobox`, `context-menu`, `dropdown-menu`, `hover-card`, `menubar`, `navigation-menu`, `select`, `tabs`) clip inside the `320px` default height.
4. **Visiting `/stories/<category>/<name>` Directly Renders a Blank Screen (`apps/docs/src/routes/stories/$.tsx` & `apps/docs/src/lib/story.tsx`)**:
   - `@fumadocs/story`'s `StoryFrame` starts with `args = null` and renders `null` until a parent window sends `{ type: "fumadocs-story:args", args }`. Opening `/stories/primitives/button` directly in a browser tab renders a completely blank page.

### Required Fix
1. **Rewrite All 29 Primitive Stories (`item.story.tsx` through `tooltip.story.tsx`)**:
   - Flatten every component signature from `({ args }: { args: Args })` to direct destructured props with union/primitive types (`({ variant = 'default', ... }: { variant?: 'default' | 'outline' | 'muted'; ... })`), wire every prop into the rendered JSX, add meaningful presets, remove unused `useState` imports, and fix `progress.story.tsx`, `radio-group.story.tsx`, `sheet.story.tsx`, `sonner.story.tsx`, and `toggle-group.story.tsx`.
2. **Add Proper `frame` Dimensions & Auto-Height / Scroll Support in `story-panel.tsx` and `routes/stories/$.tsx`**:
   - Add `frame: { width: 1280, height: 800 }` to all 7 `DashboardStoryShell` block stories, `flow-map-block.story.tsx` (also add `relative w-full` and pass explicit symmetric `padding={{ top: 48, right: 48, bottom: 48, left: 48 }}` to `<FlowMap>` when standalone, and reset `fitted.current` in `flow-map.tsx:503,541` when `direction` changes), and `scan-landing-block.story.tsx`.
   - Set appropriate `frame` dimensions on `hero-3d-demo-block.story.tsx` (`width: 1280, height: 1280`), `drifting-fog-cta-block.story.tsx` (`width: 1280, height: 900`), `cutting-mat-footer-block.story.tsx` (`width: 1280, height: 560`), `marketing-navbar.story.tsx` (`width: 1280, height: 360`), `buttons-badges-playground-block.story.tsx` (`width: 1280, height: 760`), `device-approve-block.story.tsx` (`height: 520`), `instrument-empty-state-block.story.tsx` (`height: 580`), `login-form-block.story.tsx` (`height: 560`), `onboarding-panel-block.story.tsx` (`height: 460`), all 11 `charts/*.story.tsx` (`height: 440`), and all tall `widgets/*.story.tsx` & `primitives/*.story.tsx`.
   - In `apps/docs/src/ stories/blocks/fixtures.tsx:64` and `app-shell-block.story.tsx:32`, change `h-[760px]` to `h-[800px] w-full` (matching the `800px` iframe `h-svh`), and wrap `StorySurface` (`blocks/fixtures.tsx:59-61`, `widgets/fixtures.tsx`, `hero-3d-demo-block.story.tsx`, `observability-guide-block.story.tsx`) with `FramerockLinkProvider` (`storyAdapter`) so clicking links inside stories never navigates the iframe to a 404 page!
   - In `apps/docs/src/routes/stories/$.tsx:29`, ensure the centered wrapper gives children full width (`<div className="flex min-h-screen w-full items-center justify-center p-6"><div className=" flex w-full justify-center"><Frame /></div></div>`), and in `story-panel.tsx:73-80`, measure `viewportRef.current?.clientWidth` synchronously on mount (or default `scale` to `1` before measurement) so scaled iframes never flash at `scale(0)`.
3. **Make Standalone `/stories/$` Render Default Args Immediately**:
   - In `apps/docs/src/lib/story.tsx:12-19` and `apps/docs/src/routes/stories/$.tsx:10-30`, expose `Component` and resolved `defaultArgs` on `story` (or seed `window.postMessage({ type: 'fumadocs-story:args', args: defaultArgs }, location.origin)` when `window.parent === window`) so visiting `/stories/primitives/button` directly renders the component immediately.

---

## P0-8. Remove Foglamp Trademark Logo (`BrandMark` 3-Circle SVG) & Replace All Product-Brand `"Foglamp"` Strings With `"Framerock"`

### What Is Broken
Under Apache-2.0 Section 6 (Trademarks), open-source code extraction does not grant rights to use the upstream project's trademark logo or product branding as our own:
1. **Stolen 3-Circle Foglamp Trademark Logo (`BrandMark` & `CuttingMat`)**:
   - `packages/design-system/src/icons/brand-mark.tsx`, `packages/design-system/src/blocks/marketing/chrome/brand-mark.tsx`, `packages/design-system/src/widgets/leaf/scan-brand.tsx:32`, `packages/design-system/src/blocks/scan/brand.tsx:37`, and `packages/design-system/src/hud/FoglampHUD.tsx:1202` all render Foglamp's trademark 3-circle SVG (`<circle cx="24" .../><circle cx="48" fill="#0090FD" .../><circle cx="72" fill="#FF5513" .../>`).
   - `packages/design-system/src/blocks/marketing/chrome/cutting-mat.tsx:26-30` redraws the 3 Foglamp brand circles in the footer cutting mat.
2. **Product-Brand `"Foglamp"` Used in UI Components, Chrome, & Story Fixtures**:
   - `packages/design-system/src/icons/logo.tsx` and `packages/design-system/src/blocks/marketing/chrome/logo.tsx` default to `"Foglamp"` wordmark next to `<BrandMark />`.
   - `packages/design-system/src/blocks/marketing/chrome/navbar.tsx` and `footer.tsx` default to `brandName = "Foglamp"`, `https://docs.foglamp.dev`, `https://github.com/foglamp-labs/foglamp`, and `aria-label="Foglamp on GitHub"`.
   - `packages/design-system/src/blocks/auth/login-form.tsx:297` & `device-approve.tsx:186,271` say `"Sign in to your Foglamp account"` and `"Connect to your Foglamp account"`.
   - `packages/design-system/src/blocks/marketing/hud-landing.tsx:176`, `scan-landing.tsx:300`, `powered-by.tsx:36`, `personality-card.tsx:78`, `setup-summary.tsx:164`, `observability-guide.tsx:439,523,658`, `chapters.ts:19-125`, `agent-prompt.ts:19-61`, `ask-foggy.tsx:114`, `faq.tsx:30-54`, `hero.tsx:284,291`, `sunset-card.tsx:56`, `FoglampHUD.tsx:456,548,780,922`, and `apps/docs/src/stories/blocks/fixtures.tsx:14` (`project: { name: 'Foglamp', slug: 'foglamp', iconDomain: 'foglamp.dev' }`) all display `"Foglamp"` as the product brand!

### Required Fix
1. **Replace the 3-Circle Foglamp Logo in `BrandMark` & `CuttingMat` With a Distinct Framerock Architectural Frame Mark**:
   - In `packages/design-system/src/icons/brand-mark.tsx`, `packages/design-system/src/blocks/marketing/chrome/brand-mark.tsx`, `packages/design-system/src/widgets/leaf/scan-brand.tsx`, `packages/design-system/src/blocks/scan/brand.tsx`, and `packages/design-system/src/hud/FoglampHUD.tsx`, replace the 3-circle Foglamp SVG with a clean, original **Framerock** architectural frame mark (interlocking/nested geometric structural frames).
   - In `packages/design-system/src/blocks/marketing/chrome/cutting-mat.tsx`, replace the 3 circles on the cutting mat with nested rounded-square architectural frame guides (`<rect ... rx="12" />`).
2. **Replace All Product-Brand `"Foglamp"` Strings With `"Framerock"` Across UI Components, Chrome, & Fixtures (While Preserving All Apache-2.0 Attribution)**:
   - Default `Logo`, `MarketingNavbar`, and `MarketingFooter` to `"Framerock"`, `/docs`, and `https://github.com/tailrocks/framerock`.
   - Update product-brand strings in `login-form.tsx`, `device-approve.tsx`, `hud-landing.tsx`, `scan-landing.tsx`, `powered-by.tsx`, `personality-card.tsx`, `setup-summary.tsx`, `observability-guide.tsx`, `chapters.ts`, `agent-prompt.ts`, `ask-foggy.tsx`, `faq.tsx`, `hero.tsx`, `sunset-card.tsx`, `FoglampHUD.tsx`, and `apps/docs/src/stories/blocks/fixtures.tsx` (`project: { name: 'Framerock', slug: 'framerock', iconDomain: 'tailrocks.com' }`) from `"Foglamp"` to `"Framerock"`.
   - Keep all SPDX headers, provenance bars (`StoryProvenance`), `NOTICE`, `CREDITS.md`, `/docs/credits`, and homepage tribute sections crediting **Gustavo Fior (`@gustavo-fior`)**, **Abdul Haidar**, and **Foglamp Labs (`foglamp-labs/foglamp`)** 100% intact.

---

## P1-1. Fix Live Interactive Bugs Found in Headless Chrome (`HudSimulatorBlock` Duplicate Key `s0`, `EvalDetailBlock` Judge Input, `FoglampHUD` / `RunExchange` / `PayloadView` / `DeviceApproveBlock` Preset Sync, `Hero3DDemoBlock` Inspector, & `EvilBrush` Warning)

### What Is Broken
1. **React Console Error (`Encountered two children with the same key, s0`) in `HudSimulatorBlock` (`packages/design-system/src/blocks/marketing/hud-landing.tsx:88-108` & `packages/design-system/src/hud/model.ts:257-273`)**:
   - In `hud-landing.tsx:89-91,107`, the `trace.end` spans use `spanId: "model-call-1"`, `spanId: "docs-search"`, and `spanId: "model-call-2"`.
   - `stepsFromSpans()` in `hud/model.ts:261-263` parses `s.spanId.match(/:step:(\d+)$/)` and falls back to `stepNumber: 0` when it doesn't match. Both LLM spans get `stepNumber: 0` and React key `"s0"`, throwing a duplicate-key console error, labeling both rows `"Step 1"`, and toggling them open/closed together!
   - Also, during streaming (`hud-landing.tsx:96-106` and `foglamp-hud.story.tsx:4`), `stepNumber: 1` and `2` are emitted instead of `0`-indexed `0` and `1`, so `Step ${row.step.stepNumber + 1}` (`FoglampHUD.tsx:1052`) renders `"Step 2"` and `"Step 3"` (skipping `"Step 1"`).
2. **`EvalDetailBlock` Displays `"Judge input unavailable"` When Clicking Any Score Row (`packages/design-system/src/blocks/dashboard/eval-detail-block.tsx:53-110, 515-525`)**:
   - `EvalDetailBlock` defaults `judgeInputs` to `{}` (`line 55`) while providing `DEFAULT_SCORES` (`score_1`, `score_2`, `score_3`, `lines 57-110`). Clicking any score row opens the `RunExchange` drawer with `"Judge input unavailable"`.
3. **Switching Presets or Toggling Controls Fails in 10 Stories (`FoglampHUD`, `RunExchange`, `PayloadView`, `DeviceApproveBlock`, `Calendar`, `Collapsible`, `ToggleChip`, `FigureKit22Block`, `PromptProse`, `DevBar`)**:
   - `FoglampHUD` (`packages/design-system/src/hud/FoglampHUD.tsx:312-314` & `apps/docs/src/stories/widgets/foglamp-hud.story.tsx:5-6`): `useState<Mode>(props.defaultOpen ? "expanded" : "pill")` and `useState<Theme>(props.defaultTheme ?? "dark")` only read `defaultOpen` and `defaultTheme` on mount, so switching presets (`"Dark HUD"`, `"Light HUD"`, `"Redacted compact view"`) or toggling `defaultOpen`/`hudTheme` in Controls does nothing. Also `foglamp-hud.story.tsx:4` has no `tool.start`/`tool.end` events in its stream, so `redact` has zero visual effect.
   - `RunExchange` (`apps/docs/src/stories/widgets/run-exchange.story.tsx:28-29`): `useState(initialDrawerOpen)` never syncs when `initialDrawerOpen` changes (`"Collapsed run row"` preset fails to close the drawer).
   - `PayloadView` (`packages/design-system/src/widgets/payload-view.tsx:389`): `useEffect(() => setShowEarlier(false), [value])` omits `previousValue` and `foldBeforeLastUser`.
   - `DeviceApproveBlock` (`packages/design-system/src/blocks/auth/device-approve.tsx:31` & `device-approve-block.story.tsx:5`): `useState(() => normalizeDeviceCode(initialUserCode))` never updates when `initialUserCode` prop changes.
   - `calendar.story.tsx:4-6`, `collapsible.story.tsx:5-7`, `toggle-chip.story.tsx:4-6`: `useState` initialized once from prop never syncs when prop/preset changes.
   - `figure-kit-22-block.story.tsx:5,9`: `section` prop is accepted in the signature and presets but completely ignored in the component body!
   - `prompt-prose.story.tsx:35-46` & `dev-bar.story.tsx:4` & `foggy-widget.story.tsx:5-6`: Interactive callbacks (`onSelectModel`, `onCommitSlot`, `onChange`, `onSend`, and reopening `FoggyWidgetView` after clicking `X`) are missing or no-ops.
4. ** Broken `/api/favicon` 404 in `packages/design-system/src/widgets/leaf/scan-brand.tsx:16,29,67` & 7 Double-Extracted Files**:
   - `packages/design-system/src/index.ts:119` exports `ScanFavicon` and `ScanModelIcon` from `src/widgets/leaf/scan-brand.tsx`, which calls `faviconUrl(domain)` (`/api/favicon?domain=...` from `src/lib/scan/favicon.ts:17`), whereas `src/blocks/scan/brand.tsx:46` uses `useScanFavicon()` (defaulting to `getGoogleFavicon`).
   - Consolidate or sync the 7 duplicate extracted files (`blocks/scan/brand.tsx` vs `widgets/leaf/scan-brand.tsx`, `blocks/marketing/chrome/logo.tsx` vs `icons/logo.tsx`, `widgets/leaf/sunset-card.tsx` vs `blocks/app-shell/sunset-card.tsx`, `widgets/markdown.tsx` vs `widgets/foggy/markdown.tsx`, `icons/brand-mark.tsx` vs `blocks/marketing/chrome/brand-mark.tsx`, `blocks/marketing/chrome/noise-overlay.tsx` vs `blocks/scan/noise-overlay.tsx`, `lib/scan/favicon.ts` vs `widgets/leaf/favicon.ts`) and restore optional `port?: number` and `url?: string` SSE connection props on `FoglampHUD` (`packages/design-system/src/hud/FoglampHUD.tsx:22-35` & `useHudStream.ts:34-49`).
5. **`EvilBrush` Recharts `width(-1)` / `height(-1)` Console Warning (`packages/design-system/src/charts/evilcharts/ui/evil-brush.tsx:421-436`)**:
   - Add `minWidth={0}` / `minHeight={0}` (or defer `<ResponsiveContainer>` until container dimensions are positive) in `<MiniChart>` so mounting `EvilBrush` produces zero Recharts console warnings.

### Required Fix
1. In `packages/design-system/src/blocks/marketing/hud-landing.tsx:88-108` and `apps/docs/src/stories/widgets/foglamp-hud.story.tsx:4`:
   - Use `0`-indexed `stepNumber: 0` and `stepNumber: 1`, `spanId: `${traceId}:step:0`` and `${traceId}:step:1`, and `spanId: `${traceId}:tool:docs-1`` (and include a tool call in `foglamp-hud.story.tsx` so `redact` visibly redacts tool input/output).
   - Also in `packages/design-system/src/hud/model.ts:260-263`, fall back to the `.filter((s) => s.spanType === "llm")` index `idx` (`stepNumber: match ? Number(match[1]) : idx`) so non-colon `spanId`s can never collide on key `"s0"`.
2. In `packages/design-system/src/blocks/dashboard/eval-detail-block.tsx:53-110`, populate `DEFAULT_JUDGE_INPUTS` for `score_1`, `score_2`, and `score_3` so clicking any score row in `EvalDetailBlock` renders a complete `RunExchange` prompt/response inspection drawer instead of `"Judge input unavailable"`.
3. Sync state with prop changes (via `useEffect` or `key`) in `FoglampHUD.tsx`, `device-approve.tsx`, `payload-view.tsx`, `run-exchange.story.tsx`, `calendar.story.tsx`, `collapsible.story.tsx`, `toggle-chip.story.tsx`, `figure-kit-22-block.story.tsx`, `prompt-prose.story.tsx`, `dev-bar.story.tsx`, and `foggy-widget.story.tsx`.
4. Fix `src/widgets/leaf/scan-brand.tsx` and `src/lib/scan/favicon.ts` to use `useScanFavicon()` / `getGoogleFavicon` so `/api/favicon` is never requested anywhere, and add `brandName = "Foglamp"` prop support to `src/icons/logo.tsx`.

---

## P1-2. Fix Workbench Theme Desync, Broken `Dark Lift` Foreground Contrast, Empty `Props` Section Header, & CSS Cascade Clashes (`story-panel.tsx`, `story-frame.tsx`, `app.css`, `effects.css`, `meta.json`, `llms.txt`)

### What Is Broken
1. **Workbench Theme Desync on Load & Toggle (`apps/docs/src/components/story-panel.tsx:30` & `apps/docs/src/lib/story-frame.tsx:7-39`)**:
   - `story-panel.tsx:30` hardcodes `useState({ mode: 'light', resolved: 'light', revision: 0 })` instead of reading the active docs page theme (`document.documentElement.classList.contains('dark')`) or observing parent theme changes! When a user views `/docs/*` in Dark Mode (or toggles the docs theme button in the navbar), every story iframe initializes in blinding white Light Mode (`theme: 'light'`).
2. **`Dark Lift` Surface Mode Renders Unreadable Dark-on-Dark Text (`apps/docs/src/lib/story-frame.tsx:25`)**:
   - In `story-frame.tsx:25`, selecting `surface === 'Dark Lift'` sets `document.body.style.background = 'oklch(0.23 0 0)'`, **but leaves the iframe theme in `'light'`**, rendering dark text (`oklch(0.145 0 0)`) on a dark `oklch(0.23 0 0)` background! When `surface === 'Dark Lift'`, the iframe should also apply dark foreground/theme styling (or force `.dark` while `Dark Lift` is active).
3. **`app.css` Uses `fumadocs-ui/css/neutral.css` Instead of `shadcn.css`, Overrides Borders Only on `[data-source-surface]`, & Clips Non-Mac Search `<kbd>` (`apps/docs/src/styles/app.css:7, 62-88`)**:
   - `app.css:7` imports `fumadocs-ui/css/neutral.css` (`--color-fd-background: hsl(0, 0%, 96%)`), which clashes with Framerock's `oklch` `--background` / `--card` / `--border` / `--sidebar` tokens. Importing `fumadocs-ui/css/shadcn.css` maps `--color-fd-*` directly to Framerock's CSS variables.
   - `app.css:64-74` only applies `@apply border-border outline-ring/50;` inside `[data-source-surface]`, which `__root.tsx:27` only sets on `/stories/*` and `/`. Consequently, `FoglampStoryPanel` and `StoryProvenance` rendered on `/docs/*` get Fumadocs' `--color-fd-border` instead of Framerock's `--border`.
   - `app.css:43-50` & `:82-87` uses `local("Arial")` at `size-adjust: 134.59%` as a fallback for monospace `Geist Mono` and hardcodes `width: 1.40234375rem` on `button[data-search-full] > div > kbd:first-child`, clipping `Ctrl` on Windows/Linux.
4. **Sidebar Titles & Ordering (`apps/docs/content/docs/charts/meta.json`, `widgets/*.mdx`, `blocks/*.mdx`) & Missing `apps/docs/public/llms.txt`**:
   - `charts/meta.json` interleaves main chart components (`Evil Area Chart`, `Evil Bar Chart`, `Evil Donut Chart`, `Evil Line Chart`) with low-level sub-primitives (`background`, `chart`, `dot`, `evil-brush`, `legend`, `tooltip`, `zoom`). Group the 4 primary charts first, followed by chart UI primitives/hooks.
   - Convert unspaced `PascalCase` titles in `widgets/*.mdx:2` (`AgentIcon`, `AnimatedApiKey`, etc.) to spaced human-readable `Title Case` (`Agent Icon`, `Animated API Key`, etc.), and make `blocks/app-shell-block.mdx:2` consistent (`title: App Shell`).
   - Generate `apps/docs/public/llms.txt` indexing all Framerock documentation routes, package entrypoints, registry endpoints (`/r/registry.json`, `/r/<item>.json`), and original Foglamp Labs attribution.

### Required Fix
1. In `apps/docs/src/components/story-panel.tsx:30`, initialize `appearance` from the parent document's active theme (`useTheme()` from `fumadocs-ui/provider/base` or `MutationObserver` on `document.documentElement` class `'dark'`) and sync automatically whenever the user toggles the global docs theme, while still allowing per-workbench `Light`/`Dark` override.
2. In `apps/docs/src/lib/story-frame.tsx:25`, ensure `Dark Lift` applies dark mode tokens/foreground alongside `oklch(0.23 0 0)` so text and borders remain legible even when the page is in Light Mode.
3. In `apps/docs/src/styles/app.css`, switch `fumadocs-ui/css/neutral.css` to `fumadocs-ui/css/shadcn.css` (or align `--color-fd-*` with Framerock's `oklch` tokens), ensure `FoglampStoryPanel` on `/docs/*` gets `data-source-surface`, replace `local("Arial")` monospace fallback with a system monospace font (`ui-monospace`, `SFMono-Regular`, `Menlo`, `Consolas`), and remove the brittle `1.40234375rem` `<kbd>` width hack.
4. Order `apps/docs/content/docs/charts/meta.json` logically, humanize `widgets/*.mdx` titles, and generate `apps/docs/public/llms.txt`.

---

## Wave 7 Verification & Completion Gates

Before declaring Wave 7 complete, run and record all of the following in `/Users/donbeave/Projects/donbeave/foglamp-design-system-plan/results/qa/w7-final-verification/`:
1. **Component Purity & Header Verification**:
   - Confirm `packages/design-system/src/blocks/marketing/chrome/navbar.tsx` and `footer.tsx` contain zero injected attribution DOM banners and `footer.tsx` renders `<BrazilFlag />` with zero dead code.
   - Confirm all 266 source files in `packages/design-system/src/` have **strictly 1** top SPDX/provenance header (zero leftover Wave 1–5 comment blocks after `"use client";`), and all `/r/*.json` payloads have clean imports (zero mid-import spliced headers, and 1 SIL OFL block in `font-setup.css`).
2. **Strict AND Default Non-Strict Consumer `tsc --noEmit` Verification**:
   - In a fresh external consumer directory, test **both**:
     - `tsc --noEmit` with default `tsconfig.json` (no `strict`, no `skipLibCheck`) -> **must exit `0` (`0` errors)**!
     - `tsc --noEmit --strict` -> **must exit `0` (`0` errors)**!
   - Include `@framerock/ui-button`, `@framerock/block-marketing-hero-hero`, `@framerock/block-scan-scan-board`, `@framerock/block-setup-setup-board`, `@framerock/block-guide-observability-guide`, `@framerock/block-auth-login-form`, and `@framerock/style-globals` in the consumer verification.
3. **MDX, Link, & Registry Verification**:
   - Verify `0` duplicate `<h1>` headings on `/docs/*`, `0` duplicate opening description paragraphs, `0` single-line unformatted `## Example` code blocks, `0` broken `../../../` links, `asideCount === 1` on all 167 component pages, and HTTP 200 for `/r/registry.json`, `/r/framerock.json`, and `/llms.txt`.
4. **Live Headless-Chrome Interactive Verification (`http://localhost:3000`)**:
   - Verify `/` at `1440×900` and `390×844` (Light & Dark): `<Hero3DDemoBlock />` is visible above the fold, `scrollWidth <= clientWidth` (`390px`) on mobile, and the 3D entrance animation never overlaps the section below.
   - Verify `/docs/primitives/progress`, `/docs/primitives/radio-group`, `/docs/primitives/sheet`, `/docs/primitives/sonner`, `/docs/primitives/toggle-group`, and `/docs/primitives/item`: real interactive controls render in `Props` (zero `args | Args` text) and every control/interaction works.
   - Verify `/docs/blocks/trace-waterfall-inspector-block`, `/docs/blocks/flow-map-block`, `/docs/blocks/scan-landing-block`, `/docs/blocks/eval-detail-block`, `/docs/blocks/hud-simulator-block`, and `/stories/primitives/button` directly: zero `6px` crushed columns, zero offscreen graph nodes, zero `"Judge input unavailable"`, zero React `s0` duplicate-key console errors, and standalone `/stories/primitives/button` renders immediately.
5. **Commit & Push Both Repositories**:
   - Commit and push `/Users/donbeave/Projects/donbeave/foglamp-design-system` and `/Users/donbeave/Projects/donbeave/foglamp-design-system-plan`.


## User addendum — Remove upstream product branding

The user explicitly requires removal of the Foglamp logo and visible Foglamp product branding. Replace it with Framerock branding across reusable defaults, portal chrome, demos, docs examples and distributed registry/assets. Do not reuse the Foglamp mark as the Framerock mark. Preserve geometry/layout where practical, with this branding change an explicit exception to AS-IS logo fidelity. Preserve truthful original-author, upstream repository, SPDX, NOTICE, CREDITS and provenance attribution to Foglamp/Foglamp Labs, Gustavo Fior and Abdul Haidar; those credits are not product branding. Inventory duplicated logo/brand-mark modules and all rendered usages so no upstream product mark remains accidentally.
