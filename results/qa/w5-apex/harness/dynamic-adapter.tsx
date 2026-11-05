import {lazy,Suspense} from 'react';
export default function dynamic(loader:()=>Promise<React.ComponentType>,options:{loading?:React.ComponentType}={}){const Lazy=lazy(async()=>({default:await loader()}));const Loading=options.loading;return function ClientBoundary(props:Record<string,unknown>){return <Suspense fallback={Loading?<Loading/>:null}><Lazy {...props}/></Suspense>}}
