#!/usr/bin/env python3
import json
from pathlib import Path
p=Path(__file__).parent
pix=json.loads(json.loads((p/'pixel-report.txt').read_text())); sty=json.loads((p/'computed-style-report.json').read_text()); out={}
for view,cases in pix.items():
 out[view]={}
 for case,modes in cases.items():
  out[view][case]={}
  for mode,m in modes.items():
   c=sty[view][case][mode]; differences={k:v for k,v in c['differences'].items() if v}; exact=m['differentPixels']==0 and not differences and c['source_nodes']==c['target_nodes']
   out[view][case][mode]={'status':'PASS' if exact else 'FAIL','differentPixels':m['differentPixels'],'styleDifferences':differences,'sourceNodes':c['source_nodes'],'targetNodes':c['target_nodes']}
result={'protocol':{'viewport':[1280,800],'pixelThreshold':0,'clockMs':8000,'randomSeed':'0x12345678','initialStorage':'cleared per case','computedStyleCoverage':'18 recorded computed-style properties plus tag, text and geometry per DOM node; shadow tree styles not included in DOM-order comparison','selectionNote':'Overview legend, Session turn and Shell account-menu clicks use 16000ms after interaction; trace, agent, workflow, eval use source route deep links; traces uses agent filter. Shell menu comparison includes body portal.'},'cases':out}
(p/'coverage.json').write_text(json.dumps(result,indent=2)+'\n')
