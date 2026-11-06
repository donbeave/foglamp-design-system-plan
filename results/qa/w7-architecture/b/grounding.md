# W7-ARCH-B Grounding

## Overview

This is a read-only package, registry, provenance, consumer-type, runtime, and branding map for the Wave 7 implementation checkout at `423fddb8e7a3c0280f14394f6a257e1451b927ae`, against upstream Foglamp pin `7d7e6609108019a74902858d4b07c24825c6318b`. The implementation worktree already has concurrent edits to `navbar.tsx`, `footer.tsx`, and `icons/logo.tsx`; this task did not modify or revert them. No QA result directory or installed `node_modules` exists in that checkout, so consumer failures below are contract-reported and statically grounded, not rerun here.

## Key Concepts

- **Keep three identities separate.** Product-facing names and marks become Framerock. Attribution, pinned upstream paths, SPDX/NOTICE text, and creator names remain Foglamp/Gustavo Fior/Abdul Haidar credits. Existing code, package, element, and event identifiers (`FoglampHUD`, `<foglamp-hud>`, `HudEvent`, `foglamp-story:*`) are compatibility/API or wire names; preserve them unless a deliberate compatible alias is introduced.
- **Have one provenance authority.** `scripts/provenance/manifest.json` already stores 266 source classifications, upstream paths, secondary paths, and body hashes. It should drive top headers, registry/catalog provenance, pinned-link checks, and notice policy. Source-header regeneration must run after source-body edits are frozen; one owner should also own generated registry output and manifest/lockfile changes.
- **Treat registry entries as curated install units.** `closure()` should include runtime imports and explicit type declarations needed by a consumer, but registry indexes should expose only supported installable components/utilities/styles. A declaration or CSS module can be closure-only without becoming a standalone shadcn item.

## How It Works

`packages/design-system/package.json` maps package root and deep subpaths directly to TypeScript source (`exports`, lines 15–85). `build-registry.ts` enumerates `.ts/.tsx/.js/.jsx/.css` under `src`, rewrites local specifiers, recursively follows import/export/dynamic-import specifiers into `files`, detects external dependencies, and emits one payload per item plus `story-items.json` and `framerock.json` (lines 67–90, 159–174, 280–296, 425–475). It currently does not resolve TypeScript triple-slash references.

Source metadata currently has two competing paths: Python `headers.py` and `verify.py` use the JSON manifest, while the TypeScript builder re-parses header comments and independently hardcodes the upstream commit and an inspiration fallback. `verify-portal.ts` invokes the Python verifier (line 8) and checks the generated story/item index, but its attribution assertions still require creator credit inside reusable navbar/footer files (lines 232–245), which conflicts with Wave 7 component purity.

## Where Things Live

| Concern | Current owner files / observed boundary |
| --- | --- |
| Provenance inventory and source-body classification | `scripts/provenance/manifest.json`; current generators/checkers: `scripts/provenance/headers.py`, `verify.py` |
| Package API and publication surface | `packages/design-system/package.json`, `src/index.ts`, `src/blocks/**/index.ts`; currently ships all `src`, directly exports `./blocks/scan/verify-source`, and declares React/ReactDOM as dependencies rather than peers (`package.json:15–85, 110–125, 156–161`). |
| Registry allowlist, source closure, payload/index writes | `packages/registry/scripts/build-registry.ts`; its owner must coordinate declaration closure, item allowlisting, license retention, and `/r/registry.json` output. |
| Consumer type fixes | `src/lib/scan/layout.ts`, `src/blocks/guide/observability-guide.tsx`, `src/blocks/guide/css-modules.d.ts`, `src/blocks/auth/login-form.tsx`; these files must stay synchronized with registry closure and exported entrypoints. |
| HUD, evaluation and map interactions | `src/hud/{FoglampHUD,model,useHudStream}.tsx/.ts`, `src/blocks/marketing/hud-landing.tsx`, `src/blocks/dashboard/eval-detail-block.tsx`, `src/blocks/scan/flow-map.tsx`, `src/charts/evilcharts/ui/evil-brush.tsx`. |
| Product marks/defaults | `src/icons/{logo,brand-mark}.tsx`, `src/blocks/marketing/chrome/{logo,brand-mark,navbar,footer}.tsx`, marketing demo chrome/sidebar/shell, and `src/hud/FoglampHUD.tsx`. Preserve legal headers while replacing rendered Foglamp identity. |

