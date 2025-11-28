# Bi Blog Memoir

个人博客与内容站点，基于 Next.js App Router + Fumadocs MDX，支持 MDX 文章渲染、分类筛选、RSS 输出、JSON-LD SEO。

![Site Preview](https://i.imgur.com/s5dG4jM.png)

## 技术栈

- Next.js 16（App Router，TypeScript）
- Fumadocs MDX（内容管线、路由/静态生成）
- Tailwind CSS 4（实用类样式）
- Lucide React（图标）
- next/font（Geist）

## 目录结构

- `content/blog/`：Markdown/MDX 文章，含 frontmatter（title、date、tags、image 等）。
- `content/category/`：分类定义（mdx）。
- `content/data/friends.json`：友链数据。
- `src/app/`：应用路由（主页、文章详情、关于、友链等）。
- `src/components/`：UI 组件（布局、导航、输入、JSON-LD 等）。
- `src/lib/`：内容加载、RSS、工具函数。
- `.source/`：fumadocs 生成的源文件（已在 ESLint 忽略）。

## 开发/构建

- 安装依赖：`npm install`
- 本地开发：`npm run dev`
- 代码检查：`npm run lint`
- 生产构建：`npm run build`

## 内容与路由

- 文章：`/posts/[slug]`，基于 `content/blog` 自动生成。
- 分类筛选：主页支持 `?category=` 过滤；搜索支持 `?q=`。
- 友链：`/friends` 读取 `content/data/friends.json`，按 order、addedDate 排序。
- 关于：`/about` 介绍与头像。

## RSS / SEO

- RSS：`/feed.xml`（使用 `NEXT_PUBLIC_SITE_URL` 生成绝对链接）。
- SEO：各页面配置 `metadata`、OpenGraph、Twitter、JSON-LD（主页/文章/关于/友链）。

## 环境变量

- `NEXT_PUBLIC_SITE_URL`：站点根地址，用于 canonical、OG、RSS。
- `STORE_PUBLIC_SITE_URL`（可选）：用于 OG 图片前缀。

## 部署

- 默认 `next.config.ts` 输出 `standalone`，可直接在 Vercel 或容器环境部署。
