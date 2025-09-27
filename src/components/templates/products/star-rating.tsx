/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-namespace */

'use client';

import React, {useEffect, useMemo, useRef} from 'react';

type StarRatingProps = {
  rating: number; // current avg/user rating to display
  total?: number; // total stars (default 10)
  disabled?: boolean; // lock interaction (e.g., while saving)
  onRate?: (score: number) => void; // called with 1..total when user clicks
};

const StarRatingComponent: React.FC<StarRatingProps> = ({
  rating,
  total = 10,
  disabled = false,
  onRate,
}) => {
  const hostRef = useRef<HTMLElement | null>(null);

  // Ensure the web component is defined (your existing local import)
  useEffect(() => {
    import('@/components/star-rating');
  }, []);

  // Keep attributes in sync
  useEffect(() => {
    if (!hostRef.current) return;
    hostRef.current.setAttribute('rating', String(rating ?? 0));
    hostRef.current.setAttribute('total-stars', String(total));
    if (disabled) hostRef.current.setAttribute('aria-disabled', 'true');
    else hostRef.current.removeAttribute('aria-disabled');
  }, [rating, total, disabled]);

  // A small util to coerce and clamp
  const clamp = useMemo(() => (n: number) => Math.max(1, Math.min(total, Math.round(n))), [total]);

  // Wire up event listeners (supporting various custom names)
  useEffect(() => {
    const el = hostRef.current;
    if (!el || disabled) return;

    // Handlers for possible custom events from the web component
    const fromDetail = (evt: Event) => {
      // @ts-expect-error custom event detail shape unknown
      const v = (evt as CustomEvent)?.detail?.value ?? (evt as any)?.detail?.rating;
      if (typeof v === 'number' && !Number.isNaN(v)) onRate?.(clamp(v));
    };

    // Fallback: estimate based on click position
    const onClickFallback = (evt: MouseEvent) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const w = rect.width || 1;
      const ratio = x / w; // 0..1
      const score = clamp(ratio * total + 0.5); // round to nearest
      onRate?.(score);
    };

    // Attach multiple possible custom event names for safety
    const names = ['rate', 'rating-change', 'ratingChanged', 'change', 'input'];
    names.forEach(n => el.addEventListener(n, fromDetail as EventListener));

    // Always attach a click fallback (many star components emit only click)
    el.addEventListener('click', onClickFallback);

    return () => {
      names.forEach(n => el.removeEventListener(n, fromDetail as EventListener));
      el.removeEventListener('click', onClickFallback);
    };
  }, [onRate, disabled, clamp, total]);

  return (
    <div
      style={{
        display: 'inline-block',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <star-rating ref={hostRef as React.RefObject<HTMLElement>} />
    </div>
  );
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'star-rating': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default StarRatingComponent;
