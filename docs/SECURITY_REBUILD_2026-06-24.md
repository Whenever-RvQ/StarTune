# StarTune Security Audit - 1.0.0 起步版本

## 1.0.0 安全审计清单

1.0.0 是从开源原型改造为 StarTune 独立项目的第一个稳定版本。改造过程中执行了以下安全审计与清理。

### 痕迹清理

- 重命名所有 `Mineradio` / `mineradio` / `XxHuberrr` 标识为 `StarTune` / `startune`
- 包 ID 从 `com.mineradio.desktop` 改为 `com.startune.desktop`
- IPC 通道名从 `mineradio-*` 改为 `startune-*`
- Session partition 从 `persist:mineradio-*` 改为 `persist:startune-*`
- 环境变量从 `MINERADIO_*` 改为 `STARTUNE_*`
- 取消硬编码的 `D:\MineradioCache\beatmaps` 路径
- 重新签名、安装包样式、图标等都已更新为 StarTune

### 当前信任的源码边界

- 活动源代码仓库：当前 StarTune 项目根目录
- 当前代码版本：`1.0.0`
- 所有 `dist/` 产物必须从当前源代码构建
- `.playwright-cli/`、`output/`、`tmp/` 等临时目录不进入仓库

### 推荐的安全实践

- 提交前执行 `npm run check` 做语法检查
- 不要把本地测试临时文件、截图、可执行文件提交到仓库
- 定期运行 `npm audit` 检查依赖告警
- 发布前用杀毒软件扫描打包产物

### 更新行为

- 快速补丁失败不应自动拉取完整安装包
- 完整安装包下载完成后不应自动打开
- 已校验通过的安装包可以复用，避免重复下载

更多安全策略见 [SECURITY.md](../SECURITY.md)。
