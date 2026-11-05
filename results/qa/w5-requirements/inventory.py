import json,re,pathlib,hashlib
P=pathlib.Path('/Users/donbeave/Projects/donbeave/foglamp-design-system-plan'); T=pathlib.Path('/Users/donbeave/Projects/donbeave/foglamp-design-system'); S=T/'packages/design-system/src'; ref=T/'.reference/foglamp'; barrel=(S/'index.ts').read_text(); pkg=json.loads((T/'packages/design-system/package.json').read_text()); matrix=(P/'COMPONENT-MATRIX.md').read_text(); out={'scope':'Static named artifact mapping; source-reference visual and behavioral parity are not established. Paths relative to target unless otherwise stated.','source_revision':'7d7e6609108019a74902858d4b07c24825c6318b'}
def rel(p):return str(p.relative_to(T))
def line(s,needle):
 for i,l in enumerate(s.splitlines(),1):
  if needle in l:return i
 return None
def pkgresolve(sub):
 exports=pkg['exports']; key='.' if not sub else './'+sub
 if key in exports: return exports[key]
 matches=[]
 for k,v in exports.items():
  if '*' in k:
   a,b=k.split('*',1)
   if key.startswith(a) and key.endswith(b):matches.append((len(a)+len(b),v.replace('*',key[len(a):len(key)-len(b) if b else None])))
 return max(matches,default=(0,None))[1]
def story_rows(cat):
 rows=[]
 for f in sorted((T/f'apps/docs/src/stories/{cat}').glob('*.story.tsx')):
  x=f.read_text(); slug=f.name.removesuffix('.story.tsx'); imports=[]
  for m in re.finditer(r'import\s+(?:type\s+)?([\s\S]*?)\s+from\s+[\'"](@foglamp/design-system(?:/[^\'"]*)?)[\'"]',x):
   clause=m.group(1).split(';')[-1].strip().removeprefix('import ').strip(); sub=m.group(2).removeprefix('@foglamp/design-system').lstrip('/'); resolved=pkgresolve(sub); target=(T/'packages/design-system'/resolved) if resolved else None
   imports.append({'symbols':clause,'package_import':m.group(2),'package_export_target':resolved,'target_exists':bool(target and target.exists())})
  rows.append({'name':slug,'story':rel(f),'docs':f'apps/docs/content/docs/{cat}/{slug}.mdx','docs_exists':(T/f'apps/docs/content/docs/{cat}/{slug}.mdx').exists(),'display_name':(re.search(r'displayName:\s*[\'"]([^\'"]+)',x) or [None,None])[1], 'imports':imports})
 return rows
for cat in ['primitives','widgets','charts','blocks','figures']:out[cat+'_stories']=story_rows(cat)
for row in out['primitives_stories']:
 n=row['name']; f=S/'ui'/f'{n}.tsx'; upstream=ref/'packages/ui/src/components'/f'{n}.tsx';row.update({'source':rel(upstream),'source_exists':upstream.exists(),'target':rel(f),'target_exists':f.exists(),'root_barrel_entry':f"./ui/{n}" in barrel})
