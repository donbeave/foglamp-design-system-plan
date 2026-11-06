# Wave 7 current branding, legal, and purity audit

Read-only provisional review of the live implementation checkout. Files may change concurrently; no final acceptance is implied.

## Component purity

- `packages/design-system/src/blocks/marketing/chrome/navbar.tsx`: no attribution text/banner DOM found. Product identity defaults currently Framerock, `/homepage`, and `https://github.com/tailrocks/framerock`.
- `.../footer.tsx`: no injected attribution banner found; copyright row calls `<BrazilFlag className="size-4" />` (so function is used). Current default brandName is Framerock.

## Trademark mark

- Targeted SVG inspection finds rectangle based architectural marks in `icons/brand-mark.tsx`, `blocks/marketing/chrome/brand-mark.tsx`, `blocks/scan/brand.tsx`, `widgets/leaf/scan-brand.tsx`, and `hud/FoglampHUD.tsx`; the live rendered sources no longer contain the three `<circle cx=24/48/72>` mark.
- `blocks/scan/verify-source.ts` still contains an obsolete circle-mark string in its source comparison fallback at line 47, alongside rectangle mark at line 46. This is a verification fixture string, not live SVG output, but remains detectable old-mark material.
- `blocks/marketing/chrome/cutting-mat.tsx` renders `<rect>` strokes, but the `CIRCLES` identifier and comments still describe “three brand circles” and “circle”; visually it maps to rect shapes now. Consider stale terminology/geometry comments.

## Product-facing Foglamp inventory

The following visible/product-facing remnants are candidates against the contract's “replace all product-brand strings” requirement; technical API names/upstream provenance and legal credits are intentionally excluded:

- `packages/design-system/src/blocks/marketing/hero/hero.tsx:32,293`: “Projects running on Foglamp” and “Real projects running on Foglamp”.
- `packages/design-system/src/blocks/setup/decision-list.tsx:40`, `setup-summary.tsx:33`: user-facing comments/descriptions “What Foglamp decided” / “what Foglamp found” (comments may not render; check actual copy before classifying).
- `packages/design-system/src/blocks/app-shell/sunset-card.tsx:23,26`: `api.foglamp.dev` endpoint and email are referenced as sunset information. It includes product service URL and user-facing historical service notice; verify whether intended to be removed or retained as operational migration context.
- `packages/design-system/src/blocks/scan/scan-prompt.ts`: scan endpoint/prompt still refers to `foglamp`, `.foglamp/*`, `foglamp.dev` at lines 17, 86, 91, 94, 96-97, 114, 121, 123-127, 133. This is material rendered/copied prompt content and likely product branding, not mere attribution.
- `apps/docs/src/routes/index.tsx:69,89-91` contains Foglamp in attribution, upstream and non-affiliation context, which the contract explicitly requires to preserve.
- Other remaining hits observed are SPDX/upstream provenance/legal attribution, internal API names (`FoglampHUD`, `FoglampLink`, compatibility exports), and Fumadocs story event/storage namespaces; excluded as internal/provenance unless visibly surfaced.

## Header occurrence scan

- `packages/design-system/src`: 267 occurrences of `SPDX-License-Identifier: Apache-2.0` found. This is consistent with 266 source files plus one duplicated header occurrence, but count alone does not establish exactly one header in each file.
- `apps/docs/src`: 0 SPDX occurrences (headers requirement targeted extracted source files).
- One leftover extraction comment immediately after `"use client";` found: `packages/design-system/src/lib/link-context.tsx:18` (`Original design by...`, followed by upstream extraction note). The file already has a top SPDX/provenance header, so this appears to be a duplicate legacy header.

## Font notices / generated payload

- Root `THIRD-PARTY-NOTICES.md`: one SIL OFL 1.1 body occurrence.
- `packages/design-system/THIRD-PARTY-NOTICES.md`: one occurrence.
- `apps/docs/public/r/style-globals.json`: one occurrence of phrase `SIL Open Font License, Version 1.1` by `rg -c`, but its generated code `content` embeds a very large notice string. Exact repeated block count was not computed in this pass; inspect the extracted string before acceptance. Current generated payload exists and does not display the prior six literal phrase hits.

## Snapshot limits

No files outside this evidence file were written. No build or registry generation was run. Findings reflect the live tree during parallel edits.
