import { constructMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { getBaseUrl } from "@/lib/urls";
import {
  activeFriends,
  FRIENDS_DESCRIPTION,
  FRIENDS_TITLE,
} from "./data";

const storeUrl = process.env.STORE_PUBLIC_SITE_URL?.replace(/\/$/, "");
const ogImage = storeUrl
  ? `${storeUrl}/share/og-image.png`
  : "/share/og-image.png";

export const metadata = constructMetadata({
  title: FRIENDS_TITLE,
  description: FRIENDS_DESCRIPTION,
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
  const friendsUrl = new URL("/friends", getBaseUrl()).toString();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: FRIENDS_TITLE,
          url: friendsUrl,
          description: FRIENDS_DESCRIPTION,
          hasPart: activeFriends.map((friend) => ({
            "@type": "WebSite",
            name: friend.name,
            url: friend.url,
            description: friend.description,
          })),
        }}
      />
      {children}
    </>
  );
}
