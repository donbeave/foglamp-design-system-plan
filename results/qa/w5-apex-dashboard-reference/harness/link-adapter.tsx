import {forwardRef} from 'react';
export default forwardRef<HTMLAnchorElement,React.ComponentPropsWithoutRef<'a'>>(function Link(props,ref){return <a {...props} ref={ref}/>});
