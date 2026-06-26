# 发布说明

## 发布渠道

StarTune 1.0.0 起步版本通过以下方式分发：

- GitHub Releases（推荐）
- 第三方镜像站

每个发布版本都会包含以下资产：

- Windows：`StarTune-Setup-1.0.0.exe`、`latest.yml`
- macOS：`StarTune-1.0.0-x64.dmg`、`StarTune-1.0.0-arm64.dmg`

## 校验发布包

每个发布都会附带 SHA-256 校验值。在终端校验：

```bash
shasum -a 256 StarTune-Setup-1.0.0.exe
# 对照 GitHub Release 页面提供的 SHA-256 值
```

## 版本号规范

StarTune 遵循 [语义化版本](https://semver.org/lang/zh-CN/)：

- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

## 从源码构建

如果你想自行构建发布包：

```bash
git clone <repository-url>
cd StarTune
npm install
npm run build:win   # Windows 安装包
npm run build:mac   # macOS DMG
```

> 跨平台构建有限制：
> - macOS DMG **只能在 macOS 上构建**
> - Windows NSIS **建议在 Windows 上构建**（在 macOS / Linux 上需要 Wine）

## 反馈

如果发现发布版本有问题，请通过 GitHub Issues 反馈，并附上：

1. 操作系统与版本
2. StarTune 版本
3. 复现步骤
4. 终端日志（开发模式：`npm run dev`）
