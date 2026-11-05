import {pickBucketMs} from "/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/src/widgets/trend-charts";
export function defaultOverviewData(from: Date, to: Date) {
  const current = { totalTokens: 248910, inputTokens: 184400, outputTokens: 64510, totalCost: 12.84, passRate: 0.96, checkCount: 128, errorRate: 0.018, errorCount: 7, spanCount: 389 };
  const previous = { ...current, totalTokens: 201420, totalCost: 10.32, passRate: 0.94, errorRate: 0.025 };
  const step = pickBucketMs(to.getTime() - from.getTime());
  const start = Math.floor(from.getTime() / step) * step;
  const count = Math.min(1000, Math.max(0, Math.ceil((to.getTime() - start) / step)));
  const series = Array.from({ length: count }, (_, i) => { const wave = 0.5 + 0.5 * Math.sin(i / 2.6); const bucket = new Date(start + step * i).toISOString().slice(0, 19).replace("T", " "); return { bucket, latencyMs: { p50: 240 + wave * 180, p95: 520 + wave * 270, p99: 810 + wave * 380 }, spanCount: Math.round(12 + wave * 18), errorCount: i % 7 === 0 ? 1 : 0, totalTokens: Math.round(6000 + wave * 6000), totalCost: 0.3 + wave * 0.4 }; });
  return { current, previous, series, models: [{ modelId: "gpt-4o", totalCost: 8.12 }, { modelId: "claude-sonnet-4", totalCost: 4.72 }], costByModel: series.flatMap(row => [{ bucket: row.bucket, modelId: "gpt-4o", totalCost: (row.totalCost ?? 0) * 0.63 }, { bucket: row.bucket, modelId: "claude-sonnet-4", totalCost: (row.totalCost ?? 0) * 0.37 }]), agents: [{ agentName: "Support agent", totalCost: 7.24 }, { agentName: "Research agent", totalCost: 5.6 }], workflows: [{ workflowName: "Customer support", totalCost: 7.24 }, { workflowName: "Summarization", totalCost: 5.6 }], customers: [{ customerId: "customer_01", customerName: "Alex Morgan", customerImageUrl: null, totalCost: 8.2 }, { customerId: "customer_02", customerName: "Taylor Lee", customerImageUrl: null, totalCost: 4.64 }], alerts: [], hasReceivedTraces: true };
}
