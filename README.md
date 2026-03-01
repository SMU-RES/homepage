# 海大资源站（PWA 脚手架）

海大资源站是一个可安装的导航页脚手架，已包含：

- 页面结构与基础风格
- PWA `manifest` 与 `service worker`
- 安装按钮逻辑（`beforeinstallprompt`）
- 分类栏滚轮横向滚动
- Cloudflare Pages `wrangler` 基础部署配置
- GPLv3 许可证

## 本地开发

```bash
cd 海大资源站
npm run dev
```

## 部署（Cloudflare Pages）

1. 首次在 Cloudflare 创建 Pages 项目（项目名：`smures`）
2. 在本目录执行：

```bash
npm run deploy
```

## 下一步

- 在 `app.js` 的 `state.resources` 填充资源站链接数据
- 按需要补充 PNG 图标（192/512）以提升不同平台的安装兼容性
