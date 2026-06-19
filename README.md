# 通用自动化测试平台官网

这是 `greatcorrectandglory.github.io` 的 GitHub Pages 静态站点源码，用于公开介绍“通用自动化测试平台”。站点定位是产品介绍页，不是私有仓库的开发文档页。

## 页面结构

- `/test-platform/`：产品首页
- `/test-platform/scenarios/`：应用场景
- `/test-platform/architecture/`：技术架构
- `/test-platform/docs/`：文档中心
- `/test-platform/changelog/`：版本记录

## 内容边界

- 不发布 private 仓库源码。
- 不展示敏感客户、真实产品型号、协议细节、网关地址或公司内部信息。
- 文案只使用可公开的产品能力抽象：产品配置包、插件化测试步骤、多工位执行、硬件资源绑定、结果追溯、MES/云平台对接。
- 真实产品界面截图必须先放入 `public/assets/screenshots/` 并完成脱敏检查；没有通过检查前使用明确占位，不伪造演示截图。

## 本地开发

```bash
npm install
npm test
npm run dev
```

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`。GitHub Pages workflow 会在 `main` 分支 push 后执行检查、构建并部署。

## 发布到 GitHub Pages

推荐创建 public 仓库：

```bash
gh repo create greatcorrectandglory/greatcorrectandglory.github.io --public --source=. --remote=origin --push
```

当前生产站点与个人博客共用 `crossthewall.org` 这台 VPS。官网建议部署到子路径：

```text
https://crossthewall.org/test-platform/
```

如需改回 GitHub Pages 根域部署，可在仓库 Settings -> Pages 中选择 GitHub Actions，并把 DNS 指向 GitHub Pages：

```text
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
AAAA  @    2606:50c0:8000::153
AAAA  @    2606:50c0:8001::153
AAAA  @    2606:50c0:8002::153
AAAA  @    2606:50c0:8003::153
```

如果改用项目 Pages 地址，也可以保留同样源码结构，并在 `astro.config.mjs`、`public/sitemap.xml` 和 `public/robots.txt` 中调整站点 URL。
