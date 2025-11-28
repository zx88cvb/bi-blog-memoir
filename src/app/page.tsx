import { Footer } from "@/components/footer";
import { filterPostsByCategory, formatDate, getAllPosts, getCategories } from "@/lib/blog";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const metadataBase = baseUrl ? new URL(baseUrl) : undefined;
const ogImage = baseUrl ? `${baseUrl}/logo.png` : "/logo.png";

export const metadata: Metadata = {
  title: "Hayden Bi Blog",
  description: "Hayden Bi 的长篇笔记、部署记录和实验合集，探索独立开发与出海产品经验。",
  keywords: ["blog", "Next.js", "tech notes", "indie dev"],
  metadataBase,
  alternates: {
    canonical: baseUrl ? `${baseUrl}/` : "/",
  },
  openGraph: {
    title: "Hayden Bi Blog",
    description: "Hayden Bi 的长篇笔记、部署记录和实验合集，探索独立开发与出海产品经验。",
    url: baseUrl ? `${baseUrl}/` : "/",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayden Bi Blog",
    description: "Hayden Bi 的长篇笔记、部署记录和实验合集，探索独立开发与出海产品经验。",
    images: [ogImage],
  },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  const { category, q } = await searchParams;
  const categories = getCategories();
  const selectedCategory = Array.isArray(category) ? category[0] : category;
  const query = Array.isArray(q) ? q[0]?.trim() ?? "" : q?.trim() ?? "";
  const allPosts = getAllPosts();
  const postsByCategory = selectedCategory ? filterPostsByCategory(selectedCategory) : allPosts;
  const posts = query
    ? postsByCategory.filter((post) => {
        const haystack = [
          post.title,
          post.excerpt,
          post.description,
          ...(post.tags ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(query.toLowerCase());
      })
    : postsByCategory;

  const buildHref = (nextCategory?: string) => {
    const params = new URLSearchParams();
    if (nextCategory) params.set("category", nextCategory);
    if (query) params.set("q", query);
    const search = params.toString();
    return search ? `/?${search}` : "/";
  };

  return (
    <div className="flex flex-col min-h-screen">
      {baseUrl && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: `${baseUrl}/`,
            name: "Hayden Bi Blog",
            description: metadata.description,
            potentialAction: {
              "@type": "SearchAction",
              target: `${baseUrl}/?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
      )}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm">
          Personal notes & build log
        </div>
        <h1 className="max-w-3xl text-5xl font-serif font-medium tracking-tight text-primary sm:text-6xl mb-6">
          Posts from the desk of <span className="italic font-serif">Bi</span>.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          Long-form pieces, deployment notes, and experiments—pulled straight from the content/blog folder.
        </p>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-5xl flex-1">
        <div className="flex justify-center mb-10">
          <form action="/" method="get" className="relative">
            {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              name="q"
              placeholder="Search..."
              defaultValue={query}
              className="w-64 rounded-full bg-white pl-9 border-transparent shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300 focus:bg-white transition-all"
            />
          </form>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Latest posts</p>
            <h2 className="text-3xl font-serif font-medium tracking-tight text-primary">Fresh from the journal</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground whitespace-nowrap">{posts.length} published</span>
          </div>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <CategoryPill href={buildHref()} active={!selectedCategory} label="All" />
          {categories.map((cat) => {
            const href = buildHref(cat.slug);
            return (
              <CategoryPill
                key={cat.slug}
                href={href}
                label={cat.name}
                active={selectedCategory === cat.slug}
              />
            );
          })}
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts available yet. Add an MDX/MD file to content/blog to get started.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const summary = post.excerpt ?? post.description ?? "";
              return (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group block bg-white rounded-2xl p-2 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200 relative mb-4">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title ?? post.slug}
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-white group-hover:scale-[1.02] transition-transform" />
                    )}
                  </div>
                  <div className="px-2 pb-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                      <span>{formatDate(post.date) || "—"}</span>
                      {post.tags?.[0] && <span className="truncate max-w-[8rem] text-right">{post.tags[0]}</span>}
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold leading-tight tracking-tight text-primary group-hover:underline">
                        {post.title ?? post.slug}
                      </h3>
                      <span className="rounded-full bg-neutral-100 p-1 group-hover:bg-neutral-200 transition-colors">
                        <ArrowRight className="h-4 w-4 text-neutral-500" />
                      </span>
                    </div>
                    {summary && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {summary}
                      </p>
                    )}
                    {/* <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      {post.author && <span>{post.author}</span>}
                      {post.author && <span>•</span>}
                      <span className="truncate">{formatDate(post.date)}</span>
                    </div> */}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

type CategoryPillProps = {
  href: string;
  label: string;
  active?: boolean;
};

function CategoryPill({ href, label, active }: CategoryPillProps) {
  return (
    <Link
      href={href}
      scroll={false}
      className={[
        "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "bg-black text-white border-black shadow-sm"
          : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
