# StarTune

> 沉浸式桌面音乐播放器，跨 Windows / macOS 一体化体验。
> 把天气电台、搜索播放、歌词舞台、粒子视觉和 3D 歌单架组合成一个更接近现场感的私人音乐空间。

![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS-3257F7)
![Electron](https://img.shields.io/badge/Electron-42-47848F)
![License](https://img.shields.io/badge/license-GPL--3.0-blue)

---

## 目录

- [项目简介](#项目简介)
- [核心特性](#核心特性)
- [系统要求](#系统要求)
- [快速开始](#快速开始)
- [常用命令](#常用命令)
- [开发指南](#开发指南)
- [打包发布](#打包发布)
- [目录结构](#目录结构)
- [常见问题](#常见问题)
- [第三方说明](#第三方说明)
- [用户数据与隐私](#用户数据与隐私)
- [版权与授权](#版权与授权)

---

## 项目简介

**StarTune** 是一款基于 Electron + 本地 Node 服务 + Three.js 视觉层的跨平台桌面音乐播放器。它在播放体验中混合了：

- 基于 Open-Meteo 的天气电台与位置推荐
- 网易云音乐 / QQ 音乐搜索、歌单、扫码登录等体验接入
- 3D 歌单架、歌词舞台、电影镜头节奏视觉系统
- 自定义封面、自定义歌词、桌面歌词与桌面壁纸模式
- 可导出的视觉预设 / 用户存档

支持平台：**Windows 10+ (x64)** 与 **macOS 11+ (Intel / Apple Silicon)**。

---

## 核心特性

- 天气电台：根据当前天气 mood 自动生成合适的播放队列
- 多源搜索：网易云音乐 + QQ 音乐联合搜索
- 歌词舞台：自定义歌词位置、发光、滚动与镜头绑定
- 电影镜头视觉系统：基于节奏的电影化视觉体验
- 3D 歌单架：可交互的 3D 歌单浏览与队列管理
- 粒子视觉：可调参数、丰富的视觉预设（emily / 安魂 / 星河 等）
- 自定义专辑封面上传 + 裁剪
- 桌面歌词浮窗、桌面壁纸模式
- 自由窗口大小：16:9 窗口化 / 全屏 / 窗口化切换
- 全局快捷键：在其他应用内也能控制播放
- 用户视觉存档：导出 / 导入 JSON 备份
- 跨平台：Windows 与 macOS 行为统一

---

## 系统要求

### Windows
- Windows 10 / 11 (x64)
- 4 GB 以上内存
- 推荐独立显卡（内置显卡也可运行）
- 网络连接（用于搜索 / 登录 / 更新）

### macOS
- macOS 11 (Big Sur) 或更高版本
- 支持 Intel 与 Apple Silicon (M1/M2/M3/M4)
- 4 GB 以上内存
- 网络连接（用于搜索 / 登录 / 更新）

### 开发者
- Node.js **>= 18.0.0**
- npm **>= 9.0.0**（通常随 Node 一起安装）
- Python（仅在编译原生依赖时需要，通常不需要）

---

## 快速开始

### 1. 克隆 / 解压项目

将 StarTune 源码放到任意位置，例如：

```bash
cd ~/Projects
# 解压 zip 后：
cd StarTune
```

### 2. 安装依赖

```bash
npm install
```

> 首次安装会下载 Electron 二进制包，约 200MB，请耐心等待。
> 如果在中国大陆网络环境下安装缓慢，可以临时设置 npm 镜像：
> ```bash
> npm config set registry https://registry.npmmirror.com
> npm install
> ```

### 3. 启动应用

```bash
npm start
```

启动后会看到：

- 终端输出 `StarTune 沉浸式音乐播放器 → http://localhost:xxxx`
- 自动弹出 StarTune 主窗口

### 4. 体验功能

- **搜索音乐**：在主界面输入歌手 / 歌名 / 关键词
- **登录账号**：右上角头像 → 网易云 / QQ 音乐登录（可选）
- **切换视觉预设**：播放时按 `V` 或在视觉控制台选择
- **桌面歌词**：设置中开启「桌面歌词浮窗」

---

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm start` | 启动 StarTune 桌面应用 |
| `npm run dev` | 启动并开启 Node 远程调试端口（9229） |
| `npm run check` | 检查所有 JS 文件的语法 |
| `npm run vite:build` | 构建前端（将 `src/` 打包到 `public/dist/`） |
| `npm run vite:watch` | 实时监听源码变化并自动重新构建 |
| `npm run build:win` | 打包 Windows NSIS 安装包到 `dist/`（自动先 vite build） |
| `npm run build:win:dir` | 打包 Windows 免安装版到 `dist/` |
| `npm run build:mac` | 打包 macOS DMG 安装包到 `dist/`（自动先 vite build） |
| `npm run build:mac:dir` | 打包 macOS .app 到 `dist/` |
| `npm run build` | 同时构建 Windows + macOS（需在对应平台运行） |

---

## 开发指南

### 项目结构

```
StarTune/
├── src/                   # 前端 JS 源码（Vite 构建入口）
│   ├── main.js            # 入口文件（按序 import 各模块）
│   ├── globals.js         # 全局状态 / 配置 / 状态持久化
│   ├── lyrics-3d.js       # 舞台歌词 3D 系统
│   ├── beatmap.js         # 封面深度 + 离线节拍分析
│   ├── shelf.js           # 3D 歌单架 + 二级内容框
│   ├── interaction.js     # 卡片交互 / 播放控制 / 歌单面板
│   ├── fx-panel.js        # FX 控制台（预设/滑块/开关）
│   ├── update.js          # 更新检查
│   ├── login.js           # 登录 / 用户系统
│   ├── splash.js          # 启动页动画 + 启动序列
│   └── render-loop.js     # 主渲染循环
├── public/                # 前端静态资源 + 构建产物
│   ├── index.html         # 主 UI（仅 HTML DOM，~850 行）
│   ├── css/app.css        # CSS 样式源码
│   ├── dist/              # Vite 构建产物（app.js + style.css）
│   ├── desktop-lyrics.html# 桌面歌词浮窗
│   ├── wallpaper.html     # 桌面壁纸
│   ├── vendor/            # 本地第三方依赖（Three.js/GSAP）
│   └── assets/            # 内置资源
├── desktop/               # Electron 主进程
│   ├── main.js            # 主入口：窗口、IPC、系统集成
│   ├── preload.js         # 主窗口预加载
│   └── overlay-preload.js # 浮窗预加载
├── build/                 # 打包资源
├── docs/                  # 项目设计文档与实现笔记
├── vite.config.js         # Vite 构建配置
├── server.js              # 本地 API：搜索 / 播放 / 更新
├── dj-analyzer.js         # 节奏 / 音频分析
├── package.json
└── README.md
```

### 调试技巧

1. **开发者工具**：主窗口在 `?debug=1` 模式下会自动打开 DevTools
2. **远程调试**：`npm run dev` 启动后可在 Chrome `chrome://inspect` 中连接
3. **本地服务端口**：默认从 3000 向上寻找空闲端口
4. **查看日志**：所有日志直接打印到启动终端

### 跨平台开发注意

- macOS 端 `app.commandLine.appendSwitch` 顺序与 Windows 略有差异，`use-angle` 已在代码中自动切换 `metal` / `d3d11`
- 桌面歌词浮窗、桌面壁纸模式使用 `WorkerW` 注入，**仅在 Windows 上有效**；macOS 上这两项功能会自动隐藏入口
- 用户数据目录在 macOS 上是 `~/Library/Application Support/StarTune`，在 Windows 上是 `%APPDATA%\StarTune`

### 自定义环境变量

| 变量 | 作用 |
| --- | --- |
| `STARTUNE_USER_DATA_DIR` | 覆盖用户数据目录路径 |
| `STARTUNE_BEAT_CACHE_DIR` | 覆盖节奏分析缓存目录 |
| `STARTUNE_UPDATE_MANIFEST` | 指向本地 manifest JSON / HTTP URL，用于本地验证更新链路 |
| `STARTUNE_NO_DESKTOP_SHORTCUT=1` | 跳过桌面快捷方式创建（Windows） |
| `STARTUNE_CREATE_DESKTOP_SHORTCUT=1` | 即使在开发模式下也创建桌面快捷方式（Windows） |

---

## 打包发布

### Windows（需在 Windows 上执行，或使用 Wine）

```bash
npm run build:win
```

产物：`dist/StarTune-Setup-1.0.0.exe`

- 安装包会创建桌面快捷方式
- 默认安装到 `%LOCALAPPDATA%\Programs\StarTune`，可手动选择其它位置
- 同时生成 `latest.yml`，可用于后续自动更新

### macOS（需在 macOS 上执行）

```bash
npm run build:mac
```

产物：`dist/StarTune-1.0.0.dmg`、`dist/mac-arm64/StarTune.app`、`dist/mac/StarTune.app`

- 同时构建 x64 与 arm64 架构
- 未配置代码签名证书时，`identity` 为 `null`，首次运行需在「系统设置 → 隐私与安全性」中允许

### 同时构建两个平台

在 macOS 上：

```bash
npm run build
```

在 Windows 上同理。**不要尝试在 Windows 上打包 macOS，或反之**，electron-builder 不支持交叉打包 macOS DMG。

---

## 目录结构（详细）

| 路径 | 作用 |
| --- | --- |
| `src/main.js` | 前端 JS 入口，按序 import 各模块 |
| `src/globals.js` | 全局状态 / Three.js 场景 / 相机 / 状态持久化 |
| `src/lyrics-3d.js` | 舞台歌词 3D 系统 + 涟漪触发 |
| `src/beatmap.js` | 封面深度处理 + 离线节拍预解析 |
| `src/shelf.js` | 3D 歌单架（含半收缩弹出交互） |
| `src/interaction.js` | 卡片交互 / 播放控制 / 搜索 / 歌单面板（含歌单内搜索） |
| `src/fx-panel.js` | FX 控制台（预设/滑块/开关/颜色实验室） |
| `src/splash.js` | 启动页动画 + 启动初始化序列 |
| `src/render-loop.js` | 主渲染循环 |
| `public/index.html` | 主 UI HTML DOM（~850 行，不含 JS/CSS） |
| `public/css/app.css` | CSS 样式源码 |
| `public/dist/` | Vite 构建产物（`app.js` + `style.css`） |
| `public/vendor/` | 第三方库：three.js、gsap、music-tempo |
| `vite.config.js` | Vite 构建配置（含 concat 插件） |
| `desktop/main.js` | Electron 主进程：窗口管理 / IPC / 系统集成 |
| `server.js` | 本地 HTTP 服务：搜索 / 播放 / 歌词 / 更新检查 |
| `dj-analyzer.js` | 节奏 / 音频特征分析（music-tempo 封装） |
| `build/` | 打包资源与钩子 |
| `docs/` | 设计笔记与实现细节 |
| `package.json` | npm 元信息、Vite 脚本与 electron-builder 配置 |

---

## 常见问题

**Q1：启动时控制台报 `EADDRINUSE` 怎么办？**
A：本地服务在 3000 端口被占用，StarTune 会自动从 3001 开始寻找空闲端口。如果依然失败，关闭占用端口的进程，或设置 `PORT` 环境变量。

**Q2：网易云音乐 / QQ 音乐搜索无结果？**
A：第三方 API 偶发不稳定，可以稍等再试，或在搜索框中切换数据源。

**Q3：登录态丢失？**
A：登录 Cookie 保存在用户数据目录下：
- macOS：`~/Library/Application Support/StarTune/.cookie`
- Windows：`%APPDATA%\StarTune\.cookie`
清理这些文件后会回到未登录状态。

**Q4：macOS 上提示「无法打开，因为无法验证开发者」？**
A：右键点击 StarTune.app → 「打开」→ 在弹窗中再次点击「打开」。或在「系统设置 → 隐私与安全性」中允许。

**Q5：Windows 打包时提示找不到 rcedit？**
A：执行 `npm install` 后再打包；`rcedit` 是 devDependencies 之一，首次安装会自动拉取。

**Q6：想用代理 / 镜像加速下载？**
A：设置 `npm config set electron_mirror https://npmmirror.com/mirrors/electron/` 可加速 Electron 二进制下载。

---

## 第三方说明

StarTune 使用了以下第三方项目或服务。各项目版权归其原作者所有。

### Third-party Libraries
- Electron
- Three.js
- GSAP
- music-tempo
- NeteaseCloudMusicApi
- mpg123-decoder

### Third-party Services
- 网易云音乐（music.163.com）— 公开 API 用于本地客户端体验
- QQ 音乐（y.qq.com）— 公开 API 用于本地客户端体验
- Open-Meteo — 天气数据来源

StarTune 不是任何音乐平台的官方客户端，也不隶属于网易云音乐、QQ 音乐或腾讯音乐娱乐集团。请用户自行遵守对应平台的服务协议、版权规则和会员权益规则。本项目不会提供绕过付费、绕过会员、破解音质或重新分发音乐内容的能力。

---

## 用户数据与隐私

登录 Cookie、搜索历史、自定义封面、自定义歌词、节奏分析缓存等数据只应保存在本机用户数据目录或浏览器本地存储中，不会上传到任何服务器。

具体数据目录：

- **macOS**：`~/Library/Application Support/StarTune/`
- **Windows**：`%APPDATA%\StarTune\`

更多说明见 [PRIVACY.md](./PRIVACY.md)。

---

## 版权与授权

Copyright (C) 2026 StarTune Project.

本项目采用 GPL-3.0 授权。详见 [LICENSE](./LICENSE)。

StarTune 名称、界面视觉设计与原创视觉表达归本项目作者所有；第三方依赖和第三方服务分别遵循其各自授权与服务条款。
