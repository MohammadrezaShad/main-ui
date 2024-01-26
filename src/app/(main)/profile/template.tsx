import {ProfileDetails, ProfileSidebar} from '@/components';
import {CookieName} from '@/constants';
import {getUser} from '@/graphql/query/users/get-user';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {dehydrate} from '@tanstack/react-query';
import {cookies} from 'next/headers';

export default async function Template({children}: {children: React.ReactNode}) {
  const cookieStore = cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div
      className={flex({
        flexDirection: 'column',
        alignItems: 'center',
      })}
    >
      <div
        className={flex({
          w: 'full',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          gap: '5',
          mt: '6',
          px: '5',
          mdDown: {
            flexDirection: 'column',
          },
        })}
      >
        <Hydrate state={dehydratedState}>
          <ProfileSidebar />
        </Hydrate>
        <div
          className={css({
            display: 'flex',
            flex: 1,
            flexDir: 'column',
            rowGap: 8,
            mdDown: {pb: '80px'},
          })}
        >
          {children}
        </div>
        <div
          className={css({
            hideBelow: 'md',
            alignSelf: 'stretch',
            flex: 0,
            minW: '302px',
          })}
        >
          <ProfileDetails />
        </div>
      </div>
    </div>
  );
}