logos=S/'icons/brand-logos.tsx'; s=logos.read_text(); out['brand_logos']=[{'name':m.group(1),'target':rel(logos),'line':s[:m.start()].count('\n')+1,'root_export':'export * from ./icons/brand-logos (see index.ts)'} for m in re.finditer(r'export function (\w+Logo)\(',s)]
fig=(S/'blocks/marketing/figures/figures.tsx').read_text();out['figure_registry']=[{'id':m.group(1),'component':m.group(2),'registry_line':fig[:m.start()].count('\n')+1,'component_root_export':bool(re.search(r'\b'+m.group(2)+r'\b',barrel))} for m in re.finditer(r'id: "([^"]+)"[^\n]+m\.(\w+)',fig)]
out['utility_requirements']={}; requirements={'lib/utils.ts':'cn','hooks/use-mobile.ts':'useIsMobile','hooks/use-copied.ts':'useCopied','hooks/use-app-hooks.ts':'useDelayedLoading useEntranceOnce useSkeletonShown useDebouncedValue useTextFilter useIsDark','lib/format.ts':'formatCost formatCostFixed formatCount formatExactCount formatTokens formatDuration formatSpanDuration formatPercent parseDateTime formatDateTime formatRelative formatDelta projectMonthlyCost','lib/range.ts':'RANGE_PRESETS resolvePreset defaultRange customRange exactRange formatRangeWindow formatRangeLabel','lib/trace-timeline.ts':'toMs orderSpans computeWindow','lib/payload-messages.ts':'toMessages fromHumanized unchangedPrefix extractMessages parseStructured','lib/prompts/diff.ts':'diffLines sequenceSimilarity','lib/prompts/normalize.ts':'normalizePrompt promptHash','lib/prompts/infer.ts':'inferVersions SLOT_LINE','lib/prompts/slots.ts':'slotValues','lib/scan/fold-graph.ts':'foldGraph','lib/scan/layout.ts':'getElk edgePath arrowHead labelAnchor','lib/scan/diff.ts':'diffScans','lib/scan/personality.ts':'scorePersonality','lib/link-context.tsx':'FoglampLink FoglampLinkProvider','lib/types.ts':'TraceSpan'}
for f,names in requirements.items():
 p=S/f; x=p.read_text() if p.exists() else '';out['utility_requirements'][f]=[{'name':n,'line':line(x,n),'export_declaration':bool(re.search(r'export\s+(?:(?:async|declare)\s+)?(?:function|const|class|type|interface)\s+'+re.escape(n)+r'\b',x)),'explicit_subpath':pkgresolve(f.rsplit('.',1)[0])} for n in names.split()]
out['exports']={'package_json':'packages/design-system/package.json','root_barrel':'packages/design-system/src/index.ts','map':pkg['exports'],'note':'Wildcard export mapping is checked against each story import. Root barrel text is separate; Node-only prompt normalize is deliberately a subpath.'}
header=[]
for f in S.rglob('*'):
 if f.suffix not in ('.ts','.tsx','.css'):continue
 x=f.read_text();
 for m in re.finditer(r'\.reference/foglamp/([\w./()\[\]-]+)',x[:1600]):
  source=ref/m.group(1).rstrip('.');header.append({'target':rel(f),'source':rel(source),'exists':source.exists(),'line':x[:m.start()].count('\n')+1})
