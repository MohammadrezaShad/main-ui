import {CompanyQuery, SearchCompanyVisitStatisticsInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchCompanyVisitStatistics(
  input: SearchCompanyVisitStatisticsInput,
): Promise<CompanyQuery['searchCompanyVisitStatistics']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchCompanyVisitStatistics($input: SearchCompanyVisitStatisticsInput!) {
                company {
                    searchCompanyVisitStatistics(input: $input) {
                    totalPages
                    totalCount
                    success
                    results {
                        createdAt
                        count
                    }
                    }
                }
                }`,
    variables: {input},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data.company.searchCompanyVisitStatistics;
}
