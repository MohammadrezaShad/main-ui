import type {Metadata} from 'next';
import {Ubuntu} from 'next/font/google';
import {cookies} from 'next/headers';
import {ToastContainer} from 'react-toastify';

import {CookieName, ThemeType} from '@/constants';
import {MainProviders} from '@/providers';

import '@/styles/globals.css';
import Script from 'next/script';

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
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTM_ID}`}
        ></Script>
        <Script id='google-analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PC0J1ZGFDM');
          `}
        </Script>
      </head>
      <body className={ubuntu.className}>
        <MainProviders theme={theme?.value as ThemeType}>
          <main>
            <div className='root'>{children}</div>
          </main>
          <ToastContainer />
        </MainProviders>
      </body>
    </html>
  );
}
