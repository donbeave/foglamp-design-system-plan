/goal EXTEND THE CURRENT RUNNING GOAL (`Waves 0–5`) WITH **WAVE 6: Rebrand to `Framerock` (`@tailrocks/framerock`), Remove Founder Impersonation, Enforce Apache-2.0 + SPDX Legal Compliance, and Add Steve Jobs Tribute + Per-Component Upstream Source Links**.

## 0. HOW THIS EXTENDS THE CURRENT RUNNING GOAL (READ FIRST)

You are extending the active multi-wave extraction goal managed in `/Users/donbeave/Projects/donbeave/foglamp-design-system-plan` (`GOAL.md`, `TASKS.md`, `task-index.json`, `AGENTS.md`, `results/run-state.json`) and implemented in `/Users/donbeave/Projects/donbeave/foglamp-design-system`.

1. **DO NOT DISCARD OR REVERT ANY COMPLETED `WAVES 0–5` WORK:**
   - Keep all extracted primitives, widgets, EvilCharts, figures, marketing/scan/setup blocks, stories, MDX docs, and Wave 5 runtime/visual fixes intact.
   - If `W5-5.1B` or `W5-5.2` has uncommitted fixes in `/Users/donbeave/Projects/donbeave/foglamp-design-system`, finalize and commit them first before starting **Wave 6 (`W6-6A` → `W6-GATE`)**.
2. **100% VISUAL & BEHAVIORAL IMMUTABILITY STAYS IN FORCE:**
   - Do **NOT** change how any extracted component looks, animates, or behaves in Light Mode or Dark Mode. All 18 `--custom-shadow*` tokens, `@toolwind/corner-shape` squircles (`corner-squircle`, `corner-bevel`), `DRAWER_BUTTON_CLASS`, 3-Beat `Hero3DDemoBlock`, `TraceTimeline`, `FlowMap`, and `FoglampHUD` physics remain **100% AS-IS**.
3. **EXPLICIT SUPERSEDING RULES (OVERRIDING EARLIER WAVE 0 / WAVE 4 / WAVE 5 INSTRUCTIONS):**
   Where earlier waves in `GOAL.md`, `PLAN.md`, `TASKS.md`, or `scripts/verify-portal.ts` instructed you to:
   - Name the package `@foglamp/design-system` or brand the portal `"Foglamp Design System"` → **SUPERSEDED:** Rebrand to **`Framerock`** (`@tailrocks/framerock`, the Web UI sibling to `Termrock` in the `tailrocks` ecosystem).
   - Extract and embed `<OriginalAuthorsBlock />` (`original-authors-block.tsx`) with personal founder photos (`avatar.jpg`, `abdul-haidar.jpg`) and first-person `"Our Story"` founder bios → **SUPERSEDED:** Delete `original-authors-block.tsx`, its `.story.tsx` and `.mdx` files, and both personal photographs (`avatar.jpg`, `abdul-haidar.jpg`) so we never impersonate the original founders or imply their endorsement.
   - Set `registry.json` `"homepage": "https://github.com/foglamp-labs/foglamp"` and `"author": "Gustavo Fior & Foglamp Labs"` → **SUPERSEDED:** Set `"author"` to **Tailrocks** (`https://github.com/tailrocks`) and `"homepage"` to `"https://github.com/tailrocks/framerock"` so we do not misrepresent who publishes and maintains this package, while prominently crediting **Gustavo Fior (`@gustavo-fior`)**, **Abdul Haidar**, and **Foglamp Labs (`https://foglamp.dev`)** in `"contributors"`, `NOTICE`, `CREDITS.md`, every component page, and every source header.
4. **CONTINUE STRICT `.codex/agents/*.toml` MODEL ROUTING:**
   - Dispatch all Wave 6 tasks exclusively through the existing `.codex/agents/*.toml` profiles (`foglamp_luna_low`, `foglamp_luna_medium`, `foglamp_luna_high`, `foglamp_terra_low`, `foglamp_terra_medium`, `foglamp_sol_high`). Never use `gpt-6-astra`.

---

## 1. WAVE 6 SPECIFICATION (APPEND TO `TASKS.md`, `task-index.json` & `results/run-state.json`)

First, update `/Users/donbeave/Projects/donbeave/foglamp-design-system-plan/TASKS.md`, `task-index.json`, `AGENTS.md`, `PLAN.md`, `CREDITS.md`, and `GOAL.md` to record **Wave 6 (`W6-6A` through `W6-GATE`)**, then execute each task in `/Users/donbeave/Projects/donbeave/foglamp-design-system`:

