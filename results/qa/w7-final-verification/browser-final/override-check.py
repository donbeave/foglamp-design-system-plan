import common as c
c.S='w7-apex-theme3-3b6ae246dd31'
from common import *
openpath('/docs/primitives/button','button');before=info();clickdom('[...d.querySelectorAll("[role=group] button")].find(n=>n.textContent==="Light")');ab('wait','--fn','document.querySelector("iframe").contentDocument.documentElement.classList.contains("light")');override=info();clickdom('[...d.querySelectorAll("[role=tab]")].find(n=>n.textContent==="Outline")');ev('new Promise(r=>setTimeout(()=>r(true),400))');after=info();save('override-immediate.json',{'before':before,'override':override,'presetAfter':after});save('override-console.json',ab('console'));print(before['frame']['theme'],override['frame']['theme'],after['frame']['theme'])
