import {dehydrate} from '@tanstack/react-query';
import {unstable_noStore as noStore} from 'next/cache';

import {MainHome} from '@/components';
import {searchArticles, searchCategories, StatusType} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export default async function Home() {
  noStore();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['search-articles-home', 1],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 18, page: 1}),
  });
  await queryClient.prefetchQuery({
    queryKey: ['search-categories-home'],
    queryFn: () => searchCategories({}),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MainHome />
    </Hydrate>
  );
}