out['provenance_reference_paths']=header
out['metadata']={'package':{k:pkg.get(k) for k in ('name','version','description','homepage','author','license','exports')},'license_exists':(T/'LICENSE').exists(),'notice_exists':(T/'NOTICE').exists(),'registry':'packages/registry/registry.json','credits':'CREDITS.md','readme':'README.md'}
out['reservation_contract']={'reporter':'packages/design-system/src/widgets/foggy/foggy-widget.tsx:269','provider':'packages/design-system/src/widgets/header-slot.tsx:64','calculation':'packages/design-system/src/widgets/header-slot.tsx:93: max(0, target - element.getBoundingClientRect().width)','consumer':'packages/design-system/src/widgets/data-table.tsx:313','decision':'packages/design-system/src/widgets/data-table.tsx:326,342: subtract pending shrink from available width; lift when required width + 2px exceeds available','required_runtime_proof':'With Foggy opening from closed near the fit threshold, verify toolbar trailing group lifts on the first frame before content shrink would wrap it; verify no anticipatory lift during panel growth of content when closing. No scroll-specific contract found.'}
out['limits']=['Widget requirement says 49 but provides no enumerated canonical list; all 53 actual stories with imports are mapped, avoiding a fabricated 49-name partition.','Story import paths, target existence and docs existence are static checks, not proof of named symbol resolution or visual fidelity.','Source-reference header paths recognized by literal .reference/foglamp references only; other attribution header formats need separate inspection.','Root barrel membership for wildcard exports cannot be inferred solely from text; static map and prior successful typecheck support but do not independently prove every symbol.']
(P/'results/qa/w5-requirements/named-inventory.json').write_text(json.dumps(out,indent=2)+'\n')
print({k:len(out[k]) for k in ['primitives_stories','widgets_stories','charts_stories','blocks_stories','figures_stories','brand_logos','figure_registry','provenance_reference_paths']})
print('missing story imports',[(k,r['name'],i['package_import'],i['package_export_target']) for k in ['primitives_stories','widgets_stories','charts_stories','blocks_stories','figures_stories'] for r in out[k] for i in r['imports'] if not i['target_exists']])
print('missing utilities',[(f,i['name']) for f,rs in out['utility_requirements'].items() for i in rs if i['line'] is None])
print('missing provenance',[(r['target'],r['source']) for r in out['provenance_reference_paths'] if not r['exists']])
# Named root block exports, excluding AppCodeBlock, JsonBlock and MarketingCodeBlock helpers.
canonical='AgentDetailInspectorBlock AppShellBlock ButtonsBadgesPlaygroundBlock CuttingMatFooterBlock DeviceApproveBlock DriftingFogCtaBlock EmbedBoardBlock EvalDetailBlock FigureKit22Block FlowMapBlock Hero3DDemoBlock HudSimulatorBlock InstrumentEmptyStateBlock LoginFormBlock ObservabilityGuideBlock OnboardingPanelBlock OriginalAuthorsBlock OverviewDashboardBlock ScanBoardBlock ScanLandingBlock SessionConversationInspectorBlock SetupBoardBlock TraceWaterfallInspectorBlock TracesExplorerBlock WorkflowDetailBlock'.split()
def kebab(s):return re.sub(r'(?<!^)(?=[A-Z])','-',s).lower().replace('3-d','3d').replace('22-block','22-block')
out['canonical_blocks']=[]
for name in canonical:
 hits=[]
 for f in (S/'blocks').rglob('*.ts*'):
  x=f.read_text()
  for i,l in enumerate(x.splitlines(),1):
   if re.search(r'\b'+name+r'\b',l) and ('export ' in l or ' as '+name in l):hits.append({'path':rel(f),'line':i,'declaration':l.strip()[:240]})
 slug=kebab(name); slug=slug.replace('3-d','3d');story=T/f'apps/docs/src/stories/blocks/{slug}.story.tsx'
 out['canonical_blocks'].append({'name':name,'declarations':hits,'story':rel(story),'story_exists':story.exists(),'docs_exists':(T/f'apps/docs/content/docs/blocks/{slug}.mdx').exists(),'root_runtime_export':'observed via bun root barrel import'})
out['utility_source_discrepancies']=[{'names':['useIsDark'],'source':'apps/web/src/components/app/hooks.ts','finding':'Not present in pinned upstream or target; target exports five named source hooks.'},{'names':['extractMessages','parseStructured'],'source':'apps/web/src/components/app/payload-messages.ts','finding':'Not present in pinned upstream or target; upstream exports toMessages, fromHumanized, unchangedPrefix, partFrom and partsFrom.'},{'names':['scorePersonality'],'source':'apps/web/src/components/scan/personality.ts','finding':'Not present in pinned upstream or target; both export derivePersonality.'}]
# Inventory exposed callback and default declarations in decoupled surfaces with precise line references.
paths=['widgets/project-context.tsx','widgets/quota-card.tsx','widgets/user-menu.tsx','widgets/range-context.tsx','widgets/cost-breakdown.tsx','widgets/tool-breakdown.tsx','widgets/data-table.tsx','widgets/foggy/foggy-widget.tsx','widgets/dev-toolbar.tsx','hud/FoglampHUD.tsx','blocks/app-shell/app-shell-block.tsx','blocks/dashboard','blocks/scan','blocks/setup']
out['interfaces_defaults_callbacks']={}
for path in paths:
 p=S/path;files=sorted(p.rglob('*.tsx')) if p.is_dir() else [p]
 for f in files:
  if not f.exists():continue
  hits=[]
  for i,l in enumerate(f.read_text().splitlines(),1):
   if re.search(r'\b(?:on[A-Z]\w*\??\s*[:=]|(?:MOCK|DEFAULT)_[A-Z_]+|export (?:type|interface) \w*Props\b)',l):hits.append({'line':i,'text':l.strip()[:240]})
  if hits:out['interfaces_defaults_callbacks'][rel(f)]=hits
