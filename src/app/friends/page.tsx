import { Footer } from "@/components/footer";
import friendsData from "../../../content/data/friends.json";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const storeUrl = process.env.STORE_PUBLIC_SITE_URL?.replace(/\/$/, "");
const metadataBase = baseUrl ? new URL(baseUrl) : undefined;
const ogImage = storeUrl ? `${storeUrl}/logo/og-image.png` : "/logo/og-image.png";

export const metadata: Metadata = {
  title: "友链 | Hayden Bi Blog",
  description: "精选友链与伙伴站点，按优先级与时间排序，只展示 active 的链接。",
  keywords: ["友链", "友情链接", "伙伴站点", "blogroll"],
  metadataBase,
  alternates: {
    canonical: baseUrl ? `${baseUrl}/friends` : "/friends",
  },
  openGraph: {
    title: "友链 | Hayden Bi Blog",
    description: "精选友链与伙伴站点，按优先级与时间排序，只展示 active 的链接。",
    url: baseUrl ? `${baseUrl}/friends` : "/friends",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "友链 | Hayden Bi Blog",
    description: "精选友链与伙伴站点，按优先级与时间排序，只展示 active 的链接。",
    images: [ogImage],
  },
};

type Friend = {
  id: string;
  name: string;
  url: string;
  description: string;
  avatar: string;
  status: string;
  addedDate?: string;
  order?: number;
};

export default function FriendlyLinksPage() {
  const friends = (friendsData.friends as Friend[])
    .filter((f) => f.status === "active")
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
            name: "友链 | Hayden Bi Blog",
            url: `${baseUrl}/friends`,
            description: metadata.description,
            hasPart: friends.map((friend) => ({
              "@type": "Person",
              name: friend.name,
              url: friend.url,
              description: friend.description,
            })),
          }}
        />
      )}
      <div className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Friends</p>
          <h1 className="text-4xl font-serif font-medium text-primary">友链 / Friendly Links</h1>
          <p className="text-muted-foreground">精选伙伴站点</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {friends.map((friend) => (
            <a
              key={friend.id}
              href={friend.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="relative h-14 w-14 overflow-hidden rounded-full bg-neutral-100 border border-neutral-100">
                  <Image
                    src={friend.avatar}
                    alt={friend.name}
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
                <h3 className="font-serif text-lg font-medium text-primary group-hover:text-black transition-colors">
                  {friend.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {friend.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
