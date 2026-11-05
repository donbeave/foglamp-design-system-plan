import {isEmpty, emptyAgent, emptyWorkflow, emptyOverview} from './empty-fixtures';
import { ProjectProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/widgets/project-context';
import { RangeProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/widgets/range-context';
import { OverviewDashboardBlock } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/blocks/dashboard/overview-dashboard-block';
export function Page() { return <ProjectProvider><RangeProvider><OverviewDashboardBlock data={isEmpty()?emptyOverview():undefined} isLoading={new URLSearchParams(location.search).get('state') === 'loading'} /></RangeProvider></ProjectProvider>; }
