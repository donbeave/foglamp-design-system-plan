# W6-6D attribution and documentation evidence

## Coverage

- 175/175 existing `.mdx` pages contain a visible attribution credit for Gustavo Fior and Foglamp Labs.
- 167/167 story-backed component pages render `StoryProvenance`, with each page's literal `registryItem`, exact catalog label, pinned upstream or inspiration URL, repository URL, `foglamp.dev`, and Gustavo's website URL derived/validated by `scripts/docs-provenance/sync.mjs`.
- The workbench resolves the active story's registry metadata statically from `packages/registry/registry.json`, then renders the same provenance block during server rendering.
- `packages/design-system/NOTICE` matches root `NOTICE` byte-for-byte.

## Verification

| Command | Exit |
| --- | ---: |
| `node scripts/docs-provenance/sync.mjs` (second idempotency run) | 0 |
| `mise exec bun@latest -- bun verify:portal` | 0 |
| `mise exec bun@latest -- bun check-types` | 0 |
| `mise exec bun@latest -- bun test` | 0 |
| `mise exec bun@latest -- bun run build` | 0 |
| `git diff --check` | 0 |
| MDX attribution/provenance audit | 0 |

The production build emits the existing CSS `::highlight(fd-search)` compatibility warnings and a `node:fs/promises` browser-externalization warning from the Fumadocs MDX runtime; the build succeeds.

## Workbench original-item runtime regression

- Static registry provenance now drives the workbench `notUpstream` prop when the selected item is `tailrocks-original`; the shared block renders the required explanation and pinned inspiration URL.
- Local SSR request `GET http://localhost:4206/docs/blocks/figure-kit-22-block` returned HTTP 200. Rendered HTML contained both the MDX provenance block and the Workbench provenance block, `Newly Added by Tailrocks`, visible “not an upstream” wording, the pinned `figure-picker.tsx` link, and creator/upstream links. It contained no “Something went wrong”, `Error:`, or missing provenance message.
- `mise exec bun@latest -- bun check-types`, `mise exec bun@latest -- bun verify:portal`, and `mise exec bun@latest -- bun run build` all exit 0 after the fix.
