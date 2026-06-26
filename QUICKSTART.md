# StarTune 快速上手指南

> 5 分钟从零开始用上 StarTune。
> 详细使用说明见 [README.md](./README.md)，本指南只讲最短路径。

---

## 1. 安装运行

### macOS / Linux

```bash
cd StarTune
npm install
npm start
```

### Windows（PowerShell / CMD）

```powershell
cd StarTune
npm install
npm start
```

首次安装耗时约 1-3 分钟（取决于网络）。

---

## 2. 基本使用

1. **搜索歌曲**：在主界面顶部搜索框输入「歌名 / 歌手 / 关键词」
2. **播放 / 暂停**：双击搜索结果 / 顶部中央的播放按钮
3. **切换上下首**：底部播放控制条左右按钮
4. **调整音量**：底部播放控制条音量滑块
5. **进入全屏**：按 `F` 键 / 双击顶部标题
6. **唤起视觉控制台**：播放状态下按 `V` / 鼠标移到屏幕中央上方
7. **桌面歌词浮窗**：设置 → 桌面歌词 → 开启
8. **退出**：菜单 / `Cmd+Q` (macOS) / `Alt+F4` (Windows)

---

## 3. 网易云 / QQ 音乐登录

1. 右上角头像 → 选择「网易云音乐登录」或「QQ 音乐登录」
2. 弹出登录窗口，扫码或账号密码登录
3. 登录成功后头像会显示已登录态
4. 登录 Cookie 仅保存在本机，**不会上传任何服务器**

---

## 4. 视觉预设切换

StarTune 内置多个视觉预设：

- `emily`
- `安魂`
- `星河`
- `唱片`
- `星球`
- `滚筒`
- `虚空`

切换方式：

- **播放中按 `V`**：在视觉控制台中选择
- **或鼠标移到屏幕顶部中央**：自动展开视觉控制台

每个预设都有可调参数（粒子密度、镜头强度、歌词发光、3D 歌单架等）。

---

## 5. 3D 歌单架

- **打开方式**：在主界面右键点击 → 「3D 歌单架」，或按 `P`
- **浏览歌单**：鼠标左右拖动 / 滚轮
- **打开歌单详情**：点击歌单卡片
- **添加歌曲到歌单**：在歌曲右键菜单中选择目标歌单
- **静态 / 动态模式**：在视觉控制台中切换

---

## 6. 桌面歌词 / 桌面壁纸（仅 Windows）

> 此功能依赖 Windows 系统的 `WorkerW` 注入层，**仅在 Windows 上有效**。
> macOS 用户可直接使用主窗口中的歌词舞台。

- **桌面歌词**：
  1. 设置 → 桌面歌词 → 开启
  2. 歌词浮窗出现在桌面上层
  3. 鼠标中键点击可切换「锁定 / 解锁」状态
  4. 解锁后可拖动到任意位置

- **桌面壁纸**：
  1. 设置 → 桌面壁纸模式 → 开启
  2. 播放器会接管 Windows 桌面背景
  3. 关闭后恢复原始桌面

---

## 7. 数据备份

视觉预设、用户存档、自定义封面等设置都在用户数据目录下：

- **macOS**：`~/Library/Application Support/StarTune/`
- **Windows**：`%APPDATA%\StarTune\`

可以通过 **设置 → 导出存档** 把视觉配置备份成 JSON 文件。

---

## 8. 打包成可分发安装包

### Windows 安装包（需 Windows 或 Wine）

```bash
npm run build:win
```

产物：`dist/StarTune-Setup-1.0.0.exe`

### macOS DMG（需 macOS）

```bash
npm run build:mac
```

产物：`dist/StarTune-1.0.0.dmg`、Intel/Apple Silicon 两个 `.app`

---

## 9. 遇到问题？

1. **运行报错**：先看终端日志，里面会写出具体原因
2. **端口冲突**：设置 `PORT=4000 npm start` 改用其它端口
3. **依赖装不上**：删除 `node_modules` 重新 `npm install`
4. **Electron 下载慢**：`npm config set electron_mirror https://npmmirror.com/mirrors/electron/`
5. **更多问题**：见 [README.md](./README.md#常见问题)

---

祝你玩得开心。
