// Usage: node /tmp/foglamp-cdp.mjs [debug port] [output JSONL]
// Start Chrome with --remote-debugging-port and attach agent-browser first.
import { appendFileSync, writeFileSync } from 'node:fs';
const port = process.argv[2] ?? '9339';
const output = process.argv[3] ?? '/tmp/foglamp-cdp.jsonl';
const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const target = targets.find(t => t.type === 'page');
if (!target) throw new Error('No page target');
const ws = new WebSocket(target.webSocketDebuggerUrl);
const requests = new Map(), frames = new Map(), contexts = new Map();
writeFileSync(output, '');
const log = (kind, data) => appendFileSync(output, JSON.stringify({wall: Date.now(), kind, ...data}) + '\n');
let id = 0;
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
for (const method of ['Page.enable', 'Network.enable', 'Runtime.enable']) ws.send(JSON.stringify({id: ++id, method}));
ws.onmessage = ({data}) => {
  const {method, params: p} = JSON.parse(data);
  if (!method) return;
  if (method === 'Network.requestWillBeSent') requests.set(p.requestId, {requestId:p.requestId, url:p.request.url, frameId:p.frameId, documentURL:p.documentURL, loaderId:p.loaderId, initiator:p.initiator, timestamp:p.timestamp, frameAtRequest:frames.get(p.frameId)});
  else if (method === 'Network.responseReceived') { const r = requests.get(p.requestId); if (r) r.status = p.response.status; }
  else if (method === 'Network.loadingFailed') log('loadingFailed', {...requests.get(p.requestId), errorText:p.errorText, canceled:p.canceled, blockedReason:p.blockedReason, failedAt:p.timestamp, currentFrame:frames.get(requests.get(p.requestId)?.frameId)});
  else if (method === 'Page.frameNavigated') {frames.set(p.frame.id, {url:p.frame.url, loaderId:p.frame.loaderId, parentId:p.frame.parentId}); log('frameNavigated', {frame:p.frame});}
  else if (method === 'Page.frameDetached') {log('frameDetached', {...p, previous:frames.get(p.frameId)}); frames.delete(p.frameId);}
  else if (method === 'Page.navigatedWithinDocument') {const f=frames.get(p.frameId); if(f) f.url=p.url; log('navigatedWithinDocument',p);}
  else if (method === 'Runtime.executionContextCreated') {contexts.set(p.context.id, p.context); log('contextCreated', {id:p.context.id, origin:p.context.origin, auxData:p.context.auxData});}
  else if (method === 'Runtime.executionContextDestroyed') {log('contextDestroyed', {id:p.executionContextId, context:contexts.get(p.executionContextId)}); contexts.delete(p.executionContextId);}
  else if (method === 'Runtime.executionContextsCleared') {log('contextsCleared', {}); contexts.clear();}
  else if (method === 'Runtime.exceptionThrown') log('exception', {details:p.exceptionDetails, context:contexts.get(p.exceptionDetails.executionContextId)});
  else if (method === 'Runtime.consoleAPICalled' && (p.type === 'error' || p.args.some(a=>String(a.value).startsWith('FOG_MARK')))) log('console', {type:p.type,args:p.args,stackTrace:p.stackTrace,context:contexts.get(p.executionContextId)});
};
console.log(`Recording target ${target.id} to ${output}`);
