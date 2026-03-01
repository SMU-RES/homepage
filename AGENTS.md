# 海大资源站 AGENTS

## 项目目标

海大资源站是一个可安装的 PWA 导航页，聚合上海海事大学常用入口，强调快速访问与移动端可用性。

## 技术约束

- 采用纯静态栈：`HTML + CSS + JavaScript + Service Worker`
- 保持 PWA 能力可用：
  - `manifest.webmanifest` 必须存在
  - `service-worker.js` 必须注册成功
  - 页面需可离线打开首页
- 风格与主站一致：蓝色主视觉、卡片式布局、简洁信息密度

## 开发规则

- 保持文件结构扁平，不引入重型构建依赖
- 新增站点入口时只改 `app.js` 的 `resources` 数据区
- 链接只放公开入口，避免存储敏感数据
- Windows 环境开发，不使用 Linux-only 进程管理命令

## 部署规则

- 使用 Wrangler 部署到 Cloudflare Pages
- 以当前目录为构建输出目录（静态站）

## 许可证

- 全项目使用 `GPL-3.0`（见 `LICENSE`）
