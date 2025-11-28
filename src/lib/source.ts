import { blog } from '../../.source/server';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { loader } from 'fumadocs-core/source';

const basePath = '/posts';

// blog is a doc collection (not docs), so we need to convert it using toFumadocsSource
export const blogSource = loader({
  baseUrl: basePath,
  source: toFumadocsSource(blog, []),
});

// Alias for existing imports
export const source = blogSource;
