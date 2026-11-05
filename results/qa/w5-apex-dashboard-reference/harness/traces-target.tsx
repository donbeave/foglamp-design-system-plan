import { ProjectProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/widgets/project-context';
import { RangeProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/widgets/range-context';
import { TracesExplorerBlock } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/blocks/dashboard/traces-explorer-block';
export function Page() { return <ProjectProvider><RangeProvider><TracesExplorerBlock traces={new URLSearchParams(location.search).get('state')==='empty'?[]:undefined} isLoading={new URLSearchParams(location.search).get('state') === 'loading'} /></RangeProvider></ProjectProvider>; }
