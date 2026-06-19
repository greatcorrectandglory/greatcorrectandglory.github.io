# 通用自动化测试平台官网

这是 `greatcorrectandglory.github.io` 的 GitHub Pages 静态站点源码，用于公开介绍“通用自动化测试平台”。站点定位是产品介绍页，不是私有仓库的开发文档页。

## 内容边界

- 不发布 private 仓库源码。
- 不展示敏感客户、真实产品型号、协议细节、网关地址或公司内部信息。
- 文案只使用可公开的产品能力抽象：产品配置包、插件化测试步骤、多工位执行、硬件资源绑定、结果追溯、MES/云平台对接。

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

然后在仓库 Settings -> Pages 中选择 GitHub Actions 作为 Pages source。首次 push 到 `main` 后，workflow 会部署到：

```text
https://greatcorrectandglory.github.io/
```

如果改用独立 public repo，也可以保留同样源码结构，并在 `astro.config.mjs`、`public/sitemap.xml` 和 `public/robots.txt` 中把站点 URL 调整为项目 Pages 地址。
