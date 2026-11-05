# W5-5.1A Static Batch

Ran against `/Users/donbeave/Projects/donbeave/foglamp-design-system` with `mise exec bun@latest --`.

| Check | Exit | Result |
|---|---:|---|
| `bun run build:registry` | 0 | Built 289 registry items and 289 story catalog entries. |
| `bun run check:portal` | 0 | Portal contract passed: 168 stories, 289 registry items, 7 navigation manifests. |
| `bun run check-types` | 0 | Turbo check-types: 2 tasks successful. |
| `bun run test` | 0 | 58 pass, 0 fail, 118 expect calls. |
| `bun run build` | 0 | TanStack Start production build completed. |
| `git diff --check` | 0 | No whitespace errors. |

Logs and exact exit codes are in the adjacent `*.log` and `*.exit` files. The production build and diff check were rerun after the final app.css keycap-reservation edit was frozen. Registry output was generated in the assigned `apps/docs/public/r/**` scope.
