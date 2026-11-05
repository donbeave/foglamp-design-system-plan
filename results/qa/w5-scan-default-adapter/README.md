# Scan default favicon adapter verification

Original UI: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs, Apache-2.0.

Only source change: `packages/design-system/src/blocks/scan/favicon-context.tsx` defaults to existing `getGoogleFavicon`. Upstream `apps/web/src/app/api/favicon/route.ts` fetches this same helper URL and passes through its bytes. Rendering, classes, WAAPI and physics remain unchanged. Custom provider overrides and the legacy proxy helper remain available.

`fixture/` is the clean React/Vite application before registry installation. It contains no provider and no design-system source or workspace imports. `installed-consumer/` preserves all files produced by the actual CLI installation, its lockfile and the independent app. No installed source files were patched. `block-*.json` and `registry-closure.json` preserve raw generated payloads and SHA256 values.

To reproduce, serve the target repository's `apps/docs/public` on port 4191, then run `sh reproduce.sh`. The script creates another new temporary directory, installs the two board items and styles using shadcn 4.23.0, builds, and serves production output on port 4195. Open `/` for Scan and `/?setup` for Setup. Run `agent-browser eval --stdin < browser-proof.js` and inspect `agent-browser errors` for each route.

Actual run: CLI board install created 30 files; styles install created 3 files; Vite production build passed. Scan loaded Exa 32px and Slack 35px twice; Setup loaded Slack 35px. Both had zero `/api` requests, zero failed same-origin requests, no active error overlay, and empty browser error logs. Screenshots and machine-readable browser records are included. The only build warning is Vite's advisory about large JS chunks (ELK worker and combined board bundle).

`source-only-*` preserves the earlier isolated workspace consumer and helper/default/override parity check. The complete scan source-body audit, design-system tsc, docs tsc, and portal contract passed before registry installation. Temporary browser session and both owned servers are closed after verification.
