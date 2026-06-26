# 安全策略

## 报告漏洞

如果你在 StarTune 中发现了安全漏洞，请通过 GitHub Issues 提交，并标记为 `security` 标签。

我们会在 7 个工作日内回复，并在确认后尽快修复。

## 安全特性

StarTune 在设计时遵循以下安全原则：

1. **本地优先**：所有用户数据都只保存在本机，不上传任何服务器
2. **最小权限**：
   - Electron 渲染进程默认开启 `contextIsolation: true` 与 `nodeIntegration: false`
   - 仅通过 `preload.js` 中的 `contextBridge` 暴露必要 API
   - 第三方平台登录窗口使用独立的 `session` 分区，互不污染
3. **依赖管理**：
   - 定期更新 Electron / electron-builder / 第三方依赖
   - 关注上游高风险告警
4. **网络安全**：
   - 启用 `tls.getCACertificates('system')` 合并系统根证书
   - 第三方 API 请求走 HTTPS
5. **macOS 沙盒兼容**：
   - 默认不启用硬化运行时（方便个人开发者分发）
   - 如需上架 Mac App Store，需自行配置 `hardenedRuntime: true` 与签名

## 已知安全建议

- 登录 Cookie 保存在本地，等同于在该平台的登录态，请勿在公共电脑使用
- 定期清理 `usersession` 目录（用户数据目录下的 session 子目录）以清除过时 Cookie
- 不要在 StarTune 内打开陌生 URL，应用默认拦截并使用系统浏览器打开
- 下载安装包时务必校验来源，避免被植入后门的第三方分发包

## 升级策略

- 重要安全更新会通过应用内更新通道推送
- 建议保持最新版本，旧版本不再维护
