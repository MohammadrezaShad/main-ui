'use client';

import {Card, SmallCard} from '@/components';
import {ArticleType, StatusType, searchArticles} from '@/graphql';
import {css} from '@styled/css';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';
import {useState} from 'react';
import Tabs from './Tabs';
import PaginationSection from './pagination-section';
import {Cards, Container, Wrapper} from './water-crisis.styled';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;
const READMORE_PAGE_COUNT = 12;

const WaterCrisis = () => {
  const params = useParams();
  const [page, setPage] = useState(1);

  const {data, isLoading} = useQuery({
    queryKey: ['water-crisis', page],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 12, page}),
    placeholderData: keepPreviousData,
  }) as any;

  const articles = data?.article.searchArticles.results;

  const {totalCount, totalPages} = data?.article.searchArticles;
  const startResult = (+page - 1) * READMORE_PAGE_COUNT + 1;
  const endResult = Math.min(+page * READMORE_PAGE_COUNT, totalCount || 0);

  return (
    <Container>
      <Wrapper>
        <header className={css({textStyle: 'h1', color: 'text.primary', px: '-4'})}>
          Water Crisis
        </header>
      </Wrapper>
      <Tabs />
      <Cards hideBelow='md'>{articles.map(renderCard)}</Cards>
      <Cards hideFrom='md'>{articles.map(renderSmallCard)}</Cards>

      {!!totalCount && totalCount > 12 && (
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

export default WaterCrisis;

const renderCard = (article: ArticleType) => (
  <Card
    key={article._id}
    articleLink={`/articles/${article.slug}`}
    date={article.publishDate}
    imageUrl={article.thumbnail?._id ? `${IMAGE_STORAGE_URL}/${article.thumbnail?._id}` : undefined}
    title={article.title}
  />
);

const renderSmallCard = (article: ArticleType) => (
  <SmallCard
    key={article._id}
    articleLink={`/articles/${article.slug}`}
    date={article.publishDate}
    imageUrl={article.thumbnail?._id ? `${IMAGE_STORAGE_URL}/${article.thumbnail?._id}` : undefined}
    title={article.title}
  />
);
