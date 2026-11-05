// QA observation clock: original callbacks receive a shared 60 Hz timeline.
// No component classes, styles, easing, durations or motion preference are changed.
export function installFrameClock(){
 const nativeFrame=requestAnimationFrame.bind(window);
 window.__settleReferencePaint=()=>new Promise(resolve=>nativeFrame(()=>nativeFrame(resolve)));
 let time=0;let id=0;const jobs=new Map<number,FrameRequestCallback>();
 Object.defineProperty(performance,'now',{configurable:true,value:()=>time});
 window.requestAnimationFrame=callback=>{const token=++id;jobs.set(token,callback);return token};
 window.cancelAnimationFrame=token=>{jobs.delete(token)};
 window.__flushReferenceFrames=async()=>{const batch=[...jobs.values()];jobs.clear();for(const callback of batch)callback(time);await new Promise(r=>setTimeout(r,0));};
 window.__advanceReferenceFrames=async(end:number)=>{while(time+0.001<end){time=Math.min(end,time+1000/60);const batch=[...jobs.values()];jobs.clear();for(const callback of batch)callback(time);await Promise.resolve();if(Math.round(time*60/1000)%30===0)await new Promise(r=>setTimeout(r,0));}await new Promise(r=>setTimeout(r,0));return {time,pending:jobs.size}};
}
