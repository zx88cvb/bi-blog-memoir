import {
  defineCollections,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

/**
 * Pages, like privacy policy, terms of service, etc.
 *
 * title is required, but description is optional in frontmatter
 */
export const pages = defineCollections({
  type: 'doc',
  dir: 'content/pages',
  schema: frontmatterSchema.extend({
    date: z.string().date(),
    published: z.boolean().default(true),
  }),
});

/**
 * Blog authors
 *
 * description is optional in frontmatter, but we must add it to the schema
 */
export const author = defineCollections({
  type: 'doc',
  dir: 'content/author',
  schema: z.object({
    name: z.string(),
    avatar: z.string(),
    description: z.string().optional(),
  }),
});

/**
 * Blog categories
 *
 * description is optional in frontmatter, but we must add it to the schema
 */
export const category = defineCollections({
  type: 'doc',
  dir: 'content/category',
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

/**
 * Blog posts
 *
 * title is required, but description is optional in frontmatter
 */
export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    date: z.string().date(),
    published: z.boolean().default(true),
    premium: z.boolean().optional(),
    categories: z.array(z.string()).optional(),
    author: z.string().optional(),
  }),
});
