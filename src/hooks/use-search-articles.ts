// utils/graphql.ts (your hook)
import {keepPreviousData, QueryKey, useQuery} from '@tanstack/react-query';

import {searchArticles} from '@/graphql/query/articles/search-articles';

interface UseSearchArticlesProps {
  tagId?: string; // this should be the DB _id
  page: number;
}

export const useSearchArticles = ({tagId, page}: UseSearchArticlesProps) =>
  useQuery<any, Error>({
    queryKey: ['search-articles', tagId, page] as QueryKey,
    queryFn: () => searchArticles({tags: tagId ? [tagId] : null, count: 12, page}),
    enabled: !!tagId, // ✅ don’t run with undefined
    placeholderData: keepPreviousData, // keeps old page while changing page
  });
