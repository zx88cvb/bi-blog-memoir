import { Footer } from "@/components/footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我 | Hayden Bi Blog",
  description: "了解博主 Hayden Bi：独立开发者、写作者，分享实践笔记与构建心得。",
  keywords: ["关于", "独立开发者", "写作", "个人简介"],
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
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
                I&apos;m a writer and digital creator sharing what I learn about building an
                independent career online. Most of what I publish comes from testing
                ideas, making mistakes, and finding what works—one project at a time.
              </p>
              <p>
                I started out writing as a side project, but after a few small wins (and a
                lot of failures), I turned it into my main thing. Now I focus on helping
                other creators do the same, without the hype or sugarcoating.
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
