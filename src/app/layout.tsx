import {ToastContainer} from 'react-toastify';
import {GoogleAnalytics} from '@next/third-parties/google';
import type {Metadata} from 'next';
import {Ubuntu} from 'next/font/google';
import {cookies} from 'next/headers';

import {FacebookPixel} from '@/components';
import JsonLdScript from '@/components/shared/json-ld-script';
import {CookieName, ThemeType} from '@/constants';
import {searchHomepages, SearchSeoHomepageOutput} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {MainProviders} from '@/providers';
import {searchActionSchema} from '@/utils';

import '@/styles/globals.css';

import TemplateContainer from './template-container';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});
export async function generateMetadata(): Promise<Metadata> {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['search-home-seo'],
    queryFn: () => searchHomepages({}),
  });

  const data = (await queryClient.getQueryData(['search-home-seo'])) as SearchSeoHomepageOutput;

  const title = data?.results?.[0]?.metaTitle || 'Waterlyst';

  return {
    metadataBase: new URL(BASE_URL || 'http://localhost:3000'),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: data?.results?.[0]?.metaDescription || 'Save the world',
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  const cookieStore = cookies();
  const theme = cookieStore.get(CookieName.THEME);

  return (
    <html lang='en' dir='ltr' data-color-mode={theme?.value}>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body className={ubuntu.className}>
        <JsonLdScript id='website' data={searchActionSchema} />
        <MainProviders theme={theme?.value as ThemeType}>
          <TemplateContainer>
            <div className='root'>
              {children}
              <FacebookPixel />
            </div>
          </TemplateContainer>
          <ToastContainer />
        </MainProviders>
      </body>
      <GoogleAnalytics gaId='G-VQ10YGVF8Q' />
    </html>
  );
}
