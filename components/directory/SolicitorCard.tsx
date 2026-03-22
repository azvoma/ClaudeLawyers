// components/directory/SolicitorCard.tsx
import Link from 'next/link';
import type { Solicitor } from '@/lib/types';
import { MapPinIcon, PhoneIcon, StarIcon } from '@/components/ui/Icons';

interface SolicitorCardProps {
  solicitor: Solicitor;
  featured?: boolean;
}

export function SolicitorCard({ solicitor, featured = false }: SolicitorCardProps) {
  const initials = solicitor.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const services = solicitor.subtypes
    ? solicitor.subtypes.split(',').slice(0, 3).map((s) => s.trim()).filter(Boolean)
    : ['Employment Law', 'Legal Services'];

  const ratingInt = solicitor.rating ? Math.round(solicitor.rating) : 0;

  return (
    <article
      className={`bg-white rounded-xl overflow-hidden transition-all duration-200 ${
        featured
          ? 'shadow-md hover:shadow-lg'
          : 'shadow-sm hover:shadow-md'
      }`}
      style={{
        border: featured ? '1px solid #d4a017' : '1px solid #e5e7eb',
        ...(featured ? { boxShadow: '0 0 0 1px #ffe08a, 0 4px 12px rgba(0,0,0,0.08)' } : {}),
      }}
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      {featured && (
        <div
          className="text-xs font-bold text-center py-1.5 tracking-widest uppercase"
          style={{ background: 'linear-gradient(90deg,#e8a900,#f0c040)', color: '#0d1a33' }}
        >
          Featured Listing
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-serif font-bold text-base"
            style={{ background: 'linear-gradient(135deg,#1a3a6b 0%,#0d1a33 100%)' }}
            aria-label={`${solicitor.name} logo`}
          >
            {solicitor.logo ? (
              <img
                src={solicitor.logo}
                alt={`${solicitor.name} logo`}
                className="w-full h-full object-contain rounded-xl"
                loading="lazy"
              />
            ) : (
              initials
            )}
          </div>

          {/* Name, rating, location */}
          <div className="flex-1 min-w-0">
            <Link href={`/solicitors/${solicitor.slug}`} itemProp="url">
              <h2
                className="font-serif font-bold text-sm leading-snug hover:underline line-clamp-2"
                style={{ color: '#0d1a33' }}
                itemProp="name"
              >
                {solicitor.name}
              </h2>
            </Link>

            {solicitor.rating && (
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex" aria-label={`${solicitor.rating} star rating`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      size={12}
                      filled={i < ratingInt}
                      style={{ color: i < ratingInt ? '#d97706' : '#d1d5db' }}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-700">{solicitor.rating.toFixed(1)}</span>
                {solicitor.reviews && (
                  <span className="text-xs text-gray-400">({solicitor.reviews} reviews)</span>
                )}
              </div>
            )}

            {solicitor.city && (
              <div
                className="flex items-center gap-1 mt-1 text-xs text-gray-500"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <MapPinIcon size={11} className="text-gray-400 flex-shrink-0" />
                <span itemProp="addressLocality">
                  {solicitor.city}{solicitor.postal_code ? `, ${solicitor.postal_code}` : ''}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {solicitor.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3" itemProp="description">
            {solicitor.description}
          </p>
        )}

        {/* Service tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {services.map((service) => (
            <span
              key={service}
              className="inline-block px-2 py-0.5 text-xs font-medium rounded"
              style={{ background: '#eef2ff', color: '#1a3a6b', border: '1px solid #c7d2fe' }}
            >
              {service}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          {solicitor.phone && (
            <a
              href={`tel:${solicitor.phone}`}
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
              style={{ color: '#1a3a6b' }}
              itemProp="telephone"
            >
              <PhoneIcon size={12} style={{ color: '#1a3a6b' }} />
              {solicitor.phone}
            </a>
          )}
          <Link
            href={`/solicitors/${solicitor.slug}`}
            className="ml-auto text-xs font-semibold text-white px-3 py-1.5 rounded-lg transition-colors"
            style={{ background: '#1a3a6b' }}
          >
            View Profile
          </Link>
        </div>
      </div>
    </article>
  );
}
