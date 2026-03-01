# 海大资源站

海大资源站是一个可安装的 PWA 资源入口页，目前仅收录 **海大选课通**。

## 当前功能

- 顶栏展示站点名「海大资源站」
- 顶部搜索栏（占位文案：`搜索资源`）
- 顶栏右侧 GitHub 入口：`https://github.com/SMU-RES`
- 资源卡片当前仅 1 项：`海大选课通`
- 卡片内提供两个按钮：
  - `前往静态站（推荐）`（默认重点）
  - `前往动态站`
- 卡片说明明确：
  - 动态站可评论/可评分
  - 静态站仅查看，但体验更好；仅查看时建议优先静态站

## 技术栈

- 纯静态前端：`HTML + CSS + JavaScript`
- PWA：`manifest.webmanifest` + `service-worker.js`
- 部署配置：`wrangler.toml`
- 许可证：`GPL-3.0`

## 本地运行

```bash
cd 海大资源站
npm run dev
```

默认本地地址：`http://localhost:8788`

## 发布

```bash
npm run deploy
```

当前脚本等价于：

```bash
npx wrangler pages deploy . --project-name=smures
```

## 主要文件

- `index.html`：页面结构与模板
- `styles.css`：视觉样式（含按钮主次强调）
- `app.js`：资源数据与渲染逻辑
- `manifest.webmanifest`：PWA 清单
- `service-worker.js`：离线缓存
- `AGENTS.md`：项目协作约束
