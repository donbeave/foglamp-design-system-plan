from pathlib import Path
import json,re,os
R=Path('/Users/donbeave/Projects/donbeave/foglamp-design-system'); S=R/'.reference/foglamp'; D=R/'packages/design-system/src'; H=Path(__file__).resolve().parent
files=[p for p in S.rglob('*') if p.is_file() and p.suffix in ('.tsx','.ts','.css') and 'node_modules' not in p.parts]
mapping={};missing=[]
for p in D.rglob('*'):
 if not p.is_file() or p.suffix not in ('.tsx','.ts','.css'):continue
 rel=p.relative_to(D);t=p.read_text(); candidates=[]
 if rel.parts[0]=='ui': candidates=[S/'packages/ui/src/components'/rel.name]
 elif rel.parts[0]=='hud':candidates=[S/'packages/sdk/src/hud/react'/rel.name]
 elif str(rel).startswith('charts/evilcharts/'): candidates=[S/'apps/web/src/components/evilcharts'/Path(*rel.parts[2:])]
 for ref in re.findall(r'(?:\.reference/foglamp/)?((?:apps|packages)/[\w/().-]+\.(?:tsx|ts|css))',t[:1100]):candidates.append(S/ref)
 if not any(x.is_file() for x in candidates):
  same=[x for x in files if x.name==p.name]
  if len(same)==1:candidates=same
 exact=next((x for x in candidates if x.is_file()),None)
 if exact:mapping[str(p)]=str(exact)
 else:missing.append(str(rel))
(H/'source-map.json').write_text(json.dumps(mapping,indent=2));(H/'unmapped.json').write_text(json.dumps(missing,indent=2))
(H/'node_modules').symlink_to(R/'node_modules',target_is_directory=True) if not (H/'node_modules').exists() else None
(H/'package.json').write_text('{"type":"module"}')
(H/'index.html').write_text('<!doctype html><html><head><meta charset="utf-8"></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>')
print('mapped',len(mapping),'missing',len(missing))
