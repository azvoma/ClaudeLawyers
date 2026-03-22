// lib/solicitors.ts
import type { Solicitor, WorkingHours } from './types';
import rawData from '../data/solicitors.json';

const allSolicitors: Solicitor[] = rawData as Solicitor[];

export function getAllSolicitors(): Solicitor[] {
  return allSolicitors;
}

export function getSolicitorBySlug(slug: string): Solicitor | undefined {
  return allSolicitors.find((s) => s.slug === slug);
}

export function getSolicitorsByCity(city: string): Solicitor[] {
  return allSolicitors.filter(
    (s) => s.city?.toLowerCase() === city.toLowerCase()
  );
}

export function getAllCities(): string[] {
  const cities = allSolicitors
    .map((s) => s.city)
    .filter((c): c is string => !!c);
  return [...new Set(cities)].sort();
}

export function getCityCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  allSolicitors.forEach((s) => {
    if (s.city) counts[s.city] = (counts[s.city] || 0) + 1;
  });
  return counts;
}

export function getTopCities(limit = 20): { city: string; count: number }[] {
  const counts = getCityCounts();
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([city, count]) => ({ city, count }));
}

export function searchSolicitors(query: string, city?: string): Solicitor[] {
  const q = query.toLowerCase();
  return allSolicitors.filter((s) => {
    const matchesQuery =
      !query ||
      s.name?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.subtypes?.toLowerCase().includes(q) ||
      s.address?.toLowerCase().includes(q);
    const matchesCity =
      !city || s.city?.toLowerCase() === city.toLowerCase();
    return matchesQuery && matchesCity;
  });
}

export function parseWorkingHours(csv: string | null): WorkingHours[] {
  if (!csv) return [];
  return csv.split('|').map((entry) => {
    const parts = entry.split(',');
    if (parts.length >= 3) {
      return { day: parts[0], open: parts[1], close: parts[2], closed: false };
    }
    return { day: parts[0], open: '', close: '', closed: true };
  });
}

export function getStarRating(rating: number | null): string {
  if (!rating) return '';
  return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
}

export function formatPhone(phone: string | null): string {
  if (!phone) return '';
  return phone.replace(/\s+/g, ' ').trim();
}

// SEO helpers
export function generateSlug(name: string, city: string | null): string {
  const base = city ? `${name}-${city}` : name;
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getSolicitorServices(solicitor: Solicitor): string[] {
  const defaultServices = [
    'Unfair Dismissal Claims',
    'Employment Tribunal Representation',
    'Redundancy & Settlement Agreements',
    'Discrimination Claims',
    'Whistleblowing Advice',
    'Contract Review',
  ];
  if (!solicitor.subtypes) return defaultServices;
  const subtypeServices = solicitor.subtypes.split(',').map((s) => s.trim());
  return subtypeServices.length > 1 ? subtypeServices : defaultServices;
}
