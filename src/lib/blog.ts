import { getSlugs } from "fumadocs-core/source";
import { blog as blogDocs, category as categoryDocs } from "../../.source/server";

export type BlogPost = (typeof blogDocs)[number] & { slug: string };
export type BlogCategory = (typeof categoryDocs)[number] & { slug: string };

function normalizeLabel(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

const normalizedPosts: BlogPost[] = blogDocs
  .map((post) => ({
    ...post,
    slug: getSlugs(post.info.path).join("/"),
  }))
  .filter((post) => post.published ?? true)
  .sort((a, b) => {
    const aTime = new Date(postDate(a)).getTime();
    const bTime = new Date(postDate(b)).getTime();

    if (Number.isNaN(aTime) && Number.isNaN(bTime)) return 0;
    if (Number.isNaN(aTime)) return 1;
    if (Number.isNaN(bTime)) return -1;

    return bTime - aTime;
  });

function postDate(post: { date?: string }) {
  return post.date ?? "";
}

export function getAllPosts(): BlogPost[] {
  return normalizedPosts;
}

const normalizedCategories: BlogCategory[] = categoryDocs
  .map((entry) => ({
    ...entry,
    slug: entry.name ? normalizeLabel(entry.name) : getSlugs(entry.info.path).join("/"),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function getCategories(): BlogCategory[] {
  return normalizedCategories;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const decoded = decodeURIComponent(slug);
  return normalizedPosts.find((post) => post.slug === decoded);
}

function matchesCategory(post: BlogPost, categorySlug: string) {
  const slug = normalizeLabel(decodeURIComponent(categorySlug));
  const labels = [
    ...(post.categories ?? []),
    ...(post.tags ?? []),
  ].map(normalizeLabel);

  return labels.includes(slug);
}

export function filterPostsByCategory(categorySlug: string): BlogPost[] {
  return normalizedPosts.filter((post) => matchesCategory(post, categorySlug));
}

export function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
