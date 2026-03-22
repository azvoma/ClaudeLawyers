// app/robots.ts
import type { MetadataRoute } from 'next';
import { DOMAIN } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent:  '*',
        allow:      '/',
        disallow:   [
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
      {
        // Block AI scrapers from data-heavy pages
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'Google-Extended'],
        disallow:  '/solicitors/',
      },
    ],
    sitemap: `${DOMAIN}/sitemap.xml`,
    host:    DOMAIN,
  };
}
