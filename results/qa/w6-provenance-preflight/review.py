#!/usr/bin/env python3
"""Produce auditable review decisions consumed by inventory.py."""
import hashlib, json, pathlib
HERE=pathlib.Path(__file__).resolve().parent
PLAN=HERE.parents[2]
ROOT=PLAN.parent/'foglamp-design-system'
SRC='packages/design-system/src/'
review={}
def add(path, classification, primary=None, secondary=(), evidence=''):
    review[SRC+path]={'classification':classification,'primary':primary,'secondary':list(secondary),'evidence':evidence}
dashboard=json.loads((PLAN/'results/qa/w5-apex-dashboard-reference/inventory.json').read_text())
for name,pair in dashboard['pairs'].items():
    target=pathlib.Path(pair['target']['path']).relative_to(ROOT).as_posix()
    source=pathlib.Path(pair['source']['path']).relative_to(ROOT/'.reference/foglamp').as_posix()
    review[target]={'classification':'modified','primary':source,'secondary':[],'evidence':f'W5 dashboard query-bound client inventory: {name}; corresponding source and target harness'}
add('blocks/dashboard/eval-chip-placeholders.tsx','modified','apps/web/src/app/(app)/evals/[id]/chip-placeholders.tsx',evidence='Identical exported function and JSX in pinned upstream; exact body comparison decides copied status.')
for path in ['blocks/app-shell/index.ts','blocks/auth/index.ts','blocks/dashboard/index.ts','blocks/guide/index.ts','blocks/marketing/chrome/index.ts','blocks/marketing/cta/index.ts','blocks/marketing/figures/index.ts','blocks/marketing/hero/index.ts','blocks/scan/index.ts','blocks/setup/index.ts','hud/index.ts','index.ts','widgets/foggy/index.ts']:
    add(path,'tailrocks-original',evidence='Integration export barrel assembling local extracted modules; no upstream counterpart at this integration boundary. Review imported modules separately.')
