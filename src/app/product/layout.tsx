import { constructMetadata } from "@/lib/metadata";

const storeUrl = process.env.STORE_PUBLIC_SITE_URL?.replace(/\/$/, "");
const ogImage = storeUrl
  ? `${storeUrl}/share/og-image.png`
  : "/share/og-image.png";

export const metadata = constructMetadata({
  title: "产品 | Hayden Bi Blog",
  description: "个人独立开发的产品与工具集合。",
  keywords: ["产品", "工具", "独立开发", "Projects", "Tools"],
  pathname: "/product",
  image: ogImage,
});

/**
 * 产品路由布局仅负责提供页面级 Metadata。
 */
export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
