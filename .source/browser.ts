// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  author: create.doc("author", {}),
  blog: create.doc("blog", {"Dokploy-install-deploy.mdx": () => import("../content/blog/Dokploy-install-deploy.mdx?collection=blog"), "MacOS26-ClashXPro-Cannot-Open.mdx": () => import("../content/blog/MacOS26-ClashXPro-Cannot-Open.mdx?collection=blog"), "SpringAI-ollama-qwen3-error.md": () => import("../content/blog/SpringAI-ollama-qwen3-error.md?collection=blog"), "using-google-analytics-with-next.js.mdx": () => import("../content/blog/using-google-analytics-with-next.js.mdx?collection=blog"), "vercel-deploy-multiple-project.mdx": () => import("../content/blog/vercel-deploy-multiple-project.mdx?collection=blog"), }),
  category: create.doc("category", {}),
  pages: create.doc("pages", {}),
};
export default browserCollections;