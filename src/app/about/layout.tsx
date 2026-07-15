import { constructMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { getBaseUrl } from "@/lib/urls";
import {
  ABOUT_AUTHOR,
  ABOUT_DESCRIPTION,
  ABOUT_IMAGE,
  ABOUT_TITLE,
} from "./content";

export const metadata = constructMetadata({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  keywords: ["关于", "独立开发者", "写作", "个人简介"],
  pathname: "/about",
  image: ABOUT_IMAGE,
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
  const aboutUrl = new URL("/about", getBaseUrl()).toString();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: aboutUrl,
          mainEntity: {
            "@id": `${aboutUrl}#main-author`,
            "@type": "Person",
            name: ABOUT_AUTHOR,
            url: aboutUrl,
            image: ABOUT_IMAGE,
            description: ABOUT_DESCRIPTION,
          },
        }}
      />
      {children}
    </>
  );
}
