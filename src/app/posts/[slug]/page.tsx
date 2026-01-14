import { Footer } from "@/components/footer";
import { ArrowLeft } from "lucide-react";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { TOC } from "@/components/toc";
import { getMDXComponents } from '@/lib/mdx-components';
import { WalineComments } from "@/components/waline-comments";
import { ShareMenu } from "@/components/share-menu";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Normalize site URL once for canonical/meta usage.
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const metadataBase = baseUrl ? new URL(baseUrl) : undefined;

export function generateStaticParams() {
  // Pre-render all known post routes.
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Build per-post SEO metadata from frontmatter.
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} | HaydenBi`,
    description: post.excerpt ?? post.description,
    keywords: post.tags?.join(", "),
    metadataBase,
    alternates: {
      canonical: baseUrl ? `${baseUrl}/posts/${slug}` : `/posts/${slug}`,
    },
    openGraph: {
      title: post.title ?? post.slug,
      description: post.excerpt ?? post.description,
      url: baseUrl ? `${baseUrl}/posts/${slug}` : `/posts/${slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title ?? post.slug,
      description: post.excerpt ?? post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = baseUrl ? `${baseUrl}/posts/${slug}` : `/posts/${slug}`;
  const shareText = post.title ?? post.slug;

  // Rendered MDX component for the post body.
  const MDXContent = post.body;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-10 flex-1">
        <div className="max-w-5xl mx-auto mb-10">
          {/* Structured data for richer search previews. */}
          {baseUrl && (
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title ?? post.slug,
                description: post.excerpt ?? post.description,
                datePublished: post.date,
                author: post.author ? { "@type": "Person", name: post.author } : undefined,
                image: post.image,
                url: canonicalUrl,
              }}
            />
          )}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            <div className="text-xs text-neutral-600 font-medium">
              {formatDate(post.date)}
              {post.author ? ` · ${post.author}` : ""}
            </div>
          </div>

          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {post.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <ShareMenu
                canonicalUrl={canonicalUrl}
                shareText={shareText}
                className="relative ml-auto z-20"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-primary leading-tight">
              {post.title ?? post.slug}
            </h1>
            {post.image && (
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-neutral-200">
                <Image
                  src={post.image}
                  alt={post.title ?? post.slug}
                  fill
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10 max-w-5xl mx-auto">
          <div className="min-w-0">
            <article className="prose prose-neutral dark:prose-invert max-w-none mb-16">
              <MDXContent components={getMDXComponents()} />
            </article>
            <WalineComments path={`/posts/${slug}`} />
          </div>
          
          <aside className="hidden lg:block">
            {/* Table of contents for large screens. */}
            <TOC toc={(post).toc} />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
