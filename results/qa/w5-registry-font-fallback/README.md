# W5 registry font fallback QA

The generated `style-globals` registry item carries Next 16.2.4 matched Arial fallback faces and font stacks for Inter, Geist Mono, and Host Grotesk. The canonical Inter regular and italic bytes remain embedded as data URIs.

## Evidence

- `logs/schema-font-validation.json`: installed `@shadcn/registry` root and item schemas passed for all 289 payloads; generated and CLI-installed CSS contains all three metric blocks and stacks; both embedded Inter binaries match their source files by byte and SHA-256.
- `logs/consumer-cli-install-final.log`: shadcn 4.23.0 installed `@foglamp/style-globals` into the fresh `fixture-final` consumer.
- `logs/consumer-vite-build-final.log`: Vite 8.3.6 production build passed after the fixture imported the installed Foglamp global stylesheet.
- `logs/built-css-validation.json`: built CSS includes all fallback faces, metrics, stacks, and both Inter data URIs.
- `logs/browser-cssom-validation.json`: isolated `agent-browser` CSSOM check confirmed all fallback descriptors, loaded regular/italic Inter faces, exact embedded byte hashes, and the computed root Inter stack.
- Portal contract passed with 168 stories, 289 registry items, and 7 navigation manifests.

The fixture under `fixture-final/` is a fresh copy of the earlier W4 consumer fixture. It has its own registry server/browser session during validation; no shared production browser session was used. `fixture/` and logs without the `-final` suffix are from the first Inter-only iteration and are superseded by `fixture-final/` and the final logs.
