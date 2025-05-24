'use client';

import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import Script from 'next/script';

import * as pixel from '@/lib/fpixels';

const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;

    pixel.pageview();
  }, [pathname, loaded]);

  return (
    <div>
      <Script
        id='fb-pixel'
        src='/scripts/pixel.js'
        strategy='afterInteractive'
        onLoad={() => setLoaded(true)}
        data-pixel-id={pixel.FB_PIXEL_ID}
      />
    </div>
  );
};

export default FacebookPixel;
