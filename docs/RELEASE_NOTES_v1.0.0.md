# StarTune v1.0.0 起步版本

这是 StarTune 1.0.0 的起步发布版。代码从开源原型经过品牌重塑与跨平台改造而来。

## 主要变更

- 完整重塑品牌：从原 `Mineradio` 开源原型改造为独立的 `StarTune` 项目
- 增加 macOS 11+ 支持（Intel / Apple Silicon）
- 跨平台用户数据目录（macOS：`~/Library/Application Support/StarTune/`、Windows：`%APPDATA%\StarTune\`）
- 取消 Windows 专属 `D:\MineradioCache\beatmaps` 硬编码，改为基于用户数据目录
- 包 ID：`com.startune.desktop`
- IPC 通道：`startune-*`
- 环境变量：`STARTUNE_*`
- 视觉控制台副标题 / 更新提示徽标已更新为 STARTUNE
- 完整中文文档：README / QUICKSTART / CHANGELOG / NOTICE / PRIVACY / SECURITY / RELEASE / AGENTS / AI_HANDOFF

## 下载

- **Windows 安装包**：`StarTune-Setup-1.0.0.exe`
- **macOS DMG (Intel)**：`StarTune-1.0.0-x64.dmg`
- **macOS DMG (Apple Silicon)**：`StarTune-1.0.0-arm64.dmg`
- **校验文件**：`StarTune-1.0.0-SHA256SUMS.txt`

## 重要安全说明

- macOS DMG 未配置代码签名证书。首次运行需在「系统设置 → 隐私与安全性」中允许。
- 如需分发到 Mac App Store，需自行配置 Apple Developer ID 证书与硬化运行时。

## 系统要求

- **Windows**：Windows 10 / 11 (x64)
- **macOS**：macOS 11 (Big Sur) 或更高版本

## 已知限制

1. macOS 首次启动需要右键「打开」绕过 Gatekeeper
2. 应用内更新通道当前未配置（`generic` provider，未指向具体服务）
3. 桌面歌词 / 桌面壁纸功能仅 Windows 有效（macOS 上对应入口被隐藏）
