import { ProjectGate } from './project-gate-source';
import { ProjectProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/components/app/project-context';
import { RangeProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/components/app/range-context';
import { TracesClient } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/app/(app)/traces/traces-client';
export function Page() { return <ProjectProvider><RangeProvider><ProjectGate><TracesClient /></ProjectGate></RangeProvider></ProjectProvider>; }
