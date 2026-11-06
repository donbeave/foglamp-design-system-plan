# Wave 7 final verification

Implementation: `d7d4bf04409c751685c0d17766c1a823ac710030`, pushed to `origin/main`. Waves 0–6 remain in history. Bun is pinned locally to 1.4.4 through mise.

| Gate | Accepted evidence |
| --- | --- |
| Required commands | Registry build, portal verification, type checking, 58 tests, provenance fixtures and production build exit 0. Exact-final type/portal/build logs cover the final theme files. See `static-final/`. |
| Source and registry notices | 268 source files and 3,849 registry file occurrences have one full top SPDX header. Actual shadcn installs retain creator attribution; font CSS retains one full SIL OFL. See `registry-final/`. |
| Fresh consumer | All seven required items installed over HTTP into an empty external project. Default and strict TypeScript pass without skipLibCheck; changed closures were reinstalled and checked again. Served payload hashes match disk. |
| Documentation | 175 pages parse; 169 TSX examples compile; 145 API tables resolve their exports; 147 unique package subpaths resolve. No duplicate headings/descriptions, broken registry links or page-level provenance duplication. See `docs-final/`. |
| Rendered portal | All 175 routes return 200 with one H1; all 167 component pages render one provenance section. Registry indexes and llms.txt return 200. |
| Browser | Desktop/mobile Light/Dark homepage, hero containment, standalone defaults, primitive interactions, shared controls and theme protocol pass. Final cold sessions close hydration, uncontrolled-input, inheritance and native-theme regressions. See `browser-final/report.md`. |
| Runtime | Trace columns, FlowMap refitting, Scan graph, evaluation input/output, HUD steps/tools/redaction, preset synchronization and callbacks pass. Duplicate implementations and favicon resolution are reconciled. See `runtime-final/` and `browser-final/runtime-deep/`. |
| Branding and purity | Independent Framerock marks replace the Foglamp product logo. Source navbar/footer attribution injections are removed; BrazilFlag is restored. Truthful upstream, author and legal credits remain. |

Earlier failing snapshots are retained to document the fixes. The final reports and exact-final logs supersede those provisional failures. Large reproducible browser capture streams and screenshots remain local according to the repository ignore policy; reports and reproduction scripts are versioned.

No pull request was created. Final plan delivery is recorded in `results/run-state.json`.
