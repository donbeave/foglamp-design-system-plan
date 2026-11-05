import {isEmpty} from './empty-fixtures';
import { ProjectProvider } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/widgets/project-context';
import { SessionConversationInspectorBlock } from '/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/blocks/dashboard/session-conversation-inspector-block';
import session from './session-fixture.json';
export function Page() { return <ProjectProvider><SessionConversationInspectorBlock isLoading={new URLSearchParams(location.search).get('state') === 'loading'} sessionId="ses_a91f" data={isEmpty()?null:session} /></ProjectProvider>; }
