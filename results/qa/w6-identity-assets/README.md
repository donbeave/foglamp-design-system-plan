# W6-6B screenshot identity patch plan

Status: **completed under the explicit user method exception plus root GO dated 2026-11-05**. Inputs were restored byte-for-byte from implementation commit `5b1d9f4`.

## Restored inputs

| Path | Dimensions | SHA-256 |
| --- | ---: | --- |
| `apps/docs/public/demo-overview-light.png` | 2072 × 1320 RGB | `411cb1dcbacf603c9b94c785b32b8229ecddeeaa4dc40aa1d10671fa80e1c981` |
| `apps/docs/public/demo-overview-dark.png` | 2072 × 1320 RGB | `636abd2f22708bfd94d76e37725a5d02988ef49da7bbd34398ea3baf1123a0c9` |

These are the exact PNG blobs at commit `5b1d9f4`. Keep all source screenshot content and geometry. The previous whole-frame browser recapture was rejected because the rendered fonts/weights, card/sidebar placement, charts and data differed from these W5 images.

## Allowed edit regions

Coordinates use PNG pixel space, origin at upper left, half-open rectangles `[left, top, right, bottom)`. Use identical masks on both theme images:

- Avatar: `[32, 1247, 75, 1290)` (43 × 43 px), covering only the circular personal photograph and its immediate neutral background.
- Account name: `[84, 1247, 300, 1296)` (216 × 49 px), covering only the “Gustavo” label and its immediate row background. Replace the label with “Alex Morgan” using the existing UI font, size, baseline and foreground color. Do not touch the trailing menu glyph at x≈392.

The patch must not alter any decoded RGB pixel outside the union of these rectangles. Masks are half-open; Pillow drawing coordinates are inclusive, so the applied patch clips its paint through a mask whose right/bottom coordinates are reduced by one. Before editing, render both restored inputs at 100% and verify these bounds against the actual image; if any founder-identifying pixel lies outside them, stop and revise this plan before patching.

## Deterministic patch procedure

1. Preserve copies of the above SHA-256 inputs as immutable originals.
2. Draw a neutral geometric SVG-style avatar inside the avatar rectangle, matching the existing 32 px circle bounds and neutral palette.
3. Clear and redraw only the account-name rectangle as “Alex Morgan,” preserving its baseline, font size, weight, foreground color, and row background.
4. Save at 2072 × 1320 RGB in PNG format. Do not resize, crop, regenerate the UI, or modify any other row or fixture data.
5. Verify dimensions and mode. Decode the output and compare every RGB pixel to the restored original outside the allowed rectangle union; require zero differences. Report changed-pixel count and bounding box per file, and inspect both light/dark results at native resolution.

## Script

`patch_screenshots.py` is a gated candidate generator. It validates the baseline SHA-256 and RGB dimensions, uses the local Inter variable font at 28 native pixels, clips avatar/name paint to the masks, checks decoded RGB equality outside them, and writes candidate images plus a report to a separate output directory. It does not overwrite source files. Its `--apply` mode requires both `--user-exception-ref` and `--root-go`; both are provided for this authorized run.

The explicit exception authorizes Python pixel-only editing. The script requires both a user-exception reference and root GO values at invocation; it emits separate candidate files and never overwrites the source images.

## Applied and verified (2026-11-05)

The method exception (“Use Python pixel-only editing”) and root GO were explicit. The original `InterVariable.woff2` was converted to `/tmp/InterVariable.ttf` with FontTools; Pillow measured `Gustavo` at 110 px and `Alex Morgan` at 165 px at the 28 px native scale. The replacement stays within the name mask and matches the original 28 px regular font weight and baseline.

An initial candidate using Pillow inclusive edges was rejected after an independent check found 28 light and 58 dark outside-mask pixels. Those failed candidates are retained under `candidates-rejected-inclusive-edges/` for audit. The corrected candidate report in `candidates-strict/patch-report.json` records:

| File | Output SHA-256 | Changed pixels | Changed bounds | Outside-mask differences |
| --- | --- | ---: | --- | ---: |
| Dark | `86ddb6fff12717a635dc5bbbec571579833907509e537e774ebbe170101b8659` | 3,413 | `[32, 1254, 251, 1290)` | 0 |
| Light | `1304f32c3fdbf6da1fd81ce5bc5cca8e0004ac201c303b973bc6016c7dda4fec` | 3,440 | `[32, 1252, 251, 1290)` | 0 |

Both corrected 2072 × 1320 RGB candidates were visually inspected at native resolution and copied to the implementation repo. The separate verifier now compares pixels with explicit half-open coordinate loops; no pixels outside the union of the avatar and name masks changed.

The registry builder was rerun after the corrected candidates were applied. Decoding embedded PNG data URIs by SHA-256 found each patched image in all three generated payloads: `block-marketing-hero-hero.json`, `block-marketing-hero-index.json`, and `foglamp.json`.

Validation results: registry build, portal verification, type checks, full build, and `git diff --check` all exited 0. The build still prints two existing CSS optimizer warnings for `::highlight(fd-search)`.

A read-only verifier, `verify_outside_pixels.py`, independently compares the applied PNGs to the actual W5 Git blobs at `5b1d9f4`; it reports zero decoded-pixel differences outside both masks. It was run with:

```sh
/Users/donbeave/.local/share/mise/installs/uv/0.13.7/uv-aarch64-apple-darwin/uv run --isolated --no-project --with pillow --python 3.15 python results/qa/w6-identity-assets/verify_outside_pixels.py --impl-root /Users/donbeave/Projects/donbeave/foglamp-design-system
```
