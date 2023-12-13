import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {CategoryArticlesView} from '@/components';
import {searchArticleByCategory} from '@/graphql/query/search-articles-by-category';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async ({params}: {params: {categoryId: string}}) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['search-category-articles', params.categoryId],
    queryFn: () => searchArticleByCategory({categories: [params.categoryId], count: 18, page: 1}),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={css({display: 'flex', flexDir: 'column', rowGap: 8})}>
      <Hydrate state={dehydratedState}>
        <CategoryArticlesView />
      </Hydrate>
    </div>
  );
};

export default Page;
