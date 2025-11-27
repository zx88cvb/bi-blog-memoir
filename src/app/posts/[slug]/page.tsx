import { Footer } from "@/components/footer";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} | HaydenBi`,
    description: post.excerpt ?? post.description,
    keywords: post.tags?.join(', '),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const MDXContent = post.body;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-10 max-w-3xl flex-1">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-neutral-200/60 px-4 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-200 transition-colors"
          >
            Back
          </Link>
          <div className="text-xs text-neutral-600 font-medium">
            {formatDate(post.date)}
            {post.author ? ` · ${post.author}` : ""}
          </div>
        </div>

        <header className="mb-10 space-y-4">
          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-primary leading-tight">
            {post.title ?? post.slug}
          </h1>
          {post.image && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-200">
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

        <article className="prose prose-neutral dark:prose-invert max-w-none mb-16">
          <MDXContent />
        </article>
      </div>
      <Footer />
    </div>
  );
}
