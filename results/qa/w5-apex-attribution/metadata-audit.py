import json,pathlib
root=pathlib.Path('/Users/donbeave/Projects/donbeave/foglamp-design-system')
items=[]
for p in sorted((root/'apps/docs/public/r').glob('*.json')):
 d=json.loads(p.read_text()); author=d.get('author',''); items.append({'name':p.name,'author':author,'homepage':d.get('homepage'),'license':d.get('license'),'ok':all(x in author for x in ['Gustavo Fior','Abdul Haidar','Foglamp Labs']) and d.get('homepage')=='https://github.com/foglamp-labs/foglamp' and d.get('license')=='Apache-2.0'})
r=json.loads((root/'packages/registry/registry.json').read_text()); packages=[]
for p in [root/'package.json',root/'packages/design-system/package.json',root/'packages/registry/package.json',root/'apps/docs/package.json']:
 d=json.loads(p.read_text());packages.append({'file':str(p.relative_to(root)),'author':d.get('author'),'homepage':d.get('homepage'),'license':d.get('license')})
print(json.dumps({'payload_count':len(items),'failed':[x for x in items if not x['ok']],'registry':{k:r.get(k) for k in ['author','homepage','license']},'packages':packages},indent=2))
