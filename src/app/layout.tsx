import {ToastContainer} from 'react-toastify';
import {GoogleAnalytics} from '@next/third-parties/google';
import type {Metadata} from 'next';
import {Ubuntu} from 'next/font/google';
import {cookies} from 'next/headers';

import {FacebookPixel} from '@/components';
import JsonLdScript from '@/components/shared/json-ld-script';
import {CookieName, ThemeType} from '@/constants';
import {MainProviders} from '@/providers';
import {searchActionSchema} from '@/utils';

import '@/styles/globals.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL || 'http://localhost:3000'),
  title: {
    default: 'Waterlyst',
    template: '%s | Waterlyst',
  },
  description: 'Save the world',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const cookieStore = cookies();
  const theme = cookieStore.get(CookieName.THEME);

  return (
    <html lang='en' dir='ltr' data-color-mode={theme?.value}>
      <body className={ubuntu.className}>
        <JsonLdScript id='website' data={searchActionSchema} />
        <MainProviders theme={theme?.value as ThemeType}>
          <main>
            <div className='root'>
              {children}
              <FacebookPixel />
            </div>
          </main>
          <ToastContainer />
        </MainProviders>
      </body>
      <GoogleAnalytics gaId='G-VQ10YGVF8Q' />
    </html>
  );
}
