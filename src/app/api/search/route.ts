import { source } from '@/lib/source';
import { createFromSource, createSearchAPI } from 'fumadocs-core/search/server';

// export const { GET } = createFromSource(source, {
//   // https://docs.orama.com/docs/orama-js/supported-languages
//   language: 'English',
// });

export const { GET } = createSearchAPI('advanced', {
  language: 'english',
  indexes: source.getPages().map((page) => ({
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    id: page.url,
    structuredData: page.data.structuredData,
  })),
});