add('blocks/guide/css-modules.d.ts','tailrocks-original',evidence='Standalone ambient CSS module declaration for extraction build; no corresponding named upstream file.')
add('blocks/marketing/figures/figure-kit-22-block.tsx','tailrocks-original',evidence='New prop-driven composition of local FigureVariant; implementation calls imported component and does not inline source figure bodies.')
add('blocks/scan/favicon-context.tsx','tailrocks-original',evidence='New React context/provider injection adapter around local favicon resolver; not the upstream scan brand implementation.')
add('blocks/scan/scan.test.tsx','tailrocks-original',evidence='Standalone bun test fixture and render assertions for extracted scan components.')
scan=['apps/web/src/components/scan/'+n+'.tsx' for n in ['flow-map','scan-board','embed-board','personality-card','left-rail','changes-card','kinds','brand','share-bar','powered-by']]
add('blocks/scan/verify-source.ts','tailrocks-original',secondary=scan,evidence='New repository audit script reads these ten upstream components as test inputs; none is the source of the script body. W5 directory mapping is not a valid source-file mapping.')
add('lib/link-context.tsx','tailrocks-original',evidence='Integration-authored generic React provider and polymorphic link adapter, replacing host router coupling; no matching upstream integration file.')
add('widgets/foggy/types.ts','tailrocks-original',evidence='Standalone adapter message shape introduced for decoupling; upstream foggy-message uses AI SDK UIMessage rather than this definition.')
# TraceSpan is an explicit standalone shape adapted from a service-derived upstream type.
add('lib/types.ts','modified','apps/web/src/lib/trace-timeline.ts',('packages/api/src/services/traces.ts',),evidence='TraceSpan adapts the upstream trace-timeline RouterOutputs trace span; upstream traces service constructs returned fields. Manual field-level review remains necessary.')
# Manual review of low-similarity and multi-source heuristics. Shared symbols and
# structural correspondence support primary source, while changes are adapters.
reviewed = {
 'blocks/app-shell/app-shell-block.tsx': ('app-shell/app-shell.tsx', 'ShellBody, ProjectSwitcher and NavUser correspond; query and host data are replaced by supplied state.'),
 'blocks/app-shell/new-project-dialog.tsx': ('app-shell/new-project-dialog.tsx', 'NewProjectDialog form and project action adapted to callback.'),
 'blocks/app-shell/sunset-card.tsx': ('app-shell/sunset-card.tsx', 'SunsetCard hosted-service message and markup adapted to a serverUrl prop.'),
 'blocks/auth/device-approve.tsx': ('device-approve-client.tsx', 'DeviceShell and phase/claim/decision flow retained; callbacks replace request-bound operations.'),
 'blocks/auth/login-form.tsx': ('login-form.tsx', 'AuthMethods and password, magic-link, forgot-password forms retained; host actions replace auth calls.'),
 'blocks/auth/onboarding-panel.tsx': ('app-shell/onboarding-panel.tsx', 'OnboardingPanel prompt and copy flow retained; host action interface adapted.'),
 'blocks/marketing/chrome/navbar.tsx': ('marketing/navbar.tsx', 'MarketingNavbar, LINK_CLASS and scroll/key behavior retained with host links and attribution additions.'),
 'blocks/marketing/cta/agent-prompt.ts': ('lib/agent-prompt.ts', 'buildKeyedPrompt, buildLandingPrompt and instrumentationBody retained with decoupled endpoint configuration.'),
 'blocks/marketing/cta/ask-foggy.tsx': ('marketing/landing/ask-foggy.tsx', 'AskFoggy rendering and streaming state adapted to caller-supplied async request.'),
 'blocks/marketing/cta/compact-cta.tsx': ('marketing/landing/compact-cta.tsx', 'CompactCtaSection rendering retained with host-facing props.'),
 'blocks/marketing/figures/figure-picker.tsx': ('marketing/landing/figure-picker.tsx', 'CHOSEN variant picker retained with lazy host wrapper.'),
 'blocks/marketing/figures/figures.tsx': ('marketing/landing/figures.tsx', 'FIGURES section/variant catalog retained, with lazy component type adaptation.'),
 'blocks/marketing/hud-landing.tsx': ('hud/hud-landing.tsx', 'HudLanding motion, runStorm and simulator structure retained with injected demo stream.'),
 'hud/useHudStream.ts': ('sdk/hud/react/useHudStream.ts', 'ConnStatus, reducer/clear and useHudStream adapted from EventSource to injected local stream.'),
 'lib/utils.ts': ('ui/lib/utils.ts', 'Body is the same single cn re-export; competing candidates can also have this generic one-line body.'),
 'widgets/cost-breakdown.tsx': ('app-shell/cost-breakdown-card.tsx', 'CATEGORIES, chart bucket and view rendering retained with supplied row data.'),
 'widgets/leaf/sunset-card.tsx': ('app-shell/sunset-card.tsx', 'HOSTED_SERVER_URL, SHUTDOWN_DATE and SunsetCard retained with host server URL prop.'),
 'widgets/project-context.tsx': ('app-shell/project-context.tsx', 'Project, ProjectContext, ProjectProvider and useProject adapt query state to supplied/mock projects.'),
 'widgets/quota-card.tsx': ('app-shell/quota-card.tsx', 'QuotaCard and percentage/over-quota presentation adapted to host usage props.'),
 'widgets/tool-breakdown.tsx': ('app-shell/tool-breakdown-card.tsx', 'Tool card rows and ToolRowsSkeleton adapted to host data; ScrollFade is inlined and adapted from page-parts.'),
 'widgets/user-menu.tsx': ('user-menu.tsx', 'UserMenu presentation adapted to host session and sign-out props.'),
}
base='apps/web/src/components/'
for path,(short,evidence) in reviewed.items():
    if short.startswith('app-shell/'): primary=base+'app/'+short[len('app-shell/'):]
    elif short.startswith('marketing/'): primary=base+short
    elif short.startswith('lib/'): primary='apps/web/src/'+short
    elif short.startswith('hud/'): primary='apps/web/src/app/'+short
    elif short.startswith('sdk/'): primary='packages/'+short.replace('sdk/hud/', 'sdk/src/hud/', 1)
    elif short.startswith('ui/'): primary='packages/ui/src/'+short[len('ui/'):]
    else: primary=base+short
    secondary=['apps/web/src/components/app/page-parts.tsx'] if path=='widgets/tool-breakdown.tsx' else []
    add(path,'modified',primary,secondary,evidence)
for path, decision in review.items():
    decision['reviewed_file_sha256'] = hashlib.sha256((ROOT/path).read_bytes()).hexdigest()
(HERE/'review.json').write_text(json.dumps(review,indent=2)+'\n')
print(f'{len(review)} curated decisions')
