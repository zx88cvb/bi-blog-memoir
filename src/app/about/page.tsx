import { Footer } from "@/components/footer";
import Image from "next/image";
import { ABOUT_IMAGE } from "./content";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
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

          {/* 右侧图片 */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-200">
            <Image
              src={ABOUT_IMAGE}
              alt="Portrait of Hayden Bi"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      {/* <div className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="border-t border-dashed border-neutral-200 pt-10">
          <WalineComments path="/about" />
        </div>
      </div> */}
      <Footer />
    </div>
  );
}
