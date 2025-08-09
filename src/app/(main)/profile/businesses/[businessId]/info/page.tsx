'use server';

import {dehydrate} from '@tanstack/react-query';
import {unstable_noStore as noStore} from 'next/cache';

import {CompanyType, findCompanyById, FindCompanyOutput, searchCountries} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

import BusinessInfoPage from './info';

interface Props {
  params: {
    businessId: string;
  };
}

async function Page({params: initalParams}: Props) {
  const params = await initalParams;

  noStore();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['find-business', params.businessId],
    queryFn: () => findCompanyById({id: params.businessId}),
  });
  await queryClient.prefetchQuery({
    queryKey: ['get-countries'],
    queryFn: () => searchCountries({count: 300}),
  });
  const data = queryClient.getQueryData(['find-business', params.businessId]) as FindCompanyOutput;
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <BusinessInfoPage company={data.result as CompanyType} />
    </Hydrate>
  );
}

export default Page;
