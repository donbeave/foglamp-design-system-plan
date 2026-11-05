import {createRoot} from 'react-dom/client';
import {ScanBoard} from './components/foglamp/blocks/scan/scan-board';
import {SetupBoardBlock} from './components/foglamp/blocks/setup/setup-board';
import {scanFixture,planFixture} from './fixtures';
import './globals.css';
createRoot(document.getElementById('root')!).render(location.search.includes('setup')?<SetupBoardBlock plan={planFixture} status="awaiting_approval" approving={false} onApprove={()=>{}} onReject={()=>{}}/>:<ScanBoard data={scanFixture}/>);
