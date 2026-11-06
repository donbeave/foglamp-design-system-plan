import common as c
c.S='w7-apex-repair-3b6ae246dd31'
from common import *
openpath('/docs/blocks/buttons-badges-playground-block','h1');ab('wait','--fn','document.querySelector("iframe").contentDocument.body.innerText.includes("to toggle the theme")');before=info();point=clickdom('d.querySelector("h1")',True);ab('press','t');ev('new Promise(r=>setTimeout(()=>r(true),500))');after=info();save('gallery-hotkey-pin.json',{'before':before,'nativeFocusClick':point,'nativeKey':'t','after500ms':after});save('gallery-hotkey-console.json',ab('console'));print(before['frame']['theme'],after['frame']['theme'])
