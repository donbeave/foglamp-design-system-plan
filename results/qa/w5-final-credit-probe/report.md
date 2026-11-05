# Wave 5 production attribution probe

Target: `http://localhost:4203`, existing production server. This was a bounded, read-only browser probe; it did not assess the whole portal or perform a pixel-parity, layout-shift, or full accessibility audit. Browser session `w5-credit-probe` was closed after the check; the server was not stopped or restarted.

## Observations

- Desktop homepage `/`: the browser accessibility snapshot exposed visible links in the navbar, hero, story workbench, and footer. The primary navigation link was `Credits & Original Creator` → `/docs/credits`.
- Desktop `/docs/credits`: the sidebar link and page H1 both read `Credits & Original Creator`. The body exposed the six direct links listed below.
- Mobile homepage `/` at 390 × 844 CSS pixels: accessibility snapshots in light and dark showed the attribution links in navbar, hero, story workbench, and footer. Dark mode was confirmed by `document.documentElement.className` returning `dark`.
- Mobile `/docs/credits` at 390 × 844 in dark mode: the H1 and the six body links were exposed in the accessibility snapshot. The sidebar was collapsed at this width.
- The browser `errors` and `console` commands returned empty output during the bounded check. This observation does not establish that other routes or later interactions have no errors.

## Rendered links

Browser-normalized hrefs:

| Label | href | Observed surfaces |
| --- | --- | --- |
| Gustavo Fior / his website | https://gustavofior.com/ | homepage navbar, hero, footer; credits body |
| @gustavo-fior / Gustavo Fior (@gustavo-fior) | https://github.com/gustavo-fior | homepage navbar, hero, story footer, footer; credits body |
| @heyimgustavo | https://x.com/heyimgustavo | homepage hero; credits body |
| Abdul Haidar | https://www.linkedin.com/in/abdulhdr/ | homepage navbar, hero, story footer, footer; credits body |
| Foglamp Labs | https://foglamp.dev/ | homepage navbar, hero, footer; credits body |
| foglamp-labs/foglamp / Foglamp / Foglamp repository | https://github.com/foglamp-labs/foglamp | homepage hero and footer, explicit mobile navbar; credits body |
| Foglamp Labs (foglamp-labs/foglamp) | https://github.com/foglamp-labs/foglamp | story workbench footer |

Desktop navbar additionally exposed a `Foglamp on GitHub` button; source inspection showed its default href as `https://github.com/foglamp-labs/foglamp`. The source inspection also confirmed the desktop and mobile navbar attribution variants and the footer links. The story footer was checked against the Wave 5 creator/repository requirement; it did not expose separate Gustavo website or Foglamp Labs website links.

Accessibility snapshots establish rendered, non-hidden elements, including elements below the viewport; they do not establish simultaneous in-viewport visibility or visual contrast. Desktop viewport dimensions and initial resolved theme were not recorded. The raw snapshot output was emitted to the tool transcript and not retained in a local file; this report and the accompanying structured record transcribe those observations rather than presenting a fresh snapshot.