### Task `W6-6A` — Package, Scope, Link-Context & Registry Rebrand to **`Framerock`** (`@tailrocks/framerock`)
- **Profile:** `foglamp_luna_medium` (`depends_on: ["W5-5.2"]`)
- **Required Changes in `/Users/donbeave/Projects/donbeave/foglamp-design-system`:**
  1. **`packages/design-system/package.json`:**
     - Set `"name": "@tailrocks/framerock"` and `"license": "Apache-2.0"`.
     - Set `"author": { "name": "Tailrocks", "url": "https://github.com/tailrocks" }`.
     - Set `"contributors"`:
       ```json
       [
         {
           "name": "Gustavo Fior",
           "url": "https://gustavofior.com",
           "role": "Original Creator & Principal Design Engineer of Foglamp UI (https://github.com/foglamp-labs/foglamp)"
         },
         {
           "name": "Abdul Haidar",
           "url": "https://www.linkedin.com/in/abdulhdr/",
           "role": "Co-Founder & Original Author of Foglamp (https://foglamp.dev)"
         },
         {
           "name": "Foglamp Labs",
           "url": "https://foglamp.dev",
           "role": "Original Upstream Project (https://github.com/foglamp-labs/foglamp)"
         }
       ]
       ```
     - Set `"repository": { "type": "git", "url": "git+https://github.com/tailrocks/framerock.git" }` and `"homepage": "https://github.com/tailrocks/framerock"`.
     - Copy root `LICENSE` and `NOTICE` into `packages/design-system/LICENSE` and `packages/design-system/NOTICE` so npm tarballs include both files per Apache-2.0 § 4(a) and § 4(d).
  2. **Workspace Imports & Aliases:**
     - Update `@foglamp/design-system` → `@tailrocks/framerock` across `apps/docs/package.json`, `packages/registry/package.json`, `tsconfig.base.json`, `apps/docs/tsconfig.json`, and all imports in `apps/docs/src/**`, `apps/docs/content/docs/**/*.mdx`, and `scripts/**`.
  3. **Link-Context Symbol Rebrand (`packages/design-system/src/lib/link-context.tsx`):**
     - Rename `FoglampLinkProvider`, `FoglampLink`, `useFoglampLink`, and `FoglampLinkProps` to `FramerockLinkProvider`, `FramerockLink`, `useFramerockLink`, and `FramerockLinkProps` (keep deprecated re-exports of the `Foglamp*` symbols for backwards compatibility, and migrate internal callers to `Framerock*`).
  4. **Docs Portal Branding (`apps/docs/`):**
     - Update portal title, navbar brand, root route metadata, and hero branding from `"Foglamp Design System"` to **`"Framerock"`** (*"Framerock — Web UI Design System by Tailrocks, extracted from Foglamp by Gustavo Fior & Foglamp Labs"*).

---

### Task `W6-6B` — Anti-Impersonation Cleanup (Remove Founder Photos, `OriginalAuthorsBlock` & Upstream Entity Leaks)
- **Profile:** `foglamp_luna_medium` (`depends_on: ["W6-6A"]`)
- **Required Changes:**
  1. **Delete `OriginalAuthorsBlock` and Personal Founder Photographs (Right of Publicity & Lanham Act § 43(a) Compliance):**
     - Delete `packages/design-system/src/blocks/marketing/original-authors-block.tsx` (or any equivalent `about` founder bio block).
     - Delete `apps/docs/public/avatar.jpg`, `apps/docs/public/abdul-haidar.jpg`, and any copies under `packages/design-system/src/assets/`.
     - Delete `apps/docs/src/stories/blocks/original-authors-block.story.tsx` (or `blocks-marketing/original-authors-block.story.tsx`) and `apps/docs/content/docs/blocks/original-authors-block.mdx`.
     - Remove `OriginalAuthorsBlock` exports and references from `packages/design-system/src/blocks/marketing/index.ts`, `packages/design-system/src/index.ts`, `apps/docs/src/routes/index.tsx`, and `apps/docs/content/docs/credits.mdx`.
  2. **Scrub Hardcoded Founder Identity in `demo-sidebar.tsx`:**
     - In `packages/design-system/src/blocks/marketing/demo/demo-sidebar.tsx` (and any fixture/demo file referencing `/avatar.jpg` or `"Gustavo"` as the logged-in user), replace `/avatar.jpg` with an inline neutral geometric SVG avatar data URI and `"Gustavo"` with a neutral demo persona (`"Alex Morgan"` or `"Framerock"`), preserving exact classes (`size-4 rounded-full object-cover`) and layout geometry.
  3. **Neutralize `schema.org` JSON-LD & Marketing Default Copy (Zero Visual Changes):**
     - Ensure no block emits `schema.org` `Organization` JSON-LD claiming to be `"Foglamp"` (`url: "https://foglamp.dev"`). Default to neutral configurable props (`name = "Acme Corp"`, `url = "https://example.com"`).
     - Where legal/marketing page blocks (`terms-page-block`, `privacy-page-block`, etc.) hardcode `"Foglamp Labs, Inc."`, expose configurable props with neutral defaults while preserving 100% identical typography, spacing, and visuals.

