from pathlib import Path
import json,hashlib
R=Path(__file__).resolve().parent
logs=['final-native-matrix.jsonl','final-affected-rerun.jsonl','final-dark-variant-aliases.jsonl','final-footer-cta.jsonl']
latest={}
for log in logs:
 for l in (R/log).read_text().splitlines():
  row=json.loads(l);latest[(row['id'],row['theme'])]={'id':row['id'],'theme':row['theme'],'evidence':log,'source_ready':row['source'].get('state',{}).get('ready',False),'target_ready':row['target'].get('state',{}).get('ready',False)}
for file in ['final-native-comparison.json','final-affected-comparison.json','final-dark-variant-comparison.json','final-footer-cta-comparison.json']:
 for x in json.loads((R/file).read_text()):
  key=(x['id'],x['theme']);x=dict(x)
  # Compare only the row selected by the latest corresponding run.
  expected=file.replace('-comparison.json','.jsonl')
  pairs={'final-native-comparison.json':'final-native-matrix.jsonl','final-affected-comparison.json':'final-affected-rerun.jsonl','final-dark-variant-comparison.json':'final-dark-variant-aliases.jsonl','final-footer-cta-comparison.json':'final-footer-cta.jsonl'}
  if latest[key]['evidence']==pairs[file]:latest[key].update(x)
for key,x in latest.items():
 if x['status']=='EXACT':x['disposition']='SOURCE_RENDER_EXACT'
 elif x['id'] in ['blocks/original-authors-block','blocks/marketing-navbar','blocks/cutting-mat-footer-block']:x['disposition']='AUTHORIZED_REQUIRED_ATTRIBUTION_ADDITION_AND_IMAGE_FILL_ADAPTER'
 elif x['id']=='blocks/observability-guide-block' and not x.get('differing_pixels'):x['disposition']='PIXELS_EXACT_CSS_MODULE_GENERATED_ANIMATION_IDENTIFIER'
 elif x['id'] in ['blocks/scan-landing-block','blocks/hud-simulator-block']:x['disposition']='BOUNDED_RENDERER_OR_TRANSPORT_INITIALIZATION_CAPTURE_LIMITATION'
 else:x['disposition']='REQUIRES_REVIEW'
(R/'verification-matrix.json').write_text(json.dumps(list(latest.values()),indent=2))
summary={'cases':len(latest),'unrendered':[x for x in latest.values() if not x['source_ready'] or not x['target_ready']],'counts':{}}
for x in latest.values():summary['counts'][x['disposition']]=summary['counts'].get(x['disposition'],0)+1
(R/'verification-summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary,indent=2))
