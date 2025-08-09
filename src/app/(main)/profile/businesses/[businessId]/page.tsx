import {css} from '@styled/css';

import {getCompanyCallnumbers, getCompanyRedirects, searchCompanyVisitStatistics} from '@/graphql';
import {getCompanyLocationClicks} from '@/graphql/query/companies/search-company-location-clicks';
import {getQueryClient} from '@/helpers';

import PlatformCard from '../_components/platform-card';
import StatCard from '../_components/stat-card';
import Chart from './chart';

interface Props {
  params: {
    businessId: string;
  };
}

export default async function Dashboard({params: initalParams}: Props) {
  const params = await initalParams;

  const queryClient = getQueryClient();
  const visits = await queryClient.fetchQuery({
    queryKey: ['get-visits', params.businessId],
    queryFn: () => searchCompanyVisitStatistics({company: params.businessId}),
  });
  const redirects = await queryClient.fetchQuery({
    queryKey: ['get-redirects', params.businessId],
    queryFn: () => getCompanyRedirects({company: params.businessId}),
  });
  const callNumbers = await queryClient.fetchQuery({
    queryKey: ['get-calls', params.businessId],
    queryFn: () => getCompanyCallnumbers({company: params.businessId}),
  });
  const locationClicks = await queryClient.fetchQuery({
    queryKey: ['get-location-clicks', params.businessId],
    queryFn: () => getCompanyLocationClicks({company: params.businessId}),
  });

  return (
    <main className={css({flex: '1', p: '6'})}>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1',
          md: {gridTemplateColumns: '3'},
          gap: '4',
          mb: '6',
        })}
      >
        <StatCard title='Calls Number' value={callNumbers ?? 0} bgColor='#e05d9c' />
        <StatCard title='Website Clicks' value={redirects.total ?? 0} bgColor='#7e68c9' />
        <StatCard title='Location Clicks' value={locationClicks ?? 0} bgColor='#4bb6e8' />
      </div>

      <Chart visits={visits} />

      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1',
          md: {gridTemplateColumns: '3'},
          gap: '4',
        })}
      >
        <PlatformCard platform='Amazon' value={redirects.amazon ?? 0} />
        <PlatformCard platform='eBay' value={redirects.ebay ?? 0} />
        <PlatformCard platform='Wallmart' value={redirects.wallmart ?? 0} />
      </div>
    </main>
  );
}