---

### Task `W6-6C` — Three-Tier SPDX + Apache-2.0 Section 4(b) Source Header Pass & Self-Contained Registry Payloads
- **Profile:** `foglamp_terra_medium` (`depends_on: ["W6-6B"]`)
- **Required Changes:**
  1. **Compare Every Source File in `packages/design-system/src/` Against `.reference/foglamp` (Commit `7d7e6609108019a74902858d4b07c24825c6318b`) and Apply the Matching SPDX Header at Line 1:**
     - **Case A (`@provenance copied-1-to-1` — Byte-for-Byte Unmodified Body):**
       Use ONLY when the file body (excluding the leading comment header and `"use client"`) is 100% identical to `.reference/foglamp/<upstream-path>`:
       ```ts
       /**
        * @license Apache-2.0
        * SPDX-License-Identifier: Apache-2.0
        * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
        *
        * @provenance copied-1-to-1
        * @upstream-repo https://github.com/foglamp-labs/foglamp
        * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
        * @upstream-path <exact-repo-relative-path-in-foglamp>
        * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/<exact-repo-relative-path-in-foglamp>
        *
        * Copied 1:1 without modification from Foglamp (https://github.com/foglamp-labs/foglamp),
        * originally designed and implemented by Gustavo Fior (@gustavo-fior) and co-founder
        * Abdul Haidar at Foglamp Labs (https://foglamp.dev).
        */
       ```
     - **Case B (`@provenance modified` — Apache-2.0 Section 4(b) Notice for Any Decoupled/Import-Rewritten File):**
       Use whenever ANY line of the file differs from `.reference/foglamp/<upstream-path>` (including `@foglamp/ui` → relative import rewrites, `FramerockLink` decoupling, or prop extraction):
       ```ts
       /**
        * @license Apache-2.0
        * SPDX-License-Identifier: Apache-2.0
        * SPDX-FileCopyrightText: Copyright (c) 2026 Gustavo Fior (@gustavo-fior), Abdul Haidar, and Foglamp Labs (https://foglamp.dev)
        * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
        *
        * @provenance modified
        * @upstream-repo https://github.com/foglamp-labs/foglamp
        * @upstream-commit 7d7e6609108019a74902858d4b07c24825c6318b
        * @upstream-path <exact-repo-relative-path-in-foglamp>
        * @upstream-url https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/<exact-repo-relative-path-in-foglamp>
        * @modifications Decoupled module imports and/or router/data bindings for standalone Framerock package & registry distribution; 1:1 visual design and behavior preserved.
        *
        * Apache-2.0 Section 4(b) Notice: This file was modified by Tailrocks from the
        * original Foglamp source (https://github.com/foglamp-labs/foglamp) created by
        * Gustavo Fior (@gustavo-fior) and co-founder Abdul Haidar at Foglamp Labs (https://foglamp.dev).
        */
       ```
     - **Case C (`@provenance tailrocks-original` — Authored by Tailrocks):**
       Use for files written by Tailrocks with no upstream counterpart in `.reference/foglamp` (`src/lib/link-context.tsx`, barrel `index.ts` files, etc.):
       ```ts
       /**
        * @license Apache-2.0
        * SPDX-License-Identifier: Apache-2.0
        * SPDX-FileCopyrightText: Copyright (c) 2026 Tailrocks (https://github.com/tailrocks)
        *
        * @provenance tailrocks-original
        * @inspiration https://github.com/foglamp-labs/foglamp (Gustavo Fior @gustavo-fior, Abdul Haidar, Foglamp Labs — https://foglamp.dev)
        *
        * Authored by Tailrocks (https://github.com/tailrocks). Inspired by the visual
        * design language of Foglamp by Gustavo Fior (@gustavo-fior), Abdul Haidar, and
        * Foglamp Labs (https://foglamp.dev). Not an upstream Foglamp source file.
        */
       ```
  2. **Update `packages/registry/scripts/build-registry.ts` & Rebuild `apps/docs/public/r/*.json`:**
     - Set top-level registry `"name": "framerock"`, `"homepage": "https://github.com/tailrocks/framerock"`, `"license": "Apache-2.0"`, and `"author": "Tailrocks (https://github.com/tailrocks) — Original UI design & implementation by Gustavo Fior (@gustavo-fior), Abdul Haidar & Foglamp Labs (https://foglamp.dev)"`.
     - Rewrite registry install target paths from `components/foglamp/...` to `components/framerock/...`.
     - Parse `@provenance`, `@upstream-commit`, `@upstream-path`, and `@upstream-url` from each source file and emit them into `apps/docs/public/r/story-items.json` and each `/r/<item>.json` metadata object:
       - `provenance`: `"copied-1-to-1" | "modified" | "tailrocks-original"`
       - `provenanceLabel`: `"1:1 Copied" | "Modified (Import/Prop Decoupled)" | "Newly Added by Tailrocks"`
       - `upstreamCommit`: `"7d7e6609108019a74902858d4b07c24825c6318b"`
       - `upstreamPath`: `"<exact-repo-relative-path-in-foglamp>"`
       - `upstreamUrl`: `"https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/<exact-repo-relative-path-in-foglamp>"`
     - Ensure every `files[].content` string in `apps/docs/public/r/*.json` retains its full SPDX + Apache-2.0 + Gustavo Fior / Foglamp Labs attribution header (and if `build-registry.ts` rewrites imports or assets on a `copied-1-to-1` file, automatically inject an `Apache-2.0 Section 4(b) Registry Packaging Notice` into that payload header so `npx shadcn@latest add` consumers receive compliant files).

