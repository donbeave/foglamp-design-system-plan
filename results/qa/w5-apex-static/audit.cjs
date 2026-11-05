const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const os = require('node:os');
const childProcess = require('node:child_process');
const ts = require('/Users/donbeave/Projects/donbeave/foglamp-design-system/node_modules/.bun/typescript@5.9.3/node_modules/typescript');
const root = '/Users/donbeave/Projects/donbeave/foglamp-design-system';
const ref = path.join(root, '.reference/foglamp');
const inventory = JSON.parse(fs.readFileSync(path.join(__dirname, '../w5-requirements/named-inventory.json'), 'utf8'));
const pairs = new Map();
function walk(v) { if (!v || typeof v !== 'object') return; if (typeof v.source === 'string' && typeof v.target === 'string' && v.target.startsWith('packages/design-system/')) pairs.set(v.target, v.source); for (const x of Object.values(v)) walk(x); }
walk(inventory);
const apexMap=JSON.parse(fs.readFileSync(path.join(__dirname,'../w5-apex/harness/source-map.json'),'utf8'));
for(const [absTarget,absSource] of Object.entries(apexMap)){const t=path.relative(root,absTarget);if(t.startsWith('packages/design-system/'))pairs.set(t,path.relative(root,absSource));}
// Explicit aliases for the remaining high-value source modules called out by W5-5.2.
const extra = {
 'packages/design-system/src/lib/format.ts':'apps/web/src/lib/format.ts',
 'packages/design-system/src/lib/range.ts':'apps/web/src/lib/range.ts',
 'packages/design-system/src/lib/trace-timeline.ts':'apps/web/src/components/app/trace-timeline.ts',
 'packages/design-system/src/lib/scan/layout.ts':'apps/web/src/components/scan/layout.ts',
 'packages/design-system/src/lib/scan/fold-graph.ts':'apps/web/src/components/scan/fold-graph.ts',
 'packages/design-system/src/lib/scan/diff.ts':'apps/web/src/components/scan/diff.ts',
 'packages/design-system/src/lib/scan/favicon.ts':'apps/web/src/components/scan/favicon.ts',
 'packages/design-system/src/lib/scan/personality.ts':'apps/web/src/components/scan/personality.ts',
 'packages/design-system/src/hooks/use-app-hooks.ts':'apps/web/src/components/app/hooks.ts',
 'packages/design-system/src/lib/payload-messages.ts':'apps/web/src/components/app/payload-messages.ts',
 'packages/design-system/src/styles/globals.css':'packages/ui/src/styles/globals.css',
 'packages/design-system/src/styles/effects.css':'apps/web/src/index.css',
 'packages/design-system/src/ui/button-styles.ts':'apps/web/src/components/app/button-styles.ts'
};
for (const [t,s] of Object.entries(extra)) if (!pairs.has(t)) pairs.set(t, `.reference/foglamp/${s}`);
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
function jsBody(file) {
 const input = fs.readFileSync(file, 'utf8');
 const out = ts.transpileModule(input, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.Preserve, importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove, removeComments: true } }).outputText;
 return out.replace(/\r\n/g,'\n').trim();
}
function withoutImports(s) { return s.split('\n').filter(l => !/^import\b/.test(l) && !/^export \{.*\} from /.test(l)).join('\n').trim(); }
function normalizePlatformAdapters(s){return s.replace(/(<\/?)FoglampLink(?=[\s/>])/g,'$1Link').replace(/<img(?=[\s/>])/g,'<Image');}
function locate(file,values){const lines=fs.readFileSync(file,'utf8').split(/\r?\n/);return values.map(value=>({value,line:lines.findIndex(l=>l.includes(value))+1}));}
function importBindings(file) { const sf=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX); return sf.statements.filter(ts.isImportDeclaration).map(d=>({bindings:d.importClause?.isTypeOnly?null:(d.importClause?.name?.text||null),typeOnly:!!d.importClause?.isTypeOnly,named:d.importClause?.namedBindings&&ts.isNamedImports(d.importClause.namedBindings)?d.importClause.namedBindings.elements.map(e=>[e.propertyName?.text||e.name.text,e.name.text,e.isTypeOnly]).sort():null,namespace:d.importClause?.namedBindings&&ts.isNamespaceImport(d.importClause.namedBindings)?d.importClause.namedBindings.name.text:null,sideEffect:!d.importClause,module:d.moduleSpecifier.text})).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))); }
function localImportBindings(imports){return imports.flatMap(x=>[x.bindings,...(x.named||[]).filter(y=>!y[2]).map(y=>y[1]),x.namespace].filter(Boolean)).sort();}
function literalBag(file){const source=fs.readFileSync(file,'utf8'),sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),bag=new Map();function add(k,v){const key=JSON.stringify([k,v]);bag.set(key,(bag.get(key)||0)+1)}function visit(n,inImport=false){if(ts.isImportDeclaration(n))return;if(ts.isStringLiteral(n))add('string',n.text);else if(ts.isNoSubstitutionTemplateLiteral(n))add('template',n.text);else if(ts.isNumericLiteral(n))add('number',n.text);else if(n.kind===ts.SyntaxKind.TrueKeyword||n.kind===ts.SyntaxKind.FalseKeyword)add('boolean',n.getText(sf));ts.forEachChild(n,c=>visit(c,inImport))}visit(sf);return bag;}
function classBag(file){const sf=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),bag=new Map();function add(v){const k=JSON.stringify(v);bag.set(k,(bag.get(k)||0)+1)}function visit(n){if(ts.isJsxAttribute(n)&&['className','class'].includes(n.name.getText(sf))&&n.initializer){function vals(q){if(ts.isStringLiteral(q)||ts.isNoSubstitutionTemplateLiteral(q))add(q.text);ts.forEachChild(q,vals)}vals(n.initializer)}ts.forEachChild(n,visit)}visit(sf);return bag;}
const results=[];
const diffDir=path.join(__dirname,'diffs');fs.mkdirSync(diffDir,{recursive:true});
for (const [t,s] of [...pairs].sort(([a],[b])=>a.localeCompare(b))) {
 const tf=path.join(root,t), sf=s.startsWith('.reference/')?path.join(root,s):path.join(ref,s);
 if (!fs.existsSync(tf)||!fs.existsSync(sf)||!fs.statSync(tf).isFile()||!fs.statSync(sf).isFile()) { results.push({target:t,source:s,status:'missing_or_directory',classification:'invalid_or_stale_source_mapping',target_exists:fs.existsSync(tf)&&fs.statSync(tf).isFile(),source_exists:fs.existsSync(sf)&&fs.statSync(sf).isFile()}); continue; }
 if (!/\.(tsx?|jsx?)$/.test(tf)) { results.push({target:t,source:s,status:'non_ts_pair',classification:'non_ts_pair_requires_file_specific_review',target_sha256:sha(fs.readFileSync(tf)),source_sha256:sha(fs.readFileSync(sf))}); continue; }
 const a=jsBody(tf), b=jsBody(sf), ai=withoutImports(a), bi=withoutImports(b);
 const it=importBindings(tf), is=importBindings(sf), bindingSig=z=>z.map(({module,...rest})=>rest), namesEqual=JSON.stringify(bindingSig(it))===JSON.stringify(bindingSig(is)),localBindingsEqual=JSON.stringify(localImportBindings(it))===JSON.stringify(localImportBindings(is)); const lt=literalBag(tf),ls=literalBag(sf),ct=classBag(tf),cs=classBag(sf),classAdded=[],classRemoved=[];for(const [k,n] of ct){const d=n-(cs.get(k)||0);for(let j=0;j<Math.max(0,d);j++)classAdded.push(JSON.parse(k));}for(const [k,n] of cs){const d=n-(ct.get(k)||0);for(let j=0;j<Math.max(0,d);j++)classRemoved.push(JSON.parse(k));}const added=[],removed=[];for(const [k,n] of lt){const delta=n-(ls.get(k)||0);for(let j=0;j<Math.max(0,delta);j++)added.push(JSON.parse(k));}for(const [k,n] of ls){const delta=n-(lt.get(k)||0);for(let j=0;j<Math.max(0,delta);j++)removed.push(JSON.parse(k));} const platformAdapterEqual=normalizePlatformAdapters(ai)===normalizePlatformAdapters(bi); const status=a===b?'exact_after_type_erasure_and_comment_removal':ai===bi?(namesEqual?'approved_import_path_adapter':localBindingsEqual?'approved_import_symbol_adapter':'unexplained_import_binding_difference'):platformAdapterEqual?'approved_platform_runtime_adapter':'unexplained_body_difference';
 let bodyDiffFile=null;if(ai!==bi){const temp=fs.mkdtempSync(path.join(os.tmpdir(),'foglamp-ast-diff-')),sourceTmp=path.join(temp,'source.js'),targetTmp=path.join(temp,'target.js');fs.writeFileSync(sourceTmp,bi+'\n');fs.writeFileSync(targetTmp,ai+'\n');let diffText='';try{diffText=childProcess.execFileSync('diff',['-U3',sourceTmp,targetTmp],{encoding:'utf8',maxBuffer:10*1024*1024});}catch(err){diffText=err.stdout||'';}fs.rmSync(temp,{recursive:true,force:true});const rel='diffs/'+t.replaceAll('/','__')+'.diff';bodyDiffFile=rel;const safeDiff=diffText.replaceAll(sourceTmp,s).replaceAll(targetTmp,t);fs.writeFileSync(path.join(__dirname,rel),safeDiff);} const firstDiff=[]; if(ai!==bi){const aa=ai.split('\n'),bb=bi.split('\n');let n=0;for(let i=0;i<Math.max(aa.length,bb.length)&&n<6;i++)if(aa[i]!==bb[i]){firstDiff.push({line:i+1,target:aa[i]??null,source:bb[i]??null});n++;}}
 const classification=status==='unexplained_body_difference'?((classAdded.length||classRemoved.length)?'unexplained_visual_class_literal_delta':((added.length||removed.length)?'unexplained_runtime_text_numeric_or_api_literal_delta':'unexplained_structure_or_identifier_delta')):status==='unexplained_import_binding_difference'?'unexplained_import_symbol_or_binding_delta':status==='approved_platform_runtime_adapter'?'approved_platform_runtime_adapter':status==='non_ts_pair'?'non_ts_pair_requires_file_specific_review':status==='missing_or_directory'?'invalid_or_stale_source_mapping':status;
 results.push({target:t,source:s,status,classification,target_body_sha256:sha(a),source_body_sha256:sha(b),body_equal:a===b,non_import_body_equal:ai===bi,body_diff_file:bodyDiffFile,import_bindings_equal:namesEqual,local_import_bindings_equal:localBindingsEqual,changed_literal_counts:{target_added:added.length,source_only:removed.length},changed_class_literal_counts:{target_added:classAdded.length,source_only:classRemoved.length},changed_class_literals:{target_added:classAdded.slice(0,100),source_only:classRemoved.slice(0,100)},changed_class_locations:{target:locate(tf,classAdded),source:locate(sf,classRemoved)},changed_literals:{target_added:added.slice(0,100),source_only:removed.slice(0,100)},...(firstDiff.length?{first_non_import_differences:firstDiff}:{}),imports_target:[...a.matchAll(/^import .*$/gm)].map(m=>m[0]),imports_source:[...b.matchAll(/^import .*$/gm)].map(m=>m[0])});
}
function shadowDeclarations(file) { const text=fs.readFileSync(file,'utf8'); const blocks=[...text.matchAll(/(:root|\.dark)\s*\{([^}]*)\}/g)]; return Object.fromEntries(blocks.map(([,sel,body])=>[sel,Object.fromEntries([...body.matchAll(/(--custom-(?:shadow[^:;]*|outline-shadow))\s*:\s*([^;]+);/g)].map(([,k,v])=>[k.trim(),v.trim()]))])); }
const cssTarget=path.join(root,'packages/design-system/src/styles/globals.css'), cssSource=path.join(ref,'packages/ui/src/styles/globals.css');
let shadows={target:shadowDeclarations(cssTarget),source:shadowDeclarations(cssSource)};
const shadowDiff=[]; for(const mode of [':root','.dark']) { const x=shadows.target[mode]||{}, y=shadows.source[mode]||{}; for(const k of [...new Set([...Object.keys(x),...Object.keys(y)])]) if(x[k]!==y[k]) shadowDiff.push({mode,token:k,target:x[k]??null,source:y[k]??null}); }
const summary={generated_at:new Date().toISOString(),source_revision:inventory.source_revision,target_head:require('node:child_process').execFileSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),method:'TypeScript 5.9.3 transpileModule erases TS-only syntax and comments, preserves JSX and runtime code, then hashes emitted JS. Exact bodies include imports; import-only differences are separated. No whitespace/class/literal/logic normalization.',apex_source_map_entries:Object.keys(apexMap).length,mapped_pairs:results.length,status_counts:results.reduce((o,x)=>(o[x.status]=(o[x.status]||0)+1,o),{}),classification_counts:results.reduce((o,x)=>(o[x.classification]=(o[x.classification]||0)+1,o),{}),shadow_declarations:{target:Object.fromEntries(Object.entries(shadows.target).map(([k,v])=>[k,Object.keys(v).length])),source:Object.fromEntries(Object.entries(shadows.source).map(([k,v])=>[k,Object.keys(v).length])),diffs:shadowDiff},results};
fs.writeFileSync(path.join(__dirname,'full-report.json'),JSON.stringify(summary,null,2)+'\n');
const unmapped=JSON.parse(fs.readFileSync(path.join(__dirname,'../w5-apex/harness/unmapped.json'),'utf8')); const concise={...summary,results:undefined,unmapped_target_paths:unmapped,not_proven:['Runtime behavior/rendering and browser pixel parity are not proven by static AST comparison.','Non-TS/CSS mappings are hashed or declaration-compared, not semantically parsed.','Only mapped source/target pairs are adjudicated; target-authored wrappers and portal files require separate visual QA.']};
fs.writeFileSync(path.join(__dirname,'summary.json'),JSON.stringify(concise,null,2)+'\n');
console.log(JSON.stringify({mapped_pairs:summary.mapped_pairs,status_counts:summary.status_counts,shadow_declarations:summary.shadow_declarations},null,2));
