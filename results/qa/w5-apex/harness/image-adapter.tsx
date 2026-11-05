import type {ComponentPropsWithoutRef} from 'react';
// Next/Image boundary only: reproduce fill geometry on the original image asset.
export default function Image({fill,priority,preload,quality,style,...props}:ComponentPropsWithoutRef<'img'>&{fill?:boolean;priority?:boolean;preload?:boolean;quality?:number}){return <img {...props} loading={priority||preload?'eager':props.loading??'lazy'} style={fill?{position:'absolute',height:'100%',width:'100%',left:0,top:0,right:0,bottom:0,color:'transparent',...style}:style}/>}
