/* Example data; original UI by Gustavo Fior (@gustavo-fior), Abdul Haidar, Foglamp Labs. */
export const scanFixture = {
  version: 1,
  project: { name: 'Foglamp', slug: 'foglamp', tagline: 'AI observability, clearly mapped', iconDomain: 'foglamp.dev', date: '2026-11-05' },
  stats: { agents: 2, models: 2, tools: 2, integrations: 1 },
  topModels: [{ id: 'gpt-4o', label: 'GPT-4o', domain: 'openai.com' }, { id: 'claude-sonnet', label: 'Claude Sonnet', domain: 'anthropic.com' }],
  topTools: [{ id: 'search', label: 'Search', domain: 'exa.ai' }, { id: 'database', label: 'Database' }],
  topIntegrations: [{ id: 'slack', label: 'Slack', domain: 'slack.com' }],
  graph: {
    nodes: [
      { id: 'webhook', label: 'Incoming webhook', kind: 'entry' },
      { id: 'support', label: 'Support agent', kind: 'agent' },
      { id: 'openai', label: 'GPT-4o', kind: 'model', domain: 'openai.com' },
      { id: 'search', label: 'Search docs', kind: 'tool', domain: 'exa.ai' },
      { id: 'postgres', label: 'Conversation store', kind: 'store' },
      { id: 'slack', label: 'Slack', kind: 'external', domain: 'slack.com' },
    ],
    edges: [
      { from: 'webhook', to: 'support', kind: 'triggers' },
      { from: 'support', to: 'openai', kind: 'calls' },
      { from: 'openai', to: 'search', kind: 'calls' },
      { from: 'support', to: 'postgres', kind: 'writes' },
      { from: 'support', to: 'slack', kind: 'calls' },
    ],
  },
};

export const planFixture = {
  version: 1,
  sdk: { major: 5, version: '5.0.12' },
  hasReactUi: true,
  scan: scanFixture,
  calls: [{ id: 'call-support', fn: 'generateText', sourceRef: 'src/agents/support.ts:42', modelId: 'gpt-4o' }],
  decisions: {
    agents: [{ id: 'support-agent', name: 'Support agent', callIds: ['call-support'], oneOff: false, confidence: 'high', sourceRef: 'src/agents/support.ts:42', rationale: 'Handles incoming customer support requests.' }],
    workflows: [], sessions: [],
    customer: { recommended: false, confidence: 'high', rationale: 'This example serves a single workspace.' },
  },
};

