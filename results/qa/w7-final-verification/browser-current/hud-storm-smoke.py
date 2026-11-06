import pathlib,subprocess,json
Q=pathlib.Path(__file__).resolve().parent;S='w7-apex-current-3b6ae246dd31';AB='/opt/homebrew/bin/agent-browser'
def ab(*a):
 p=subprocess.run([AB,'--session',S,'--json',*a],capture_output=True,text=True,timeout=35);d=json.loads(p.stdout)
 if p.returncode or not d['success']:raise RuntimeError(p.stdout)
 return d['data']
before=ab('console').get('messages',[]);s=ab('snapshot','-i');(Q/'hud-before-action-snapshot.json').write_text(json.dumps(s,indent=2));ref=next(k for k,v in s['refs'].items()if v.get('name')=='Run an agent storm');click=ab('click','@'+ref)
r=ab('eval',r'''new Promise(resolve=>{let out=[],start=performance.now();function tick(){let d=document.querySelector('iframe')?.contentDocument;out.push({t:performance.now(),frame:d?.body.innerText,shadows:d?[...d.querySelectorAll('*')].filter(n=>n.shadowRoot).map(n=>({tag:n.tagName,text:n.shadowRoot.innerText||n.shadowRoot.textContent.slice(-12000)})):[]});if(performance.now()-start<7500)setTimeout(tick,500);else resolve(out)}tick()})''')['result'];messages=ab('console').get('messages',[]);(Q/'hud-storm.json').write_text(json.dumps({'native_action':click,'samples':r,'new_console':messages[len(before):],'duplicate_key_messages':[m for m in messages[len(before):]if 'same key'in m.get('text','')or 's0'in m.get('text','')]},indent=2));print('native storm captured',len(r),'samples')
