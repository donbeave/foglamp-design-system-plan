#!/usr/bin/env python3
"""Record original dashboard inputs and direct backend boundaries, without modifying them."""
import hashlib
import json
import re
import subprocess
from pathlib import Path

target = Path('/Users/donbeave/Projects/donbeave/foglamp-design-system')
upstream = target / '.reference/foglamp'
web = upstream / 'apps/web/src'
blocks = target / 'packages/design-system/src/blocks'
pairs = {
    'overview': ('app/(app)/overview/overview-client.tsx', 'dashboard/overview-dashboard-block.tsx'),
    'traces': ('app/(app)/traces/traces-client.tsx', 'dashboard/traces-explorer-block.tsx'),
    'trace': ('app/(app)/traces/[traceId]/trace-detail-client.tsx', 'dashboard/trace-waterfall-inspector-block.tsx'),
    'agent': ('app/(app)/agents/[name]/agent-detail-client.tsx', 'dashboard/agent-detail-inspector-block.tsx'),
    'workflow': ('app/(app)/workflows/[name]/workflow-detail-client.tsx', 'dashboard/workflow-detail-block.tsx'),
    'session': ('app/(app)/sessions/[sessionId]/session-detail-client.tsx', 'dashboard/session-conversation-inspector-block.tsx'),
    'eval': ('app/(app)/evals/[id]/eval-detail-client.tsx', 'dashboard/eval-detail-block.tsx'),
    'shell': ('components/app/app-shell.tsx', 'app-shell/app-shell-block.tsx'),
}

def describe(path):
    data = path.read_bytes()
    return {'path': str(path), 'sha256': hashlib.sha256(data).hexdigest()}

result = {'upstream_head': subprocess.check_output(['git', '-C', str(upstream), 'rev-parse', 'HEAD'], text=True).strip(), 'pairs': {}}
for name, (src, dst) in pairs.items():
    source, dest = web / src, blocks / dst
    code = source.read_text()
    calls = []
    for match in re.finditer(r'\btrpc\.([\w.]+)\.(queryOptions|mutationOptions|queryKey)\s*\(', code):
        calls.append({'endpoint': match.group(1), 'operation': match.group(2), 'line': code.count('\n', 0, match.start()) + 1})
    result['pairs'][name] = {'source': describe(source), 'target': describe(dest), 'direct_trpc_calls': calls,
                             'light': 'unverified', 'dark': 'unverified', 'states': 'unverified'}
Path(__file__).with_name('inventory.json').write_text(json.dumps(result, indent=2) + '\n')
