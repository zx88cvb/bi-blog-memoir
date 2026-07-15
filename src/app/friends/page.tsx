import { Footer } from "@/components/footer";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { WalineComments } from "@/components/waline-comments";
import { cn } from "@/lib/utils";
import { softSurface, softSurfaceHover } from "@/lib/ui-classes";
import { activeFriends } from "./data";

export default function FriendlyLinksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Friends</p>
          <h1 className="text-4xl font-serif font-medium text-primary">友链 / Friendly Links</h1>
          <p className="text-muted-foreground">精选伙伴站点</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeFriends.map((friend) => (
            <a
              key={friend.id}
              href={friend.url}
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
                <h3 className="font-serif text-lg font-medium text-primary transition-colors group-hover:text-black dark:group-hover:text-white">
                  {friend.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {friend.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-dashed border-neutral-200">
          <div className="flex flex-col gap-10">
             <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Apply</p>
                <h2 className="text-3xl font-serif font-medium text-primary">本站信息 / My Link Info</h2>
                <p className="text-muted-foreground">欢迎交换友链，以下是本站的信息</p>
             </div>
             
             <div className={cn(
               "flex flex-col divide-y divide-neutral-200 rounded-2xl p-6 max-w-xl dark:divide-neutral-700",
               softSurface
             )}>
                <div className="grid gap-2 py-3 sm:grid-cols-[96px_1fr] sm:items-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Name</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-primary font-medium">HaydenBi</span>
                    <CopyButton value="HaydenBi" label="Name" />
                  </div>
                </div>
                
                <div className="grid gap-2 py-3 sm:grid-cols-[96px_1fr] sm:items-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">URL</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <code className="text-xs font-mono text-neutral-700 bg-neutral-50 px-2 py-1 rounded border border-neutral-200 w-fit dark:text-neutral-200 dark:bg-neutral-800/70 dark:border-neutral-700">
                      https://haydenbi.com
                    </code>
                    <CopyButton value="https://haydenbi.com" label="URL" />
                  </div>
                </div>

                <div className="grid gap-2 py-3 sm:grid-cols-[96px_1fr] sm:items-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Avatar</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <code className="text-xs font-mono text-neutral-700 bg-neutral-50 px-2 py-1 rounded border border-neutral-200 break-all dark:text-neutral-200 dark:bg-neutral-800/70 dark:border-neutral-700">
                      https://r2.haydenbi.com/about/about.png
                    </code>
                    <CopyButton
                      value="https://r2.haydenbi.com/about/about.png"
                      label="Avatar"
                    />
                  </div>
                </div>

                <div className="grid gap-2 py-3 sm:grid-cols-[96px_1fr] sm:items-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Desc</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Coffee & Indie Developer</span>
                    <CopyButton value="Coffee & Indie Developer" label="Desc" />
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-dashed border-neutral-200">
          <WalineComments path="/friends" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
