import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
const target='/Users/donbeave/Projects/donbeave/foglamp-design-system';
const reference=target+'/.reference/foglamp';
const dir=path.dirname(new URL(import.meta.url).pathname);
const source=process.env.PARITY_SIDE==='source';
const mapping=JSON.parse(readFileSync(dir+'/source-map.json','utf8'));
function file(p:string){return [p,p+'.tsx',p+'.ts',p+'/index.tsx',p+'/index.ts'].find(existsSync)}
export default defineConfig({root:dir,tsconfig:dir+'/tsconfig.json',define:{'process.env.NEXT_PUBLIC_SERVER_URL':JSON.stringify('https://api.foglamp.dev')}, plugins:[{
 name:'independent-source-reference',enforce:'pre',
 async resolveId(id,importer){
  if(source&&id.startsWith('.')&&importer?.startsWith(target+'/packages/design-system/src/')){const f=file(path.resolve(path.dirname(importer),id));if(f&&mapping[f])return mapping[f];}
  if(id.endsWith('/lib/story')||id===target+'/apps/docs/src/lib/story')return dir+'/story-shim.ts';
  if(id==='parity:shell')return dir+(source?'/shell-source.tsx':'/shell-target.tsx');
  if(source&&id==='foglamp/hud')return reference+'/packages/sdk/src/hud/react/index.tsx';
  if(id==='parity:eval')return dir+(source?'/eval-source.tsx':'/eval-target.tsx');
  if(id==='parity:trace')return dir+(source?'/trace-source.tsx':'/trace-target.tsx');
  if(id==='parity:traces')return dir+(source?'/traces-source.tsx':'/traces-target.tsx');
  if(id==='parity:overview')return dir+(source?'/overview-source.tsx':'/overview-target.tsx');
  if(id==='parity:workflow')return dir+(source?'/workflow-source.tsx':'/workflow-target.tsx');
  if(id==='parity:agent')return dir+(source?'/agent-source.tsx':'/agent-target.tsx');
  if(id==='parity:component')return dir+(source?'/session-source.tsx':'/session-target.tsx');
  if(id==='parity:css')return source?dir+'/source.css':dir+'/target.css';
  if(source&&['@tanstack/react-query','@/utils/trpc','@/lib/auth-client','@foglamp/env/web'].includes(id))return dir+'/backend-boundary.ts';
  if(source&&['@ai-sdk/react','ai'].includes(id))return dir+'/chat-boundary.ts';
  if(id==='next/navigation')return dir+'/navigation-boundary.ts';
  if(id==='next/link')return dir+'/link-adapter.tsx';
  if(id==='next/image')return dir+'/image-adapter.tsx';
  if(id.startsWith('@foglamp/design-system/')){
   const f=file(target+'/packages/design-system/src/'+id.slice('@foglamp/design-system/'.length));
   return f&&source?(mapping[f]??f):f;
  }
  if(source&&id.startsWith('@foglamp/ui/'))return file(reference+'/packages/ui/src/'+id.slice('@foglamp/ui/'.length));
  if(source&&id==='@/lib/analytics')return dir+'/analytics-boundary.ts';
  if(source&&id.startsWith('@/'))return file(reference+'/apps/web/src/'+id.slice(2));
  if(source&&id==='@foglamp/prompts')return dir+'/browser-prompts.ts';
  if(source&&id.startsWith('@foglamp/prompts'))return file(reference+'/packages/prompts/src/'+(id.split('/').slice(2).join('/')||'index'));
  if(source&&importer?.startsWith(reference)&&!id.startsWith('.')&&!id.startsWith('/'))return await this.resolve(id,dir+'/main.tsx',{skipSelf:true});
 },
 transform(code,id){
  if(!source||!id.startsWith(reference))return;
  const aliases:Record<string,Record<string,string>>={
   '/components/login-form.tsx':{LoginFormBlock:'LoginForm'},
   '/components/device-approve-client.tsx':{DeviceApproveBlock:'DeviceApprove'},
   '/components/app/onboarding-panel.tsx':{OnboardingPanelBlock:'OnboardingPanel'},
   '/components/app/instrument-empty-state.tsx':{InstrumentEmptyStateBlock:'InstrumentEmptyState'},
   '/app/buttons/page.tsx':{ButtonsBadgesPlaygroundBlock:'ButtonsPage'},
   '/components/app/foggy/foggy-widget.tsx':{FoggyWidgetView:'FoggyWidget'},
   '/components/app/dev-toolbar.tsx':{DevBarView:'DevBar'},
   '/components/app/quota-card.tsx':{QuotaCardView:'QuotaCard'},
   '/components/app/tool-breakdown-card.tsx':{ToolBreakdownView:'ToolBreakdownCard'},
   '/components/app/cost-breakdown-card.tsx':{CostBreakdownView:'CostBreakdownCard'},
   '/components/user-menu.tsx':{UserMenuView:'UserMenu'},
  };
  const entry=Object.entries(aliases).find(([suffix])=>id.endsWith(suffix));
  if(id.endsWith('/hud/react/useHudStream.ts'))return code+`\nexport {createMockHudStream} from '${dir}/hud-boundary';`;
  if(id.endsWith('/hud/react/FoglampHUD.tsx')){const inline=readFileSync(target+'/packages/design-system/src/hud/FoglampHUD.tsx','utf8').split('/** Scoped Shadow DOM preview')[1];return code.replace('export function FoglampHUD(', 'function ReferenceNativeHud(')+`\nimport {createElement as __referenceElement} from 'react';\nimport {ReferenceEventSource} from '${dir}/hud-boundary';\nexport function FoglampHUD(props){globalThis.__referenceHudStream=props.stream??globalThis.__referenceHudStream;globalThis.EventSource=ReferenceEventSource;return __referenceElement(ReferenceNativeHud,props);}`+'\n/** Scoped Shadow DOM preview'+inline.replace('const containerRef = useRef<HTMLDivElement>(null);','globalThis.__referenceHudStream=props.stream??globalThis.__referenceHudStream;globalThis.EventSource=ReferenceEventSource;const containerRef = useRef<HTMLDivElement>(null);');}
  if(entry){const provider=entry[0].includes('breakdown')||entry[0].includes('quota-card');return code+"\nimport {createElement as __referenceElement} from 'react';\n"+(provider?`import {ProjectProvider as __ReferenceProject} from '${reference}/apps/web/src/components/app/project-context';\n`:'')+Object.entries(entry[1]).map(([exposed,original])=>`export function ${exposed}(props){globalThis.__referenceBoundaryProps=props;${entry[0].includes('foggy-widget')?"props={projectId:'demo-project',pathname:'/overview',range:{from:new Date(0),to:new Date(86400000)},...props};":''}return ${provider?'__referenceElement(__ReferenceProject,null,__referenceElement('+original+',props))':'__referenceElement('+original+',props)'};}`).join('\n');}
 },
},react(),tailwindcss()],resolve:{dedupe:['react','react-dom'],alias:{'@foglamp/ui/globals.css':reference+'/packages/ui/src/styles/globals.css'}},server:{host:'127.0.0.1',port:source?4222:4221,strictPort:true,fs:{allow:['/tmp/foglamp-raster',target,dir,'/Users/donbeave/Projects/donbeave/foglamp-design-system-plan']}}});
