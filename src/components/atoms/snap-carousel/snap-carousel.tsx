/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable consistent-return */

'use client';

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';

type GalleryItem = {href?: string; src: string; alt?: string};

interface Props {
  items: GalleryItem[];
  loop?: boolean;
  showDots?: boolean;
  borderRadius?: number; // px
  ariaLabel?: string;
  controlsBg?: string; // e.g. 'rgba(20,20,20,0.6)'
  controlsFg?: string; // e.g. '#fff'
}

export default function EmblaCarousel16x9({
  items,
  loop = false,
  showDots = true,
  borderRadius = 12,
  ariaLabel = 'Post gallery',
  controlsBg = 'rgba(0,0,0,0.55)',
  controlsFg = '#fff',
}: Props) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);

  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop,
    containScroll: 'trimSnaps',
    dragFree: false,
    slidesToScroll: 1,
  });

  const [index, setIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onSelect = useCallback((api: any) => {
    const i = api.selectedScrollSnap();
    setIndex(i);
    setPrevDisabled(!api.canScrollPrev());
    setNextDisabled(!api.canScrollNext());

    // SR-only live region update
    if (liveRef.current) {
      liveRef.current.textContent = `Slide ${i + 1} of ${api.scrollSnapList().length}`;
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    const ro = new ResizeObserver(() => emblaApi.reInit());
    if (frameRef.current) ro.observe(frameRef.current);

    return () => {
      emblaApi?.off('select', onSelect);
      emblaApi?.off('reInit', onSelect);
      ro.disconnect();
    };
  }, [emblaApi, onSelect]);

  const onImgLoad = useCallback(() => emblaApi?.reInit(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  if (!items?.length) return null;

  const wrap = useMemo(
    () => ({position: 'relative' as const, width: '100%', margin: '1rem 0'}),
    [],
  );

  // ---- Local UI bits ----
  const IconChevron = ({dir}: {dir: 'left' | 'right'}) => (
    <svg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' style={{display: 'block'}}>
      <path
        d={
          dir === 'left'
            ? 'M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z'
            : 'M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z'
        }
        fill='currentColor'
      />
    </svg>
  );

  const arrowBase: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 3,
    width: 40,
    height: 40,
    borderRadius: 9999,
    border: 'none',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    touchAction: 'manipulation',
    // Visuals
    color: controlsFg,
    background: controlsBg,
    backdropFilter: 'blur(6px)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
    transition: 'transform .15s ease, opacity .15s ease, background .15s ease',
    outline: 'none',
  };

  const arrowDisabled: React.CSSProperties = {
    opacity: 0.35,
    cursor: 'default',
    pointerEvents: 'none',
  };

  const dotHit: React.CSSProperties = {
    width: 22,
    height: 22,
    border: 'none',
    background: 'transparent',
    padding: 0,
    margin: 0,
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    borderRadius: 9999,
    outline: 'none',
  };

  const dotVisual = (active: boolean): React.CSSProperties => ({
    width: 10,
    height: 10,
    borderRadius: 9999,
    boxShadow: '0 0 0 2px rgba(0,0,0,0.25)',
    border: '1px solid rgba(255,255,255,0.9)',
    background: active ? '#fff' : 'rgba(255,255,255,0.5)',
    transform: active ? 'scale(1.1)' : 'scale(1)',
    transition: 'transform .15s ease, background .15s ease',
  });

  const fractionBadge: React.CSSProperties = {
    position: 'absolute',
    right: 8,
    bottom: 8,
    zIndex: 4,
    fontSize: 12,
    lineHeight: 1,
    padding: '6px 8px',
    color: controlsFg,
    background: controlsBg,
    backdropFilter: 'blur(6px)',
    borderRadius: 10,
    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
    userSelect: 'none',
  };

  return (
    <div
      style={wrap}
      role='region'
      aria-roledescription='carousel'
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'ArrowLeft') scrollPrev();
        if (e.key === 'ArrowRight') scrollNext();
      }}
    >
      {/* SR-only live announcer */}
      <div
        ref={liveRef}
        aria-live='polite'
        aria-atomic='true'
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          margin: -1,
          padding: 0,
          clip: 'rect(0 0 0 0)',
          overflow: 'hidden',
          border: 0,
        }}
      />
      {/* --- Ratio Box (16:9) --- */}
      <div style={{position: 'relative', width: '100%'}}>
        <div aria-hidden='true' style={{width: '100%', paddingTop: '56.25%'}} />
        {/* Frame (clip + rounded) */}
        <div
          ref={frameRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius,
            overflow: 'hidden',
            isolation: 'isolate',
          }}
        >
          {/* Viewport (MUST contain ONLY the track as first/only element) */}
          <div
            ref={viewportRef}
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Track */}
            <div style={{display: 'flex', height: '100%'}}>
              {items.map((it, i) => (
                <div
                  key={it.href ?? it.src ?? i}
                  style={{
                    flex: '0 0 100%',
                    minWidth: 0,
                    position: 'relative',
                    height: '100%',
                  }}
                >
                  <a
                    href={it.href || it.src}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={it.alt || `Slide ${i + 1}`}
                    style={{display: 'block', width: '100%', height: '100%'}}
                  >
                    <img
                      src={it.src}
                      alt={it.alt || 'Gallery image'}
                      loading='lazy'
                      decoding='async'
                      onLoad={onImgLoad}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: 8,
                      }}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* --- Overlay controls --- */}
          {items.length > 1 && (
            <>
              {/* Left Arrow */}
              <button
                type='button'
                aria-label='Previous slide'
                onClick={scrollPrev}
                disabled={prevDisabled}
                title='Previous'
                style={{
                  ...arrowBase,
                  left: 12,
                  ...(prevDisabled ? arrowDisabled : {}),
                }}
                onMouseDown={e => {
                  if (!prevDisabled)
                    e.currentTarget.style.transform = 'translateY(-50%) scale(0.97)';
                }}
                onMouseUp={e => (e.currentTarget.style.transform = 'translateY(-50%)')}
                onMouseEnter={e => {
                  if (!prevDisabled)
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.03)';
                }}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(-50%)')}
              >
                <IconChevron dir='left' />
              </button>

              {/* Right Arrow */}
              <button
                type='button'
                aria-label='Next slide'
                onClick={scrollNext}
                disabled={nextDisabled}
                title='Next'
                style={{
                  ...arrowBase,
                  right: 12,
                  ...(nextDisabled ? arrowDisabled : {}),
                }}
                onMouseDown={e => {
                  if (!nextDisabled)
                    e.currentTarget.style.transform = 'translateY(-50%) scale(0.97)';
                }}
                onMouseUp={e => (e.currentTarget.style.transform = 'translateY(-50%)')}
                onMouseEnter={e => {
                  if (!nextDisabled)
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.03)';
                }}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(-50%)')}
              >
                <IconChevron dir='right' />
              </button>
            </>
          )}

          {showDots && items.length > 1 && (
            <>
              {/* Dots */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 8,
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 6,
                  zIndex: 4,
                  pointerEvents: 'auto',
                  padding: '2px 4px',
                  borderRadius: 9999,
                  background: 'rgba(0,0,0,0.25)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {snaps.map((_, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={i}
                      type='button'
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={active ? 'true' : 'false'}
                      title={`Slide ${i + 1}`}
                      onClick={() => scrollTo(i)}
                      style={dotHit}
                      onFocus={e =>
                        (e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.7) inset')
                      }
                      onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                    >
                      <span style={dotVisual(active)} />
                    </button>
                  );
                })}
              </div>

              {/* Fraction badge */}
              <div aria-hidden='true' style={fractionBadge}>
                {index + 1}/{snaps.length}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
