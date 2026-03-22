// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllSolicitors, getAllCities } from '@/lib/solicitors';
import { DOMAIN } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const solicitors = getAllSolicitors();
  const cities     = getAllCities();
  const today      = new Date();

  // ── Static pages ─────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url:             DOMAIN,
      lastModified:    today,
      changeFrequency: 'weekly',
      priority:        1.0,
    },
    {
      url:             `${DOMAIN}/solicitors`,
      lastModified:    today,
      changeFrequency: 'daily',
      priority:        0.9,
    },
    {
      url:             `${DOMAIN}/search`,
      lastModified:    today,
      changeFrequency: 'weekly',
      priority:        0.7,
    },
    {
      url:             `${DOMAIN}/about`,
      lastModified:    today,
      changeFrequency: 'monthly',
      priority:        0.5,
    },
    {
      url:             `${DOMAIN}/contact`,
      lastModified:    today,
      changeFrequency: 'monthly',
      priority:        0.5,
    },
    {
      url:             `${DOMAIN}/privacy`,
      lastModified:    today,
      changeFrequency: 'yearly',
      priority:        0.3,
    },
    {
      url:             `${DOMAIN}/terms`,
      lastModified:    today,
      changeFrequency: 'yearly',
      priority:        0.3,
    },
  ];

  // ── City pages — high local SEO value ────────────────────────────────────
  // These capture "employment solicitors [city]" searches
  const cityPages: MetadataRoute.Sitemap = cities.map(city => ({
    url:             `${DOMAIN}/solicitors?city=${encodeURIComponent(city)}`,
    lastModified:    today,
    changeFrequency: 'weekly' as const,
    priority:        0.85,
  }));

  // ── Individual listing pages — 330 unique pages ──────────────────────────
  // Higher priority for well-rated firms (more likely to rank)
  const listingPages: MetadataRoute.Sitemap = solicitors.map(s => ({
    url:             `${DOMAIN}/solicitors/${s.slug}`,
    lastModified:    today,
    changeFrequency: 'monthly' as const,
    priority:        s.rating && s.rating >= 4.5 && s.reviews && s.reviews >= 10
                       ? 0.8   // High-quality listings
                       : s.rating && s.rating >= 4.0
                       ? 0.7   // Good listings
                       : 0.6,  // Standard listings
  }));

  return [...staticPages, ...cityPages, ...listingPages];
}
