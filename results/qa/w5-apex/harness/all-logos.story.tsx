import * as logos from '@foglamp/design-system/icons/brand-logos';
import {defineStory} from './story-shim';
function AllBrandLogos(){return <div className="grid grid-cols-5 gap-8">{Object.entries(logos).filter(([name])=>name.endsWith('Logo')).map(([name,Logo])=><div key={name} className="flex flex-col items-center gap-2 text-xs"><Logo className="size-12"/><span>{name}</span></div>)}</div>}
export const story=defineStory({id:'audit/all-logos',Component:AllBrandLogos,args:{initial:{}}});
