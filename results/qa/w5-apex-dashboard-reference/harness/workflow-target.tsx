import {isEmpty, emptyAgent, emptyWorkflow, emptyOverview} from './empty-fixtures';
import { ProjectProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/widgets/project-context';
import { RangeProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/widgets/range-context';
import { WorkflowDetailBlock } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/blocks/dashboard/workflow-detail-block';
import data from './workflow-fixture.json';
export function Page() { return <ProjectProvider><RangeProvider><WorkflowDetailBlock initialRun={new URLSearchParams(location.search).get('run')??undefined} isLoading={new URLSearchParams(location.search).get('state') === 'loading'} nameParam="Support" data={isEmpty()?emptyWorkflow:data} /></RangeProvider></ProjectProvider>; }
