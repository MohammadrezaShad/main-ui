import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {CreateVisitStatisticsInput, VisitStatisticsMutation} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function recordVisitStatistics(
  input: CreateVisitStatisticsInput,
  accessToken: string,
): Promise<VisitStatisticsMutation['recordVisitStatistics']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation RecordVisitStatistics($input: CreateVisitStatisticsInput!) {
        visitStatistics {
          recordVisitStatistics(input: $input) {
            success
          }
        }
      }`,
    variables: {input},
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'client-id': clientId,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.visitStatistics.recordVisitStatistics;
}
