# W4 registry asset delivery QA

The registry builder now keeps binary assets out of `registry:file` text content and embeds all source-local image bytes in generated component/CSS text as correctly typed data URIs. Local module imports are emitted as relative paths so the installed shadcn resolver cannot redirect duplicate basenames to the wrong file.

## Final evidence

- `logs/build-registry.log`: direct Bun 1.4.4 builder run, 289 registry items.
- `logs/check-portal.log`: portal contract passes with 168 stories, 289 registry items, and 7 navigation manifests.
- `logs/schema-assets.log`: installed `@shadcn/registry` 0.2.1 `registrySchema` and `registryItemSchema` validate the registry index and all 289 item payloads; author, homepage, and Apache-2.0 fields match; all six source asset SHA-256 values match embedded bytes; no fixed local public image paths remain in Guide/Hero/Authors payloads.
- `logs/consumer-cli-install.log`: actual shadcn 4.23.0 registry install command, exit 0, 100 files created for Guide, Hero, and Authors.
- `logs/consumer-vite-build.log`: Vite 8.3.6 production build of the actual installed Guide, Hero, and Authors components, exit 0.
- `logs/browser-natural-width.json`: all seven rendered image instances in the three installed components complete with positive natural dimensions, covering the six canonical image byte assets.
- `logs/browser-console.json`: no browser error messages.
- `browser-consumer.png`: browser screenshot from the installed components.

## Reproduction

Serve the generated static registry from the target workspace:

```sh
python3 -m http.server 4173 --directory /Users/donbeave/Projects/donbeave/foglamp-design-system/apps/docs/public
```

Use `fixtures/fresh/components.json`, `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, and `src/` as the consumer fixture. Install selected items with:

```sh
node /Users/donbeave/Projects/donbeave/foglamp-design-system/node_modules/.bun/shadcn@4.23.0/node_modules/shadcn/dist/index.js add @foglamp/block-guide-observability-guide @foglamp/block-marketing-hero-hero @foglamp/block-marketing-original-authors --yes --cwd /tmp/foglamp-registry-consumer-fresh
```

Build from the fixture directory with:

```sh
node node_modules/vite/bin/vite.js build --config vite.config.ts
```

The former alias rewrite failure is preserved in `fixtures/failing/trace-timeline-self-import.tsx`. The generated import had pointed to `@/components/foglamp/lib/trace-timeline`; shadcn's installer changed it to `@/components/foglamp/widgets/trace-timeline`, a self-import caused by the duplicate basename. The relative-import output fixes the consumer install and full three-block build.

The temporary Vite/registry servers used during QA were sessions 11246 and 53990; the browser session was `registry-assets-71231a6eed55`.
