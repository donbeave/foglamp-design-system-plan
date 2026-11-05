#!/usr/bin/env python3
"""Read-only provenance candidate inventory; run from any directory with Python 3."""
import collections, difflib, hashlib, json, pathlib, re, subprocess, sys
PLAN = pathlib.Path(__file__).resolve().parents[3]
ROOT = PLAN.parent / 'foglamp-design-system'
UP = ROOT / '.reference/foglamp'
COMMIT = '7d7e6609108019a74902858d4b07c24825c6318b'
OUT = pathlib.Path(__file__).resolve().parent

def sha(b): return hashlib.sha256(b).hexdigest()
def body(b):
    # Strip only identifiable leading attribution and client directive, in either order.
    for _ in range(2):
        stripped = re.sub(rb"\A/\*\*?(?:(?!\*/).)*(?:@provenance|Original design|Original UI|Original project|SPDX-License-Identifier|Foglamp Labs)(?:(?!\*/).)*\*/(?:\r?\n){1,2}", b'', b, count=1, flags=re.S|re.I)
        stripped = re.sub(rb"\A['\"]use client['\"];?(?:\r?\n){1,2}", b'', stripped, count=1)
        if stripped == b: break
        b = stripped
    return b

if '--self-test' in sys.argv:
    original = b'const x = 1;\n'
    assert body(b'/** Original design by Gustavo */\n\n\"use client\";\n\n' + original) == original
    assert body(b'\"use client\";\n\n/** Original design by Gustavo */\n\n' + original) == original
    assert body(original) != body(b'const x  = 1;\n')
    assert body(original) != body(original + b' ')
    assert body(b'import x from \"foo\";\n') != body(b'import x from \"foO\";\n')
    assert body(original) != body(b'import x from \"elsewhere\";\n' + original)
    assert body(b'/** unrelated comment */\n' + original) != original
    print('body comparison negative fixtures passed')
    raise SystemExit(0)

def git(*args): return subprocess.check_output(['git','-C',str(UP),*args])
assert git('rev-parse','HEAD').decode().strip() == COMMIT
paths = git('ls-tree','-r','--name-only',COMMIT).decode().splitlines()
sourcepaths = [p for p in paths if p.endswith(('.ts','.tsx','.css'))]
byname = collections.defaultdict(list)
for p in sourcepaths: byname[pathlib.PurePosixPath(p).name].append(p)
old = json.loads((PLAN/'results/qa/w5-apex/harness/source-map.json').read_text())
old = {str(pathlib.Path(k).relative_to(ROOT)):str(pathlib.Path(v).relative_to(UP)) for k,v in old.items() if pathlib.Path(k).is_relative_to(ROOT) and pathlib.Path(v).is_relative_to(UP)}
cache = {}
def upstream(p):
    if p not in cache: cache[p] = git('show',f'{COMMIT}:{p}')
    return cache[p]
