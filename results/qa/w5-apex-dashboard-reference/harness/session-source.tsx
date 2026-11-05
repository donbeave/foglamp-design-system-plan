import { ProjectGate } from './project-gate-source';
import { ProjectProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/components/app/project-context';
import { SessionDetailClient } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/app/(app)/sessions/[sessionId]/session-detail-client';
export function Page() { return <ProjectProvider><ProjectGate><SessionDetailClient sessionId="ses_a91f" /></ProjectGate></ProjectProvider>; }
