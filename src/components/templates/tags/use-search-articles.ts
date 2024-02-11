// utils/graphql.ts
import {keepPreviousData, QueryKey, useQuery} from '@tanstack/react-query';

import {searchArticles} from '@/graphql/query/search-articles';

interface UseSearchArticlesProps {
  tagId: string;
  page: number;
}

export const useSearchArticles = ({tagId, page}: UseSearchArticlesProps) =>
  useQuery<any, Error>({
    queryKey: ['search-tags', page] as QueryKey,
    queryFn: () => searchArticles({tags: [tagId], count: 12, page}),
    placeholderData: keepPreviousData,
  });
