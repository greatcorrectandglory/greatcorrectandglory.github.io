import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const requiredFiles = [
  "src/pages/index.astro",
  "src/styles/global.css",
  "public/sitemap.xml",
  "public/robots.txt",
  ".github/workflows/deploy-pages.yml",
  "README.md",
  "docs/content-strategy.md"
];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist`);
}

const index = read("src/pages/index.astro");
const descriptionMatch = index.match(/const description = "([^"]+)"/);
assert.ok(descriptionMatch, "index should declare a reusable meta description");
const descriptionLength = Array.from(descriptionMatch[1]).length;
assert.ok(
  descriptionLength >= 120 && descriptionLength <= 160,
  `meta description should be 120-160 characters, got ${descriptionLength}`
);

assert.equal((index.match(/<h1\b/g) ?? []).length, 1, "home page should have one H1");

const requiredSections = [
  "Hero 首屏",
  "客户痛点",
  "平台解决方案",
  "核心架构图",
  "三类用户入口",
  "典型应用场景",
  "核心功能清单",
  "部署与集成方式",
  "FAQ",
  "联系/演示申请"
];

for (const section of requiredSections) {
  assert.ok(index.includes(section), `home page should include section marker: ${section}`);
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
  assert.ok(index.includes(keyword), `home page should include keyword: ${keyword}`);
}

const forbiddenTerms = [
  "ZSB101A",
  "ZM24",
  "apiyh.zlg.com",
  "sf.zlg.com",
  "VID/PID",
  "S407IG"
];

for (const term of forbiddenTerms) {
  assert.ok(!index.includes(term), `public page should not expose sensitive term: ${term}`);
}

const sitemap = read("public/sitemap.xml");
assert.ok(sitemap.includes("https://crossthewall.org/"), "sitemap should include site URL");

const robots = read("public/robots.txt");
assert.ok(robots.includes("Sitemap: https://crossthewall.org/sitemap.xml"), "robots should point to sitemap");

const workflow = read(".github/workflows/deploy-pages.yml");
assert.ok(workflow.includes("actions/deploy-pages"), "workflow should deploy to GitHub Pages");

console.log("site checks passed");
