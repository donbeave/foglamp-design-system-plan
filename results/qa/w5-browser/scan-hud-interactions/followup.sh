#!/bin/sh
set -eu
s=w5-followup-repro-$$
trap 'agent-browser --session "$s" close >/dev/null 2>&1 || true' EXIT
agent-browser --session "$s" open http://127.0.0.1:4178/docs/blocks/flow-map-block
agent-browser --session "$s" wait --fn 'document.querySelector("iframe")?.contentDocument?.body.innerText.includes("Support agent")' --timeout 5000
agent-browser --session "$s" eval '(async()=>{let d=document.querySelector("iframe").contentDocument,n=[...d.querySelectorAll("span")].find(x=>x.textContent==="Support agent");n.closest(".cursor-pointer").dispatchEvent(new PointerEvent("pointerup",{bubbles:true,pointerType:"mouse"}));await new Promise(r=>setTimeout(r,50));return {edges:[...d.querySelector("svg.pointer-events-none").querySelectorAll("g")].map(x=>x.getAttribute("opacity")),detail:d.body.innerText.slice(-80)}})()'
agent-browser --session "$s" eval '(async()=>{let d=document.querySelector("iframe").contentDocument,g=d.querySelector("div.origin-top-left"),v=g.parentElement,before=g.style.transform;v.dispatchEvent(new WheelEvent("wheel",{bubbles:true,cancelable:true,ctrlKey:true,deltaY:-50,clientX:300,clientY:150}));let during={transform:g.style.transform,willChange:g.style.willChange};await new Promise(r=>setTimeout(r,220));return {before,during,after:{transform:g.style.transform,willChange:g.style.willChange}}})()'
agent-browser --session "$s" open http://127.0.0.1:4178/docs/blocks/setup-board-block
agent-browser --session "$s" wait --fn 'document.querySelector("iframe")?.contentDocument?.body.innerText.includes("Approve")' --timeout 5000
agent-browser --session "$s" eval '(async()=>{let d=document.querySelector("iframe").contentDocument,g=d.querySelector("div.origin-top-left"),n=[...d.querySelectorAll("span")].find(x=>x.textContent==="Support agent"),before=g.style.transform;n.closest("li").click();let samples=[];for(let i=0;i<12;i++){await new Promise(r=>setTimeout(r,60));samples.push(g.style.transform)}return {before,samples,willChange:g.style.willChange}})()'
agent-browser --session "$s" open http://127.0.0.1:4178/docs/widgets/foglamp-hud
agent-browser --session "$s" wait --fn '!!document.querySelector("iframe")?.contentDocument?.querySelector("foglamp-hud")?.shadowRoot?.querySelector(".fl-tl-bar")' --timeout 10000
agent-browser --session "$s" eval '(async()=>{let s=document.querySelector("iframe").contentDocument.querySelector("foglamp-hud").shadowRoot,sh=s.querySelector(".fl-shell"),before=sh.getAttribute("style");s.querySelector("button[aria-label=Collapse]").click();let samples=[];for(let i=0;i<12;i++){await new Promise(r=>setTimeout(r,50));samples.push(sh.getAttribute("style"))}return {before,samples,mode:sh.dataset.mode}})()'
agent-browser --session "$s" errors
agent-browser --session "$s" console
