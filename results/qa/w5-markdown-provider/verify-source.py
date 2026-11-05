from pathlib import Path
import subprocess,re
root=Path('/Users/donbeave/Projects/donbeave/foglamp-design-system')
target=(root/'packages/design-system/src/widgets/foggy/markdown.tsx').read_text()
source=(root/'.reference/foglamp/apps/web/src/components/app/markdown.tsx').read_text()
def anchor(s):return s[s.index('\ta:'):s.index('\t// Flat,')]
assert anchor(target)==anchor(source).replace('href={href as Route}','href={href}')
previous=subprocess.check_output(['git','show','HEAD:packages/design-system/src/widgets/foggy/markdown.tsx'],cwd=root,text=True)
assert target[target.index('\t// Flat,'):]==previous[previous.index('\t// Flat,'):]
assert set(re.findall('className="([^"]+)"',target))==set(re.findall('className="([^"]+)"',previous))
print('Anchor branch exact upstream after Route type removal; non-anchor renderers and all classes unchanged: PASS')
