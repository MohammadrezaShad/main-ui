'use client';

import React, {FC} from 'react';
import {css} from '@styled/css';
import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import {useParams} from 'next/navigation';

import {Card, SmallCard, Spinner} from '@/components';
import {Description} from '@/components/molecules/description';
import {FindTagBySlug} from '@/graphql/query/tags';
import {useSearchArticles} from '@/hooks';

import PaginationSection from './pagination-section';
import {Cards, Container, Wrapper} from './tags.styled';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL!;
const READMORE_PAGE_COUNT = 12;

interface ArticleType {
  _id: string;
  slug: string;
  publishDate: string;
  title: string;
  thumbnail?: {_id: string};
}

const Tags: FC = () => {
  const params = useParams();
  const [page, setPage] = React.useState(1);

  // 1) Get tag by slug
  const findTagQuery = useQuery({
    queryKey: ['find-tag', params.tagId],
    queryFn: () => FindTagBySlug({slug: params.tagId as string}),
  });

  const {_id: tagId, originalDescription} = findTagQuery.data?.result || {};

  // 2) Articles query runs only when tagId exists (enabled: !!tagId in the hook)
  const {data, isLoading, isFetching} = useSearchArticles({tagId, page});

  // 3) Gate the UI until we at least know the tagId and (for first load) have articles or are loading them
  if (findTagQuery.isLoading || !tagId) return <Spinner />;
  if (isLoading && !data) return <Spinner />; // first load of articles

  const articles: ArticleType[] = data?.article.searchArticles.results ?? [];
  const {totalCount = 0, totalPages = 0} = data?.article.searchArticles ?? {};
  const startResult = (page - 1) * READMORE_PAGE_COUNT + 1;
  const endResult = Math.min(page * READMORE_PAGE_COUNT, totalCount);

  return (
    <Container>
      <Wrapper>
        <header className={css({textStyle: 'h1', color: 'text.invert', px: '-4'})}>
          {findTagQuery.data?.result?.title}
        </header>
        <div
          className={css({textStyle: 'body2', color: 'text.invert'})}
          role='status'
          aria-label={`Result: ${totalCount} Articles`}
        >
          Result: {findTagQuery.data?.result?.postCount} Articles
        </div>
      </Wrapper>
      {originalDescription ? <Description>{originalDescription}</Description> : null}
      {/* Keep previous page visible while fetching the next */}
      <Cards hideBelow='md'>{articles.map(renderCard)}</Cards>
      <Cards hideFrom='md'>{articles.map(renderSmallCard)}</Cards>

      {!!totalCount && totalCount > READMORE_PAGE_COUNT && (
        <PaginationSection
          totalCount={totalCount}
          totalPages={totalPages}
          onPageChange={current => setPage(current.selected + 1)}
          startResult={startResult}
          endResult={endResult}
        />
      )}
    </Container>
  );
};

export default Tags;

const renderCard = (article: ArticleType) => (
  <Card
    key={article._id}
    articleLink={`/articles/${article.slug}`}
    date={moment(article.publishDate).format('DD MMMM YYYY')}
    imageUrl={article.thumbnail?._id ? `${IMAGE_STORAGE_URL}/${article.thumbnail._id}` : undefined}
    title={article.title}
  />
);

const renderSmallCard = (article: ArticleType) => (
  <SmallCard
    key={article._id}
    articleLink={`/articles/${article.slug}`}
    date={article.publishDate}
    imageUrl={article.thumbnail?._id ? `${IMAGE_STORAGE_URL}/${article.thumbnail._id}` : undefined}
    title={article.title}
  />
);
