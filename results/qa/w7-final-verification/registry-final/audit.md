# Frozen registry consumer and package verification — 2026-11-06

A new empty external consumer was created at `/tmp/framerock-w7-final-codex` with TypeScript 5.9.3, React 19.2.5, Bundler resolution, and no `skipLibCheck`. The actual shadcn 4.12.0 HTTP install exited 0:

```sh
shadcn add @framerock/ui-button @framerock/block-marketing-hero-hero @framerock/block-scan-scan-board @framerock/block-setup-setup-board @framerock/block-guide-observability-guide @framerock/block-auth-login-form @framerock/style-globals --yes
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/tsc --noEmit --strict
```

Both compiler commands exited 0 with empty output. Every one of 128 installed TypeScript/CSS files contains SPDX, Gustavo Fior, Foglamp Labs, and `https://foglamp.dev`; installed `font-setup.css` contains one SIL OFL block. Logs are in the external consumer directory.

HTTP and on-disk SHA-256 hashes matched before and after installation and compilation:

```text
ui-button 29f176ec3c6603ba841c9db66627fee918793ef3186d296d1e119f5bd9bdddaa 29f176ec3c6603ba841c9db66627fee918793ef3186d296d1e119f5bd9bdddaa True
block-marketing-hero-hero 4563f92c69c1a7f74e129899b2cb28872aad5c5e0c8774b9dc7ea7b256c51362 4563f92c69c1a7f74e129899b2cb28872aad5c5e0c8774b9dc7ea7b256c51362 True
block-scan-scan-board 55c787670e84d8b4eeeeea1a697fb7bb87a22a91446fec78134a3e5da1403b9a 55c787670e84d8b4eeeeea1a697fb7bb87a22a91446fec78134a3e5da1403b9a True
block-setup-setup-board 46457b038763f20eb180e3594d14437cfe58b3fbbe67550281dc3cf08397a85b 46457b038763f20eb180e3594d14437cfe58b3fbbe67550281dc3cf08397a85b True
block-guide-observability-guide 6e56a825d34493fa5e6e56ecc7c25bf89f6038100bef3c091ed1624f3f771dd8 6e56a825d34493fa5e6e56ecc7c25bf89f6038100bef3c091ed1624f3f771dd8 True
block-auth-login-form 9b8e762882d3da999eb5a71a9551d111bcaa5d0e7f48a4f51f54a9e6543519ca 9b8e762882d3da999eb5a71a9551d111bcaa5d0e7f48a4f51f54a9e6543519ca True
style-globals d8127d186a525495f1e99c691353d94a740393fcc6e261dcac74f13aa5cfcded d8127d186a525495f1e99c691353d94a740393fcc6e261dcac74f13aa5cfcded True
```

`npm pack --dry-run --json` exited 0 with 268 files: LICENSE, NOTICE, THIRD-PARTY-NOTICES, React shim, ELK and CSS declarations included; tests, scan verification script and scan tsconfig excluded. React and ReactDOM are peer dependencies only. Root barrel and declaration references were inspected in the earlier registry-current audit.

A source scan found 268/268 TypeScript and CSS files with one full top SPDX header. Of 3,848 registry file occurrences, 3,847 have exactly one full top SPDX header. `style-globals.json`'s `font-setup.css` starts with `@import` and carries its SPDX and SIL notice at EOF only. This survives the actual install but does not meet a literal top-header requirement. The scan permits the compact EOF preservation notices and checks no second full SPDX block appears after imports.

## Font header correction recheck

After registry regeneration, the style-only HTTP `shadcn add @framerock/style-globals --yes --overwrite` exited 0. Installed `font-setup.css` contains SPDX, Gustavo Fior, Foglamp Labs, foglamp.dev and one SIL OFL block. HTTP and disk hashes matched for all seven items; six remained identical to the previous manifest, and the new style-globals SHA-256 is `e340feae0ea30c35f2ddd96ac4398cfbc96ae9e310411b1b4ff28cce419f520f`. Compiler commands were not repeated because the change was a CSS comment.

A repeat scan found 268/268 source files have one full top SPDX header. All 3,848 registry file occurrences now have a top SPDX header. One occurrence, `style-globals.json`'s `font-setup.css`, also has a second full SPDX-bearing comment at EOF, which contains the required SIL OFL and survives shadcn; the remaining 3,847 have only one full SPDX comment. This remains a literal duplicate-header caveat, although the installed font file contains one SPDX notice and one OFL block.

The setup, full installation, compiler, style reinstallation, and prior hash logs are preserved alongside this report.

## Final regenerated payload recheck

The latest generated payload resolves the duplicate font header caveat above. The scan recorded in `final-scan.txt` found 268 source files and 3,849 registry file occurrences, all with exactly one full SPDX header at the top. All seven HTTP payload hashes matched disk. Style-globals was reinstalled over HTTP; the installed font file retains the creator credits, SPDX and exactly one SIL OFL block.

Scan-board and setup-board payload hashes changed after the favicon closure update, so both were reinstalled over HTTP. Default and strict `tsc --noEmit` were repeated afterward and both exited 0. Logs are preserved here. The final full-install baseline was created in a fresh external consumer; these focused reinstalls reflect subsequent payload changes.
