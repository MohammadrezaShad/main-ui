import {ProfileView} from '@/components';
import {CookieName} from '@/constants';
import {getUserVisits} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {dehydrate} from '@tanstack/react-query';
import {cookies} from 'next/headers';

const Page = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-user-visits'],
    queryFn: () => getUserVisits({}, authToken),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <ProfileView />
    </Hydrate>
  );
};

export default Page;
