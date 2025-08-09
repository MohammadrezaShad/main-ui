import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {CategoryArticlesView} from '@/components';
import {searchArticleByCategory} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const revalidate = 180;

interface Props {
  params: {categoryId: string};
  searchParams: {page: string};
}

const Page = async ({params: initalParams, searchParams: initalSearchParams}: Props) => {
  const params = await initalParams;
  const searchParams = await initalSearchParams;

  const page = Number(searchParams.page || '1');
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['search-cs', params.categoryId, page],
    queryFn: () => searchArticleByCategory({categories: [params.categoryId], count: 5, page}),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        mx: 'auto',
        maxWidth: '960px',
        p: {lgDown: 4},
      })}
    >
      <Hydrate state={dehydratedState}>
        <CategoryArticlesView />
      </Hydrate>
    </div>
  );
};

export default Page;
