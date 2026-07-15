import type { MetadataRoute } from 'next';

/**
 * 生成站点的 Web App Manifest。
 *
 * Next.js 会将该配置输出为根路径下的 manifest.webmanifest。
 *
 * @returns {MetadataRoute.Manifest} 单语言站点的 Manifest 配置
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hayden Bi",
    short_name: "Hayden Bi",
    description: "Coffee & Indie Developer",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
