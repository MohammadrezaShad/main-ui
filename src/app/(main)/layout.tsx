import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {headers} from 'next/headers';

import {Footer, Header} from '@/components';
import {HeaderName} from '@/constants';
import {Paths, isMatch} from '@/utils';

import '@/styles/globals.css';

export default function MainLayout({children}: {children: React.ReactNode}) {
  const currentUrl = headers().get(HeaderName.PATHNAME) || '';
  const isVideoUrl = isMatch(Paths.Video.Detail('').getRoute() as string, currentUrl as string);

  return (
    <>
      <Header />
      <div
        className={css({
          p: {base: 8, lgDown: 2},
          bg: 'background',
        })}
      >
        <div
          className={flex({
            maxW: {
              base: '10/12',
              lgDown: '100%'
            },
            width: '100%',
            mr: 'auto',
            ml: 'auto',
            flex: 1,
            gap: {base: '8', lgDown: 'normal'},
            alignItems: 'flex-start',
          })}
        >
          {/* <Sidebar /> */}
          <div
            className={css({
              flex: '1',
              rounded: '2xl',
            })}
          >
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