out['charts_source_mapping']=[]
for row in out['charts_stories']:
 name=row['name']; sub=('charts/' if name in ('area-chart','bar-chart','line-chart','donut-chart') else 'ui/')+name+'.tsx'; target=S/'charts/evilcharts'/sub;source=ref/'apps/web/src/components/evilcharts'/sub
 out['charts_source_mapping'].append({'name':name,'target':rel(target),'target_exists':target.exists(),'source':rel(source),'source_exists':source.exists(),'story':row['story'],'docs':row['docs']})
# Record authored source utilities as well as listed matrix names.
out['actual_additional_utility']='derivePersonality: packages/design-system/src/lib/scan/personality.ts; source exports the same name.'
(P/'results/qa/w5-requirements/named-inventory.json').write_text(json.dumps(out,indent=2)+'\n')
print('canonical blocks missing declarations or stories',[(r['name'],r['story_exists'],len(r['declarations'])) for r in out['canonical_blocks'] if not r['story_exists'] or not r['declarations']])
print('chart source lookup misses',[(r['name'],r['source']) for r in out['charts_source_mapping'] if not r['source_exists']])
for r in out['canonical_blocks']:
 slug={'FigureKit22Block':'figure-kit-22-block','Hero3DDemoBlock':'hero-3d-demo-block'}.get(r['name'])
 if slug:r.update(story=f'apps/docs/src/stories/blocks/{slug}.story.tsx',story_exists=(T/f'apps/docs/src/stories/blocks/{slug}.story.tsx').exists(),docs_exists=(T/f'apps/docs/content/docs/blocks/{slug}.mdx').exists())
def without_added_header(x):return re.sub(r'/\* Original design and implementation by Gustavo Fior \(@gustavo-fior\), with co-founder Abdul Haidar at Foglamp Labs\.\n \* Extracted from \.reference/foglamp/[^\n]+\n \*/\n','',x,count=1)
out['source_body_comparisons']=[]
for source,target,normalization in [('apps/web/src/components/app/hooks.ts','hooks/use-app-hooks.ts',None),('apps/web/src/components/app/payload-messages.ts','lib/payload-messages.ts',None),('apps/web/src/components/scan/personality.ts','lib/scan/personality.ts',('"./scan"','"@foglamp/contracts/scan"'))]:
 a=(ref/source).read_text(); b=without_added_header((S/target).read_text());
 if normalization:b=b.replace(*normalization)
 out['source_body_comparisons'].append({'source':rel(ref/source),'target':rel(S/target),'equal_after_attribution_header_and_stated_import_adapter':a==b,'normalization':normalization})
up=(ref/'apps/web/src/components/brand-logos.tsx').read_text();upnames=re.findall(r'export function (\w+Logo)\(',up);out['brand_logos_source_comparison']={'source':rel(ref/'apps/web/src/components/brand-logos.tsx'),'source_members':upnames,'target_members':[x['name'] for x in out['brand_logos']],'members_equal_in_order':upnames==[x['name'] for x in out['brand_logos']]}
for sec in ['costs','traces','quality']:
 block=re.search(r'\b'+sec+r': \[([\s\S]*?)\n  \]',fig).group(1)
 for m in re.finditer(r'id: "([^"]+)"[^\n]+m\.(\w+)',block):
  slug=sec+'-'+m.group(1)
  for row in out['figure_registry']:
   if row['id']==m.group(1) and row['component']==m.group(2):row.update(section=sec,story=f'apps/docs/src/stories/figures/{slug}.story.tsx',story_exists=(T/f'apps/docs/src/stories/figures/{slug}.story.tsx').exists(),docs_exists=(T/f'apps/docs/content/docs/figures/{slug}.mdx').exists())
