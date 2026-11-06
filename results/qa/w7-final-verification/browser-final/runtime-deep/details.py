import subprocess,json,pathlib,time
Q=pathlib.Path(__file__).resolve().parent; AB='/opt/homebrew/bin/agent-browser'; BASE='http://localhost:3000'; results={}
def ab(s,*a):
 p=subprocess.run([AB,'--session','w7-'+s+'-deep','--json',*a],capture_output=True,text=True,timeout=45)
 with (Q/'commands.jsonl').open('a') as f:f.write(json.dumps({'session':s,'args':a,'stdout':p.stdout,'stderr':p.stderr,'exit':p.returncode})+'\n')
 j=json.loads(p.stdout)
 if p.returncode or not j.get('success'):raise RuntimeError(str(j))
 return j.get('data',{})
def ev(s,x):return ab(s,'eval',x).get('result')
def clickframe(s,expr):
 xy=ev(s,'''(()=>{let f=document.querySelector('iframe'); f.scrollIntoView({block:'center'}); let d=f.contentDocument,n=EXPR;if(!n)throw Error('missing');n.scrollIntoView({block:'center'});let r=n.getBoundingClientRect(),p=f.getBoundingClientRect(),z=p.width/f.offsetWidth;return {x:p.x+(f.clientLeft+r.x+r.width/2)*z,y:p.y+(f.clientTop+r.y+r.height/2)*z}})()'''.replace('EXPR',expr))
 ab(s,'mouse','move',str(round(xy['x'])),str(round(xy['y'])));ab(s,'mouse','down');ab(s,'mouse','up')
def snap(s,n):ab(s,'screenshot',str(Q/(n+'.png')))

results["eval_details"]=[]
for name in ["tr_9f2a4c8e","tr_3b8e1d6a","tr_7c1f5a2b"]:
 ab("runtime","open",BASE+"/docs/blocks/eval-detail-block");ab("runtime","wait","--fn","document.querySelector(\"iframe\")?.contentDocument?.body.innerText.includes(\""+name+"\") === true")
 clickframe("runtime","[...d.querySelectorAll('td')].find(n=>n.innerText.trim()==="+json.dumps(name)+")");time.sleep(.4)
 text=ev("runtime","document.querySelector('iframe').contentDocument.body.innerText");results["eval_details"].append({"score":name,"text":text,"input": "Input" in text,"output": "Output" in text,"unavailable":"Judge input unavailable" in text})
clickframe("hud","[...d.querySelectorAll('*')].find(n=>n.shadowRoot)?.shadowRoot.querySelector('.fl-list-row')");time.sleep(.3)
results["hud_open"]=ev("hud","[...document.querySelector('iframe').contentDocument.querySelectorAll('*')].find(n=>n.shadowRoot)?.shadowRoot.querySelector('.fl-shell')?.innerText");snap("hud","hud-open")
results["hud_console"]=ab("hud","console");results["hud_errors"]=ab("hud","errors")
(Q/"interaction-details.json").write_text(json.dumps(results,indent=2));print(json.dumps(results,indent=2))
