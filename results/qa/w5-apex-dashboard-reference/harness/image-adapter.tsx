import type {ComponentPropsWithoutRef} from 'react';
export default function Image({fill,priority,quality,...props}:ComponentPropsWithoutRef<'img'>&{fill?:boolean;priority?:boolean;quality?:number}){return <img {...props}/>}
