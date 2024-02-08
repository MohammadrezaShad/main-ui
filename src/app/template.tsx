import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {cookies, headers} from 'next/headers';

import {Footer, Header} from '@/components';
import {CookieName, HeaderName} from '@/constants';
import {Paths, isMatch} from '@/utils';

import MobileNavbar from '@/components/organisms/mobile-navbar/mobile-navbar';
import {getUser} from '@/graphql/query/users/get-user';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {dehydrate} from '@tanstack/react-query';
import './globals.css';

export default async function Template({children}: {children: React.ReactNode}) {
  const currentUrl = headers().get(HeaderName.PATHNAME) || '';
  const isVideoUrl = isMatch(Paths.Video.Detail('').getRoute() as string, currentUrl as string);
  const cookieStore = cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <Hydrate state={dehydratedState}>
        <Header />
      </Hydrate>
      <div
        className={css({
          pb: {base: '8', mdDown: '18'},
          bg: 'background',
          flex: '1',
          display: 'grid',
        })}
      >
        <div
          className={flex({
            maxW: {
              base: '1920px',
              lgDown: '100%',
            },
            w: 'full',
            mr: 'auto',
            ml: 'auto',
            h: 'full',
            gap: {base: '8', lgDown: 'normal'},
            alignItems: 'flex-start',
          })}
        >
          {children}
        </div>
      </div>
      <Footer />
      <div
        className={css({
          hideFrom: 'md',
          zIndex: 50,
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        })}
      >
        <MobileNavbar />
      </div>
    </>
  );
}
