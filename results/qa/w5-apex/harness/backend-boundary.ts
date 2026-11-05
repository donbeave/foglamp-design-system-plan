// Independent original-source harness only: deterministic backend boundary data.
const query = (parts: string[] = []): unknown => new Proxy(()=>undefined,{get:(_target,key)=>query([...parts,String(key)]),apply:(_target,_this,args)=>({__query:parts.join('.'),args})});
export const trpc = query();
export const queryClient = {invalidateQueries:async()=>undefined,getQueryCache:()=>({subscribe:()=>()=>undefined,getAll:()=>{const groups=globalThis.__referenceBoundaryProps?.queries??{fetching:[],stale:[],staleInactive:0};const row=(q,kind)=>({queryHash:q.hash,queryKey:[q.label],state:{fetchStatus:kind==='fetching'?'fetching':'idle',data:kind==='fetching'?undefined:{}},isStale:()=>kind!=='fetching',getObserversCount:()=>kind==='inactive'?0:1});return [...groups.fetching.map(q=>row(q,'fetching')),...groups.stale.map(q=>row(q,'stale')),...Array.from({length:groups.staleInactive},(_,i)=>row({hash:'inactive-'+i,label:'cached'},'inactive'))]}})};
export function useQuery(options: {__query?:string}) {
 const name=options?.__query;const props=globalThis.__referenceBoundaryProps??{};const response=(data:unknown)=>({data,isLoading:props.isLoading??false,isPlaceholderData:props.isUpdating??false});
 if(name==='metrics.toolBreakdown.queryOptions')return response(props.tools);
 if(name==='metrics.costByCategory.queryOptions'||name==='metrics.costBreakdown.queryOptions')return response(props.data);
 if(name==='agents.promptSlotExamples.queryOptions')return response(undefined);
 if(name==='projects.keys.list.queryOptions')return response([]);
 if(name==='orgs.usage.queryOptions')return response(props.usage);
 if(name==='projects.list.queryOptions')return response([{id:'project_demo',name:'Acme Production',slug:'acme-production',url:null,orgId:'org_demo',orgName:'Acme',orgSlug:'acme'}]);
 throw Error('Original query boundary needs deterministic fixture: '+name);
}
export function useMutation(){return {mutateAsync:async()=>({id:'reference-key',key:globalThis.__referenceBoundaryProps?.apiKey}),mutate:()=>{throw Error('Unadapted original mutation boundary')},isPending:false};}
export function useQueryClient(){return queryClient;}
export const authClient={useSession:()=>({data:globalThis.__referenceBoundaryProps?.session??null,isPending:false}),signOut:async()=>undefined,$fetch:async()=>({data:{status:'pending'},error:null})};
export const env={NEXT_PUBLIC_APP_URL:'http://127.0.0.1:4202',NEXT_PUBLIC_SERVER_URL:'https://api.foglamp.dev',NEXT_PUBLIC_IS_HOSTED:'true'};
export function captureActivationEvent(){/* Telemetry is outside the reference UI. */}