reviews=json.loads((OUT/'review.json').read_text())
entries=[]
for f in sorted((ROOT/'packages/design-system/src').rglob('*')):
    if not f.is_file() or f.suffix not in ('.ts','.tsx','.css'): continue
    rel=str(f.relative_to(ROOT)); data=f.read_bytes(); b=body(data)
    candidates=set(byname[f.name]); mapped=old.get(rel)
    if mapped in sourcepaths: candidates.add(mapped)
    # Existing header paths are leads, never trusted without pinned-tree validation.
    header=data[:2000].decode(errors='replace')
    for match in re.findall(r'@upstream-path\s+([^\s*]+)',header):
        if match in sourcepaths: candidates.add(match)
    scores=[]
    for p in sorted(candidates):
        ub=body(upstream(p)); ratio=difflib.SequenceMatcher(None,b.splitlines(),ub.splitlines(),autojunk=True).ratio()
        scores.append((ratio,p,sha(ub), b==ub))
    scores.sort(reverse=True)
    # Harness mapping provides prior reviewed evidence; similarity exposes weak matches.
    chosen=next((x for x in scores if x[1]==mapped),None)
    if not chosen and scores and scores[0][0]>=0.45: chosen=scores[0]
    flags=[]
    if mapped and mapped not in sourcepaths: flags.append('harness-path-missing-at-pin')
    if chosen and chosen[0]<0.45: flags.append('weak-source-similarity')
    if chosen and len(scores)>1 and scores[0][1]!=chosen[1] and scores[0][0]>chosen[0]+0.05: flags.append('harness-map-competes-with-stronger-candidate')
    if len(scores)>1 and scores[0][0]>=0.45 and scores[0][0]-scores[1][0]<0.10: flags.append('ambiguous-candidates')
    if not chosen: flags.append('unresolved-origin; do not assume original')
    if chosen and chosen[0]<0.8: flags.append('possible-inlined-or-multi-source; review')
    decision=reviews.get(rel)
    secondary=[]
    if decision:
        assert all(p in sourcepaths for p in ([decision['primary']] if decision['primary'] else []) + decision['secondary']), rel
        if decision['reviewed_file_sha256'] != sha(data):
            flags.append('review-stale-file-changed')
        else:
            flags = [x for x in flags if x not in ('unresolved-origin; do not assume original', 'weak-source-similarity', 'possible-inlined-or-multi-source; review', 'ambiguous-candidates')]
            if decision['secondary'] and decision['classification'] == 'modified': flags.append('reviewed-multi-source')
            if decision['primary']:
                p=decision['primary']; ub=body(upstream(p)); chosen=(difflib.SequenceMatcher(None,b.splitlines(),ub.splitlines(),autojunk=True).ratio(),p,sha(ub),b==ub)
            else: chosen=None
            secondary=decision['secondary']
    classification = ('copied-1-to-1' if chosen and chosen[3] else 'modified' if chosen else None)
    if decision and decision['reviewed_file_sha256'] == sha(data) and decision['classification'] == 'tailrocks-original': classification='tailrocks-original'
    entries.append(dict(review=decision,secondary_upstream_paths=secondary,path=rel,file_sha256=sha(data),body_sha256=sha(b),proposed_class=classification,upstream_path=chosen[1] if chosen else None,upstream_body_sha256=chosen[2] if chosen else None,evidence=('w5-harness-map' if chosen and chosen[1]==mapped else 'basename-and-body-similarity' if chosen else None),similarity=round(chosen[0],4) if chosen else None,flags=flags,candidates=[{'path':p,'similarity':round(s,4)} for s,p,_,_ in scores[:5] if s>=0.30]))
assets=[]
for base in [ROOT/'packages/design-system',ROOT/'apps/docs/public']:
    if base.exists():
        for f in sorted(base.rglob('*')):
            if f.is_file() and f.suffix.lower() in ('.woff','.woff2','.ttf','.otf','.png','.jpg','.jpeg','.webp','.svg','.gif','.ico') and not any(x in f.parts for x in ('node_modules','dist','.output')):
                assets.append({'path':str(f.relative_to(ROOT)),'sha256':sha(f.read_bytes())})
# Hash exact asset matches against blobs from the pinned Git tree, not external licenses.
wanted = {a['sha256'] for a in assets}
for p in paths:
    if pathlib.PurePosixPath(p).suffix.lower() in ('.woff','.woff2','.ttf','.otf','.png','.jpg','.jpeg','.webp','.svg','.gif','.ico'):
        h = sha(upstream(p))
        if h in wanted:
            for asset in assets:
                if asset['sha256'] == h: asset.setdefault('identical_upstream_paths', []).append(p)
notices=[]
for base in [ROOT/'packages/design-system', ROOT/'apps/docs/public',UP]:
    if base.exists():
        for f in base.rglob('*'):
            if f.is_file() and (f.name.lower().startswith(('license','notice','ofl')) or f.name.lower() in ('copying','credits.md')) and not any(x in f.parts for x in ('node_modules','.git','dist','.output')):
                notices.append(str(f.relative_to(ROOT)))
result={'upstream_commit':COMMIT,'implementation_head':subprocess.check_output(['git','-C',str(ROOT),'rev-parse','HEAD']).decode().strip(),'entries':entries,'assets':assets,'local_notice_paths':sorted(set(notices))}
(OUT/'manifest.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'files':len(entries),'classes':dict(collections.Counter(x['proposed_class'] or 'unresolved' for x in entries)),'flagged':sum(bool(x['flags']) for x in entries),'assets':len(assets),'notices':len(set(notices))},indent=2))
