# Production browser QA

Target initial build: ce01e3aa72515a8c557336ac174d9428e17c7046. Production Vite preview on 127.0.0.1:4178. Initial render matrix: 176 documentation routes × desktop/mobile × light/dark; 168 embedded story previews in each configuration. Route-level results: matrix.jsonl, mobile.jsonl, mobile-dark.jsonl; HTTP statuses: http-status.json. Desktop Dark StatCard briefly measured Light; manual repeat after readiness measured Dark. The initial harness filtered canceled requests; later raw CDP logs record them. It did not measure page-wide layout shifts.

## Confirmed issue awaiting corrected build

Context Menu preview crashes on right-click, Base UI production error #31. Reproduced twice, screenshot screenshots/context-menu-error.png and context-menu-open.txt. Video recording unavailable: ffmpeg not installed. The story fixture has since been corrected and awaits rebuild/retest.

## Verified interactions on initial build

Hero seven tabs and five detail views; browser search button and Meta+K search and result navigation; Button preset and Reset, Dark CSS/ThemeSwitcher useTheme isolation and native iframe reload; Dialog, AlertDialog, Drawer, Sheet, Popover, DropdownMenu, Combobox, Select and Menubar opening; Tooltip and HoverCard pointer hover; DataTable search; Setup Board edit; Guide eight station pins, courier envelope animateMotion, and Alert quality-drop triggering watchtower pin bellRing. Computed 18 shadow tokens recorded in shadows-light.json and shadows-dark.json. Visible attribution was observed in homepage hero, navbar, footer, founder cards, docs credits, Button story panel. Evidence from independent interaction shards is stored in dashboard-interactions/ and scan-hud-interactions/.

## Layout measurements

Eight sampled top documents had no late shifts during a two-second settled interval; initial-load shifts were recorded in shifts.json. This is not portal-wide proof. The post-correction four-context matrix will capture top-document and iframe shifts per route and theme separately, recording initial and settled intervals plus animation names.

## Limits

Pixel parity with the reference is reserved for W5-5.2. Automated frame DOM/asset checks do not replace visual inspection of each surface or prove every control, source animation or physical interaction. Early initial-sweep cancellations were filtered and cannot be classified retrospectively. Browser capture was done in Chromium; other browsers were not tested. Current interaction evidence applies to the initial build until corrected stories are retested.

## CLI layout correction and final pre-theme-bridge baseline

The mobile install command changed from a 16px placeholder to a wrapped 48px command during hydration, increasing the workbench height by 24px. The corrected command region stays 32px high with one-line horizontal overflow; measured panel, code, Copy and footer rectangles remain unchanged across hydration in mobile-cli-fixed-geometry.json. Horizontal scroll moved from 0 to 300px. Chromium showed the complete command in the DOM and Copy changed to Copied; clipboard read permission was denied. Scrolled desktop and mobile captures are cli-desktop-visible.png and cli-mobile-visible.png; classic scrollbars were not available in the test environment.

The 708-row post-CLI-fix matrix includes 176 docs routes and the homepage at desktop/mobile sizes in both themes, each with 169 workbench previews where applicable. It recorded zero HTTP error responses, failed requests, console errors or exceptions; zero parent/iframe readiness or theme mismatches; zero document overflow or broken/pending eager iframe images; and zero shifts during each later 1.5-second sample. Initial document-shift rows: zero; initial iframe-shift rows: 11 desktop Light, 12 desktop Dark, 12 mobile Light, 12 mobile Dark. Costs figure 2px progress-bar movement matches the source width animation. API key and HUD movement are retained in raw records and not asserted to be source-matched solely from the observer. This is a bounded automated sample, not a claim that every dynamic state has zero shifts.

A separate pointer test found that clicking Dark or System inside the ThemeSwitcher preview briefly changes the child selection before the parent immediately restores Light. Parent global theme storage remains unchanged. This interaction is under correction; theme-child-mutation.json and theme-child-system.json record the observations.

## Theme bridge production retest

After the bridge correction, a native pointer sequence verified that child Dark and System selections persist and parent preview controls reflect the resolved appearance. System follows emulated OS Light/Dark; selecting parent Light while System is already resolved Light switches the child to explicit Light. Muted and Dark Lift surface changes and iframe reload preserve System. With global portal theme explicitly Light, child System followed OS Dark while global storage and parent document stayed Light. Button destructive args survived iframe reload; Reset restored default, and Outline preset applied while preview Dark stayed independent of the global Light theme. Evidence: theme-protocol.json, theme-system-global-light.json and button-bridge-*.json.

## Final bridge-build matrix

The final run completed 708 rows: 177 routes (176 docs and the homepage) × desktop/mobile × Light/Dark, with 169 workbench previews per configuration. The harness waited for the visible install command, React hydration and iframe readiness before a single preview-theme click, then recorded parent pressed state and iframe appearance. It recorded zero active HTTP error responses, failed network requests, console errors, exceptions, theme/readiness mismatches, document overflow, broken or pending eager iframe images, or shifts in the later 1.5-second sample. Raw data and reproducible harness: settled-matrix.jsonl and settled-matrix.mjs; aggregate: settled-summary.json.

Initial top-document entries were observed in one desktop Light row (Buttons & Badges Playground, 0.00004966; reported text-source rectangles identical) and one desktop Dark row (Instrument Empty State search shortcut, 0.00000251; shortcut width changed). Their causes were not established. Neither mobile set had an initial top-document entry. Each configuration had 12 rows with initial iframe movements; Costs progress bars match source animation. Other API-key/HUD movement remains recorded rather than universally classified. These observations do not establish zero shifts across every load, device, interaction or frame time.

Manual contact-sheet review covered representative homepage, docs, foundation, primitive, widget, chart, figure and block surfaces in both themes and viewport sizes. Full pixel parity is reserved for the separate W5-5.2 review. QA-owned server, named browser, CDP browsers and listener processes were stopped after capture.
