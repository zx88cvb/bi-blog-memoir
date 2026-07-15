import { constructMetadata } from "@/lib/metadata";

const storeUrl = process.env.STORE_PUBLIC_SITE_URL?.replace(/\/$/, "");
const ogImage = storeUrl
  ? `${storeUrl}/share/og-image.png`
  : "/share/og-image.png";

export const metadata = constructMetadata({
  title: "友链 | Hayden Bi Blog",
  description: "精选友链与伙伴站点，按优先级与时间排序，只展示 active 的链接。",
  keywords: ["友链", "友情链接", "伙伴站点", "blogroll"],
  pathname: "/friends",
  image: ogImage,
});

/**
 * 友链路由布局仅负责提供页面级 Metadata。
 */
export default function FriendsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
