// Source EventSource boundary driven by the same typed fixture stream.
export class ReferenceEventSource{
 onopen: (()=>void)|null=null;onmessage:((event:{data:string})=>void)|null=null;onerror:(()=>void)|null=null;private unsubscribe:(()=>void)|undefined;
 constructor(_url:string){queueMicrotask(()=>{this.onopen?.();this.unsubscribe=globalThis.__referenceHudStream?.subscribe(event=>this.onmessage?.({data:JSON.stringify(event)}))});}
 close(){this.unsubscribe?.();}
}
export function createMockHudStream(initialEvents:readonly unknown[]=[]){const history=[...initialEvents];const listeners=new Set<(event:unknown)=>void>();return {subscribe(listener:(event:unknown)=>void){history.forEach(listener);listeners.add(listener);return()=>{listeners.delete(listener)}},emit(event:unknown){history.push(event);listeners.forEach(listener=>listener(event))}};}
