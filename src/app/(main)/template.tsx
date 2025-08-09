import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {dehydrate} from '@tanstack/react-query';
import {cookies} from 'next/headers';

import {Footer, Header} from '@/components';
import MobileNavbar from '@/components/organisms/mobile-navbar/mobile-navbar';
import {CookieName} from '@/constants';
import {getUser, searchHomepages} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const dynamic = 'force-dynamic';

export default async function Template({children}: {children: React.ReactNode}) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: () => getUser(authToken),
  });

  queryClient.prefetchQuery({
    queryKey: ['homepage-seo'],
    queryFn: () => searchHomepages({}),
  });
  const homepageSeo = await searchHomepages({});
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
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
          <div
            className={css({
              w: 'full',
              rounded: '2xl',
            })}
          >
            <Hydrate state={dehydratedState}>{children}</Hydrate>
          </div>
        </div>
      </div>
      <Footer
        description={homepageSeo?.results?.[0]?.description || undefined}
        title={homepageSeo?.results?.[0]?.title || undefined}
      />
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
