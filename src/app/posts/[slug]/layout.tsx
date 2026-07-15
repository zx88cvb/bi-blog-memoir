import { constructMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";
import { getBaseUrl } from "@/lib/urls";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: LayoutProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // 无效文章不应被搜索引擎收录。
  if (!post) {
    return constructMetadata({
      title: "文章不存在 | Hayden Bi Blog",
      pathname: `/posts/${slug}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${post.title} | HaydenBi`,
    socialTitle: post.title ?? post.slug,
    description: post.excerpt ?? post.description,
    keywords: post.tags,
    pathname: `/posts/${slug}`,
    image: post.image,
    openGraphType: "article",
    publishedTime: post.date,
  });
}

/**
 * 动态文章布局负责生成文章级 Metadata，并透传文章内容。
 */
export default async function PostLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return children;

  const postUrl = new URL(`/posts/${slug}`, getBaseUrl()).toString();
  const aboutUrl = new URL("/about", getBaseUrl()).toString();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title ?? post.slug,
          description: post.excerpt ?? post.description,
          datePublished: post.date,
          image: post.image,
          url: postUrl,
          author: {
            "@id": `${aboutUrl}#main-author`,
            "@type": "Person",
            name: post.author ?? "Hayden Bi",
            url: aboutUrl,
          },
        }}
      />
      {children}
    </>
  );
}
