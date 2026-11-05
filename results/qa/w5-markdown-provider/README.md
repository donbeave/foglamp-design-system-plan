# Markdown host-provider routing proof

Original UI and design: Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs. Apache-2.0.

The repaired `packages/design-system/src/widgets/foggy/markdown.tsx` uses the public `FoglampLinkProvider` for the exact upstream `href.startsWith("/")` branch. The source routing condition, classes, internal props, and external anchor behavior are preserved. Every non-anchor renderer remains byte-identical to the prior implementation.

## Reproduce

From this directory, link the existing workspace dependencies and run the isolated source harness:

```sh
ln -s /Users/donbeave/Projects/donbeave/foglamp-design-system/apps/docs/node_modules node_modules
python3 verify-source.py
mise exec bun@latest -- bun node_modules/vite/bin/vite.js --host 127.0.0.1
```

Open `http://127.0.0.1:4196/` using an isolated agent-browser session. Click the `internal` and `protocol-relative` links using native browser clicks. The output should become `["/traces/abc","//example.com/path"]`; the page stays on the harness URL because the host spy prevents navigation. Inspect all anchors and compare their attributes with `browser-proof.json`. External links should be inspected without clicking.

The source parity script compares against the upstream checkout and the implementation repository's current HEAD. Its non-anchor comparison assumes HEAD still contains the renderer version used when the repair was checked; future changes require interpreting that comparison accordingly. The Vite config uses a private local cache to avoid shared dependency-optimizer collisions. The harness uses the existing Foglamp public API names recorded at verification time; a later package/API rename requires updating the reproduction imports.

## Recorded results

- Native internal and protocol-relative clicks invoked the custom host component.
- HTTPS, hash, mailto, bare-relative, and empty hrefs bypassed the provider and retained `target="_blank"`, `rel="noreferrer"`, and external rest props.
- All seven links retained `font-medium text-primary underline underline-offset-2`.
- Internal links retained the upstream omission of rest props.
- `browser-errors.txt` is empty.
- Design-system TypeScript, portal contract, source parity script, and diff whitespace checks passed.
- The isolated browser and owned server were closed after verification. No registry regeneration or production rebuild was performed by this worker.

Dependencies, optimizer cache, and browser binaries are intentionally excluded from this archive.
