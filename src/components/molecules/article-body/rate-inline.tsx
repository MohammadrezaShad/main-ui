'use client';

import React, {useId} from 'react';

type Variant = 'drop' | 'star';
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/* ---------- icons (same look as your node view) ---------- */

const ICON_SIZE = 24;

/** Water drop with bottom→top partial fill */
function WaterDropIcon({
  fraction, // 0..1
  idSeed,
  fill = '#44BAEB',
  outline = '#44BAEB',
  empty = 'transparent',
  size = ICON_SIZE,
}: {
  fraction: number;
  idSeed: string;
  fill?: string;
  outline?: string;
  empty?: string;
  size?: number;
}) {
  const VB = 24;
  const f = clamp(fraction, 0, 1);
  const h = VB * f;
  const y = VB - h;
  const clipId = `${idSeed}-drop`;

  const d =
    'M12.61 2.21C12.25 1.93 11.75 1.93 11.39 2.21C9.49 3.66 3.88 8.39 3.91 13.9C3.91 18.36 7.54 22 12.01 22C16.48 22 20.11 18.37 20.11 13.91C20.12 8.48 14.5 3.67 12.61 2.21Z';

  return (
    <svg width={size} height={size} viewBox='0 0 24 24' aria-hidden style={{display: 'block'}}>
      <defs>
        <clipPath id={clipId}>
          <rect x='0' y={y} width={VB} height={h} />
        </clipPath>
      </defs>
      <path d={d} fill={empty} stroke={outline} strokeWidth='1' />
      <g clipPath={`url(#${clipId})`}>
        <path d={d} fill={fill} />
      </g>
    </svg>
  );
}

/** Star with left→right partial fill */
function StarIcon({
  fraction, // 0..1
  idSeed,
  fill = '#FFC107',
  outline = '#E0B400',
  empty = 'transparent',
  size = ICON_SIZE,
}: {
  fraction: number;
  idSeed: string;
  fill?: string;
  outline?: string;
  empty?: string;
  size?: number;
}) {
  const VB = 24;
  const w = VB * clamp(fraction, 0, 1);
  const clipId = `${idSeed}-star`;

  const d =
    'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z';

  return (
    <svg width={size} height={size} viewBox='0 0 24 24' aria-hidden style={{display: 'block'}}>
      <defs>
        <clipPath id={clipId}>
          <rect x='0' y='0' width={w} height={VB} />
        </clipPath>
      </defs>
      <path d={d} fill={empty} stroke={outline} strokeWidth='1' strokeLinejoin='round' />
      <g clipPath={`url(#${clipId})`}>
        <path d={d} fill={fill} />
      </g>
    </svg>
  );
}

/* ---------- public component ---------- */

export default function RatingInline({
  rating,
  variant = 'drop',
  max, // optional override (default: 10 drops, 5 stars)
  size = 32,
  gap = 2,
  showValue = true, // small "7.22/10" number at the end
  precision = 2,
  dropColor = '#44BAEB',
  starFill = '#FFC107',
  emptyStroke = variant === 'drop' ? '#44BAEB' : '#FFC107',
  className,
}: {
  rating: number;
  variant?: Variant;
  max?: number;
  size?: number;
  gap?: number;
  showValue?: boolean;
  precision?: number;
  dropColor?: string;
  starFill?: string;
  emptyStroke?: string;
  className?: string;
}) {
  const uid = useId();
  const maxIcons = max ?? (variant === 'drop' ? 10 : 5);
  const value = clamp(Number(rating ?? 0), 0, maxIcons);

  // add this helper near the top of the file
  const formatRating = (n: number, maxDp = 2) =>
    new Intl.NumberFormat(undefined, {maximumFractionDigits: maxDp}).format(
      Math.round(n * 10 ** maxDp) / 10 ** maxDp,
    );

  return (
    <span
      className={className}
      style={{display: 'inline-flex', alignItems: 'center', gap: 10, lineHeight: 0}}
    >
      {/* icons first (like your screenshot) */}
      <span style={{display: 'inline-flex', alignItems: 'center'}}>
        {Array.from({length: maxIcons}, (_, i) => {
          const fraction = clamp(value - i, 0, 1);
          const idSeed = `${uid}-${i}`;
          return (
            <span
              key={i}
              style={{display: 'inline-block', marginRight: i === maxIcons - 1 ? 0 : gap}}
            >
              {variant === 'drop' ? (
                <WaterDropIcon
                  idSeed={idSeed}
                  fraction={fraction}
                  size={size}
                  fill={dropColor}
                  outline={emptyStroke}
                />
              ) : (
                <StarIcon
                  idSeed={idSeed}
                  fraction={fraction}
                  size={size}
                  fill={starFill}
                  outline={emptyStroke}
                />
              )}
            </span>
          );
        })}
      </span>

      {/* tiny number at the end */}
      {showValue && (
        <span style={{fontSize: 14, color: '#6B7280', lineHeight: 1}}>
          {formatRating(value, precision)}/{maxIcons}
        </span>
      )}
    </span>
  );
}
