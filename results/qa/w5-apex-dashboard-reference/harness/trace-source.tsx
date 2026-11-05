import { ProjectGate } from './project-gate-source';
import { ProjectProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/components/app/project-context';
import { TraceDetailClient } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/app/(app)/traces/[traceId]/trace-detail-client';
export function Page() { return <ProjectProvider><ProjectGate><TraceDetailClient traceId="tr_9f2a4c8e1b7d3a6f5e0c" /></ProjectGate></ProjectProvider>; }
