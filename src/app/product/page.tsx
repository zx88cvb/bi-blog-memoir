import { Footer } from "@/components/footer";
import productData from "../../../content/data/product.json";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { cn } from "@/lib/utils";
import { softSurface, softSurfaceHover } from "@/lib/ui-classes";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const storeUrl = process.env.STORE_PUBLIC_SITE_URL?.replace(/\/$/, "");
const metadataBase = baseUrl ? new URL(baseUrl) : undefined;
const ogImage = storeUrl ? `${storeUrl}/share/og-image.png` : "/share/og-image.png";
const twitterSite = process.env.NEXT_PUBLIC_TWITTER_SITE;

export const metadata: Metadata = {
  title: "产品 | Hayden Bi Blog",
  description: "个人独立开发的产品与工具集合。",
  keywords: ["产品", "工具", "独立开发", "Projects", "Tools"],
  metadataBase,
  alternates: {
    canonical: baseUrl ? `${baseUrl}/product` : "/product",
  },
  openGraph: {
    title: "产品 | Hayden Bi Blog",
    description: "个人独立开发的产品与工具集合。",
    url: baseUrl ? `${baseUrl}/product` : "/product",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    site: twitterSite,
    title: "产品 | Hayden Bi Blog",
    description: "个人独立开发的产品与工具集合。",
    images: [ogImage],
  },
};

type Product = {
  id: string;
  name: string;
  url: string;
  description: string;
  avatar: string;
  status: string;
  addedDate?: string;
  order?: number;
};

export default function ProductPage() {
  const products = (productData.friends as Product[])
    .filter((p) => p.status === "active")
    .sort((a, b) => {
      const orderA = a.order ?? Number.POSITIVE_INFINITY;
      const orderB = b.order ?? Number.POSITIVE_INFINITY;
      if (orderA !== orderB) return orderA - orderB;

      const timeA = a.addedDate ? new Date(a.addedDate).getTime() : 0;
      const timeB = b.addedDate ? new Date(b.addedDate).getTime() : 0;
      return timeB - timeA;
    });

  return (
    <div className="flex flex-col min-h-screen">
      {baseUrl && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "产品 | Hayden Bi Blog",
            url: `${baseUrl}/product`,
            description: metadata.description,
            hasPart: products.map((product) => ({
              "@type": "SoftwareApplication",
              name: product.name,
              url: product.url,
              description: product.description,
              applicationCategory: "UtilityApplication",
            })),
          }}
        />
      )}
      <div className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Products</p>
          <h1 className="text-4xl font-serif font-medium text-primary">产品 / Products</h1>
          <p className="text-muted-foreground">个人独立开发的产品与工具</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex flex-col gap-4 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:shadow-none",
                softSurface,
                softSurfaceHover
              )}
            >
              <div className="flex items-center justify-between">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-neutral-100 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
                  <Image
                    src={product.avatar}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="56px"
                    unoptimized
                  />
                </div>
                <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                   <ArrowUpRight className="h-5 w-5 text-neutral-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-medium text-primary transition-colors group-hover:text-black dark:group-hover:text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* <div className="mt-16 pt-10 border-t border-dashed border-neutral-200">
          <WalineComments path="/product" />
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
