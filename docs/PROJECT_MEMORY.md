# StarTune 项目记忆

> 解决新会话「失忆」的问题。每次用户说「保留」「喜欢」「这个很好」「记住」「保存一下」等表达时，把关键结论追加到这里。

## Stable Project Facts

- **项目名**：StarTune
- **当前版本**：`v1.0.0`
- **入口**：`desktop/main.js`（Electron 主进程）、`server.js`（本地 HTTP 服务）、`public/index.html`（主 UI）
- **本地服务端口**：3000~（自动寻找空闲）
- **包 ID**：`com.startune.desktop`
- **支持平台**：Windows 10+ x64、macOS 11+（Intel / Apple Silicon）
- **依赖**：Electron 42+、electron-builder 26+、NeteaseCloudMusicApi 4.32+、mpg123-decoder 1.0+、gsap 3.15+
- **品牌色**：蓝色 `#3257F7`、主文字 `#111217`、弱文字 `#4B5263`/`#6B7280`、白底 `#FFFFFF`
- **应用内更新**：当前配置为 `generic` provider，需要自行搭建分发服务

## 用户数据目录

- **macOS**：`~/Library/Application Support/StarTune/`
- **Windows**：`%APPDATA%\StarTune\`
- **Linux**：`~/.config/StarTune/`
- 可通过环境变量 `STARTUNE_USER_DATA_DIR` 覆盖

## 视觉系统关键决策

- 玻璃 SVG 质感：详见 `docs/GLASS_SVG_TEXTURE.md`
- 3D 歌单架：详见 `docs/3D_PLAYLIST_SHELF_MEMORY.md`
- 桌面歌词：详见 `docs/DESKTOP_LYRICS_VISUAL.md`
- QQ 音乐接口：详见 `docs/QQ_MUSIC_INTERFACE_NOTES.md`

## 安装包样式

- Windows NSIS：浅色高对比、黑白蓝极简
- 默认安装路径：用户可自定义（NSIS 自定义目录页 + 浏览按钮）
- 详细规范：见 `docs/INSTALLER_STYLE.md`

## Release Memory

- `v1.0.0`：从开源原型改造为 StarTune 独立项目的第一个稳定版本
- 包 ID / IPC 通道 / 环境变量都已统一为 `startune-*` / `STARTUNE_*`

## Memory Protocol

当用户说「保留」「这个做得很好」「我喜欢」「记住这个」「保存一下」「以后别忘了」或同类表达时：

1. 判断用户认可的是代码、视觉效果、交互流程、发布流程还是工作习惯
2. 将结论追加到本文件对应区块
3. 如果是脆弱的视觉实现（玻璃 SVG、粒子预设、3D 歌单架等），同时更新对应专项文档
4. 记录日期、涉及文件、关键参数、不要再改坏的边界
5. 如果本轮有代码提交，把记忆文档一起提交

## 历史决策摘录

> 以下是项目从开源原型改造为 StarTune 时的关键决策记录。

### 2026-06-26 1.0.0 起步

- 决定从原 `Mineradio` 开源原型彻底改造为独立项目 StarTune
- 抹除所有原作者信息：包 ID、IPC 通道、Session partition、视觉文字、文档署名
- 增加 macOS 支持：图标解析、跨平台用户数据目录、macOS DMG 构建配置
- 用户数据目录从原来的 `__dirname` 改为基于 `app.getPath('userData')`
- Beatmap 缓存目录从硬编码 `D:\MineradioCache\beatmaps` 改为基于用户数据目录
- 文档体系重写：README / QUICKSTART / CHANGELOG / NOTICE / PRIVACY / SECURITY / RELEASE / AGENTS / AI_HANDOFF
