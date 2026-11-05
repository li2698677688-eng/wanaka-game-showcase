# Wanaka Games Showcase

英文视频与游戏对比展示网站，参考 [OpenAI Games Showcase](https://developers.openai.com/showcase/games) 的实际 CSS、OpenAI Sans 字体、字号、配色、双列网格和主题菜单。

## 本地预览

在这个项目文件夹运行 `npm start`，打开 http://localhost:4188 。需要 Node.js 20 或更高版本，无需安装依赖。

## 配置游戏链接

统一编辑 `public/games.json`，把每个游戏的 `url: null` 改成真实完整地址，例如 `"url": "https://example.com/game"`。刷新后按钮自动启用，在新标签页打开。没有地址时显示 “Game link coming soon”，按钮不可点击。

标题翻译对应关系：Tiny Planet = 小小星球；Planet Mower = 星球割草机；Forest Adventure = 森林冒险。

## 构建与检查

- `npm run verify`：核对三组素材及本地视频播放所需的文件分段读取。
- `npm run build`：生成 `dist/`，可上传到支持静态文件的网站服务。部署时保留完整文件结构。
- GitHub Pages 从 `gh-pages` 分支发布；提交 `public/` 的更改后，运行 `git subtree push --prefix public origin gh-pages` 更新网站。

## 素材与交互

- 用户提供的源视频保持未修改。
- 展示副本统一为 H.264 / MP4；MOV 只转换封装，没有重新压缩视频。
- 视频完整显示、不裁切，支持播放、暂停、拖动、声音和全屏。
- 视频至少显示四分之一时静音循环，低于这个范围或页面隐藏时暂停；滑回可见区域后继续播放。系统设置减少动态效果时改为手动播放。
- 明暗模式支持 Light / Dark / System，选择保存在当前浏览器。
- 电脑为左右并排；手机按每组先原视频、后 Wanaka 的顺序排列。
- 游戏地址等待用户提供。
