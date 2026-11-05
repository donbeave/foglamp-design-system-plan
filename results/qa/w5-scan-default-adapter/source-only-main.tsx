import {createRoot} from 'react-dom/client';
import {ScanBoard} from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/blocks/scan/scan-board';
import {SetupBoardBlock} from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/blocks/setup/setup-board';
import {scanFixture,planFixture} from '/Users/donbeave/Projects/donbeave/foglamp-design-system/apps/docs/src/stories/blocks/fixtures';
import '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/styles/globals.css';
createRoot(document.getElementById('root')!).render(location.search.includes('setup')?<SetupBoardBlock plan={planFixture} status="awaiting_approval" approving={false} onApprove={()=>{}} onReject={()=>{}}/>:<ScanBoard data={scanFixture}/>);
