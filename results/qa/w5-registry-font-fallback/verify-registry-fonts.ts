import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { registryItemSchema, registrySchema } from "@shadcn/registry/schema";

const root = "/Users/donbeave/Projects/donbeave/foglamp-design-system";
const planning = "/Users/donbeave/Projects/donbeave/foglamp-design-system-plan/results/qa/w5-registry-font-fallback";
const registry = JSON.parse(await readFile(path.join(root, "packages/registry/registry.json"), "utf8"));
registrySchema.parse(registry);
const names = registry.items.map((item: { name: string }) => item.name);
const parsed: string[] = [];
for (const name of names) {
  const payload = JSON.parse(await readFile(path.join(root, "apps/docs/public/r", `${name}.json`), "utf8"));
  registryItemSchema.parse(payload);
  parsed.push(name);
}
const artifact = JSON.parse(await readFile(path.join(root, "apps/docs/public/r/style-globals.json"), "utf8"));
const artifactCss = artifact.files.find((file: { path: string }) => file.path.endsWith("font-setup.css")).content;
const installedCss = await readFile(path.join(planning, "fixture-final/src/components/foglamp/styles/font-setup.css"), "utf8");
const regular = await readFile(path.join(root, "packages/design-system/src/assets/InterVariable.woff2"));
const italic = await readFile(path.join(root, "packages/design-system/src/assets/InterVariable-Italic.woff2"));
const uriBytes = [...artifactCss.matchAll(/base64,([^\"]+)\"/g)].map((match) => Buffer.from(match[1], "base64"));
const hashes = (values: Buffer[]) => values.map((bytes) => createHash("sha256").update(bytes).digest("hex"));
const expectedMetrics = [
  'font-family: "Inter Fallback"; src: local("Arial"); ascent-override: 89.79%; descent-override: 22.36%; line-gap-override: 0.00%; size-adjust: 107.89%;',
  'font-family: "Geist Mono Fallback"; src: local("Arial"); ascent-override: 74.67%; descent-override: 21.92%; line-gap-override: 0.00%; size-adjust: 134.59%;',
  'font-family: "Host Grotesk Fallback"; src: local("Arial"); ascent-override: 96.69%; descent-override: 30.01%; line-gap-override: 0.00%; size-adjust: 104.98%;',
];
const checks = {
  rootSchema: true,
  itemSchemas: parsed.length === 289,
  itemCount: parsed.length,
  allPayloadNamesMatch: names.every((name, index) => parsed[index] === name),
  fontPayloadBytesMatch: uriBytes.length === 2 && uriBytes[0].equals(regular) && uriBytes[1].equals(italic),
  fontPayloadHashes: hashes(uriBytes),
  sourceFontHashes: hashes([regular, italic]),
  fallbackMetricsInRegistry: expectedMetrics.every((metric) => artifactCss.includes(metric)),
  fallbackMetricsInInstalledConsumer: expectedMetrics.every((metric) => installedCss.includes(metric)),
  requestedFontStacksInRegistry: artifactCss.includes('--font-sans: Inter, "Inter Fallback", sans-serif;') && artifactCss.includes('--font-geist-mono: "Geist Mono Variable", "Geist Mono Fallback", monospace;') && artifactCss.includes('--font-host-grotesk: "Host Grotesk Variable", "Host Grotesk Fallback", sans-serif;'),
  requestedFontStacksInInstalledConsumer: installedCss.includes('--font-sans: Inter, "Inter Fallback", sans-serif;') && installedCss.includes('--font-geist-mono: "Geist Mono Variable", "Geist Mono Fallback", monospace;') && installedCss.includes('--font-host-grotesk: "Host Grotesk Variable", "Host Grotesk Fallback", sans-serif;'),
  GeistAndHostImportsPreserved: artifactCss.includes('@import "@fontsource-variable/geist-mono";') && artifactCss.includes('@import "@fontsource-variable/host-grotesk";'),
};
if (Object.values(checks).some((value) => value === false)) throw new Error(JSON.stringify(checks, null, 2));
await Bun.write(path.join(planning, "logs/schema-font-validation.json"), JSON.stringify(checks, null, 2) + "\n");
console.log(JSON.stringify(checks, null, 2));
