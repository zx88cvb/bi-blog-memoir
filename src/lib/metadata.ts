import type { Metadata } from "next";
import { getBaseUrl, getImageUrl } from "./urls";

const DEFAULT_TITLE = "Hayden Bi Blog";
const DEFAULT_DESCRIPTION =
  "Hayden Bi 的长篇笔记、部署记录和实验合集，探索独立开发与出海产品经验。";
const DEFAULT_IMAGE = "/logo.png";

type OpenGraphType = Extract<
  NonNullable<Metadata["openGraph"]>,
  { type: string }
>["type"];

type AlternateTypes = NonNullable<Metadata["alternates"]>["types"];

type ConstructMetadataOptions = {
  title?: string;
  description?: string;
  keywords?: Metadata["keywords"];
  image?: string;
  pathname?: string;
  socialTitle?: string;
  openGraphType?: OpenGraphType;
  publishedTime?: string;
  alternateTypes?: AlternateTypes;
  noIndex?: boolean;
};

/**
 * 为单语言页面构造统一的 Metadata 配置。
 */
export function constructMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = DEFAULT_IMAGE,
  pathname,
  socialTitle = title,
  openGraphType = "website",
  publishedTime,
  alternateTypes,
  noIndex = false,
}: ConstructMetadataOptions = {}): Metadata {
  const baseUrl = getBaseUrl();
  const metadataBase = new URL(baseUrl);
  const canonicalUrl = pathname
    ? new URL(pathname, metadataBase).toString()
    : undefined;
  const ogImageUrl = getImageUrl(image);
  const twitterSite = process.env.NEXT_PUBLIC_TWITTER_SITE;
  const sharedOpenGraph = {
    locale: "zh_CN",
    url: canonicalUrl,
    title: socialTitle,
    description,
    siteName: DEFAULT_TITLE,
    images: [ogImageUrl],
  };

  // 文章类型需要额外输出发布时间，其他页面保持各自的 Open Graph 类型。
  const openGraph: Metadata["openGraph"] =
    openGraphType === "article"
      ? {
          ...sharedOpenGraph,
          type: "article",
          publishedTime,
        }
      : {
          ...sharedOpenGraph,
          type: openGraphType,
        };

  return {
    title,
    description,
    keywords,
    metadataBase,
    alternates:
      canonicalUrl || alternateTypes
        ? {
            canonical: canonicalUrl,
            types: alternateTypes,
          }
        : undefined,
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImageUrl],
      site: twitterSite,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-32x32.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.webmanifest",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
