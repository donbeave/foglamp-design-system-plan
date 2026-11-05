import pathlib,re,json
root=pathlib.Path('/Users/donbeave/Projects/donbeave/foglamp-design-system'); ref=root/'.reference/foglamp';rows=[]
for p in (root/'packages/design-system/src').rglob('*'):
 if not p.is_file() or p.suffix not in ('.ts','.tsx','.css'): continue
 s=p.read_text(); head=s[:1200]
 for path in re.findall(r'(?:(?:apps/web|packages/ui|packages/sdk|packages/contracts)/src/)[A-Za-z0-9_./-]+',head):
  path=path.rstrip('.'); rows.append({'target':str(p.relative_to(root)),'source':path,'exists':(ref/path).exists()})
print(json.dumps({'count':len(rows),'missing':[x for x in rows if not x['exists']],'rows':rows},indent=2))
