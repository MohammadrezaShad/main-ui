import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {unstable_noStore as noStore} from 'next/cache';

import {ProductView} from '@/components';
import {findProductBySlug} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const dynamic = 'force-dynamic';

const Page = async ({params: initalParams}: {params: {slug: string}}) => {
  const params = await initalParams;

  noStore();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-product', params.slug],
    queryFn: () => findProductBySlug({slug: params.slug}),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        mx: 'auto',
        maxWidth: '1920px',
      })}
    >
      <Hydrate state={dehydratedState}>
        <ProductView />
      </Hydrate>
    </div>
  );
};

export default Page;
