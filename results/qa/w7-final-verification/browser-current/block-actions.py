import pathlib,subprocess,json
Q=pathlib.Path(__file__).resolve().parent;AB='/opt/homebrew/bin/agent-browser';S='w7-apex-current-3b6ae246dd31'
def ab(*a):
 p=subprocess.run([AB,'--session',S,'--json',*a],capture_output=True,text=True,timeout=35);d=json.loads(p.stdout)
 if p.returncode or not d.get('success'):raise RuntimeError(p.stdout)
 return d['data']
s=ab('snapshot','-i');refs=[k for k,v in s['refs'].items()if v.get('name')=='Expand Framerock HUD'];result={'expand_ref_count':len(refs)}
if refs:result['click']=ab('click','@'+refs[0])
result['visible_shadow']=ab('eval',r'''(()=>{let d=document.querySelector('iframe').contentDocument;return [...d.querySelectorAll('*')].filter(n=>n.shadowRoot).map(n=>({tag:n.tagName,text:n.shadowRoot.querySelector('.fl-shell')?.innerText||''}))})()''')['result'];(Q/'hud-expanded.json').write_text(json.dumps(result,indent=2))
ab('open','http://localhost:3000/docs/blocks/eval-detail-block');ab('wait','--fn','document.querySelector("iframe")?.contentDocument?.body.innerText.includes("tr_9f2a4c8e") === true');s=ab('snapshot','-i');ref=next(k for k,v in s['refs'].items()if v.get('role')=='cell'and v.get('name')=='tr_9f2a4c8e');click=ab('click','@'+ref);r=ab('eval',r'''new Promise(resolve=>setTimeout(()=>{let d=document.querySelector('iframe').contentDocument;resolve({text:d.body.innerText,dialogs:[...d.querySelectorAll('[role=dialog]')].map(n=>({text:n.innerText,rect:n.getBoundingClientRect().toJSON()})),judgeUnavailable:d.body.innerText.includes('Judge input unavailable')})},700))''')['result'];r['native_click']=click;(Q/'eval-score-drawer.json').write_text(json.dumps(r,indent=2));ab('screenshot',str(Q/'eval-score-drawer.png'));print('Eval unavailable',r['judgeUnavailable'],'dialogs',len(r['dialogs']))
