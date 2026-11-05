import {useState,type ComponentProps} from 'react';
import {createRoot} from 'react-dom/client';
import {FoglampLinkProvider} from '@foglamp/design-system/lib/link-context';
import {markdownComponents} from '@foglamp/design-system/widgets/foggy/markdown';
const MarkdownAnchor=markdownComponents.a;
function Harness(){
 const [clicks,setClicks]=useState<string[]>([]);
 function HostLink({href,children,...rest}:ComponentProps<'a'>){return <a {...rest} data-host-link="true" href={href} onClick={event=>{event.preventDefault();setClicks(previous=>[...previous,href??'']);}}>{children}</a>;}
 return <FoglampLinkProvider component={HostLink}><main>{[
 ['/traces/abc','internal'],['//example.com/path','protocol-relative'],['https://example.com/docs','external'],['#details','hash'],['mailto:team@example.com','mailto'],['traces/abc','bare-relative'],['','empty']
 ].map(([href,label])=><MarkdownAnchor key={label} href={href} title="source-rest-prop">{label}</MarkdownAnchor>)}<output id="clicks">{JSON.stringify(clicks)}</output></main></FoglampLinkProvider>;
}
createRoot(document.getElementById('root')!).render(<Harness/>);
