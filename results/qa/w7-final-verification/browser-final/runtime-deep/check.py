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
# trace
results['trace']=ev('trace', '''(()=>{let d=document.querySelector('iframe').contentDocument;return [...d.querySelectorAll('div')].filter(n=>n.className.includes('grid-cols-[9.5rem')).map(n=>({columns:getComputedStyle(n).gridTemplateColumns,text:n.innerText,rect:n.getBoundingClientRect().toJSON()}))})()''');snap('trace','trace')
# flow graph geometry before and after actual preset switch
flow='''(()=>{let d=document.querySelector('iframe').contentDocument,s=d.querySelector('svg.pointer-events-none'),p=s?.parentElement;return {svg:s?.getBoundingClientRect().toJSON(),parent:p?.getBoundingClientRect().toJSON(),outer:s?.outerHTML.slice(0,150)}})()'''
results['flow']={'horizontal':ev('flow',flow)};snap('flow','flow-horizontal');ab('flow','find','role','tab','click','--name','Vertical flow');time.sleep(2);results['flow']['vertical']=ev('flow',flow);snap('flow','flow-vertical')
results['scan']=ev('scan', '''(()=>{let d=document.querySelector('iframe').contentDocument,s=d.querySelector('svg.pointer-events-none');return {svg:s?.getBoundingClientRect().toJSON(),parent:s?.parentElement?.getBoundingClientRect().toJSON(),text:d.body.innerText}})()''');snap('scan','scan')
# score rows independently, reopening page between rows to ensure drawer resets
results['eval']=[]
for name in ['tr_9f2a4c8e','tr_3b8e1d6a','tr_7c1f5a2b','tr_2d9a6c3f']:
 ab('runtime','open',BASE+'/docs/blocks/eval-detail-block');ab('runtime','wait','--fn','document.querySelector("iframe")?.contentDocument?.body.innerText.includes("'+name+'") === true')
 clickframe('runtime',"[...d.querySelectorAll('td')].find(n=>n.innerText.trim()==="+json.dumps(name)+")")
 time.sleep(.5)
 row=ev('runtime', '''(()=>{let d=document.querySelector('iframe').contentDocument;return {dialogs:[...d.querySelectorAll('[role=dialog]')].map(n=>n.innerText),unavailable:d.body.innerText.includes('Judge input unavailable')}})()''');row['score']=name;results['eval'].append(row);snap('runtime','eval-'+name)
# start actual storm
clickframe('hud',"[...d.querySelectorAll('button')].find(n=>n.innerText.includes('Run an agent storm'))");time.sleep(8)
results['hud']=ev('hud', '''(()=>{let d=document.querySelector('iframe').contentDocument;return [...d.querySelectorAll('*')].filter(n=>n.shadowRoot).map(n=>({text:n.shadowRoot.innerText,html:n.shadowRoot.innerHTML.slice(-10000)}))})()''');snap('hud','hud-storm')
for s in ['trace','flow','scan','runtime','hud']:
 try:results[s+'_errors']=ab(s,'errors')
 except Exception as e:results[s+'_errors_error']=str(e)
(Q/'results.json').write_text(json.dumps(results,indent=2));print(json.dumps(results,indent=2)[:22000])
