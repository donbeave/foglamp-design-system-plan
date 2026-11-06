# Wave 7 final docs boundary audit

Read-only audit against `/Users/donbeave/Projects/donbeave/foglamp-design-system` at the source-freeze request. No implementation files were changed. Raw reports and repeatable scripts are alongside this file.

## Coverage

| Check | Result |
| --- | ---: |
| MDX pages | 175 |
| Component pages | 167 |
| Direct MDX parser errors | 0 |
| Duplicate body H1s | 0 |
| Opening descriptions repeated in body | 0 |
| MDX provenance tags / attribution sections | 0 |
| Legacy relative story / registry links | 0 |
| Broken `/r/*.json` links | 0 |
| Component pages with Usage section and TSX fence | 167 / 167 |
| Component TSX fences | 167 |
| All TSX fences, including foundations | 169 |
| TSX fence TypeScript diagnostics | 0 |
| Component TSX fences missing `@tailrocks/framerock` imports | 0 |

All 145 component API tables were resolved through the TypeScript checker. The API audit separates five invalid API rows from three wrong package-import paths; see `api-audit.json`. It checks export names, not every prop type or prose description. `brand-logos.mdx` documents all 25 source exports.

The five invalid rows are `getSpanTypeConfig` and `SPAN_TYPES` in `widgets/span-type.mdx`, plus `ChartBackground` in each of `charts/area-chart.mdx`, `charts/bar-chart.mdx`, and `charts/line-chart.mdx`. The three package-import path mismatches are `charts/chart.mdx`, `charts/dot.mdx`, and `charts/zoom.mdx`: their API rows match the target source identified by the registry/upstream mapping, but are unavailable from the package path printed in each page footer.

The package boundary scan checks exact and wildcard `package.json` export mappings without using tsconfig aliases. It covered 147 unique documented subpaths and 411 metadata/import occurrences. One target was missing: `@tailrocks/framerock/charts/evilcharts/ui/zoom` maps to `src/charts/evilcharts/ui/zoom.ts`, while the implementation checkout currently contains `zoom.tsx` only. See `package-subpaths-audit.json`.

## Commands and results

| Command | Exit |
| --- | ---: |
| `node results/qa/w7-final-verification/docs-final/check-examples.mjs /Users/donbeave/Projects/donbeave/foglamp-design-system` | 0; 169 fences, 0 diagnostics |
| `node results/qa/w7-final-verification/docs-final/audit-structure.mjs /Users/donbeave/Projects/donbeave/foglamp-design-system` | 0 |
| `node results/qa/w7-final-verification/docs-final/audit-public-apis.mjs /Users/donbeave/Projects/donbeave/foglamp-design-system` | 0 |
| `node results/qa/w7-final-verification/docs-final/audit-package-subpaths.mjs /Users/donbeave/Projects/donbeave/foglamp-design-system` | 0; reports the missing zoom export target |
| Direct `@mdx-js/mdx` parse of all `apps/docs/content/docs/**/*.mdx` | 0; 175 pages, 0 parse errors |
| `bun scripts/provenance/verify-mdx-fixtures.ts` | 0; all 13 fixture cases pass |
| `bun scripts/provenance/verify.ts` | 1; assertion at `packages/design-system/src/lib/scan/favicon.ts` |
| `bun scripts/provenance/test-fixtures.ts` | 1; its `verify.ts --scoped --fixture-stripped-payload` case hits the same favicon assertion |

The full provenance command and aggregate fixture runner remain blocked by the favicon source assertion, outside the docs tree. The targeted MDX fixture verifier and direct parser pass. I did not rerun the full provenance command during the package-boundary check because the coordinator noted that the favicon source was still in flight.

## Post-repair rerun

After the docs/API and package-export repairs, I reran the focused boundary checks against the main checkout:

| Check | Result |
| --- | ---: |
| Virtual TypeScript check | 169 TSX fences, 0 diagnostics |
| API exports | 145 tables checked, 0 incorrect rows, 0 unresolved targets |
| Package subpaths | 147 unique subpaths, 411 occurrences, 0 missing mappings or files |
| Structure and links | 175 pages clean; all 167 component Usage sections/fences present |
| Direct MDX parse | 175 pages, 0 parse errors |

The `ui/zoom` export now resolves. The previous five bad rows and three path mismatches are cleared. These focused checks do not rerun the favicon-blocked provenance aggregate.

## Reproduction

From the plan repository root, regenerate the evidence with:

```sh
node results/qa/w7-final-verification/docs-final/check-examples.mjs \
  /Users/donbeave/Projects/donbeave/foglamp-design-system \
  > results/qa/w7-final-verification/docs-final/example-diagnostics.json
node results/qa/w7-final-verification/docs-final/audit-structure.mjs \
  /Users/donbeave/Projects/donbeave/foglamp-design-system \
  > results/qa/w7-final-verification/docs-final/structure-audit.json
node results/qa/w7-final-verification/docs-final/audit-public-apis.mjs \
  /Users/donbeave/Projects/donbeave/foglamp-design-system \
  > results/qa/w7-final-verification/docs-final/api-audit.json
node results/qa/w7-final-verification/docs-final/audit-package-subpaths.mjs \
  /Users/donbeave/Projects/donbeave/foglamp-design-system \
  > results/qa/w7-final-verification/docs-final/package-subpaths-audit.json
```
