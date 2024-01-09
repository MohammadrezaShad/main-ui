import {CategoryArticlesView} from '@/components';
import {searchArticleByCategory} from '@/graphql/query/search-articles-by-category';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

const Page = async ({params}: {params: {categoryId: string}}) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['search-cs', params.categoryId],
    queryFn: () => searchArticleByCategory({categories: [params.categoryId], count: 18, page: 1}),
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
