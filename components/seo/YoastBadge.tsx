'use client';
// components/seo/YoastBadge.tsx
// Yoast-style SEO score display — shows in the page for admin review
// In production, wrap with an admin-only guard or remove from public pages
import type { YoastScore } from '@/lib/seo';

interface Props {
  score: YoastScore;
  title?: string;
}

export function YoastBadge({ score, title = 'SEO Analysis' }: Props) {
  const icons = { good: '●', improve: '●', bad: '●' };
  const colors = { good: '#22c55e', improve: '#f59e0b', bad: '#ef4444' };

  return (
    <div className="border rounded-xl overflow-hidden" style={{ borderColor: '#e5e7eb', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3" style={{ background: '#1a3a6b' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ background: score.color }}
          >
            {score.score}
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{title}</div>
            <div className="text-xs capitalize" style={{ color: '#93c5fd' }}>
              {score.rating.replace('-', ' ')} &mdash; Focus keyword: employment solicitors
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="flex items-center gap-2 hidden sm:flex">
          <div className="w-32 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div className="h-2 rounded-full transition-all" style={{ width: `${score.score}%`, background: score.color }} />
          </div>
          <span className="text-white text-xs font-mono">{score.score}/100</span>
        </div>
      </div>

      {/* Checks */}
      <div className="divide-y" style={{ background: 'white' }}>
        {score.checks.map(check => (
          <div key={check.id} className="flex items-start gap-3 px-5 py-3">
            <span className="mt-0.5 flex-shrink-0 text-base" style={{ color: colors[check.status] }}>
              {icons[check.status]}
            </span>
            <div>
              <div className="text-xs font-semibold text-gray-700">{check.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{check.message}</div>
            </div>
            <span
              className="ml-auto flex-shrink-0 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide"
              style={{
                background: check.status === 'good' ? '#dcfce7' : check.status === 'improve' ? '#fef9c3' : '#fee2e2',
                color:      check.status === 'good' ? '#16a34a' : check.status === 'improve' ? '#ca8a04' : '#dc2626',
              }}
            >
              {check.status === 'improve' ? 'OK' : check.status}
            </span>
          </div>
        ))}
      </div>

      {/* Footer summary */}
      <div className="px-5 py-3 flex items-center justify-between text-xs text-gray-400" style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <span>
          {score.checks.filter(c => c.status === 'good').length} passed &nbsp;·&nbsp;
          {score.checks.filter(c => c.status === 'improve').length} to improve &nbsp;·&nbsp;
          {score.checks.filter(c => c.status === 'bad').length} failing
        </span>
        <span style={{ color: score.color, fontWeight: 600 }}>
          {score.rating === 'excellent' ? '✓ Excellent SEO' : score.rating === 'good' ? '✓ Good SEO' : '⚠ Needs Work'}
        </span>
      </div>
    </div>
  );
}
