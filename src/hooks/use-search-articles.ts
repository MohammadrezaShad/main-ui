// utils/graphql.ts
import {keepPreviousData, QueryKey, useQuery} from '@tanstack/react-query';

import {searchArticles} from '@/graphql/query/articles/search-articles';

interface UseSearchArticlesProps {
  tagId?: string;
  page: number;
}

export const useSearchArticles = ({tagId, page}: UseSearchArticlesProps) =>
  useQuery<any, Error>({
    queryKey: ['search-articles', page] as QueryKey,
    queryFn: () => searchArticles({tags: tagId ? [tagId] : null, count: 12, page}),
    placeholderData: keepPreviousData,
  });