# Presence of required attribution names is not a visibility or semantic review.
surfaces=['README.md','CREDITS.md','apps/docs/src/routes/index.tsx','apps/docs/src/components/story-panel.tsx','apps/docs/content/docs/credits.mdx','apps/docs/content/docs/index.mdx','packages/design-system/package.json','packages/registry/registry.json']
out['attribution_presence']={}
for f in surfaces:
 p=T/f; x=p.read_text() if p.exists() else '';out['attribution_presence'][f]={'exists':p.exists(),'Gustavo Fior':'Gustavo Fior' in x,'Abdul Haidar':'Abdul Haidar' in x,'Foglamp Labs':'Foglamp Labs' in x,'note':'Some surfaces delegate visible attribution to imported component or linked page; literal text absence is not itself a failure.'}
out['source_plan_reconciliation']={'primitives':'Matrix Batch 3A lists 49 source file names although prose says 48; together with seven named custom component .tsx files = 56. button-styles.ts is a separate support file.','blocks':'Plan headline says 18; 25 explicitly named canonical block exports are each mapped above, plus MarketingNavbar as a 26th non-Block story.','widgets':'Plan states 49 without enumerating a canonical 49-member list. All 53 concrete stories are mapped with exports, rather than guessing which four are extras.'}
(P/'results/qa/w5-requirements/named-inventory.json').write_text(json.dumps(out,indent=2)+'\n')
print('body comparisons',out['source_body_comparisons']);print('logo source comparison',out['brand_logos_source_comparison']['members_equal_in_order']);print('figures missing story',[(r['section'],r['id']) for r in out['figure_registry'] if not r.get('story_exists')])
out['utility_requirements']['lib/utils.ts'][0]['export_declaration']=True
out['utility_requirements']['lib/utils.ts'][0]['note']='Re-exported from cn package; root barrel explicitly exports cn.'
for r in out['utility_requirements']['lib/scan/layout.ts']:
 if r['name']=='getElk':r['note']='Internal async function, also internal in pinned upstream; not promised as public export.'
out['attribution_presence'].update({})
for f in ['packages/design-system/src/blocks/marketing/original-authors-block.tsx','packages/design-system/src/blocks/marketing/chrome/navbar.tsx','packages/design-system/src/blocks/marketing/chrome/footer.tsx']:
 x=(T/f).read_text();out['attribution_presence'][f]={'exists':True,**{n:n in x for n in ['Gustavo Fior','Abdul Haidar','Foglamp Labs']},'note':'Literal presence only; visibility needs rendered review.'}
tasks=json.loads((P/'task-index.json').read_text())['tasks'];out['task_path_inventory']=[]
for task in tasks:
 paths=task.get('owned_paths',[]);out['task_path_inventory'].append({'id':task.get('task_id'), 'title':task.get('title'),'owned_paths':[{'path':p,'exists':(T/p).exists()} for p in paths], 'note':'Owned path presence is a locator, not acceptance or task completion proof.'})
out['limitations_current']=['Font metrics correction in progress; prior font byte comparisons and static report do not prove final font state.','Root import runtime check yielded all 25 canonical block names; no assertion of visual or behavioral parity.','Callback and default declaration inventory is a source locator; it does not assert every callback was exercised or every default is source-equivalent.']
(P/'results/qa/w5-requirements/named-inventory.json').write_text(json.dumps(out,indent=2)+'\n')
print('tasks',len(out['task_path_inventory']));print('body checks',[(r['target'],r['equal_after_attribution_header_and_stated_import_adapter']) for r in out['source_body_comparisons']])
