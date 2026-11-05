# Attribution and callback evidence audit

Production preview: `http://127.0.0.1:4203`, current pre-correction `apps/docs/dist`. The server-side route sweep `route-attribution.py` fetched all 176 MDX routes and found 168 workbench footer instances, each with Gustavo, Abdul, Foglamp Labs and the three required footer links; homepage adds one. This is server-rendered HTML evidence, not 676 separate visual inspections. The common `FoglampStoryPanel` footer is shared. `home-*.json`, `button-*.json` and `credits-*.json` record computed display, visibility, opacity, dimensions and hrefs in four desktop/mobile, light/dark configurations using a separate agent-browser session. These demonstrate sampled rendering, not that offscreen links are simultaneously in the viewport. The credits accessibility snapshot showed both founder cards, Curitiba story region, and the exact GitHub, Gustavo website/X/LinkedIn, Abdul LinkedIn, original repository and Foglamp site URLs.

## Confirmed gaps

* GOAL.md line 33 requires top-level sidebar label “Credits & Original Creator”; production accessibility tree says “Credits”. CREDITS.md calls it “Credits & Original Author”. The page is top-level, but neither full requested label is used.
* GOAL.md line 31 explicitly requires `https://gustavofior.com` direct links in both MarketingNavbar and CuttingMatFooterBlock. Both use Gustavo's GitHub instead; neither contains his website link. GOAL line 202 additionally specifies homepage hero honor the website and @heyimgustavo; neither link appears there. These findings were sent to root and Apex.

## Other attribution evidence

Root README and CREDITS contain top callouts and dedicated sections naming all three creators and their specified links. `metadata-audit.py` found 290 actual registry payloads (289 item files plus aggregate foglamp.json), all with creator author, source homepage and Apache-2.0 license. The 291st JSON is `story-items.json`, a catalog rather than a registry payload. Registry metadata has author, homepage, license; package author/license fields are present, package design-system and registry homepage fields match upstream. Root and docs packages omit homepage. `provenance.py` found 193 explicit source path references in design-system file headers and every one resolves in pinned `.reference/foglamp`; path resolution does not prove authorship or visual equivalence. Derived integration labels require separate manual review.

## Existing motion proof and boundaries

* Hero seven tabs, five details and 3-beat source choreography: existing B report and Apex native source comparison; choreography parity belongs to Apex.
* Guide pins, courier and Watchtower bell: `../w5-browser/guide-pins.json`, `guide-motion.json`, `guide-bell.json` and B report. Actual native interaction observed; exact source constants and complete duration comparisons belong to Apex.
* Timeline phases/fold/hover; DataTable search, typeahead, sibling menus and portal lifting; chart brush/zoom; PromptVersions: `../w5-browser/dashboard-interactions/` reports, plus native reservation rAF captures. Reservation is anticipatory before panel growth, not scroll proof.
* FlowMap beams/spotlight/rings/zoom, Foggy drag and HUD physics: `../w5-browser/scan-hud-interactions/results.json`, limitations in that file. Some interactions synthetic; native resize and observed animation recorded.
* Theme bridge: `../w5-browser/theme-protocol.json`, `theme-system-global-light.json`, `button-bridge-*.json`: native pointer interactions, OS, reset, reload and isolation documented.

The named callback inventory is static and is not execution evidence. Public prop callbacks for LoginForm, DeviceApprove, OnboardingPanel, UserMenu, NewProject, and RangePicker have not been independently executed in this audit. Instrument SDK toggle and ButtonsBadges behaviors are likewise not individually evidenced here. Root was asked for a separate bounded harness. No blanket callback, source parity or all-interaction pass is asserted.

The rendered `/docs` introduction also exposes all seven specified original-project and creator links; `docs-index-links.txt` records the accessibility tree hrefs.
