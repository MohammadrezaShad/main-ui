'use server';

import {css} from '@styled/css';
import {styled} from '@styled/jsx';
import {unstable_noStore as noStore} from 'next/cache';
import Link from 'next/link';

import {SearchProductOutput, searchProducts} from '@/graphql';
import {getQueryClient} from '@/helpers';

import CardsPagination from './pagination';
import ProductCard from './product-card';
import SearchInput from './search-input';

interface Props {
  params: {
    businessId: string;
  };
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
  };
}

async function Page({params, searchParams}: Props) {
  noStore();
  const page = searchParams.page ? +searchParams.page : 1;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['search-business-products'],
    queryFn: () =>
      searchProducts({
        sellerCompany: params.businessId as string,
        page,
        count: 6,
        title: searchParams.search,
      }),
    staleTime: 0,
  });
  const data = (await queryClient.getQueryData([
    'search-business-products',
  ])) as SearchProductOutput;

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        w: '100%',
        p: {lgDown: 4},
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          w: '100%',
          p: {lgDown: 4},
          px: '6',
          pt: '10',
          pb: '0',
        })}
      >
        <h1
          className={css({
            textStyle: 'headline3',
            color: 'text.primary',
          })}
        >
          Products
        </h1>
        <Link
          href={`/profile/businesses/${params.businessId}/products/new`}
          className={css({
            color: 'white',
            w: 'max-content',
            px: 4,
            py: 3,
            bgColor: 'primary',
          })}
        >
          New Product
        </Link>
      </div>
      <SearchInput />
      <Cards>
        {data?.results?.map(product => (
          <ProductCard
            key={product._id}
            id={product._id as string}
            slug={product.slug as string}
            title={product.title}
            thumbnail={product.thumbnail || undefined}
            company={product.sellerCompany.title || ''}
            rating={product.sellerCompany.rate || 0}
            waterRating={product.rate || 0}
            price={product?.variations?.[0]?.cost?.toString() || ''}
            businessId={params.businessId}
            keywords={product.keywords || []}
            redirect={product.redirect ?? 0}
            view={product.view ?? 0}
          />
        ))}
      </Cards>

      {data?.totalCount && data.totalCount > 6 ? (
        <CardsPagination totalPages={data.totalPages ?? 1} />
      ) : null}
    </div>
  );
}

export default Page;

const Cards = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: {
      base: '3',
      mdDown: '1',
    },
    gap: '8',
    px: {
      base: '6',
      mdDown: 0,
    },
  },
});
