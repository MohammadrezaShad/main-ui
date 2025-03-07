import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {unstable_noStore as noStore} from 'next/cache';

import {ProductsView} from '@/components';
import {searchProducts} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const dynamic = 'force-dynamic';
interface Props {
  searchParams: {
    page: string;
    categories: string;
    city: string;
    minimumCompanyRating: string;
    minimumProductRating: string;
    lowPrice: string;
    highPrice: string;
  };
}

const Page = async ({searchParams}: Props) => {
  noStore();
  const page = searchParams.page || '1';
  const {categories, city, minimumCompanyRating, minimumProductRating, lowPrice, highPrice} =
    searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [
      'search-products',
      page,
      categories,
      city,
      minimumCompanyRating,
      minimumProductRating,
      lowPrice,
      highPrice,
    ],
    queryFn: () =>
      searchProducts({
        page: +page,
        count: 6,
        categories: categories ? categories.split(',') : undefined,
        city,
        minimumCompanyRating: minimumCompanyRating ? +minimumCompanyRating : undefined,
        minimumProductRating: minimumProductRating ? +minimumProductRating : undefined,
        lowPrice: lowPrice ? +lowPrice : undefined,
        highPrice: highPrice ? +highPrice : undefined,
        isActive: true,
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
        p: {lgDown: 4},
      })}
    >
      <Hydrate state={dehydratedState}>
        <ProductsView />
      </Hydrate>
    </div>
  );
};
export default Page;
