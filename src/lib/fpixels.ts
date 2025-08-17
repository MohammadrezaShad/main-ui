// src/lib/fpixels.ts
export const FB_PIXEL_ID: string = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? '';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    __fbqQueue__?: Array<(fbq: (...a: any[]) => void) => void>;
  }
}

const withFbq = (fn: (fbq: (...args: any[]) => void) => void) => {
  if (typeof window === 'undefined') return; // SSR guard
  const w = window as Window;
  if (typeof w.fbq === 'function') {
    fn(w.fbq);
  } else {
    // queue until /scripts/pixel.js sets window.fbq
    (w.__fbqQueue__ = w.__fbqQueue__ || []).push(fn);
  }
};

export const pageview = () => {
  withFbq(fbq => fbq('track', 'PageView'));
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options: Record<string, any> = {}) => {
  withFbq(fbq => fbq('track', name, options));
};

/** Optional: call this if you *don't* use /scripts/pixel.js to init */
export const init = (id = FB_PIXEL_ID) => {
  if (!id) return;
  withFbq(fbq => fbq('init', id));
};
