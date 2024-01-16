import type {Metadata} from 'next';
import {Ubuntu} from 'next/font/google';
import {cookies} from 'next/headers';

import {CookieName, ThemeType} from '@/constants';
import {MainProviders} from '@/providers';

import '@/styles/globals.css';
import {ToastContainer} from 'react-toastify';

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Waterworld',
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
