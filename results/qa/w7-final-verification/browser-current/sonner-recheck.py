import pathlib,subprocess,json
Q=pathlib.Path(__file__).resolve().parent;AB='/opt/homebrew/bin/agent-browser';S='w7-apex-current-3b6ae246dd31'
def ab(*a):
 p=subprocess.run([AB,'--session',S,'--json',*a],capture_output=True,text=True,timeout=35);d=json.loads(p.stdout)
 if p.returncode or not d.get('success'):raise RuntimeError(p.stdout)
 return d['data']
ab('open','http://localhost:3000/docs/primitives/sonner');ab('wait','--fn','!!document.querySelector("iframe")?.contentDocument?.querySelector("[data-sonner-toaster]")');out=[]
for text,kind in [('Trigger toast','success'),('Error toast','error')]:
 s=ab('snapshot','-i');ref=next(k for k,v in s['refs'].items()if v.get('role')=='button'and v.get('name')==text);action=ab('click','@'+ref);ab('wait','--fn',f'!!document.querySelector("iframe")?.contentDocument?.querySelector("[data-sonner-toast][data-type={kind}]")');r=ab('eval',r'''(()=>{let f=document.querySelector('iframe');return {viewport:{width:f.contentWindow.innerWidth,height:f.contentWindow.innerHeight},toasts:[...f.contentDocument.querySelectorAll('[data-sonner-toast]')].map(n=>({type:n.getAttribute('data-type'),visible:n.getAttribute('data-visible'),text:n.innerText,rect:n.getBoundingClientRect().toJSON()}))}})()''')['result'];out.append({'action':text,'native':action,'result':r});(Q/'sonner-recheck.json').write_text(json.dumps(out,indent=2));print(kind,r['toasts'],flush=True)
ab('screenshot',str(Q/'sonner-recheck.png'))
