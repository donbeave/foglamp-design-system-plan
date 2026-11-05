#!/usr/bin/env python3
"""Read-only proof that W6 screenshots differ from W5 only inside approved masks."""
from __future__ import annotations

import hashlib
import io
import json
from pathlib import Path
import subprocess

from PIL import Image

BASE = "5b1d9f4"
SIZE = (2072, 1320)
MASKS = ((32, 1247, 75, 1290), (84, 1247, 300, 1296))
FILES = ("demo-overview-dark.png", "demo-overview-light.png")


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--impl-root", type=Path, required=True)
    args = parser.parse_args()
    report = []
    for name in FILES:
        relative = f"apps/docs/public/{name}"
        original_data = subprocess.run(
            ["git", "-C", str(args.impl_root), "show", f"{BASE}:{relative}"],
            check=True,
            stdout=subprocess.PIPE,
        ).stdout
        current_path = args.impl_root / relative
        current_data = current_path.read_bytes()
        with Image.open(io.BytesIO(original_data)) as im:
            original = im.convert("RGB")
        with Image.open(io.BytesIO(current_data)) as im:
            current = im.convert("RGB")
        if original.size != SIZE or current.size != SIZE:
            raise SystemExit(f"unexpected dimensions for {name}: {original.size} / {current.size}")
        before_pixels = original.load()
        after_pixels = current.load()
        changed_count = 0
        min_x = SIZE[0]
        min_y = SIZE[1]
        max_x = max_y = -1
        outside_changes = []
        for y in range(SIZE[1]):
            for x in range(SIZE[0]):
                before = before_pixels[x, y]
                after = after_pixels[x, y]
                if before == after:
                    continue
                changed_count += 1
                min_x, min_y = min(min_x, x), min(min_y, y)
                max_x, max_y = max(max_x, x), max(max_y, y)
                if not any(x1 <= x < x2 and y1 <= y < y2 for x1, y1, x2, y2 in MASKS):
                    outside_changes.append((x, y, before, after))
        if outside_changes:
            raise SystemExit(f"outside-mask differences in {name}: {outside_changes[:40]} (total {len(outside_changes)})")
        report.append({
            "file": relative,
            "baseline_sha256": digest(original_data),
            "current_sha256": digest(current_data),
            "dimensions": list(SIZE),
            "changed_pixel_count": changed_count,
            "changed_pixel_bounds": [min_x, min_y, max_x + 1, max_y + 1] if changed_count else None,
            "outside_mask_differences": 0,
        })
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
