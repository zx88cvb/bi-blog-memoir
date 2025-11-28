import { Footer } from "@/components/footer";
import Image from "next/image";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const metadataBase = baseUrl ? new URL(baseUrl) : undefined;
const aboutImage = baseUrl ? `${baseUrl}/about/about.png` : "https://r2.haydenbi.com/about/about.png";

export const metadata: Metadata = {
  title: "关于我 | Hayden Bi Blog",
  description: "了解博主 Hayden Bi：独立开发者、写作者，分享实践笔记与构建心得。",
  keywords: ["关于", "独立开发者", "写作", "个人简介"],
  metadataBase,
  alternates: {
    canonical: baseUrl ? `${baseUrl}/about` : "/about",
  },
  openGraph: {
    title: "关于我 | Hayden Bi Blog",
    description: "了解博主 Hayden Bi：独立开发者、写作者，分享实践笔记与构建心得。",
    url: baseUrl ? `${baseUrl}/about` : "/about",
    type: "profile",
    images: [aboutImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "关于我 | Hayden Bi Blog",
    description: "了解博主 Hayden Bi：独立开发者、写作者，分享实践笔记与构建心得。",
    images: [aboutImage],
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {baseUrl && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Hayden Bi",
            url: `${baseUrl}/about`,
            image: aboutImage,
            description: metadata.description,
          }}
        />
      )}
      <div className="container mx-auto px-4 py-12 max-w-5xl flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
              Who&apos;s writing
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-primary">
              Hey, I&apos;m Hayden Bi.
            </h1>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                我是一名独立开发者，正在尝试把产品做向全球市场，也是一位咖啡研究者，记录风味与冲煮实验。
              </p>
              <p>
                平时喜欢电影、游戏和绘画，这些灵感常常会变成产品灵感或文章。这里分享我在出海开发、个人成长和生活兴趣里的实践笔记。
              </p>
            </div>

            {/* <div className="pt-4">
              Signature placeholder - using text for now, could be an image
              <div className="font-cursive text-4xl text-primary" style={{ fontFamily: 'cursive' }}>
                Hayden Bi
              </div>
            </div> */}
          </div>

          {/* Right Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-200">
            <Image
              src="https://r2.haydenbi.com/about/about.png"
              alt="Portrait of Hayden Bi"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
