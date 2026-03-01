# 海大资源站 AGENTS

## 当前项目状态

- 项目名称：`海大资源站`
- 当前仅上线 1 张资源卡片：`海大选课通`
- 卡片内 2 个入口按钮：
  - `前往静态站（推荐）`（主按钮样式）
  - `前往动态站`（次按钮样式）
- 页面说明文案必须保持：
  - 动态站可评论/评分
  - 静态站仅查看但体验更好，若只查看建议使用静态站

## 页面结构约束

- 顶栏必须包含：
  - 标题：`海大资源站`
  - 搜索框占位文案：`搜索资源`
  - GitHub 入口：`https://github.com/SMU-RES`（图标化展示）
- 不要引入“分类筛选”模块，当前是单资源卡片布局
- 卡片布局必须同时兼容桌面与手机

## 技术约束

- 纯静态实现：`HTML + CSS + JavaScript`
- PWA 必须保持可用：
  - `manifest.webmanifest` 存在且图标路径有效
  - `service-worker.js` 正常注册
  - 主页可离线打开

## 变更约束

- 新增/修改资源优先在 `app.js` 的 `state.resources` 中完成
- 改按钮顺序时要同步检查 `app.js` 的链接绑定逻辑
- 不引入重型依赖或构建链
- 保持 Windows 兼容命令，不使用 Linux-only 进程管理命令

## 部署约束

- 当前仓库脚本使用：
  - `npm run dev` -> `wrangler pages dev .`
  - `npm run deploy` -> `wrangler pages deploy . --project-name=smures`
- `wrangler.toml` 当前为 Pages 输出目录配置（`pages_build_output_dir = "."`）

## 许可证

- 全项目使用 `GPL-3.0`（见 `LICENSE`）
