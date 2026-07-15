import { constructMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { getBaseUrl } from "@/lib/urls";
import { HOME_DESCRIPTION, HOME_TITLE } from "./content";

const storeUrl = process.env.STORE_PUBLIC_SITE_URL?.replace(/\/$/, "");
const ogImage = storeUrl
  ? `${storeUrl}/share/og-image.png`
  : "/share/og-image.png";

export const metadata = constructMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
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
  const homeUrl = new URL("/", getBaseUrl()).toString();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: homeUrl,
          name: HOME_TITLE,
          description: HOME_DESCRIPTION,
        }}
      />
      {children}
    </>
  );
}
