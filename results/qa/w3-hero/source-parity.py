from pathlib import Path
import re,json,hashlib
root=Path('/Users/donbeave/Projects/donbeave/foglamp-design-system')
s=root/'.reference/foglamp/apps/web/src/components/marketing';d=root/'packages/design-system/src/blocks/marketing'
def body(t):
 t=re.sub(r'/\*\*\n \* Original design and implementation.*?\*/\n','',t,flags=re.S)
 t=re.sub(r'^import\s.*?;\n','',t,flags=re.M|re.S)
 return '\n'.join(l for l in t.splitlines() if l.strip())
checks=[]
for f in (s/'demo').rglob('*.ts*'):
 actual=d/'demo'/f.relative_to(s/'demo');a=body(f.read_text());b=body(actual.read_text())
 if f.name=='demo-chrome.tsx':a=a.replace('href: Route;','href: string;').replace('backHref: Route;','backHref: string;')
 assert a==b,f'{actual} non-import source divergence'
 checks.append(str(f.relative_to(s)))
assert body((s/'landing/hero.tsx').read_text()).replace('<Image','<img')==body((d/'hero/hero.tsx').read_text()),'Hero visual/choreography body changed'
original=(s/'landing/hero-demo.tsx').read_text();extracted=(d/'hero/hero-demo.tsx').read_text()
assert original[original.index('// In light mode'):]==extracted[extracted.index('// In light mode'):],'HeroDemo DARK_LIFT or rendered body changed'
result={'demo_bodies_unchanged':len(checks),'hero_body_unchanged_except_img_adapter':True,'hero_demo_choreography_and_jsx_unchanged':True,'tabs':len(list((d/'demo/tabs').glob('*.tsx'))),'detail_views':len(list((d/'demo/detail').glob('*-detail.tsx'))),'entrance_sha256':hashlib.sha256(body((d/'demo/entrance.ts').read_text()).encode()).hexdigest(),'all_attribution_headers':all(all(n in f.read_text()[:500] for n in ['Gustavo Fior','@gustavo-fior','Abdul Haidar','Foglamp Labs','Apache-2.0']) for f in list((d/'hero').glob('*.ts*'))+list((d/'demo').rglob('*.ts*')))}
print(json.dumps(result,indent=2))
