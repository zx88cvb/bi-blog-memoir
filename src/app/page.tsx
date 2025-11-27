import { Footer } from "@/components/footer";
import { formatDate, getAllPosts } from "@/lib/blog";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col min-h-screen">
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Latest posts</p>
            <h2 className="text-3xl font-serif font-medium tracking-tight text-primary">Fresh from the journal</h2>
          </div>
          <span className="text-sm text-muted-foreground">{posts.length} published</span>
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
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-white group-hover:scale-[1.02] transition-transform" />
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
