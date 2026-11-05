import { Component, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import { installFrameClock } from './frame-clock';
import 'parity:css';
const NativeDate = Date;
const frozenNow = 1740000000000;
class FrozenDate extends NativeDate {
  constructor(...args: ConstructorParameters<typeof Date>) { super(...(args.length ? args : [frozenNow]) as [number]); }
  static now() { return frozenNow; }
}
globalThis.Date = FrozenDate as DateConstructor;
installFrameClock();
const view = new URLSearchParams(location.search).get('view');
const component = view === 'agent' ? await import('parity:agent') : view === 'workflow' ? await import('parity:workflow') : view === 'overview' ? await import('parity:overview') : view === 'traces' ? await import('parity:traces') : view === 'trace' ? await import('parity:trace') : view === 'eval' ? await import('parity:eval') : view === 'shell' ? await import('parity:shell') : await import('parity:component');
const Page = component.Page;
// Identical seeded random stream for source and target chart-loading fixtures.
let randomState = 0x12345678;
Math.random = () => { randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0; return randomState / 4294967296; };
const theme = new URLSearchParams(location.search).get('theme') ?? 'light';
document.body.dataset.sourceSurface = '';
document.body.style.background = 'var(--background)';
window.__parity = { ready: false };
class Boundary extends Component { state = { failed: false }; static getDerivedStateFromError() { return { failed: true }; } componentDidCatch(error) { window.__parity = {ready:false,error:String(error)}; } render() { return this.state.failed ? null : this.props.children; } }
function Mounted() { useLayoutEffect(() => { window.__parity.ready = true; }, []); return <Page />; }
createRoot(document.getElementById('root')).render(<Boundary><ThemeProvider attribute="class" forcedTheme={theme}><Mounted /></ThemeProvider></Boundary>);
