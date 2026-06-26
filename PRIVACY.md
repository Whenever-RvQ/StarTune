# 隐私政策

StarTune 致力于保护你的隐私。本文档说明我们如何处理你的数据。

## 我们不收集任何数据

StarTune 是**完全本地**的桌面应用，不向任何服务器上传你的个人数据。

所有以下数据都只保存在你本机的用户数据目录中：

- 网易云音乐 / QQ 音乐 登录 Cookie
- 搜索历史
- 自定义专辑封面
- 自定义歌词
- 节奏分析缓存
- 视觉预设与用户存档
- 播放历史与收藏

## 数据存储位置

| 平台 | 路径 |
| --- | --- |
| macOS | `~/Library/Application Support/StarTune/` |
| Windows | `%APPDATA%\StarTune\` |
| Linux | `~/.config/StarTune/` |

可通过环境变量 `STARTUNE_USER_DATA_DIR` 自定义。

## 第三方服务

StarTune 会通过本地 HTTP 服务与以下第三方服务通信：

- **网易云音乐 API** (`music.163.com`)：用于搜索、播放、歌单、登录
- **QQ 音乐 API** (`y.qq.com`)：用于搜索、播放、登录
- **Open-Meteo** (`api.open-meteo.com`)：用于天气电台

这些请求都是直接由你的设备发往第三方服务，**不经过任何 StarTune 控制的服务器**。

我们不会也无法获取或记录你在第三方服务上的任何账户信息或操作历史。

## 注销登录

你可以在设置中随时注销登录。注销操作会清除本机保存的所有登录 Cookie。

## 卸载

卸载 StarTune 时，安装包不会自动删除用户数据目录。如需彻底清除，请手动删除上述路径下的 `StarTune` 文件夹。

## 联系方式

如果你对本隐私政策有任何疑问，请通过 GitHub Issues 联系我们。
