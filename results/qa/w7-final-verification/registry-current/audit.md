# Registry and provenance audit (provisional)

Inspected the active implementation checkout while other work was ongoing. Findings describe that snapshot and require rechecking after the source freeze.

- `packages/registry/scripts/build-registry.ts:150` excludes root and barrel indexes, declarations, and CSS modules as standalone entries; lines 372 and 500 provide the Dashboard Demo title and standard registry index.
- Generated `block-guide-observability-guide.json` contains its CSS module and declaration; `utility-scan-layout.json` contains the ELK declaration. `style-globals.json` contains one SIL OFL block. These are specific closure checks, not proof of general closure correctness.
- `scripts/provenance/manifest.json:3223` still maps `lib/types.ts` to `apps/web/src/lib/trace-timeline.ts` at line 3227, despite its recorded trace service source. `utility-types.json` repeats that mapping.
- `packages/registry/scripts/build-registry.ts:289` hardcodes declaration closure rather than traversing all triple-slash references. Lines 250–255 omit `peerDependencies` in version lookup.
- `scripts/verify-portal.ts:8` invokes Python; `scripts/provenance/verify.py:35,55–66` still expects old panel/MDX attribution and inspiration links. The requested Bun TypeScript consolidation remains incomplete.
- `packages/registry/scripts/build-registry.ts:283` retains only the leading header. Verify a real shadcn install before concluding that its import transformer preserves the notice.

## Provisional HTTP consumer run

The external harness is `/tmp/framerock-w7-consumer-codex`; it uses TypeScript 5.9.3, React 19.2.5, Bundler resolution, and no `skipLibCheck`. On the then-current generated payload, HTTP GET `http://localhost:3000/r/registry.json` returned 200. The following actual shadcn 4.12.0 command exited 0 and installed 127 files:

```sh
cd /tmp/framerock-w7-consumer-codex
/Users/donbeave/Projects/donbeave/foglamp-design-system/apps/docs/node_modules/.bin/shadcn add @framerock/ui-button @framerock/block-marketing-hero-hero @framerock/block-scan-scan-board @framerock/block-setup-setup-board @framerock/block-guide-observability-guide @framerock/block-auth-login-form @framerock/style-globals --yes --overwrite
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/tsc --noEmit --strict
```

Both compiler commands exited 2. The installed `lib/scan/elk-worker.d.ts` contains an ambient `declare module "react"` that shadows React, producing thousands of missing React exports; full logs are `default-tsc.log` and `strict-tsc.log` in the harness. The source declaration has since changed; regenerate payloads and reinstall before drawing a final conclusion.

The shadcn transform stripped the SPDX header from all 127 installed source/CSS files, including `styles/font-setup.css` and its SIL license. The served `utility-scan-layout.json` SHA-256 was `1869912e0f41423f2ef1115bd72c5e599394fcedcc182ad8e09ebc93a88a40a6`, matching the generated disk payload at the time of inspection. A fresh install and legal-notice check are required after regeneration.

## Package tarball dry run

`npm pack --dry-run --json` in `packages/design-system` exited 0; raw manifest is `/tmp/framerock-w7-pack.json`. Its 268 files include `LICENSE`, `NOTICE`, `THIRD-PARTY-NOTICES.md`, `src/lib/react-shim.d.ts`, `src/lib/scan/elk-worker.d.ts`, and `src/blocks/guide/css-modules.d.ts`. It excludes all `.test`/`.spec` files, `src/blocks/scan/verify-source.ts`, and that directory's `tsconfig.json`. `package.json:127–129` declares React and ReactDOM peers, but they also remain in regular dependencies at lines 109 and 111.

`src/lib/react-shim.d.ts:14–18` now imports React before augmentation; the ELK and CSS declaration files reference it, and root `src/index.ts:14` references the CSS declaration. Deep export behavior still requires a fresh tarball consumer check. The root barrel includes the requested DashboardDemo, FigureReveal, hooks, and breakdown aliases; its FigureKit export aliases FigureKit22Block (`src/index.ts:180`), whose API should be checked against the intended FigureKit.

`src/widgets/leaf/scan-brand.tsx:27,64` now uses `useScanFavicon`, but `src/lib/scan/favicon.ts:17–18` still emits `/api/favicon?domain=...`, contrary to the contract's explicit requirement to fix that helper. This snapshot was taken during concurrent source edits.

## Updated HTTP consumer run — 2026-11-06

Re-ran the seven-item `shadcn add` command above with `--yes --overwrite` in the same external harness after the registry rebuild: exit 0. `tsc --noEmit` and `tsc --noEmit --strict` both exited 0 with empty output and no `skipLibCheck`; output is in `default-tsc-new.log` and `strict-tsc-new.log` in the harness. All 128 installed `.ts`, `.tsx`, and `.css` files contain `SPDX-License-Identifier`, Gustavo Fior, Foglamp Labs, and `https://foglamp.dev`. Installed `font-setup.css` contains one SIL OFL block. The installed tree was reused from the earlier run and contains 128 files total.

At inspection, HTTP and disk SHA-256 values matched for each payload:

```text
ui-button 29f176ec3c6603ba841c9db66627fee918793ef3186d296d1e119f5bd9bdddaa
block-marketing-hero-hero 4563f92c69c1a7f74e129899b2cb28872aad5c5e0c8774b9dc7ea7b256c51362
block-scan-scan-board 55c787670e84d8b4eeeeea1a697fb7bb87a22a91446fec78134a3e5da1403b9a
block-setup-setup-board 46457b038763f20eb180e3594d14437cfe58b3fbbe67550281dc3cf08397a85b
block-guide-observability-guide 6e56a825d34493fa5e6e56ecc7c25bf89f6038100bef3c091ed1624f3f771dd8
block-auth-login-form 9b8e762882d3da999eb5a71a9551d111bcaa5d0e7f48a4f51f54a9e6543519ca
style-globals d8127d186a525495f1e99c691353d94a740393fcc6e261dcac74f13aa5cfcded
```

These results are provisional until the source and generated payloads are frozen and their hashes rechecked.
