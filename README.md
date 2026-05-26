# Forestree Hub — 应用集成中心

简约的应用跳转导航页，可托管在 **GitHub Pages** 或 **Vercel**。

## 用法

1. **编辑链接** — 打开 `config/links.json`，按格式添加/删除你的应用：
   ```json
   {
     "name": "应用名",
     "description": "一句话描述",
     "url": "https://example.com",
     "icon": "🚀"
   }
   ```

2. **部署方式任选其一**

### 部署到 Vercel（推荐）

1. 把全部文件推到一个 GitHub 仓库（根目录即可）
2. 打开 [vercel.com](https://vercel.com) → **Add New Project** → 导入该仓库
3. **Framework Preset** 选 `Other`，其余全部留空 → **Deploy**
4. 十几秒后即获得 `xxx.vercel.app` 域名
5. 后续推送到 GitHub 主分支，Vercel 自动重新部署

### 部署到 GitHub Pages

- 仓库 → Settings → Pages → 选择 `main` 分支 + `/ (root)` → Save
- 几分钟后可通过 `https://你的用户名.github.io/仓库名/` 访问

## 目录结构

```
├── index.html          # 主页面
├── css/style.css       # 样式与动画
├── js/main.js          # 读取 config 并渲染卡片
├── config/links.json   # 链接配置文件（你只需编辑这个）
├── vercel.json         # Vercel 缓存策略（可忽略）
└── README.md           # 说明文件
```

## 特性

- 简约暗色风格
- 网格动态背景 + 卡片弹出动画
- 桌面端 3 列 / 平板 2 列 / 手机 1 列自适应
- 所有链接从 `config/links.json` 读取，无需改 HTML
