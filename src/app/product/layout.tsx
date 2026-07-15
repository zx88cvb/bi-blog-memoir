import { constructMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/json-ld";
import { getBaseUrl } from "@/lib/urls";
import {
  activeProducts,
  PRODUCT_DESCRIPTION,
  PRODUCT_TITLE,
} from "./data";

const storeUrl = process.env.STORE_PUBLIC_SITE_URL?.replace(/\/$/, "");
const ogImage = storeUrl
  ? `${storeUrl}/share/og-image.png`
  : "/share/og-image.png";

export const metadata = constructMetadata({
  title: PRODUCT_TITLE,
  description: PRODUCT_DESCRIPTION,
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
  const productUrl = new URL("/product", getBaseUrl()).toString();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: PRODUCT_TITLE,
          url: productUrl,
          description: PRODUCT_DESCRIPTION,
          hasPart: activeProducts.map((product) => ({
            "@type": "SoftwareApplication",
            name: product.name,
            url: product.url,
            description: product.description,
            image: product.avatar,
          })),
        }}
      />
      {children}
    </>
  );
}