---

### Task `W6-6D` — Prominent Public Shoutout, Steve Jobs Quote & Per-Component Upstream Links (`.mdx` + `story-panel.tsx`)
- **Profile:** `foglamp_luna_high` (`depends_on: ["W6-6C"]`)
- **Required Changes:**
  1. **Update `NOTICE`, `CREDITS.md`, `README.md`, `apps/docs/src/routes/index.tsx`, `apps/docs/content/docs/index.mdx`, and `apps/docs/content/docs/credits.mdx`:**
     - Feature a prominent **Origin, Inspiration & Open-Source Attribution** section containing:
       > *“Good artists copy, great artists steal.”* — **Steve Jobs** (who famously admitted that Apple has *“always been shameless about stealing great ideas”*)
       >
       > We apply that exact principle here — **openly, proudly, and in full compliance with the Apache-2.0 open-source license**. Every component in **Framerock** is either **copied 1:1 or directly inspired by** [**Foglamp**](https://foglamp.dev) ([`github.com/foglamp-labs/foglamp`](https://github.com/foglamp-labs/foglamp) at commit [`7d7e6609108019a74902858d4b07c24825c6318b`](https://github.com/foglamp-labs/foglamp/tree/7d7e6609108019a74902858d4b07c24825c6318b)), originally designed and engineered by [**Gustavo Fior (`@gustavo-fior`)**](https://github.com/gustavo-fior) ([`gustavofior.com`](https://gustavofior.com) · [`@heyimgustavo`](https://x.com/heyimgustavo) · [LinkedIn](https://www.linkedin.com/in/gustavofior)) and co-founder [**Abdul Haidar**](https://www.linkedin.com/in/abdulhdr/) at [**Foglamp Labs**](https://foglamp.dev).
       >
       > **Why we extracted this work & our honest humility:** Today, we keep these components **1:1 visually and behaviorally identical** to `foglamp-labs/foglamp` (with only framework-decoupling modifications documented under Apache-2.0 Section 4(b)). Over time, **Tailrocks** will extend **Framerock** with modified and newly authored components following this design language — though we humbly admit we don't think we can ever make our additions look quite as extraordinary as how **Gustavo Fior** crafted the originals. We extracted and packaged this system because we fell in love with its rare, obsessive quality and wanted to use it across Tailrocks projects (alongside `Termrock` for the terminal) and share it with the wider internet.
       >
       > **Non-Affiliation Disclaimer:** **Framerock** is an independent open-source project maintained by [**Tailrocks**](https://github.com/tailrocks) and is not affiliated with, sponsored by, or endorsed by **Gustavo Fior**, **Abdul Haidar**, or **Foglamp Labs**. Any modifications, decoupling changes, or newly added components are solely the responsibility of Tailrocks.
  2. **Per-Component Upstream File Reference on Every `.mdx` Page (`apps/docs/content/docs/**/*.mdx`) and Workbench (`apps/docs/src/components/story-panel.tsx`):**
     - On **every single component `.mdx` page** and inside **`story-panel.tsx`**, render:
       - **Provenance Badge:** `1:1 Copied` | `Modified (Import/Prop Decoupled)` | `Newly Added by Tailrocks`
       - **Extracted From (Exact Upstream File):** Clickable link to `https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/<exact-upstream-path>`
       - **Upstream Repository & Website:** Clickable links to [`github.com/foglamp-labs/foglamp`](https://github.com/foglamp-labs/foglamp), [`foglamp.dev`](https://foglamp.dev), and [`Gustavo Fior (@gustavo-fior)`](https://gustavofior.com).

---

### Task `W6-GATE` — Automated Legal/SPDX/Attribution Verification (`scripts/verify-portal.ts`), Build & Final Git Push
- **Profile:** `foglamp_sol_high` (`depends_on: ["W6-6D"]`)
- **Required Changes & Verification:**
  1. **Update `scripts/verify-portal.ts`:**
     - **Gate 1 (SPDX & Section 4(b) Header Gate):** Verify every `.ts`/`.tsx`/`.css` file in `packages/design-system/src/` carries `SPDX-License-Identifier: Apache-2.0`, `SPDX-FileCopyrightText`, and a valid `@provenance` tag (`copied-1-to-1`, `modified`, or `tailrocks-original`). Verify that any file whose body differs from `.reference/foglamp/<upstream-path>` is marked `@provenance modified` with an `Apache-2.0 Section 4(b) Notice`.
     - **Gate 2 (Registry Payload Self-Containment Gate):** Verify every `files[].content` in `apps/docs/public/r/*.json` contains `SPDX-License-Identifier: Apache-2.0`, `Gustavo Fior`, `Foglamp Labs`, and `https://foglamp.dev`.
     - **Gate 3 (Per-Component `.mdx` & `story-panel.tsx` Upstream Link Gate):** Verify `story-items.json`, `story-panel.tsx`, and every component `.mdx` page display the provenance classification label and the pinned commit `https://github.com/foglamp-labs/foglamp/blob/7d7e6609108019a74902858d4b07c24825c6318b/...` link.
     - **Gate 4 (Anti-Impersonation Gate):** Fail if `original-authors-block.tsx`, `avatar.jpg`, or `abdul-haidar.jpg` exist anywhere in the repo, or if `registry.json` `homepage` equals `"https://github.com/foglamp-labs/foglamp"`.
     - **Gate 5 (Public Shoutout & Steve Jobs Quote Gate):** Verify `NOTICE`, `CREDITS.md`, `README.md`, `apps/docs/src/routes/index.tsx`, and `apps/docs/content/docs/credits.mdx` all contain `Good artists copy, great artists steal`, `Apache-2.0`, `Gustavo Fior`, `@gustavo-fior`, `https://gustavofior.com`, `Abdul Haidar`, `Foglamp Labs`, `https://foglamp.dev`, and `https://github.com/foglamp-labs/foglamp`.
  2. **Run Full Verification Suite:**
     - Run `bun run build:registry`, `bun run verify:portal`, `bun run check-types`, `bun test`, and `bun run build` until all exit `0`.
  3. **Commit & Push Both Plan & Implementation Repos:**
     - Update `results/run-state.json` in `/Users/donbeave/Projects/donbeave/foglamp-design-system-plan` so `W6-6A`, `W6-6B`, `W6-6C`, `W6-6D`, and `W6-GATE` are `ACCEPTED`.
     - Commit and `git push origin main` in `/Users/donbeave/Projects/donbeave/foglamp-design-system`, verify `git status --porcelain` is empty, and emit `<!-- GOAL_COMPLETE -->`.
/goal
