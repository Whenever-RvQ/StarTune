# StarTune AI Handoff

> 给下一个接手 StarTune 的 AI 会话或开发者准备的简报。

## 一句话总结

StarTune 是一个跨平台（Windows / macOS）的沉浸式桌面音乐播放器，基于 Electron + 本地 Node 服务 + Three.js 视觉层。**1.0.0 是从开源原型改造的第一个独立版本**。

## 你需要知道的 5 件事

1. **入口文件**：`desktop/main.js` 是 Electron 主进程入口，`server.js` 是本地 HTTP 服务（端口 3000+），`public/index.html` 是主 UI（单文件，所有 CSS/JS 内联）。
2. **品牌与命名**：所有 IPC 通道名都以 `startune-` 开头；环境变量以 `STARTUNE_` 开头；session partition 以 `persist:startune-` 开头。修改时记得保持一致。
3. **跨平台行为差异**：
   - macOS：默认不带代码签名，开发者需自行配置 `package.json` 中的 `build.mac.identity`
   - Windows：默认安装到 `%LOCALAPPDATA%\Programs\StarTune`
   - 桌面歌词浮窗 / 桌面壁纸：**仅 Windows 有效**，macOS 上对应入口会被隐藏
4. **核心依赖**：
   - `electron` 42+
   - `electron-builder` 26+
   - `NeteaseCloudMusicApi` 4.32+
   - `mpg123-decoder` 1.0+
   - `gsap` 3.15+
5. **历史包袱**：项目 1.0.0 是改造自开源原型的第一个独立版本。所有 `MINERADIO_*` / `Mineradio` / `mineradio` / `XxHuberrr` 引用都已替换为 `STARTUNE_*` / `StarTune` / `startune`。如果发现遗漏，按 `STARTUNE_*` 的命名规范补齐。

## 改动后的验证清单

最小验证步骤：

```bash
npm run check             # 1. 语法检查
npm start                 # 2. 启动应用
# 3. 在主窗口里测：搜索、播放、切歌、视觉预设切换
# 4. 在 macOS 上额外测：Cmd+Q 退出、菜单栏、Dock 图标
# 5. 在 Windows 上额外测：Alt+F4、桌面歌词、桌面壁纸
```

## 改动后的发布清单

```bash
# Windows（在 Windows 上）
npm run build:win

# macOS（在 macOS 上）
npm run build:mac

# 验证产物
ls -la dist/
```

## 已知技术债

1. macOS 首次启动需要右键「打开」绕过 Gatekeeper，没有签名证书
2. 应用内更新通道目前配置为 `generic` provider，需要自行搭建分发服务
3. `desktop-lyrics` / `wallpaper` 的 PowerShell 注入脚本仅 Windows 有效
4. 部分第三方 API（如网易云）偶发不稳定，需要重试机制

## 后续可优化方向

- 配置 Apple Developer ID 证书并启用硬化运行时
- 引入 Sentry 或类似工具收集崩溃日志
- 拆分 `public/index.html` 为多文件 + 引入构建工具
- 增加单元测试与 E2E 测试
- 支持 Linux 平台

## 联系

- GitHub Issues: <repo-url>
- 邮箱: [email protected]
