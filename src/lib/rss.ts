import { Feed } from 'feed';
import { source } from '@/lib/source';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export function getRSS() {
  const feed = new Feed({
    title: 'HaydenBi Blog',
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    language: 'zh-CN',

    image: `${baseUrl}/logo.png`,
    favicon: `${baseUrl}/logo.png`,
    copyright: 'All rights reserved 2025, HaydenBi',
  });

  for (const page of source.getPages()) {
    feed.addItem({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      image: page.data.image,
      link: `${baseUrl}${page.url}`,
      date: new Date(page.data.date),

      author: [
        {
          name: 'HaydenBi',
        },
      ],
    });
  }

  return feed.rss2();
}