#!/usr/bin/env python3
"""Compare element records captured in DOM order; mismatched structure is explicit."""
import json
from pathlib import Path
p=Path(__file__).parent
result={}
for view in ('overview','traces','trace','agent','workflow','session','eval','shell'):
  result[view]={}
  for state in ('default','loading','empty','selection'):
    if state=='selection' and view not in ('overview','traces','trace','agent','workflow','session','eval','shell'): continue
    suffix='' if state=='default' else '-'+state
    result[view][state]={}
    for theme in ('light','dark'):
      a=json.loads(json.loads((p/f'{view}-source-{theme}{suffix}-styles.txt').read_text()))
      b=json.loads(json.loads((p/f'{view}-target-{theme}{suffix}-styles.txt').read_text()))
      pairs=list(zip(a,b)); fields=('tag','text','rect','display','font','color','background','border','radius','shadow','margin','padding','opacity','visibility','transform','fill','stroke','clipPath','mask','animationName','animationDuration')
      differences={field:sum(x[field]!=y[field] for x,y in pairs) for field in fields}
      examples=[]
      for i,(x,y) in enumerate(pairs):
        changed=[field for field in fields if x[field]!=y[field]]
        if changed and len(examples)<20: examples.append({'index':i,'changed':changed,'source':x,'target':y})
      result[view][state][theme]={'source_nodes':len(a),'target_nodes':len(b),'differences':differences,'examples':examples,'status':'unverified','note':'Positional comparison only; divergent element trees and animation can invalidate correspondence.'}
(p/'computed-style-report.json').write_text(json.dumps(result,indent=2)+'\n')
