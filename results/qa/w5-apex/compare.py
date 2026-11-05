from pathlib import Path
from PIL import Image,ImageChops
import json,os
R=Path(__file__).resolve().parent;out=[]
for line in (R/os.environ.get('MATRIX','render-matrix.jsonl')).read_text().splitlines():
 row=json.loads(line);item={'id':row['id'],'theme':row['theme']}
 for side in ['source','target']:
  item[side+'_ready']=row.get(side,{}).get('state',{}).get('ready',False)
 if not item['source_ready'] or not item['target_ready']:
  item['status']='UNRENDERED';item['source_error']=row.get('source');item['target_error']=row.get('target');out.append(item);continue
 stem=row['id'].replace('/','--')+'--'+row['theme']+('--preset-'+str(row['preset']) if 'preset' in row else '');a=Image.open(R/'renders'/(stem+'--source.png')).convert('RGB');b=Image.open(R/'renders'/(stem+'--target.png')).convert('RGB');delta=ImageChops.difference(a,b);hist=delta.histogram();item['pixel_bbox']=delta.getbbox();channels=delta.split();mask=ImageChops.lighter(ImageChops.lighter(channels[0],channels[1]),channels[2]);item['differing_pixels']=a.width*a.height-mask.histogram()[0];item['mean_abs_channel_error']=sum((i%256)*n for i,n in enumerate(hist))/(a.width*a.height*3);item['pixel_total']=a.width*a.height
 sa=row['source']['els']+row['source'].get('shadowEls',[]);ta=row['target']['els']+row['target'].get('shadowEls',[]);item['element_counts']=[len(sa),len(ta)];diffs=[]
 for i,(s,t) in enumerate(zip(sa,ta)):
  if s!=t:diffs.append({'index':i,'source':s,'target':t})
 item['computed_differing_elements']=len(diffs);item['status']='EXACT' if not item['differing_pixels'] and sa==ta else 'DIFFERENT'
 if diffs:(R/'renders'/(stem+'--computed-diff.json')).write_text(json.dumps(diffs,indent=2))
 if item['differing_pixels']:delta.save(R/'renders'/(stem+'--diff.png'))
 out.append(item)
(R/os.environ.get('COMPARISON','comparison.json')).write_text(json.dumps(out,indent=2));print(json.dumps({'rows':len(out),'exact':sum(r['status']=='EXACT' for r in out),'different':[(r['id'],r['theme'],r['differing_pixels'],r['computed_differing_elements']) for r in out if r['status']=='DIFFERENT'],'unrendered':[r['id'] for r in out if r['status']=='UNRENDERED']},indent=2))
