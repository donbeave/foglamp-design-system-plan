import pathlib,urllib.request,re,json,concurrent.futures
base=pathlib.Path('/Users/donbeave/Projects/donbeave/foglamp-design-system/apps/docs/content/docs')
def check(p):
 r=str(p.relative_to(base)).removesuffix('.mdx');r=re.sub(r'(^|/)index$','',r);url='http://127.0.0.1:4203/docs'+('/'+r if r else '')
 try:
  data=urllib.request.urlopen(url,timeout=20).read().decode();footers=re.findall(r'<footer class="border-t px-3 py-2 text-xs text-muted-foreground">(.*?)</footer>',data,re.S); good=lambda x:all(z in x for z in ['Gustavo Fior (@gustavo-fior)','Abdul Haidar','Foglamp Labs','https://github.com/gustavo-fior','https://www.linkedin.com/in/abdulhdr/','https://github.com/foglamp-labs/foglamp']);return {'url':url,'panels':len(footers),'bad':sum(not good(f) for f in footers)}
 except Exception as e:return {'url':url,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex: rows=list(ex.map(check,base.rglob('*.mdx')))
print(json.dumps({'routes':len(rows),'panels':sum(x.get('panels',0) for x in rows),'errors':[x for x in rows if x.get('error') or x.get('bad')],'rows':rows},indent=2))
