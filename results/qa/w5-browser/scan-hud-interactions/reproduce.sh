#!/bin/sh
set -eu
s=w5-scan-hud-repro-$$
trap 'agent-browser --session "$s" close >/dev/null 2>&1 || true' EXIT
agent-browser --session "$s" open http://127.0.0.1:4178/docs/blocks/flow-map-block
agent-browser --session "$s" wait --fn 'document.querySelector("iframe")?.contentDocument?.body.innerText.includes("Support agent")' --timeout 5000
agent-browser --session "$s" eval '(()=>{let d=document.querySelector("iframe").contentDocument;return {text:d.body.innerText,beams:d.querySelectorAll("[style*=offset-path]").length,running:d.getAnimations().filter(a=>a.playState==="running").length}})()'
agent-browser --session "$s" find role button click --name Dark
agent-browser --session "$s" eval 'document.querySelector("iframe").contentDocument.documentElement.className'
agent-browser --session "$s" open http://127.0.0.1:4178/docs/widgets/foggy-launcher
agent-browser --session "$s" wait --fn 'document.querySelector("iframe")?.contentDocument?.body.innerText.includes("Assistant closed")' --timeout 5000
agent-browser --session "$s" eval 'Array.from(document.querySelector("iframe").contentDocument.querySelectorAll("path")).slice(0,2).map(p=>p.getAttribute("d"))'
agent-browser --session "$s" open http://127.0.0.1:4178/docs/widgets/foglamp-hud
agent-browser --session "$s" wait --fn '!!document.querySelector("iframe")?.contentDocument?.querySelector("foglamp-hud")?.shadowRoot?.querySelector(".fl-tl-bar")' --timeout 10000
agent-browser --session "$s" eval '(()=>{let s=document.querySelector("iframe").contentDocument.querySelector("foglamp-hud").shadowRoot;return {text:s.textContent.slice(-200),bars:s.querySelectorAll(".fl-tl-bar").length,running:s.getAnimations().filter(a=>a.playState==="running").length}})()'
agent-browser --session "$s" errors
agent-browser --session "$s" console
