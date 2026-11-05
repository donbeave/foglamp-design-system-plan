import * as React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./components/framerock/ui/button";
import { Hero } from "./components/framerock/blocks/marketing/hero/hero";
import { ScanBoard } from "./components/framerock/blocks/scan/scan-board";
import { SetupBoardBlock } from "./components/framerock/blocks/setup/setup-board";
import { FramerockLinkProvider } from "./components/framerock/lib/link-context";
import { planFixture, scanFixture } from "./fixtures";
import "./globals.css";

type View = "Button" | "Hero" | "Scan" | "Setup";
function LocalLink({ href, to, onClick, ...props }: React.ComponentProps<"a"> & { to?: string }) {
  return <a {...props} href={href ?? to ?? "#"} onClick={event => { event.preventDefault(); onClick?.(event); }} />;
}
function App() {
  const [view, setView] = React.useState<View>("Button");
  const [dark, setDark] = React.useState(false);
  return <div className={dark ? "dark min-h-screen bg-background text-foreground" : "min-h-screen bg-background text-foreground"}>
    <nav className="fixed inset-x-0 top-0 z-[100] flex h-14 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
      {(["Button", "Hero", "Scan", "Setup"] as const).map(item => <button key={item} className="rounded-md border px-3 py-1.5 text-sm" aria-pressed={view === item} onClick={() => setView(item)}>{item}</button>)}
      <button className="ml-auto rounded-md border px-3 py-1.5 text-sm" onClick={() => setDark(value => !value)}>{dark ? "Light mode" : "Dark mode"}</button>
    </nav>
    <main className="pt-14">
      {view === "Button" && <section className="space-y-4 p-8"><h1 className="text-2xl font-semibold">Fresh Framerock consumer · Button</h1><Button>Button installed from the Framerock registry</Button></section>}
      {view === "Hero" && <div className="min-h-[calc(100vh-3.5rem)]"><FramerockLinkProvider component={LocalLink}><Hero /></FramerockLinkProvider></div>}
      {view === "Scan" && <ScanBoard data={scanFixture} />}
      {view === "Setup" && <SetupBoardBlock plan={planFixture} status="awaiting_approval" approving={false} onApprove={() => {}} onReject={() => {}} />}
    </main>
  </div>;
}

createRoot(document.getElementById("root")!).render(<App />);
