import {isEmpty} from './empty-fixtures';
import { ProjectProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/widgets/project-context';
import { TraceWaterfallInspectorBlock } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/blocks/dashboard/trace-waterfall-inspector-block';
import data from './trace-fixture.json';
export function Page() { return <ProjectProvider><TraceWaterfallInspectorBlock initialSpanId={new URLSearchParams(location.search).get('span')??undefined} isLoading={new URLSearchParams(location.search).get('state') === 'loading'} data={isEmpty()?null:data} /></ProjectProvider>; }
