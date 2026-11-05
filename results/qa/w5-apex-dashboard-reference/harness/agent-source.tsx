import { ProjectGate } from './project-gate-source';
import { ProjectProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/components/app/project-context';
import { RangeProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/components/app/range-context';
import { AgentDetailClient } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/app/(app)/agents/[name]/agent-detail-client';
export function Page() { return <ProjectProvider><RangeProvider><ProjectGate><AgentDetailClient agentName="Support agent" /></ProjectGate></RangeProvider></ProjectProvider>; }
