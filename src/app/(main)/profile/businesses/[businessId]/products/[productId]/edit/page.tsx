import {findProductById, FindProductOutput} from '@/graphql';
import {getQueryClient} from '@/helpers';

import AddProduct from '../../_components/add-product';

interface Props {
  params: {
    productId: string;
  };
}

async function Page({params}: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['search-product', params.productId],
    queryFn: () =>
      findProductById({
        id: params.productId as string,
      }),
    staleTime: 0,
  });
  const product = queryClient.getQueryData([
    'search-product',
    params.productId,
  ]) as FindProductOutput;
  return <AddProduct product={product?.result || undefined} />;
}

export default Page;
