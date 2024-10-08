import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {CategoryArticlesView} from '@/components';
import {searchArticleByCategory, searchCategories} from '@/graphql';
import {CategoryType} from '@/graphql/generated/types';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const dynamic = 'force-dynamic';

export async function generateStaticParams(): Promise<any> {
  const data = (await searchCategories({
    count: 100,
  })) as any;
  const categories: Array<CategoryType> = data.category!.searchCategories.results;
  return categories.map(category => ({
    categoryId: category.slug,
  }));
}

const Page = async ({params}: {params: {categoryId: string}}) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['recent-article-cats', 1],
    queryFn: () =>
      searchArticleByCategory({categories: [params.categoryId], count: 6, page: 1, hasPdf: false}),
  });
  await queryClient.prefetchQuery({
    queryKey: ['search-cs', params.categoryId],
    queryFn: () =>
      searchArticleByCategory({categories: [params.categoryId], count: 18, page: 1, hasPdf: false}),
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
        <CategoryArticlesView hasPdf={false} />
      </Hydrate>
    </div>
  );
};

export default Page;
