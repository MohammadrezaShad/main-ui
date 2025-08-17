import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {cookies} from 'next/headers';

import {BusinessView} from '@/components';
import {CookieName} from '@/constants';
import {findCompanyBySlug} from '@/graphql/query/companies/find-company-by-slug';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async ({params: initalParams}: {params: {slug: string}}) => {
  const params = await initalParams;

  const token = (await cookies()).get(CookieName.AUTH_TOKEN)?.value;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-company', params.slug],
    queryFn: () => findCompanyBySlug({slug: params.slug}, token),
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
        <BusinessView />
      </Hydrate>
    </div>
  );
};

export default Page;
