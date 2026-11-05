import json,string,uharfbuzz as hb
from fontTools.ttLib import TTFont
from io import BytesIO
base='/Users/donbeave/Projects/donbeave/foglamp-design-system/apps/docs/node_modules/@fontsource-variable/'
for name, gp, pp, weights in [('Host Grotesk','/tmp/foglamp-host-google.woff2',base+'host-grotesk/files/host-grotesk-latin-wght-normal.woff2',range(300,801,100)),('Geist Mono','/tmp/foglamp-geist-google.woff2',base+'geist-mono/files/geist-mono-latin-wght-normal.woff2',range(100,901,100))]:
 fonts=[]
 for p in (gp,pp):
  f=TTFont(p);f.flavor=None;out=BytesIO();f.save(out);fonts.append(hb.Font(hb.Face(out.getvalue())))
 result=[]
 for weight in weights:
  for f in fonts:f.set_variations({'wght':weight})
  diffs=0
  for a in string.printable[:95]:
   for b in string.printable[:95]:
    positions=[]
    for f in fonts:
     buf=hb.Buffer();buf.add_str(a+b);buf.guess_segment_properties();hb.shape(f,buf);positions.append([(p.x_advance,p.y_advance,p.x_offset,p.y_offset) for p in buf.glyph_positions])
    diffs+=positions[0]!=positions[1]
  result.append({'weight':weight,'positionMismatches':diffs})
 print(json.dumps({'family':name,'test':'all pairs of printable ASCII','pairs':95*95,'checks':result}))
