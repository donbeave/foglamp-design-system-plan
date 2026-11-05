import { ReferenceEventSource, createMockHudStream } from './hud-boundary';
globalThis.__referenceHudStream = createMockHudStream([
  { type: 'trace.start', ts: 0, traceId: 'tr_9f2a4c8e1b7d3a6f5e0c', name: 'support-triage', agentName: 'support-triage', workflowName: 'onboard-customer', sessionId: 'ses_a91f' },
  { type: 'step.start', ts: 120, traceId: 'tr_9f2a4c8e1b7d3a6f5e0c', stepNumber: 1, provider: 'google', model: 'gemini-3.5-flash' },
  { type: 'step.tokens', ts: 1040, traceId: 'tr_9f2a4c8e1b7d3a6f5e0c', stepNumber: 1, outputTokens: 142 },
]);
globalThis.EventSource = ReferenceEventSource as unknown as typeof EventSource;
import { AppShell } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/components/app/app-shell';
import { TracesClient } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/app/(app)/traces/traces-client';
export function Page() { return <div className="mx-auto w-full max-w-6xl p-6"><div className="h-[760px] overflow-hidden rounded-lg"><AppShell><TracesClient /></AppShell></div></div>; }
