import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {cookies, headers} from 'next/headers';

import {Footer, Header} from '@/components';
import {HeaderName} from '@/constants';
import {Paths, isMatch} from '@/utils';

import MobileNavbar from '@/components/organisms/mobile-navbar/mobile-navbar';
import {getUser} from '@/graphql/query/users/get-user';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import '@/styles/globals.css';
import {dehydrate} from '@tanstack/react-query';

export default async function Template({children}: {children: React.ReactNode}) {
  const currentUrl = headers().get(HeaderName.PATHNAME) || '';
  const isVideoUrl = isMatch(Paths.Video.Detail('').getRoute() as string, currentUrl as string);
  const cookieStore = cookies();
  const authToken = cookieStore.get('authToken')?.value || '';
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-profile', 2],
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
          p: {base: 8, lgDown: 4},
          bg: 'background',
        })}
      >
        <div
          className={flex({
            maxW: {
              base: '10/12',
              lgDown: '100%',
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
              w: 'full',
              rounded: '2xl',
            })}
          >
            {children}
          </div>
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
