import json, hashlib
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
base='/Users/donbeave/Projects/donbeave/foglamp-design-system/apps/docs/node_modules/@fontsource-variable/'
for name, gp, pp, weights in [('Host Grotesk','/tmp/foglamp-host-google.woff2',base+'host-grotesk/files/host-grotesk-latin-wght-normal.woff2',range(300,801,100)),('Geist Mono','/tmp/foglamp-geist-google.woff2',base+'geist-mono/files/geist-mono-latin-wght-normal.woff2',range(100,901,100))]:
 a,b=TTFont(gp),TTFont(pp)
 axes=lambda f:[(x.axisTag,x.minValue,x.defaultValue,x.maxValue) for x in f['fvar'].axes]
 common=sorted((set(a.keys()) & set(b.keys())) - {'GlyphOrder'})
 different=[t for t in common if a.getTableData(t)!=b.getTableData(t)]
 checks=[]
 for weight in weights:
  x,y=instantiateVariableFont(a,{'wght':weight},inplace=False),instantiateVariableFont(b,{'wght':weight},inplace=False)
  cmapx,cmapy=x.getBestCmap(),y.getBestCmap(); commoncp=set(cmapx)&set(cmapy)
  metric=sum(x['hmtx'][cmapx[c]]!=y['hmtx'][cmapy[c]] for c in commoncp)
  outline=sum(x['glyf'][cmapx[c]].compile(x['glyf'])!=y['glyf'][cmapy[c]].compile(y['glyf']) for c in commoncp)
  checks.append({'weight':weight,'metricMismatches':metric,'outlineMismatches':outline})
 print(json.dumps({'family':name,'axes':[axes(a),axes(b)],'characterSetsEqual':set(a.getBestCmap())==set(b.getBestCmap()),'characters':len(a.getBestCmap()),'differentTables':different,'onlyGoogle':sorted(set(a.keys())-set(b.keys())),'onlyPortal':sorted(set(b.keys())-set(a.keys())),'checks':checks}))
