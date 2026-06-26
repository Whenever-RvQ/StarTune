# 更新日志

所有重要变更都会记录在此文件。格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

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
