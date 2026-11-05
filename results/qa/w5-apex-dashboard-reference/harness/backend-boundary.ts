import {emptyAgent, emptyWorkflow, emptyOverview, isEmpty} from './empty-fixtures';
import evalFixture from './eval-fixture.json';
import trace from './trace-fixture.json';
import tracesFixture from './traces-fixture.json';
import { defaultOverviewData } from './overview-data';
import workflow from './workflow-fixture.json';
import agent from './agent-fixture.json';
import session from './session-fixture.json';
// Independent original-source harness only: deterministic backend boundary data.
const query = (parts: string[] = []): unknown => new Proxy(()=>undefined,{get:(_target,key)=>query([...parts,String(key)]),apply:(_target,_this,args)=>({__query:parts.join('.'),args})});
export const trpc = query();
export const queryClient = {invalidateQueries:async()=>undefined,getQueryCache:()=>({getAll:()=>[],subscribe:()=>()=>{}})};
export function useQuery(options: {__query?:string}) {
 const name=options?.__query;const props=globalThis.__referenceBoundaryProps??{};const response=(data:unknown)=>({data,isLoading: name==='projects.list.queryOptions' ? false : new URLSearchParams(location.search).get('state')==='loading' || (props.isLoading??false),isPlaceholderData:props.isUpdating??false});
 if(new URLSearchParams(location.search).get('view')==='eval') {
 if(name==='evals.list.queryOptions')return response(isEmpty()?[]:[evalFixture.definition]);
 if(name==='evals.presets.queryOptions')return response([{id:'toxicity',name:'Toxicity',prompt:''}]);
 if(name==='providerKeys.list.queryOptions')return response({keys:[]});
 if(name==='evals.timeseries.queryOptions')return response(evalFixture.series);
 if(name==='evals.recentScores.queryOptions')return response({scores:isEmpty()?[]:evalFixture.scores,total:isEmpty()?0:evalFixture.scores.length});
 if(name==='evals.score.queryOptions')return response(evalFixture.scores.find(x=>x.scoreId===(options as any).args[0].scoreId));
 if(name==='evals.judgeInput.queryOptions')return response(null);
 if(name==='traces.get.queryOptions')return response(null);
 }
 if(new URLSearchParams(location.search).get('view')==='trace') {
 if(name==='traces.get.queryOptions')return response(isEmpty()?null:trace);
 if(name==='evals.traceScores.queryOptions'||name==='evals.list.queryOptions'||name==='evals.presets.queryOptions')return response([]);
 if(name==='traces.sessionNeighbors.queryOptions'||name==='traces.comparison.queryOptions')return response(null);
 }
 if(['traces','shell'].includes(new URLSearchParams(location.search).get('view')||'')) {
 const rows=(isEmpty()?[]:tracesFixture).map((t,i)=>({...t,startTime:new Date(Date.now()-86400000+86400000*(0.8-i*0.2)).toISOString(),metadataValue:null}));
 if(name==='agents.names.queryOptions')return response(rows.map(x=>x.agentName));
 if(name==='agents.promptVersions.queryOptions')return response([]);
 if(name==='workflows.names.queryOptions')return response(rows.map(x=>x.workflowName));
 if(name==='customers.list.queryOptions')return response({customers:rows.map(x=>({customerId:x.customerId,customerName:x.customerName,customerImageUrl:x.customerImageUrl}))});
 if(name==='metrics.models.queryOptions')return response(rows.flatMap(x=>x.models.map(modelId=>({modelId}))));
 if(name==='traces.metadataKeys.queryOptions')return response(isEmpty()?[]:['environment']);
 if(name==='traces.metadataValues.queryOptions')return response({values:[],truncated:false});
 if(name==='traces.list.queryOptions'){
  const input=(options as any).args[0];
  const filtered=rows.filter(row=>!input.agentName||row.agentName===input.agentName);
  const quantiles=(values:number[])=>{const xs=values.filter(v=>v>0).sort((a,b)=>a-b);return xs.length?[0.2,0.4,0.6,0.8].map(q=>xs[Math.min(xs.length-1,Math.floor(q*xs.length))]):[];};
  return response({traces:filtered,costQuantiles:quantiles(filtered.map(t=>t.totalCost??0)),durationQuantiles:quantiles(filtered.map(t=>t.durationMs)),summary:{traceCount:filtered.length}});
 }
 }
 if(new URLSearchParams(location.search).get('view')==='overview') {
 const overview=isEmpty()?emptyOverview():defaultOverviewData(new Date(Date.now()-86400000),new Date(Date.now()));
 if(name==='metrics.summary.queryOptions')return response({current:overview.current,previous:overview.previous});
 if(name==='metrics.timeseries.queryOptions')return response(overview.series);
 if(name==='metrics.models.queryOptions')return response(overview.models);
 if(name==='metrics.costByModel.queryOptions')return response(overview.costByModel);
 if(name==='agents.list.queryOptions')return response({agents:overview.agents});
 if(name==='workflows.list.queryOptions')return response({workflows:overview.workflows});
 if(name==='customers.list.queryOptions')return response({customers:overview.customers});
 if(name==='traces.list.queryOptions')return response({traces:[true]});
 if(name==='alerts.list.queryOptions')return response(overview.alerts);
 }
 if(name==='workflowRuns.list.queryOptions')return response((options as any).enabled === false ? undefined : (isEmpty()?emptyWorkflow:workflow).runs);
 if(name==='workflowRuns.summary.queryOptions')return response((isEmpty()?emptyWorkflow:workflow).summary);
 if(name==='workflowRuns.timeseries.queryOptions')return response((isEmpty()?emptyWorkflow:workflow).series);
 if(name==='workflowRuns.get.queryOptions'){const id=(options as any).args[0].workflowRunId;if(!(id in workflow.runDetails))throw Error('Unknown run '+id);return response((workflow.runDetails as any)[id]);}
 if(name==='metrics.costByCategory.queryOptions')return response((isEmpty()?emptyAgent:agent).costs);
 if(name==='metrics.toolBreakdown.queryOptions')return response((isEmpty()?emptyAgent:agent).tools);
 if(name==='agents.promptVersions.queryOptions')return response((isEmpty()?emptyAgent:agent).versions);
 if(name==='agents.get.queryOptions')return response({stats:(isEmpty()?emptyAgent:agent).stats});
 if(name==='metrics.timeseries.queryOptions')return response((isEmpty()?emptyAgent:agent).series);
 if(name==='alerts.list.queryOptions')return response((isEmpty()?emptyAgent:agent).alerts);
 if(name==='traces.list.queryOptions')return response({traces:(isEmpty()?emptyAgent:agent).traces,costQuantiles:(isEmpty()?emptyAgent:agent).costQuantiles,durationQuantiles:(isEmpty()?emptyAgent:agent).durationQuantiles,summary:{traceCount:(isEmpty()?emptyAgent:agent).totalTraces}});
 if(name==='traces.get.queryOptions'&&new URLSearchParams(location.search).get('view')==='workflow'){const id=(options as any).args[0].traceId; if(!(id in workflow.traceDetails))throw Error('Unknown workflow trace '+id);return response((workflow.traceDetails as any)[id]);}
 if(name==='traces.get.queryOptions'){const id=(options as any).args[0].traceId; if(!(id in agent.traceDetails)) throw Error('Unknown trace '+id);return response((agent.traceDetails as any)[id]);}
 if(name==='projects.list.queryOptions'&&new URLSearchParams(location.search).get('view')==='shell'&&['empty','loading'].includes(new URLSearchParams(location.search).get('state')||''))return {data:[],isLoading:new URLSearchParams(location.search).get('state')==='loading',isPlaceholderData:false};
 if(name==='platform.isAdmin.queryOptions')return response(false);
 if(name==='orgs.usage.queryOptions')return response(null);
 if(name==='orgs.pendingInvitations.queryOptions')return response([]);
 if(name==='sessions.get.queryOptions')return response(isEmpty()?null:session);
 if(name==='metrics.toolBreakdown.queryOptions')return response(props.tools);
 if(name==='metrics.costBreakdown.queryOptions')return response(props.data);
 if(name==='orgs.usage.queryOptions')return response(props.usage);
 if(name==='projects.list.queryOptions')return response([{id:'demo',name:'Acme Production',slug:'acme-production',url:null,orgId:'org-demo',orgName:'Acme',orgSlug:'acme'}]);
 throw Error('Original query boundary needs deterministic fixture: '+name);
}
export function useMutation(){return {mutate:()=>{throw Error('Unadapted original mutation boundary')},isPending:false};}
export function useQueryClient(){return queryClient;}
export const authClient={useSession:()=>({data:{user:{name:'Alex Rivera',email:'alex@example.com',image:null}},isPending:false}),signOut:async()=>undefined};
export const env={NEXT_PUBLIC_APP_URL:'http://127.0.0.1:4202',NEXT_PUBLIC_SERVER_URL:'http://127.0.0.1:4202',NEXT_PUBLIC_IS_HOSTED:'true'};
