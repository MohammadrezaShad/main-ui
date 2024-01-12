// utils/graphql.ts
import {searchArticles} from '@/graphql/query/search-articles';
import {QueryKey, keepPreviousData, useQuery} from '@tanstack/react-query';

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
