#!/bin/sh
set -eu
# Serve target apps/docs/public at 127.0.0.1:4191 before running this script.
proof_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
consumer_dir=$(mktemp -d "${TMPDIR:-/tmp}/foglamp-registry-scan-repro.XXXXXX")
cp -R "$proof_dir/fixture/." "$consumer_dir/"
cd "$consumer_dir"
mise exec bun@latest -- bun install
mise exec bun@latest -- bun x shadcn@4.23.0 add @foglamp/block-scan-scan-board @foglamp/block-setup-setup-board --yes --overwrite
mise exec bun@latest -- bun x shadcn@4.23.0 add @foglamp/style-globals --yes --overwrite
mise exec bun@latest -- bun x vite build
printf 'Fresh production consumer: %s\n' "$consumer_dir"
mise exec bun@latest -- bun x vite preview --host 127.0.0.1
