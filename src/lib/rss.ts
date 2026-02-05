import { Feed } from 'feed';
import { source } from '@/lib/source';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export function getRSS() {
  const pages = [...source.getPages()].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  const latestDate = pages[0]?.data?.date ? new Date(pages[0].data.date) : undefined;

  const feed = new Feed({
    title: 'HaydenBi Blog',
    id: `${baseUrl}`,
    link: `${baseUrl}`,
    description: 'Hayden Bi 的长篇笔记、部署记录和实验合集，探索独立开发与出海产品经验。',
    language: 'zh-CN',
    image: `${baseUrl}/logo.png`,
    favicon: `${baseUrl}/logo.png`,
    copyright: 'All rights reserved 2025, HaydenBi',
    updated: latestDate,
    author: {
      name: 'HaydenBi',
    },
  });

  for (const page of pages) {
    feed.addItem({
      id: page.url,
      title: page.data.title,
      description: page.data.excerpt,
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
