import { getAllPosts } from "@/lib/blog";
import { getBaseUrl } from "@/lib/urls";

const SITE_NAME = "Hayden Bi Blog";
const SITE_DESCRIPTION =
  "Hayden Bi 的个人博客，分享独立开发、出海产品、技术实践、个人成长与生活记录。";

/**
 * 清理用于 llms.txt 的单行文本，避免换行破坏规范结构。
 */
function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * 转义 Markdown 链接标题中的特殊字符。
 */
function escapeLinkLabel(value: string): string {
  return normalizeText(value).replace(/([\\[\]])/g, "\\$1");
}

function getAbsoluteUrl(pathname: string): string {
  return new URL(pathname, getBaseUrl()).toString();
}

function formatLink(title: string, pathname: string, description: string): string {
  return `- [${escapeLinkLabel(title)}](${getAbsoluteUrl(pathname)}): ${normalizeText(description)}`;
}

/**
 * 按 llms.txt 规范生成站点内容索引。
 */
export function getLlmsText(): string {
  const articleLinks = getAllPosts().map((post) =>
    formatLink(
      post.title ?? post.slug,
      `/posts/${post.slug}`,
      post.excerpt ?? post.description ?? "查看完整文章。",
    ),
  );

  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "本站内容以中文为主，文章由 Hayden Bi 撰写。优先参考文章原文中的发布日期、作者、链接和具体说明。",
    "",
    "## 主要页面",
    "",
    formatLink(
      "首页",
      "/",
      "全部已发布文章、分类筛选和站内搜索入口。",
    ),
    formatLink(
      "关于 Hayden Bi",
      "/about",
      "作者简介、独立开发经历与个人兴趣。",
    ),
    formatLink(
      "产品",
      "/product",
      "Hayden Bi 独立开发的产品与 Web 工具集合。",
    ),
    "",
    "## 文章",
    "",
    ...articleLinks,
    "",
    "## Optional",
    "",
    formatLink("友链", "/friends", "博客伙伴与相关站点集合。"),
    formatLink("RSS Feed", "/feed.xml", "全部已发布文章的 RSS 订阅源。"),
    formatLink("Sitemap", "/sitemap.xml", "站点公开页面与文章 URL 索引。"),
    "",
  ].join("\n");
}
