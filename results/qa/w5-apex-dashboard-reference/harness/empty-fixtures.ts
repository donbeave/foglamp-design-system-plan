import { defaultOverviewData } from './overview-data';
export const emptyAgent = {stats:null,series:[],traces:[],costQuantiles:[],durationQuantiles:[],totalTraces:0,traceDetails:{},alerts:[],costs:[],tools:[],versions:[]};
export const emptyWorkflow = {summary:null,series:[],runs:[],runDetails:{},traceDetails:{}};
export function emptyOverview() {
 const base = defaultOverviewData(new Date(Date.now()-86400000),new Date(Date.now()));
 const empty = {totalTokens:0,inputTokens:0,outputTokens:0,totalCost:null,passRate:null,checkCount:0,errorRate:null,errorCount:0,spanCount:0};
 return {...base,current:empty,previous:empty,series:[],models:[],costByModel:[],agents:[],workflows:[],customers:[],alerts:[],hasReceivedTraces:true};
}
export const isEmpty = () => new URLSearchParams(location.search).get('state') === 'empty';
