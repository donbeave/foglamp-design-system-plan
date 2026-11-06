import subprocess,json,pathlib,time
Q=pathlib.Path(__file__).resolve().parent; AB='/opt/homebrew/bin/agent-browser'; BASE='http://localhost:3000'; results={}
def ab(s,*a):
 p=subprocess.run([AB,'--session','w7-finalfix-'+s+'-cold','--json',*a],capture_output=True,text=True,timeout=45)
 with (Q/'commands.jsonl').open('a') as f:f.write(json.dumps({'session':s,'args':a,'stdout':p.stdout,'stderr':p.stderr,'exit':p.returncode})+'\n')
 j=json.loads(p.stdout)
 if p.returncode or not j.get('success'):raise RuntimeError(str(j))
 return j.get('data',{})
def ev(s,x):return ab(s,'eval',x).get('result')
def clickframe(s,expr):
 xy=ev(s,'''(()=>{let f=document.querySelector('iframe'); f.scrollIntoView({block:'center'}); let d=f.contentDocument,n=EXPR;if(!n)throw Error('missing');n.scrollIntoView({block:'center'});let r=n.getBoundingClientRect(),p=f.getBoundingClientRect(),z=p.width/f.offsetWidth;return {x:p.x+(f.clientLeft+r.x+r.width/2)*z,y:p.y+(f.clientTop+r.y+r.height/2)*z}})()'''.replace('EXPR',expr))
 ab(s,'mouse','move',str(round(xy['x'])),str(round(xy['y'])));ab(s,'mouse','down');ab(s,'mouse','up')
def snap(s,n):ab(s,'screenshot',str(Q/(n+'.png')))

ab("widget","open",BASE+"/docs/widgets/foglamp-hud");ab("widget","wait","--fn","!!document.querySelector(\"iframe\")?.contentDocument?.querySelector(\"*\")");time.sleep(1)
clickframe("widget","[...d.querySelectorAll('*')].find(n=>n.shadowRoot)?.shadowRoot.querySelector('.fl-list-row')");time.sleep(.5)
read="[...document.querySelector('iframe').contentDocument.querySelectorAll('*')].find(n=>n.shadowRoot)?.shadowRoot.querySelector('.fl-shell')?.innerText"
results["before"]=ev("widget",read);snap("widget","widget-fixed-unredacted");ab("widget","find","label","redact","check");time.sleep(1);clickframe("widget","[...d.querySelectorAll('*')].find(n=>n.shadowRoot)?.shadowRoot.querySelector('.fl-list-row')");time.sleep(.4);results["after"]=ev("widget",read);snap("widget","widget-fixed-redacted");results["console"]=ab("widget","console");results["errors"]=ab("widget","errors");(Q/"redaction-fixed.json").write_text(json.dumps(results,indent=2));print(json.dumps(results,indent=2))
