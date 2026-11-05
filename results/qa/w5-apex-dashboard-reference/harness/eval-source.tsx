import { ProjectGate } from './project-gate-source';
import { ProjectProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/components/app/project-context';
import { RangeProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/components/app/range-context';
import { EvalDetailClient } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/.reference/foglamp/apps/web/src/app/(app)/evals/[id]/eval-detail-client';
export function Page() { return <ProjectProvider><RangeProvider><ProjectGate><EvalDetailClient evalId="ev_toxicity" /></ProjectGate></RangeProvider></ProjectProvider>; }
