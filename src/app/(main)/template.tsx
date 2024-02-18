import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {dehydrate} from '@tanstack/react-query';
import {cookies, headers} from 'next/headers';

import {Footer, Header} from '@/components';
import MobileNavbar from '@/components/organisms/mobile-navbar/mobile-navbar';
import {CookieName, HeaderName} from '@/constants';
import {getUser} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export default async function Template({children}: {children: React.ReactNode}) {
  const currentUrl = headers().get(HeaderName.PATHNAME) || '';
  const cookieStore = cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
    staleTime: 1000,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Header />
      <div
        className={css({
          pb: {base: '8', mdDown: '36'},
          bg: 'background',
          flex: '1',
        })}
      >
        <div
          className={flex({
            maxW: {
              base: '1920px',
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
    </Hydrate>
  );
}