## Gotchas and Integration Dependencies

### Provenance and Registry

- `headers.py:44–49` removes only a byte-zero header before writing. Its `body()` loop strips a leading header and client directive twice, so a second old attribution comment after `"use client";` can be excluded from the body hash and survive as a duplicate. `--check` compares the regenerated file to that same result; verification does not separately count header blocks.
- `build-registry.ts:269–278` puts a backup header after `ast.statements[0]`; for ordinary TSX that statement is commonly the first import, so a notice can split import declarations. CSS gets a duplicate header appended at EOF. The builder also embeds the complete root font notice in `font-setup.css` (lines 92–105) and then calls `retainInstalledNotice()` again (line 344). Each current notice file contains three full OFL texts, one for each font; do not deduplicate the copyright notices when reducing the license text to one copy.
- `provenanceFor()` hardcodes `figure-picker.tsx` for every `tailrocks-original` entry (lines 299–307); 18 current manifest items carry this false inspiration. `lib/types.ts` is also explicitly classified as modified from `apps/web/src/lib/trace-timeline.ts` in the manifest. Original-only provenance should have no fabricated upstream/inspiration path unless a specific source is recorded.
- The package registry has 288 items. It includes root/barrel `Index` entries, `css-modules.d.ts`, and an observability CSS module; `/r/registry.json` is absent. `isPublicEntry()` (lines 144–150) excludes only button styles, two prompt modules, and `verify-source`; it is not an installable-item allowlist. `registry.json` and package metadata contain Framerock publisher details, but generated descriptions still visibly call the product “Foglamp”.
- Keep copied, modified, and original semantics distinct: copied body equality is checked against the pinned upstream after stripping provenance/client metadata; modified sources require a truthful Section 4(b) notice; Tailrocks-original sources have no upstream file. Source header/body writers must finish before provenance refresh and registry generation.

### Consumer Types and Closure

- Current lock pins React `19.2.5`, `@types/react` `19.2.14`, `@tabler/icons-react` `3.41.1`, `@tanstack/react-form` `1.29.1`, `zod` `4.3.6`, and `elkjs` `0.11.1`. No local install was present to inspect Tabler declarations. Preserve the existing `*Filled` imports and SVGs; resolve the reported React 19 `ReactSVG` declaration mismatch with a type-only compatibility declaration/patch that is included for deep exports and registry installs, then verify both consumer compiler modes without `skipLibCheck`.
- `layout.ts:52–53` uses `@ts-expect-error` on the lazy ELK worker import; the contract reports this becomes unused in default non-strict mode. Give that worker an explicit ambient module type rather than relying on an expect-error. `observability-guide.tsx:35` imports `./observability-guide.module.css`; `css-modules.d.ts` declares the wildcard but is neither referenced by the component nor discovered by `closure()`. Add an explicit source reference and teach closure to include referenced declarations; keep declaration files closure-only.
- `login-form.tsx:344–346, 376–378, 424–426, 481–483` renders `field.state.meta.errors` as if each error has `.message`; under the reported non-strict Zod/TanStack inference it is `unknown[]`. Narrow `unknown` structurally at the display boundary (or derive from the authoritative TanStack/Zod type), rather than adding unchecked casts. When React moves to peer dependencies, `installedVersion()` (lines 236–251) must also resolve peer versions for registry dependency generation.
- Publication should keep the source exports consumers rely on while removing `verify-source`, test files, and project config from packed/public entrypoints. `files: ["src", ...]` currently includes six test files, `blocks/scan/tsconfig.json`, and `verify-source.ts`; its explicit export has no public value and executes a read from `.reference` when imported. React and ReactDOM should be peers with pinned workspace dev dependencies. Limit wildcard exports so private helpers cannot accidentally become API.

### Runtime and Brand Interfaces

