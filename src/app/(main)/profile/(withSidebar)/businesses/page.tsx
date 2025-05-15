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

const Page = async ({searchParams}: Props) => {
  const page = +(searchParams.page ?? '1');
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-companies'],
    queryFn: () => searchCompanies({count: 10, page}),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <BusinessesView />
    </Hydrate>
  );
};

export default Page;
