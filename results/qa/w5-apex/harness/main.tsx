import {Component as ReactComponent,useLayoutEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {ThemeProvider} from 'next-themes';
import 'parity:css';
import {installFrameClock} from './frame-clock';
import {installWallClock} from './wall-clock';
const inputs=new URLSearchParams(location.search);
installWallClock(1740000000000);
if(inputs.has('clock'))installFrameClock();
// Same Default surface application sent by production StoryFrameAppearance.
document.body.style.background='var(--background)';
document.body.setAttribute('data-source-surface','');
document.body.classList.add('not-fumadocs-codeblock');
import {stories} from './stories';
const id=inputs.get('id')??'primitives/button';
const storyPath=Object.keys(stories).find(p=>p.endsWith('/'+id+'.story.tsx'));
window.__parity={id,ready:false};
if(!storyPath)throw Error('Unknown story '+id);
try{
 await Promise.all(['Inter','Geist Mono Variable','Host Grotesk Variable'].flatMap(f=>[400,450,500,550,600,650,700].map(w=>document.fonts.load(w+' 14px "'+f+'"'))));
 await document.fonts.ready;
 const {story}=await stories[storyPath]();
 const variants=Array.isArray(story.args)?story.args:[story.args];
 const index=Number(inputs.get('preset')??0);
 const args=variants[index]?.initial??{};
 const Component=story.Component;
 document.getElementById('root')!.style.cssText='padding:32px;min-height:100vh;';
 window.__parity={id,ready:false,presets:variants.map(x=>x?.variant),args,frame:story.frame};
 class Boundary extends ReactComponent<{children:React.ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}componentDidCatch(error:Error){window.__parity={...window.__parity,ready:false,error:String(error)}}render(){return this.state.failed?null:this.props.children}}
 function Mounted(){useLayoutEffect(()=>{window.__parity.ready=true},[]);return <Component {...args}/>;}
 createRoot(document.getElementById('root')!).render(<Boundary><ThemeProvider attribute="class" forcedTheme={inputs.get('theme')??'light'}><Mounted/></ThemeProvider></Boundary>);
}catch(error){window.__parity={id,ready:false,error:String(error)};throw error;}
