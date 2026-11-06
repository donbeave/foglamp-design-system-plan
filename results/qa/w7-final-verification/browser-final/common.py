import pathlib,subprocess,json,time
Q=pathlib.Path(__file__).resolve().parent;AB='/opt/homebrew/bin/agent-browser';S='w7-apex-final-3b6ae246dd31';BASE='http://localhost:3000';commands=[]
def save(name,data): (Q/name).write_text(json.dumps(data,indent=2))
def ab(*args):
 p=subprocess.run([AB,'--session',S,'--json',*args],capture_output=True,text=True,timeout=45);row={'t':time.time(),'args':list(args),'exit':p.returncode,'stdout':p.stdout,'stderr':p.stderr};commands.append(row)
 with (Q/'commands.jsonl').open('a')as f:f.write(json.dumps(row)+'\n')
 try:r=json.loads(p.stdout)
 except Exception:raise RuntimeError(p.stdout+p.stderr)
 if p.returncode or not r.get('success'):raise RuntimeError(p.stdout)
 return r.get('data',{})
def ev(code):return ab('eval',code).get('result')
def openpath(path,selector='button,svg,input'):
 ab('open',BASE+path)
 if path.startswith('/docs/')and'/credits'not in path:
  ab('wait','--fn','!!document.querySelector("iframe")?.contentDocument?.querySelector('+json.dumps(selector)+')')
  ev('new Promise(async r=>{await document.fonts.ready;let d=document.querySelector("iframe")?.contentDocument;if(d)await d.fonts.ready;requestAnimationFrame(()=>requestAnimationFrame(()=>r(true)))})')
def snap(name=None):
 s=ab('snapshot','-i')
 if name:save(name,s)
 return s
def ref(role,name):
 s=snap();r=[k for k,v in s['refs'].items()if v.get('role')==role and v.get('name')==name]
 if len(r)!=1:raise RuntimeError('Ambiguous/missing ref '+str((role,name,r)))
 return '@'+r[0]
def click(role,name):return ab('click',ref(role,name))
def clickdom(expression,frame=False):
 code='''(()=>{let f=document.querySelector('iframe'),d=FRAME?f.contentDocument:document,n=EXPR;if(!n)throw Error('No native click target');n.scrollIntoView({block:'center',inline:'center'});let r=n.getBoundingClientRect(),p=FRAME?f.getBoundingClientRect():null,s=FRAME?p.width/f.offsetWidth:1;return {x:FRAME?p.x+(f.clientLeft+r.x+r.width/2)*s:r.x+r.width/2,y:FRAME?p.y+(f.clientTop+r.y+r.height/2)*s:r.y+r.height/2,target:n.outerHTML.slice(0,200)}})()'''.replace('FRAME','true'if frame else'false').replace('EXPR',expression)
 p=ev(code);ab('mouse','move',str(round(p['x'])),str(round(p['y'])));ab('mouse','down');ab('mouse','up');return p
FRAMEINFO='''(()=>{let f=document.querySelector('iframe'),d=f?.contentDocument;return {path:location.pathname,theme:document.documentElement.className,h1:document.querySelectorAll('main h1').length,provenance:document.querySelectorAll('[aria-label="Component provenance"]').length,overflow:document.documentElement.scrollWidth>innerWidth,frame:d?{theme:d.documentElement.className,bodyBg:getComputedStyle(d.body).backgroundColor,bodyFg:getComputedStyle(d.body).color,fonts:d.fonts.status,width:f.contentWindow.innerWidth,height:f.contentWindow.innerHeight,text:d.body.innerText,overflow:d.documentElement.scrollWidth>f.contentWindow.innerWidth}:null}})()'''
def info():return ev(FRAMEINFO)
