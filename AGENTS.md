# StarTune Project Rules

> AI Agent / 自动化工具的项目操作约定。

## 项目身份

StarTune 是跨 Windows 与 macOS 的 Electron 桌面音乐播放器，核心体验包括搜索、播放、歌单、歌词、3D 歌单架、粒子视觉预设、DIY 视觉控制台。

- **技术栈**：Electron 42 + Node.js 18+ + Three.js r128 + GSAP 3
- **本地端口**：3000~（自动寻找空闲端口）
- **用户数据目录**（macOS）：`~/Library/Application Support/StarTune/`
- **用户数据目录**（Windows）：`%APPDATA%\StarTune\`

## 新会话开始的最小读取清单

每个新 AI 会话开始处理 StarTune 前，至少确认：

```bash
pwd            # 应在 StarTune 项目根目录
ls -la         # 应看到 package.json / desktop / public / server.js 等
```

并阅读：

- `README.md`：项目说明与运行方式
- `QUICKSTART.md`：5 分钟上手
- `package.json`：当前版本号、脚本、可执行名
- `desktop/main.js`：窗口、IPC、系统集成
- 涉及玻璃 SVG 质感时读取 `docs/GLASS_SVG_TEXTURE.md`
- 涉及发布时读取 `RELEASE.md`、`CHANGELOG.md`

## 仓库布局

```
StarTune/
├─ public/
│  ├─ index.html        # 主 UI、CSS、歌词、粒子、3D 歌单架、视觉控制台
│  ├─ desktop-lyrics.html
│  ├─ wallpaper.html
│  ├─ vendor/           # 本地 vendor 依赖
│  └─ assets/           # 内置资源
├─ desktop/             # Electron main / preload / overlay-preload
├─ build/               # 打包资源、NSIS 脚本、图标
├─ docs/                # 设计笔记、长期约束
├─ server.js            # 本地 API、音乐源、更新检查
├─ dj-analyzer.js       # 节奏 / 音频分析
├─ package.json         # 版本号、构建命令、electron-builder 配置
└─ CHANGELOG.md         # 中文更新说明优先写在顶部
```

## 常用命令

```bash
npm start                 # 启动桌面应用
npm run dev               # 启动 + 远程调试
npm run check             # 语法检查
npm run build:win         # Windows NSIS 安装包
npm run build:win:dir     # Windows 免安装版
npm run build:mac         # macOS DMG
npm run build:mac:dir     # macOS .app
```

前端主逻辑在 `public/index.html`。改完前端后重启 `npm start` 即可看到效果。

改动后必须执行：

```bash
npm run check             # 语法检查
```

并启动 `npm start` 在主窗口与浮窗中验证关键交互。

## 用户偏好

- 交流语言：中文
- UI 审美：精致、暗色、高级、流畅，拒绝廉价渐变、过度透明、错位、闪烁、卡顿
- 视觉质量定义：质感、丝滑度、帧数稳定同时成立；性能优化不能牺牲既有质感
- 跨平台一致性：Windows 与 macOS 行为应当保持一致；Windows 专属特性需在 UI 上做入口隐藏
- 数据本地化：用户数据不离开本机

## 内存协议

当用户说「保留」「这个做得很好」「我喜欢」「记住这个」「保存一下」「以后别忘了」或同类表达时：

1. 判断用户认可的是代码、视觉效果、交互流程、发布流程还是工作习惯
2. 将结论追加到 `docs/PROJECT_MEMORY.md` 的对应区块
3. 如果是玻璃 SVG、粒子预设、3D 歌单架等脆弱视觉实现，同时更新对应专项文档
4. 记录日期、涉及文件、关键参数、不要再改坏的边界

## 防护栏

- 不要随意重写 `public/index.html` 的大块视觉系统；先定位已有函数和状态
- 不要动电影视觉系统，除非用户明确点名
- 不要把搜索结果、左侧歌单、3D 歌单架的性能优化做成一次性渲染全部内容
- 不要把用户认可的玻璃质感改成普通毛玻璃或廉价透明面板
- 不要绕过 `contextIsolation`；所有 renderer ↔ main 通信必须走 `contextBridge`
- 不要把 Windows 专属功能（桌面歌词、桌面壁纸）硬塞到 macOS；用 UI 入口隐藏代替崩溃
