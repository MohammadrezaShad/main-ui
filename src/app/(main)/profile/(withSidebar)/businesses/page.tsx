import {dehydrate} from '@tanstack/react-query';

import {BusinessesView} from '@/components';
import {searchCompanies} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

interface Props {
  searchParams: {
    page: string;
  };
}

const Page = async ({searchParams: initalSearchParams}: Props) => {
  const searchParams = await initalSearchParams;

  const page = +(searchParams.page ?? '1');
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-companies'],
    queryFn: () => searchCompanies({count: 10, page}),
    staleTime: 0,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <BusinessesView />
    </Hydrate>
  );
};

export default Page;
