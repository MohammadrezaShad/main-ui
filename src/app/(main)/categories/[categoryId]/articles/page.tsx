import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {CategoryArticlesView} from '@/components';
import {searchArticleByCategory, searchCategories} from '@/graphql';
import {CategoryType} from '@/graphql/generated/types';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const revalidate = 180;

export async function generateStaticParams(): Promise<any> {
  const data = (await searchCategories({
    count: 100,
  })) as any;
  const categories: Array<CategoryType> = data.category!.searchCategories.results;
  return categories.map(category => ({
    categoryId: category.slug,
  }));
}

interface Props {
  params: {categoryId: string};
  searchParams: {page: string};
}

const Page = async ({params, searchParams}: Props) => {
  const page = parseInt(searchParams.page || '1', 10);
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
