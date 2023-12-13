import {MainHome} from '@/components';
import {searchCategories} from '@/graphql/query/categories';
import {searchArticles} from '@/graphql/query/search-articles';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {dehydrate} from '@tanstack/react-query';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['search-articles-home'],
    queryFn: () => searchArticles({count: 15, page: 1}),
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
