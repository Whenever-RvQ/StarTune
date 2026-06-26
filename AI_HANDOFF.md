# StarTune AI Handoff

> 给下一个接手 StarTune 的 AI 会话或开发者准备的简报。

## 一句话总结

StarTune 是一个跨平台（Windows / macOS）的沉浸式桌面音乐播放器，基于 Electron + 本地 Node 服务 + Three.js 视觉层。**1.1.0 完成了 Vite 工程重构，前端源码从单文件拆分为 10 个模块**。

## 你需要知道的 6 件事

1. **工程架构**：前端 JS 源码在 `src/` 目录（10 个模块文件），通过 Vite 自定义 concat 插件打包为单文件 `public/dist/app.js`。CSS 在 `public/css/app.css`。HTML DOM 在 `public/index.html`（~850 行）。
2. **入口文件**：`desktop/main.js` 是 Electron 主进程入口，`server.js` 是本地 HTTP 服务（端口 3000+），`src/main.js` 是前端 JS 入口。
3. **构建流程**：修改 `src/*.js` 或 `public/css/app.css` 后需执行 `npm run vite:build`，打包命令已配置 `prebuild` 钩子自动执行。
4. **品牌与命名**：所有 IPC 通道名以 `startune-` 开头；环境变量以 `STARTUNE_` 开头；session partition 以 `persist:startune-` 开头。
5. **Vite concat 插件**：`vite.config.js` 中的 `concatPlugin` 按 `src/main.js` 的 import 顺序直接拼接文件，**不做 ES Module 变量重命名**，保持全局 `var`/`function` 在浏览器全局作用域可见（HTML `onclick` 等属性依赖此行为）。
6. **跨平台差异**：桌面歌词/壁纸仅 Windows 有效；macOS 未配置代码签名。

## 源码模块清单

| 文件 | 行数 | 职责 |
| --- | --- | --- |
| `src/globals.js` | ~4,590 | 全局状态 / Three.js 场景 / 相机 / 播放状态持久化 |
| `src/lyrics-3d.js` | ~2,221 | 舞台歌词 3D 系统 + 涟漪触发 |
| `src/beatmap.js` | ~3,333 | 封面深度处理 + 离线节拍预解析 |
| `src/shelf.js` | ~2,068 | 3D 歌单架（含半收缩弹出） |
| `src/interaction.js` | ~5,380 | 卡片交互 / 播放控制 / 搜索 / 歌单面板（含歌单内搜索） |
| `src/fx-panel.js` | ~2,478 | FX 控制台（预设/滑块/开关/颜色实验室） |
| `src/update.js` | ~519 | 更新检查 |
| `src/login.js` | ~2,359 | 登录 / 用户系统 |
| `src/splash.js` | ~1,042 | 启动页动画 + 启动初始化序列 |
| `src/render-loop.js` | ~312 | 主渲染循环 |

## 改动后的验证清单

```bash
npm run vite:build        # 1. 构建前端
npm run check             # 2. 语法检查
npm start                 # 3. 启动应用
# 4. 在主窗口里测：开屏动画 → 点击进入 → 搜索 → 播放 → 切歌 → 视觉预设
# 5. 测试歌单面板：sticky header / 歌单内搜索 / 歌单架半收缩
# 6. 测试状态持久化：播放歌曲后刷新，确认队列和模式恢复
```

## 改动后的发布清单

```bash
# macOS（在 macOS 上）
npm run build:mac         # 自动先 vite build

# Windows（在 Windows 上）
npm run build:win         # 自动先 vite build

# 验证产物
ls -la dist/
```

## React 渐进式重构进度

| Phase | 状态 | 内容 |
| ----- | ---- | ---- |
| Phase 0 | ✅ 完成 | React 18 + zustand + esbuild 基础设施；`#react-root` 挂载；`playerStore` / `uiStore` 暴露到 `window` |
| Phase 1 | ✅ 完成 | Toast React 化（原生 `#toast` 自动隐藏）；ModalContainer 基础设施（GSAP 动画 + ESC/背景关闭）；`uiStore.openModal/closeModal/showToast` 桥接方法 |
| Phase 2 | ✅ 完成 | Portal 式弹窗迁移：track-detail / update / custom-lyric 三个弹窗的 mask+动画层由 React ModalContainer 接管，弹窗内容仍由原生 JS 控制；原生 open/close 函数桥接到 uiStore；ESC handler 增加 uiStore 状态检查 |
| Phase 3 | 🔲 待做 | 登录/用户弹窗 React 化 |
| Phase 4 | 🔲 待做 | 搜索栏 + 底部播放器 React 化 |

### React 文件结构

```
src/
├─ react-app.jsx              # React 入口，挂载 App 到 #react-root
├─ components/
│  ├─ App.jsx                  # 根组件（Toast + ModalContainer）
│  ├─ Toast.jsx                # Toast 组件（接管原生 #toast）
│  └─ ModalContainer.jsx       # Portal 式弹窗容器（将原生 .modal 元素移入 React mask，管理 GSAP 动画）
└─ store/
   ├─ player-store.js          # 播放器状态 zustand store
   ├─ ui-store.js              # UI 状态 zustand store（含 toast / modal）
   └─ hooks.js                 # usePlayerStore / useUiStore hooks
```

### 原生 JS ↔ React 桥接

- **原生 → React**：`window.__uiStore.showToast(msg)` / `window.__uiStore.openModal(name, props)` / `window.__uiStore.closeModal()`
- **React → 原生**：组件内直接调用 `window.xxx` 全局函数（如 `closeLoginModal()`）
- **showToast** 函数已双写：同时写 uiStore（React Toast 响应）和原生 DOM（fallback）

## 已知技术债

1. macOS 首次启动需右键「打开」绕过 Gatekeeper，未配置签名证书
2. 应用内更新通道配置为 `generic` provider，需自行搭建分发服务
3. 桌面歌词/壁纸的 PowerShell 注入脚本仅 Windows 有效
4. `src/*.js` 模块间仍通过全局 `var` 共享状态，未使用 ES Module export/import 变量
5. Three.js/GSAP 通过 `vendor/` 本地文件引入，未纳入 npm 依赖管理

## 后续可优化方向

- 将全局 var 逐步改造为 ES Module export/import
- 将 vendor 库改为 npm 依赖并通过 Vite 打包
- 配置 Apple Developer ID 证书
- 引入 Sentry 收集崩溃日志
- 增加单元测试与 E2E 测试
- 支持 Linux 平台

## 联系

- GitHub: https://github.com/Whenever-RvQ/StarTune
- 邮箱: [email protected]
