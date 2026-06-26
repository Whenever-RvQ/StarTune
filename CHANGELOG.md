# 更新日志

所有重要变更都会记录在此文件。格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [1.1.0] - 2026-06-26

### 工程重构
- **Vite 构建体系**：前端 JS 从单文件 index.html（26,888 行）拆分为 `src/` 下 10 个模块文件，通过 Vite 构建合并打包
- **CSS 外提**：1,818 行 CSS 提取到 `public/css/app.css`
- **index.html 精简**：从 26,888 行减至 ~850 行（仅含 HTML DOM）
- 自定义 Vite concat 插件确保全局变量一致性，不做变量重命名
- 新增 `npm run vite:build` / `npm run vite:watch` 命令
- 打包命令自动执行前端构建（`prebuild:win` / `prebuild:mac`）

### React 渐进式重构
- **Phase 0**：React 18 + zustand + esbuild 基础设施，`#react-root` 挂载点，`playerStore` / `uiStore` 暴露到 `window`
- **Phase 1**：Toast 组件 React 化，React 接管 toast 渲染（原生 `#toast` DOM 自动隐藏）；Modal 容器组件基础设施（`ModalContainer` + GSAP 动画 + ESC/背景关闭）；`uiStore` 新增 `openModal` / `closeModal` / `showToast` 便捷方法

### 新增功能
- **启动页改造**：开屏动画品牌改为 StarTune，副标题 `immersive visual player`，新星轨引擎 WebGL 着色器背景
- **歌单架半收缩**：平时半隐藏在右侧边缘，光标接近即时弹出，无 260ms 延迟
- **歌单内搜索**：展开歌单详情后支持实时搜索歌曲，高亮匹配 + 自动定位
- **歌单面板 sticky header**：标题/tabs/工具栏固定在面板顶部，滚动时始终可见
- **播放状态持久化**：播放队列、当前索引、播放模式、播放进度自动保存到 localStorage，重启后恢复

### 修复
- 修复歌单架 `canShowShelfHoverCueAt` 在非 guide 模式下永远返回 false 的问题
- 删除 FX 控制台中 8 个重复函数声明（ESM strict mode 兼容）
- 修复 Vite 打包后 `DOMContentLoaded` 事件错过导致启动页无法点击进入的问题

## [1.0.0] - 2026-06-26

### 新增
- 从基于社区开源版本改造为 **StarTune** 独立项目
- **跨平台支持**：同时支持 Windows 10+ 与 macOS 11+ (Intel / Apple Silicon)
- 自动从 `~/Library/Application Support/StarTune`（macOS）或 `%APPDATA%\StarTune`（Windows）读取用户数据
- 跨平台用户数据目录解析，自动创建缺失目录
- 跨平台图标解析：macOS 优先 `.icns`、Windows 优先 `.ico`
- 增加 `npm run build:mac` 与 `npm run build:mac:dir` 打包脚本
- 增加 `npm run dev` 远程调试启动脚本
- 增加 `npm run check` 一键语法检查
- 增加 macOS DMG 构建配置
- 完整中文文档：README / QUICKSTART / NOTICE / PRIVACY / SECURITY / 各类设计文档

### 变更
- **品牌与命名重塑**：所有原项目名称、标识、作者信息、IP 通道名已重命名为 StarTune
- **环境变量重命名**：`MINERADIO_*` → `STARTUNE_*`
- **更新默认路径**：取消 Windows 专属 `D:\MineradioCache\beatmaps` 硬编码，改为基于用户数据目录
- **包 ID 变更**：`com.mineradio.desktop` → `com.startune.desktop`
- **AppUserModelID 变更**：与包 ID 保持一致
- **Session partition 命名变更**：`persist:mineradio-*` → `persist:startune-*`
- **IPC 通道名变更**：`mineradio-*` → `startune-*`
- 视觉控制台副标题 / 更新提示徽标已更新为 STARTUNE

### 修复
- macOS / Linux 上原本会硬编码到 Windows 风格的 `D:\` 路径问题
- 原本只读取 `__dirname` 下的 cookie 文件，跨平台后改为读取用户数据目录

### 安全
- macOS DMG 默认未启用硬化运行时（`hardenedRuntime: false`），方便个人开发者直接分发
- 如需分发到 Mac App Store，需自行启用硬化运行时并配置签名

---

## 历史版本参考

历史版本信息可参考上游开源项目的 CHANGELOG。本项目从 1.0.0 起步。
