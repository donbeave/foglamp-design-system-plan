# Browser QA server coordination

Current target: **http://localhost:3000/**, existing IPv6 `[::1]:3000` listener, nodePID76956. It respondsHTTP200. This reviewer **does not own or stop/restart** that process. Initial IPv4 `127.0.0.1:3000` failure did not establish that the localhost IPv6 port was free.

Coordinator authorized an owned `mise exec bun@latest -- bun run dev` in the implementation checkout. Its Turbo session43226 found3000 occupied, fell back3001, and was stopped immediately. No other server was modified. There is no remaining reviewer-owned dev server.

Isolated browser session: `w7-apex-current-3b6ae246dd31`. Source is mutable under Antigravity. All current results are provisional; final verification needs a freeze. Only the reviewer’s browser may be closed by this reviewer without further coordination.

Smoke complete: isolated browser closed. Existing3000 server left untouched. Final run awaits freeze.
