"""Read-only W5→W6 source-body and package boundary audit; no implementation writes."""
import pathlib,re,subprocess,json,hashlib,collections
R=pathlib.Path('/Users/donbeave/Projects/donbeave/foglamp-design-system');Q=pathlib.Path(__file__).resolve().parent;BASE='5b1d9f423647a92fce0d0c15d7e69f6ed54848d1'
def body(b):
 for _ in range(3):
  x=re.sub(rb'\A/\*\*?(?:(?!\*/).)*(?:@provenance|Original design|Original UI|Original project|SPDX-License-Identifier|Foglamp Labs)(?:(?!\*/).)*\*/(?:\r?\n){1,2}',b'',b,count=1,flags=re.S|re.I)
  x=re.sub(rb'\A[\'\"]use client[\'\"];?(?:\r?\n){1,2}',b'',x,count=1)
  if x==b:break
  b=x
 return b
files=[];residual=[];exact=0
for p in sorted((R/'packages/design-system/src').rglob('*')):
 if p.suffix not in ('.tsx','.ts','.css'):continue
 path=str(p.relative_to(R));old=subprocess.run(['git','-C',str(R),'show',BASE+':'+path],capture_output=True);a=body(old.stdout);b=body(p.read_bytes());norm=a.replace(b'@foglamp/design-system',b'@tailrocks/framerock').replace(b'FoglampLink',b'FramerockLink').replace(b'useFoglampLink',b'useFramerockLink');same=norm==b
 if not same:residual.append(path)
 else:exact+=1
 files.append({'path':path,'baseline_body_sha256':hashlib.sha256(a).hexdigest(),'body_sha256':hashlib.sha256(b).hexdigest(),'equal_after_explicit_namespace_linkname_adapter':same})
expected=['packages/design-system/src/index.ts','packages/design-system/src/lib/link-context.tsx','packages/design-system/src/blocks/marketing/demo/demo-sidebar.tsx','packages/design-system/src/blocks/marketing/chrome/navbar.tsx','packages/design-system/src/blocks/marketing/chrome/logo.tsx'];assert set(residual)==set(expected),residual
styles=[f for f in files if '/styles/' in f['path']];assert all(f['equal_after_explicit_namespace_linkname_adapter'] for f in styles)
for f in ['InterVariable.woff2','InterVariable-Italic.woff2']:
 path='packages/design-system/src/assets/'+f;assert subprocess.check_output(['git','-C',str(R),'show',BASE+':'+path])==(R/path).read_bytes()
report={'base':BASE,'pin':subprocess.check_output(['git','-C',str(R/'.reference/foglamp'),'rev-parse','HEAD']).decode().strip(),'files':files,'equal_after_explicit_namespace_linkname_adapter':exact,'reviewed_residuals':residual,'styles':styles,'font_bytes_equal_W5':True,'deleted_original_author_file':not(R/'packages/design-system/src/blocks/marketing/original-authors-block.tsx').exists()}
(Q/'source-body-audit.json').write_text(json.dumps(report,indent=2));print(json.dumps({k:v for k,v in report.items() if k!='files'},indent=2))
# Correct the preliminary CSS comparison to include effects' first @source/comment.
p=Q/'registry-static.json';d=json.loads(p.read_text());d['styles']=[{'path':f['path'],'body_equal':f['equal_after_explicit_namespace_linkname_adapter']} for f in styles];p.write_text(json.dumps(d,indent=2))
