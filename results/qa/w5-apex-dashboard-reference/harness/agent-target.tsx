import {isEmpty, emptyAgent, emptyWorkflow, emptyOverview} from './empty-fixtures';
import { ProjectProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/widgets/project-context';
import { RangeProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/widgets/range-context';
import { AgentDetailInspectorBlock } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/blocks/dashboard/agent-detail-inspector-block';
import data from './agent-fixture.json';
export function Page() { return <ProjectProvider><RangeProvider><AgentDetailInspectorBlock initialTrace={new URLSearchParams(location.search).get('trace')??undefined} isLoading={new URLSearchParams(location.search).get('state') === 'loading'} agentName="Support agent" data={isEmpty()?emptyAgent:data} /></RangeProvider></ProjectProvider>; }
