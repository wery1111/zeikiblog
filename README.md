# 个人网站 CMS 后端

这是一个基于 Outstatic 的独立 CMS 系统，用于管理个人网站的内容并提供 API 接口。

## 特性

- 🚀 基于 Next.js 和 Outstatic 构建的独立 CMS
- 📝 通过用户友好的管理界面创建和编辑内容
- 🔄 内容自动提交到 GitHub 仓库
- 🌐 提供 RESTful API 接口供前端网站使用
- 📱 响应式设计，移动端友好111

## 开始使用

### 1. 配置环境变量

复制 `.env.local.example` 文件到 `.env.local` 并配置以下环境变量：

```
# 必需的环境变量
OST_GITHUB_ID=YOUR_GITHUB_OAUTH_ID
OST_GITHUB_SECRET=YOUR_GITHUB_OAUTH_SECRET
OST_REPO_SLUG=blog-content

# 应用URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

要获取 GitHub OAuth ID 和 Secret：
1. 前往 GitHub 的 [OAuth Apps 设置页面](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息，将 "Authorization callback URL" 设为 `http://localhost:3000/api/outstatic/callback`
4. 创建应用后，记下 Client ID 和 Client Secret

### 2. 安装依赖并启动开发服务器

```bash
npm install
npm run dev
```

访问 http://localhost:3000/outstatic 进入 CMS 管理界面。

## API 接口

本项目提供以下 API 接口：

### 获取集合内容列表

```
GET /api/content?collection=posts
```

参数：
- `collection`: 内容集合名称（默认：posts）

返回示例：
```json
{
  "items": [
    {
      "title": "Hello World",
      "slug": "hello-world",
      "content": "这是内容...",
      "publishedAt": "2023-01-01T00:00:00.000Z",
      "status": "published"
    }
  ]
}
```

### 获取单个内容项目

```
GET /api/content/hello-world?collection=posts
```

参数：
- `collection`: 内容集合名称（默认：posts）

返回示例：
```json
{
  "title": "Hello World",
  "slug": "hello-world",
  "content": "这是内容...",
  "publishedAt": "2023-01-01T00:00:00.000Z",
  "status": "published"
}
```

## 部署

推荐部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Favitorio%2Foutstatic%2Ftree%2Fmain%2Fexamples%2Foutstatic-dashboard&env=OST_GITHUB_ID,OST_GITHUB_SECRET,OST_REPO_SLUG&project-name=personal-cms)
