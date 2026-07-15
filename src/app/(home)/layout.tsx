import { constructMetadata } from "@/lib/metadata";

const storeUrl = process.env.STORE_PUBLIC_SITE_URL?.replace(/\/$/, "");
const ogImage = storeUrl
  ? `${storeUrl}/share/og-image.png`
  : "/share/og-image.png";

export const metadata = constructMetadata({
  title: "Hayden Bi Blog",
  description:
    "Hayden Bi 的长篇笔记、部署记录和实验合集，探索独立开发与出海产品经验。",
  keywords: ["blog", "Next.js", "tech notes", "indie dev"],
  pathname: "/",
  image: ogImage,
  alternateTypes: {
    "application/rss+xml": [
      {
        title: "Hayden Bi Blog",
        url: "/feed.xml",
      },
    ],
  },
});

/**
 * 首页路由组布局仅负责提供首页 Metadata，不影响实际访问路径。
 */
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
