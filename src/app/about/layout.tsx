import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "关于我 | Hayden Bi Blog",
  description: "了解博主 Hayden Bi：独立开发者、写作者，分享实践笔记与构建心得。",
  keywords: ["关于", "独立开发者", "写作", "个人简介"],
  pathname: "/about",
  image: "https://r2.haydenbi.com/about/about.png",
  openGraphType: "profile",
});

/**
 * About 路由布局仅负责提供页面级 Metadata，不改变页面结构。
 */
export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
