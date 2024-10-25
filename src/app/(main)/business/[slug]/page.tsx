import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {cookies} from 'next/headers';

import {BusinessView} from '@/components';
import {CookieName} from '@/constants';
import {searchCompanies} from '@/graphql';
import {findCompanyBySlug} from '@/graphql/query/companies/find-company-by-slug';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const revalidate = 180;

export async function generateStaticParams(): Promise<any> {
  const data = await searchCompanies({count: 100});
  const companies = data.results;
  return companies?.map(company => ({
    slug: company.slug,
  }));
}

const Page = async ({params}: {params: {slug: string}}) => {
  const token = getCookie(CookieName.AUTH_TOKEN, {cookies});
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
