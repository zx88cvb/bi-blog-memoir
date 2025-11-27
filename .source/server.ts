// @ts-nocheck
import * as __fd_glob_8 from "../content/category/nodejs.mdx?collection=category"
import * as __fd_glob_7 from "../content/category/java.mdx?collection=category"
import * as __fd_glob_6 from "../content/category/dokploy.mdx?collection=category"
import * as __fd_glob_5 from "../content/category/apple.mdx?collection=category"
import * as __fd_glob_4 from "../content/blog/vercel-deploy-multiple-project.mdx?collection=blog"
import * as __fd_glob_3 from "../content/blog/using-google-analytics-with-next.js.mdx?collection=blog"
import * as __fd_glob_2 from "../content/blog/SpringAI-ollama-qwen3-error.md?collection=blog"
import * as __fd_glob_1 from "../content/blog/MacOS26-ClashXPro-Cannot-Open.mdx?collection=blog"
import * as __fd_glob_0 from "../content/blog/Dokploy-install-deploy.mdx?collection=blog"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const author = await create.doc("author", "content/author", {});

export const blog = await create.doc("blog", "content/blog", {"Dokploy-install-deploy.mdx": __fd_glob_0, "MacOS26-ClashXPro-Cannot-Open.mdx": __fd_glob_1, "SpringAI-ollama-qwen3-error.md": __fd_glob_2, "using-google-analytics-with-next.js.mdx": __fd_glob_3, "vercel-deploy-multiple-project.mdx": __fd_glob_4, });

export const category = await create.doc("category", "content/category", {"apple.mdx": __fd_glob_5, "dokploy.mdx": __fd_glob_6, "java.mdx": __fd_glob_7, "nodejs.mdx": __fd_glob_8, });

export const pages = await create.doc("pages", "content/pages", {});