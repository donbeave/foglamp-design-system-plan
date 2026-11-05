export function usePathname(){return new URLSearchParams(location.search).get('view')==='shell' ? '/traces' : '/overview';}
export function useRouter(){return {push:()=>undefined,replace:()=>undefined,refresh:()=>undefined,back:()=>undefined};}
export function useSearchParams(){return new URLSearchParams(location.search);}
export function useParams(){return {};}
