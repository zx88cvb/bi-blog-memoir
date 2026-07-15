import { constructMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/blog";

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
export default function PostLayout({ children }: LayoutProps) {
  return children;
}