- HUD trace rows key steps as `s${stepNumber}` (`hud/model.ts:81–84`). Final `stepsFromSpans()` parses only `:step:N` and maps every unmatched LLM span to `0` (`lines 257–264`); `hud-landing.tsx:89–107` has unmatched IDs and 1-based stream events, which conflicts with the display’s one-based label. Use deterministic indexed fallback and consistent zero-based events/IDs while preserving the row key scheme. `FoglampHUDProps` currently exposes `stream`, `defaultOpen`, `theme`, `redact` only (`FoglampHUD.tsx:44–53`); `HudStream` is only a typed local `subscribe()` API (`useHudStream.ts:24–26`), with no `port`/`url` connection props. Preset changes also will not reset `mode`, which is initialized once from `defaultOpen` (`FoglampHUD.tsx:310–314`).
- `EvalDetailInputsContext` defaults `judgeInputs` to `{}` and `EvalDetailBody` defaults to `DEFAULT_SCORES` (`eval-detail-block.tsx:174–178, 254–256`); the score drawer lookup falls through to “Judge input unavailable” when no judge input exists (`line 929`). Default judge inputs must share the same score IDs as the defaults.
- `PayloadView` memoizes by `value`, `previousValue`, and `foldBeforeLastUser`, but resets expansion on `value` alone (`payload-view.tsx:384–389`). This is the actual state-sync dependency when presets change the other two inputs. `DeviceApproveBlock` likewise initializes its code from a prop at line 98; preset/story state is separate from later prop changes. Keep prop-driven resets explicit and scoped to inputs that define the same logical record.
- `EvilBrush` mounts `MiniChart` in a fixed-height relative viewport (`evil-brush.tsx:411–436`); MiniChart contains 100% `ResponsiveContainer`s (lines 650–727) without positive-size guards, the source of the reported negative-size warning. `flow-map.tsx` contains a NUL byte and is treated as binary by normal `rg`, so direction/fit inspection needs a NUL-safe reader; the contract’s fit reset must be coordinated with `direction` changes and layout recomputation.

### Duplicate Modules and Visible Branding

The seven alleged duplicate pairs are not all interchangeable. Body comparison after stripping only the first header found: scan brand, marketing/icon logo, and icon/chrome BrandMark are exact duplicate implementations except relative imports; Markdown copies are about 95% similar; marketing/scan noise overlays about 97% similar; sunset cards share content but differ in prop/environment resolution; favicon files expose different utilities (`/api/favicon` URL builder/model-domain mapper vs Google favicon URL resolver). Prefer one canonical implementation plus legacy-path re-exports only for true duplicate APIs; preserve distinct semantics for non-duplicates.

Product-mark inventory observed in source:

- The three-circle mark and wordmark are duplicated between `icons/{brand-mark,logo}.tsx` and `blocks/marketing/chrome/{brand-mark,logo}.tsx`; both Logo defaults are `"Foglamp"`. The SVG itself is the upstream Foglamp mark and must not become the Framerock logo. `MarketingNavbar` and `CuttingMatFooterBlock` also default their `brandName` to Foglamp and navbar has `aria-label="Foglamp on GitHub"`.
- Visible identity also occurs in marketing demo chrome/sidebar, the HUD Shadow DOM mark/labels, and scan/demo story defaults. Inventory rendered text/alt/aria-labels/usages at those call sites before changing shared assets. Provider/model logos in `brand-logos.tsx` are third-party provider marks, not the Foglamp product mark.
- Keep source attribution, author and repository links, Apache license text, SPDX fields, NOTICE/CREDITS, and provenance URLs. Preserve compatibility APIs/wire identifiers such as `FoglampHUD`, `<foglamp-hud>`, `foglamp-hud-hidden`, and `foglamp-story:*`; they are not rendered product logos.

## Ownership Partition Recommendation

1. **Reusable component purity + branding:** own logo/brand-mark, navbar/footer, demo chrome, and HUD visible labels/mark; update direct consumers/stories/docs only where they render those defaults. Avoid attribution DOM in reusable components.
2. **Runtime interaction fixes:** own HUD model/events/story, eval detail default data, prop-reset sites, FlowMap direction-fit and EvilBrush sizing; avoid the provenance scripts and package manifests.
3. **Package/consumer contract:** one owner for package exports/files/React peer metadata plus the type compatibility declaration and consumer entry map. This owner coordinates its `.d.ts` with registry closure.
4. **Provenance + registry pipeline:** exclusive owner for `manifest.json`, header generation/verification, builder, notices, generated `registry.json`/payloads, and `verify-portal.ts` provenance assertions. Run only after source body edits stabilize. No second writer should edit package/registry manifests or generated `/r` files concurrently.

This task changed only this grounding document. No implementation tests or typechecks were run.
