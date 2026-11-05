# W6 final static, pack, and actual consumer evidence (interim)

## Initial static suite

Before the latest registry and portal-owner repairs, all six requested commands passed: registry build, `verify:portal`, type check, tests (58 passed), production build, and `git diff --check`. Logs and exit codes are in this folder's top-level `*.log` and `*.exit` files. This is an interim run; the suite must be refreshed after source/verifier edits freeze.

## Tarball

`npm pack ./packages/design-system` succeeded. The current tarball is `pack-final/tailrocks-framerock-0.1.0.tgz` (274 entries, 1,820,608 bytes, 3,635,061 unpacked bytes). `LICENSE`, `NOTICE`, and `THIRD-PARTY-NOTICES.md` are byte-identical to package-root copies. Metadata and exclusions passed, including no founder photos, OriginalAuthors block, `.env`, node_modules, or temporary files. See `pack-inspection-final.json`.

## Fresh actual shadcn consumer

A clean consumer was made from host configuration only. `shadcn@latest` version 4.23.0 installed Button, Hero, ScanBoard, SetupBoard, and `style-globals` from a local HTTP server at port 4290. After the registry packaging repair, all 119 installed TS/TSX/CSS files passed SPDX, copyright, provenance, Gustavo Fior, Foglamp Labs, and `foglamp.dev` marker checks. No copied 1:1 payload is missing its Section 4(b) registry packaging notice. The 3 files without Section 4(b) are all `tailrocks-original` files.

TS AST output matched all 143 selected registry payload file occurrences after stripping comments; Lightning CSS normalization matched all 3 CSS payloads. Vite consumer build passed. Plain consumer `tsc --noEmit` still reports a Tabler `ReactSVG` declaration error and an unused `@ts-expect-error` at installed `lib/scan/layout.ts:52`; `tsc --strict --skipLibCheck` passed. Registry metadata auto-installed `type-fest@4.41.0`, resolving the earlier missing type-fest error.

The current switchable consumer page at port 4292 mounts Button, Hero, ScanBoard, and SetupBoard with deterministic story-boundary fixtures and a light/dark toggle. Scan and Setup use the native default favicon resolver. Apex browser inspection is pending. A copied upstream helper still contains `/api/favicon`, but the rendered component default goes through the T3 faviconV2/256 resolver; coordinator disposition is pending.

Evidence: `fresh-consumer-2-header-scan.json`, `fresh-consumer-2-header-counts.json`, `fresh-consumer-2-payload-compare.json`, `pack-inspection-final.json`, and build/typecheck logs.
