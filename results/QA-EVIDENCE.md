# QA evidence policy

Keep QA evidence reviewable and reproducible without committing generated capture volume.

- Commit concise reports (`report.md` or `*-summary.json`), repro scripts, fixture configuration, and the relevant command/exit status.
- Keep raw screenshots, render matrices, JSONL event streams, font binaries, generated fixture builds, copied installed component snapshots, browser profiles, installed dependencies, and bundler caches local. The root `.gitignore` excludes those artifact classes while leaving fixture host/config/repro files and ordinary reports available.
- Keep large raw diagnostic captures such as `*-slow.json` in font fallback investigations and `browser-cssom-raw.json` local; their report summaries are the reviewable evidence.
- When a raw capture is needed to support a finding, note its local path and record a compact result or checksum in the report. Add only a deliberately selected, small review image when it materially helps explain the result.
- Do not stage all of `results/qa` by default. Stage the report and reproduction material needed for the specific gate.

The planning runbook requires task/gate state in `results/run-state.json`, verification commands, and wave commits/pushes; it does not require raw QA captures to be versioned. The implementation repository should apply an equivalent policy to its own QA outputs.

The copied upstream code and asset evidence is accompanied by its Apache-2.0 license, attribution notice, and font notices in `results/qa/LICENSE`, `results/qa/NOTICE`, and `results/qa/THIRD-PARTY-NOTICES.md`.
