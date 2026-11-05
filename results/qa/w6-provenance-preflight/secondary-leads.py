#!/usr/bin/env python3
"""Find possible inline sources; shared lines are leads, not proof of copying."""
import collections,json,pathlib,subprocess
out=pathlib.Path(__file__).resolve().parent
plan=out.parents[2]; root=plan.parent/'foglamp-design-system'; up=root/'.reference/foglamp'
commit='7d7e6609108019a74902858d4b07c24825c6318b'
paths=subprocess.check_output(['git','-C',str(up),'ls-tree','-r','--name-only',commit]).decode().splitlines()
index=collections.defaultdict(set)
for p in paths:
    if not p.endswith(('.ts','.tsx','.css')): continue
    blob=subprocess.check_output(['git','-C',str(up),'show',commit+':'+p]).decode(errors='replace')
    for line in set(blob.splitlines()):
        line=line.strip()
        if len(line)>60 and not line.startswith(('import ','//','*','"use client"')): index[line].add(p)
manifest=json.loads((out/'manifest.json').read_text()); result=[]
for entry in manifest['entries']:
    if not entry['flags'] and not entry['review'] and '/dashboard/' not in entry['path']: continue
    counts=collections.Counter()
    for line in set((root/entry['path']).read_text().splitlines()):
        line=line.strip(); matches=index.get(line,())
        if len(matches)<=5:
            for p in matches:
                if p!=entry['upstream_path']: counts[p]+=1
    leads=[{'path':p,'shared_long_lines':n} for p,n in counts.most_common() if n>=2]
    if leads: result.append({'path':entry['path'],'file_sha256':entry['file_sha256'],'primary':entry['upstream_path'],'leads':leads})
(out/'secondary-leads.json').write_text(json.dumps(result,indent=2)+'\n')
print(f'{len(result)} files with nonbinding secondary-source leads')
