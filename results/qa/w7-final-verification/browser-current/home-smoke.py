"""Provisional agent-browser smoke; no implementation edits or source normalization."""
import subprocess,json,pathlib,time
Q=pathlib.Path(__file__).resolve().parent;S='w7-apex-current-3b6ae246dd31';AB='/opt/homebrew/bin/agent-browser';log=[]
def ab(*args):
 p=subprocess.run([AB,'--session',S,'--json',*args],capture_output=True,text=True,timeout=35);log.append({'args':list(args),'exit':p.returncode,'stdout':p.stdout,'stderr':p.stderr});(Q/'home-commands.json').write_text(json.dumps(log,indent=2));r=json.loads(p.stdout)
 if p.returncode or not r.get('success'):raise RuntimeError(str(r))
 return r.get('data',{})
def ev(s):return ab('eval',s).get('result')
probe=r'''new Promise(resolve=>{let samples=[];let start=performance.now();function sample(){let h=[...document.querySelectorAll('h1')].find(n=>n.textContent.includes('Know what your agents'));let slot=h?.closest('main')&&[...document.querySelectorAll('main>div')].find(n=>n.contains(h));let heading=[...document.querySelectorAll('h2')].find(n=>n.textContent.includes('Explore the component controls'));let next=heading?.closest('section');let rect=n=>n?.getBoundingClientRect().toJSON();let transformed=slot?[...slot.querySelectorAll('[style*="transform"]')].map(n=>({rect:rect(n),transform:getComputedStyle(n).transform})):[];samples.push({t:performance.now(),hero:rect(h),slot:rect(slot),overflow:slot&&getComputedStyle(slot).overflow,next:rect(next),nextHeading:rect(heading),transformed});if(performance.now()-start<3600)setTimeout(sample,100);else resolve({samples,title:document.title,theme:document.documentElement.className,viewport:{width:innerWidth,height:innerHeight,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth},nav:[...document.querySelectorAll('nav[aria-label="Primary"] a')].map(n=>({text:n.textContent,href:n.href})),callout:document.querySelector('main>div')?.innerText,errorsVisible:document.body.innerText.includes('Something went wrong!')})}sample()})'''
out=[]
for device,w,h in [('desktop',1440,900),('mobile',390,844)]:
 for theme in ['light','dark']:
  ab('set','viewport',str(w),str(h));ab('set','media',theme);ev('localStorage.clear()');ab('open','http://localhost:3000/');ab('wait','--text','Know what your agents are doing');r=ev(probe);r.update(device=device,requestedTheme=theme);out.append(r);(Q/'home-smoke.json').write_text(json.dumps(out,indent=2));ab('screenshot',str(Q/f'home-{device}-{theme}.png'));print(device,theme,r['viewport'],r['theme'],flush=True)
