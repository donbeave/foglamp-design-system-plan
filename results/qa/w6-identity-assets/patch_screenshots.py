#!/usr/bin/env python3
"""Apply a bounded W6-6B identity patch and verify unchanged pixels elsewhere.

This script was authorized by the explicit user method exception and root GO
on 2026-11-05. It writes candidate PNGs and a report to a separate directory;
it never overwrites the W5 source images. Requires Pillow and a FreeType build
that can load the converted local InterVariable font.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import sys

from PIL import Image, ImageChops, ImageDraw, ImageFont

EXPECTED = {
    "demo-overview-dark.png": "636abd2f22708bfd94d76e37725a5d02988ef49da7bbd34398ea3baf1123a0c9",
    "demo-overview-light.png": "411cb1dcbacf603c9b94c785b32b8229ecddeeaa4dc40aa1d10671fa80e1c981",
}
SIZE = (2072, 1320)
AVATAR_MASK = (32, 1247, 75, 1290)  # half-open x1,y1,x2,y2
NAME_MASK = (84, 1247, 300, 1296)   # keeps the menu glyph near x=392 untouched
AVATAR_CIRCLE = (36, 1256, 68, 1288)
NAME_ORIGIN = (88, 1284)  # Inter baseline at native 2x capture size


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def inside(x: int, y: int, box: tuple[int, int, int, int]) -> bool:
    return box[0] <= x < box[2] and box[1] <= y < box[3]


def patch(source: Image.Image, font: ImageFont.FreeTypeFont, theme: str) -> tuple[Image.Image, int, tuple[int, int, int, int] | None]:
    original = source.convert("RGB")
    output = original.copy()
    draw = ImageDraw.Draw(output)

    # The name mask contains only the existing account label and clear sidebar
    # background. Sample untouched background before clearing it.
    background = original.getpixel((230, 1270))
    text_color = (23, 23, 23) if theme == "light" else (229, 229, 229)
    draw.rectangle(NAME_MASK, fill=background)
    measured = float(font.getlength("Alex Morgan"))
    if measured > NAME_MASK[2] - NAME_ORIGIN[0] - 8:
        raise ValueError(f"Alex Morgan width {measured:.2f}px does not fit the approved name mask")
    draw.text(NAME_ORIGIN, "Alex Morgan", font=font, fill=text_color, anchor="ls")

    # Replace only the circular portrait. The geometric person mark is neutral
    # and is rendered within the original 32 px avatar footprint.
    avatar_bg = (214, 211, 209)
    avatar_fg = (120, 113, 108)
    avatar_row_bg = original.getpixel((80, 1270))
    draw.rectangle(AVATAR_MASK, fill=avatar_row_bg)
    draw.ellipse(AVATAR_CIRCLE, fill=avatar_bg)
    draw.ellipse((47, 1261, 57, 1271), fill=avatar_fg)
    draw.polygon(
        [(43, 1283), (45, 1275), (49, 1272), (55, 1272), (59, 1275), (61, 1283)],
        fill=avatar_fg,
    )

    # Pillow rectangles include the right and bottom coordinates. Build a
    # strict half-open mask and composite all painted pixels through it so
    # that even an accidental overdraw cannot escape the approved regions.
    allowed_mask = Image.new("L", original.size, 0)
    mask_draw = ImageDraw.Draw(allowed_mask)
    for left, top, right, bottom in (AVATAR_MASK, NAME_MASK):
        mask_draw.rectangle((left, top, right - 1, bottom - 1), fill=255)
    output = Image.composite(output, original, allowed_mask)

    diff = ImageChops.difference(original, output)
    changed_mask = diff.convert("L").point(lambda value: 255 if value else 0)
    changed_count = changed_mask.histogram()[255]
    bounds = changed_mask.getbbox()

    # Independently validate the half-open mask in pixel coordinates.
    for y in range(original.height):
        for x in range(original.width):
            allowed = inside(x, y, AVATAR_MASK) or inside(x, y, NAME_MASK)
            if not allowed and original.getpixel((x, y)) != output.getpixel((x, y)):
                raise AssertionError(f"pixel changed outside half-open masks at ({x},{y})")
    return output, changed_count, bounds


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, required=True, help="implementation repo root")
    parser.add_argument("--out-dir", type=Path, required=True, help="separate candidate output directory")
    parser.add_argument("--font", type=Path, required=True, help="InterVariable.woff2 used by portal")
    parser.add_argument("--apply", action="store_true", help="write candidate PNGs")
    parser.add_argument("--user-exception-ref", help="explicitly approved image-edit method exception reference")
    parser.add_argument("--root-go", help="explicit root authorization for this bounded patch")
    args = parser.parse_args()

    if not args.apply:
        print("Dry run only: no images changed. Use --apply only after user exception and root GO.")
        return 0
    if not args.user_exception_ref or not args.root_go:
        parser.error("--apply requires both --user-exception-ref and --root-go")

    inputs = args.root / "apps/docs/public"
    args.out_dir.mkdir(parents=True, exist_ok=True)
    try:
        font = ImageFont.truetype(str(args.font), 28)
    except OSError as exc:
        raise SystemExit(f"Cannot load the approved Inter font via Pillow/FreeType: {exc}")

    report = {
        "authorization": {
            "user_exception_ref": args.user_exception_ref,
            "root_go": args.root_go,
        },
        "dimensions": list(SIZE),
        "masks": {"avatar": AVATAR_MASK, "name": NAME_MASK},
        "font": str(args.font),
        "font_size_px": 28,
        "text": "Alex Morgan",
        "files": [],
    }
    for filename, expected_hash in EXPECTED.items():
        source_path = inputs / filename
        actual_hash = sha256(source_path)
        if actual_hash != expected_hash:
            raise SystemExit(f"Unexpected source SHA-256 for {source_path}: {actual_hash}")
        with Image.open(source_path) as opened:
            if opened.size != SIZE or opened.mode != "RGB":
                raise SystemExit(f"Unexpected source format for {source_path}: {opened.size} {opened.mode}")
            original = opened.copy()
        theme = "dark" if "dark" in filename else "light"
        output, changed_pixels, changed_bounds = patch(original, font, theme)
        target = args.out_dir / filename
        output.save(target, format="PNG", optimize=False)
        report["files"].append({
            "source": str(source_path),
            "source_sha256": actual_hash,
            "output": str(target),
            "output_sha256": sha256(target),
            "dimensions": list(output.size),
            "changed_pixel_count": changed_pixels,
            "changed_pixel_bounds": changed_bounds,
            "outside_masks_equal": True,
        })
    report_path = args.out_dir / "patch-report.json"
    report_path.write_text(json.dumps(report, indent=2) + "\n")
    print(report_path)
    return 0


if __name__ == "__main__":
    sys.exit(main())
