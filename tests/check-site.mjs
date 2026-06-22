import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

const pages = [
  ["home", "src/pages/index.astro", "https://crossthewall.org/test-platform/"],
  ["scenarios", "src/pages/scenarios/index.astro", "https://crossthewall.org/test-platform/scenarios/"],
  ["architecture", "src/pages/architecture/index.astro", "https://crossthewall.org/test-platform/architecture/"],
  ["docs", "src/pages/docs/index.astro", "https://crossthewall.org/test-platform/docs/"],
  ["changelog", "src/pages/changelog/index.astro", "https://crossthewall.org/test-platform/changelog/"]
];

const requiredFiles = [
  "src/layouts/ProductLayout.astro",
  "src/styles/global.css",
  "public/sitemap.xml",
  "public/robots.txt",
  "public/og-image.svg",
  "public/assets/screenshots/README.md",
  ".github/workflows/deploy-pages.yml",
  "README.md",
  "docs/content-strategy.md"
];

for (const file of requiredFiles) {
  assert.ok(exists(file), `${file} should exist`);
}

const allPublicSource = [
  ...pages.map(([, file]) => read(file)),
  read("src/layouts/ProductLayout.astro"),
  read("README.md"),
  read("docs/content-strategy.md"),
  read("public/assets/screenshots/README.md")
].join("\n");

const forbiddenTerms = [
  "ZSB101A",
  "ZM24",
  "apiyh.zlg.com",
  "sf.zlg.com",
  "VID/PID",
  "S407IG"
];

for (const term of forbiddenTerms) {
  assert.ok(!allPublicSource.includes(term), `public site should not expose sensitive term: ${term}`);
}

const titles = new Set();
const descriptions = new Set();

for (const [name, file] of pages) {
  const source = read(file);
  const titleMatch = source.match(/const title = "([^"]+)"/);
  const descriptionMatch = source.match(/const description = "([^"]+)"/);
  assert.ok(titleMatch, `${name} should declare title`);
  assert.ok(descriptionMatch, `${name} should declare description`);
  assert.ok(!titles.has(titleMatch[1]), `${name} title should be unique`);
  assert.ok(!descriptions.has(descriptionMatch[1]), `${name} description should be unique`);
  titles.add(titleMatch[1]);
  descriptions.add(descriptionMatch[1]);
  assert.equal((source.match(/<h1\b/g) ?? []).length, 1, `${name} should have one H1`);
}

const home = read("src/pages/index.astro");
const homeDescription = home.match(/const description = "([^"]+)"/)[1];
const homeDescriptionLength = Array.from(homeDescription).length;
assert.ok(
  homeDescriptionLength >= 120 && homeDescriptionLength <= 160,
  `home meta description should be 120-160 characters, got ${homeDescriptionLength}`
);

const requiredHomeSections = [
  "Engineering Preview",
  "TestPlatform Core",
  "运行态",
  "配置态",
  "Trace Log",
  "DEMO_FCT_BUNDLE.yaml",
  "一次测试如何完成",
  "Operator Mode",
  "Result States",
  "Engineer Mode",
  "Product Bundle",
  "测试执行流程",
  "典型应用场景",
  "核心能力清单",
  "三类用户入口",
  "兼容性与交付边界",
  "文档和技术资源",
  "FAQ",
  "联系/演示申请"
];

for (const section of requiredHomeSections) {
  assert.ok(home.includes(section), `home should include section marker: ${section}`);
}

const keywords = [
  "通用测试平台",
  "自动化测试平台",
  "产线测试软件",
  "电子产品测试",
  "Python PyQt 测试平台",
  "多工位测试",
  "插件化测试系统",
  "MES 对接",
  "测试数据追溯",
  "OpenHTF",
  "OpenTAP"
];

for (const keyword of keywords) {
  assert.ok(allPublicSource.includes(keyword), `site should include keyword: ${keyword}`);
}

const architecture = read("src/pages/architecture/index.astro");
assert.ok((architecture.match(/<svg\b/g) ?? []).length >= 2, "architecture page should include at least two SVG diagrams");
for (const phrase of [
  "Product Bundle",
  "Runtime",
  "Validation Engine",
  "Step Plugins",
  "Resource Plugins",
  "Listener Plugins",
  "当前支持与不支持范围"
]) {
  assert.ok(architecture.includes(phrase), `architecture page should include: ${phrase}`);
}

const docs = read("src/pages/docs/index.astro");
for (const phrase of ["开始使用", "产品配置", "扩展开发", "运行与维护", "更新时间：2026-06-20", "适用版本：待确认"]) {
  assert.ok(docs.includes(phrase), `docs page should include: ${phrase}`);
}

const screenshotGuide = read("public/assets/screenshots/README.md");
for (const phrase of ["desensitized", "customer names", "real device addresses", "tokens", "serial numbers"]) {
  assert.ok(screenshotGuide.includes(phrase), `screenshot guide should include: ${phrase}`);
}

const sitemap = read("public/sitemap.xml");
for (const [, , url] of pages) {
  assert.ok(sitemap.includes(url), `sitemap should include ${url}`);
}

const robots = read("public/robots.txt");
assert.ok(robots.includes("Sitemap: https://crossthewall.org/test-platform/sitemap.xml"), "robots should point to sitemap");

const layout = read("src/layouts/ProductLayout.astro");
for (const nav of ["产品能力", "应用场景", "技术架构", "文档", "版本记录", "联系"]) {
  assert.ok(layout.includes(nav), `layout nav should include: ${nav}`);
}

const css = read("src/styles/global.css");
for (const rule of [
  "@media (max-width: 760px)",
  "scroll-snap-type",
  "grid-template-columns: 1fr",
  ".screenshot-placeholder",
  ".diagram",
  ".matrix-row",
  ".demo-shell",
  ".demo-switch",
  ".trace-body",
  ".deck-flow",
  ".result-state",
  ".mock-grid",
  "border-radius: 24px",
  "radial-gradient",
  "backdrop-filter"
]) {
  assert.ok(css.includes(rule), `CSS should include: ${rule}`);
}

const workflow = read(".github/workflows/deploy-pages.yml");
assert.ok(workflow.includes("actions/deploy-pages"), "workflow should deploy to GitHub Pages");

console.log("site checks passed");
