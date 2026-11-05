import React from 'react';
import {createRoot} from 'react-dom/client';
import '/Users/donbeave/Projects/donbeave/foglamp-design-system/apps/docs/src/styles/app.css';
import {HudSimulatorBlock} from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/blocks/marketing/hud-landing';
let settle: { resolve: () => void; reject: (reason: Error) => void } | undefined;
const events: {kind:string; time:number}[] = [];
function event(kind:string) { events.push({kind,time:performance.now()}); document.querySelector('#evidence')!.textContent = JSON.stringify(events); }
function Harness() { return <><HudSimulatorBlock onStorm={() => {event('invoked'); return new Promise<void>((resolve,reject)=>{settle={resolve,reject}})}}/><div style={{position:'fixed',zIndex:9999,top:10,left:'40%',background:'white',color:'black'}}><button onClick={()=>{event('resolve');settle?.resolve()}}>Resolve host promise</button><button onClick={()=>{event('reject');settle?.reject(new Error('mock failure'))}}>Reject host promise</button><pre id="evidence"/></div></> }
createRoot(document.getElementById('root')!).render(<Harness/>);
