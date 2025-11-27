// source.config.ts
import {
  defineCollections,
  frontmatterSchema
} from "fumadocs-mdx/config";
import { z } from "zod";
var pages = defineCollections({
  type: "doc",
  dir: "content/pages",
  schema: frontmatterSchema.extend({
    date: z.string().date(),
    published: z.boolean().default(true)
  })
});
var author = defineCollections({
  type: "doc",
  dir: "content/author",
  schema: z.object({
    name: z.string(),
    avatar: z.string(),
    description: z.string().optional()
  })
});
var category = defineCollections({
  type: "doc",
  dir: "content/category",
  schema: z.object({
    name: z.string(),
    description: z.string().optional()
  })
});
var blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    date: z.string().date(),
    published: z.boolean().default(true),
    premium: z.boolean().optional(),
    categories: z.array(z.string()).optional(),
    author: z.string().optional()
  })
});
export {
  author,
  blog,
  category,
  pages
};
