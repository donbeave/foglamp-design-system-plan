# W6 final static, package, and fresh consumer checks

All six post-freeze static commands passed. The portal verifier reports 266 source headers with unchanged body hashes, 175 MDX pages with zero provenance issues, six public attribution surfaces with zero issues, zero provenance gate issues, 167 stories, and 288 registry items. The test suite passed 58 tests.

`npm pack` produced `@tailrocks/framerock@0.1.0`, 274 entries, 1,820,608 bytes (3,635,061 unpacked). `LICENSE`, `NOTICE`, and `THIRD-PARTY-NOTICES.md` are byte-identical to package-root copies. Package identity, author, license, all three contributor records, and `type-fest@4.41.0` passed inspection. The tarball has no founder photos/block, `.env`, `node_modules`, or temporary files. Full record: `pack-inspection-post-freeze.json`.

A fresh consumer installed Button, Hero, ScanBoard, SetupBoard, and style globals with actual `shadcn@latest` version 4.23.0 from the live local registry. All 119 installed TS/TSX/CSS files retain SPDX, copyright, provenance, Gustavo Fior, Foglamp Labs, and `foglamp.dev` markers. Every copied 1:1 file carries its required registry packaging notice. Across 143 TypeScript payload occurrences, AST output matches after comments are removed; all three CSS files match after Lightning CSS normalization. Consumer Vite build passed. Plain consumer `tsc --noEmit` reports the Tabler `ReactSVG` declaration error and unused `@ts-expect-error` in imported `scan/layout.ts`; strict type-check with `skipLibCheck` passes.

Apex’s live consumer QA covered Button, Hero, Scan, and Setup in both themes: 8 cases, fonts loaded in all, zero browser events/errors, zero local `/api` requests, and native default T3 favicon images loaded for Scan (3) and Setup (1). Its evidence is in `../w6-final-signoff/consumer-final-browser.json`.

Exact commands and exit codes are recorded in `final-record.json`; full logs and `.exit` files are adjacent. This worker did not edit implementation source or commit/push changes. The implementation commit and final gate decision remain coordinator-owned.
