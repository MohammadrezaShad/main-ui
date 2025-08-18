// app/categories/[categoryId]/page.tsx
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';

import {CategoryArticlesView} from '@/components';
import {searchArticleByCategory} from '@/graphql';
import {CategoryType} from '@/graphql/generated/types';
import {findCategoryBySlug} from '@/graphql/query/categories/find-category-by-slug';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const revalidate = 180;

export async function generateMetadata({
  params: initialParams,
}: {
  params: {categoryId: string};
}): Promise<Metadata> {
  const params = await initialParams;

  const category: CategoryType | undefined | null = await findCategoryBySlug({
    slug: params.categoryId,
  });

  if (!category?._id) {
    return {
      title: 'Not found',
      description: 'The page not found',
    };
  }

  const {noindex, nofollow, focusKeyword, canonicalUrl, description, title} =
    category.seoSetting?.general || {};
  const isNoindex = noindex;
  const isNofollow = nofollow;

  return {
    title: title || category.title,
    description: description || category.description || undefined,
    alternates: {
      canonical:
        canonicalUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/articles/categories/${category.slug}`,
    },
    keywords: focusKeyword,
    robots: {
      index: !isNoindex,
      follow: !isNofollow,
      googleBot: {
        index: !isNoindex,
        follow: !isNofollow,
      },
    },
  };
}

const Page = async ({params: initialParams}: {params: {categoryId: string}}) => {
  const params = await initialParams;

  const queryClient = getQueryClient();

  // 1) Prefetch the category by slug (mirror tag flow)
  await queryClient.prefetchQuery({
    queryKey: ['find-category', params.categoryId],
    queryFn: () => findCategoryBySlug({slug: params.categoryId}),
  });

  const category: CategoryType | undefined | null = queryClient.getQueryData([
    'find-category',
    params.categoryId,
  ]);

  if (!category?._id) {
    notFound();
  }

  // 2) Prefetch article lists using the CATEGORY _id (not slug)
  const page = 1;

  // Recent (small) list
  await queryClient.prefetchQuery({
    queryKey: ['category-recent-articles', category._id], // remove ", 1"
    queryFn: () =>
      searchArticleByCategory({
        categories: [category._id],
        count: 6,
        page: 1,
        hasPdf: false,
      }),
  });

  // Main (paged) list
  await queryClient.prefetchQuery({
    // Make sure this matches your client hook’s key exactly
    queryKey: ['search-articles-by-category', category._id, page],
    queryFn: () =>
      searchArticleByCategory({
        categories: [category._id],
        count: 18,
        page,
        hasPdf: false,
      }),
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
