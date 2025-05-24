import {dehydrate} from '@tanstack/react-query';
import {cookies} from 'next/headers';

import {CollectionsView} from '@/components';
import {CookieName} from '@/constants';
import {getUserBookmarkedArticles} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-user-bookmarked-articles'],
    queryFn: () => getUserBookmarkedArticles({}, authToken),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <CollectionsView />
    </Hydrate>
  );
};

export default Page;
