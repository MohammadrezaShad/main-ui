'use client';

import {FC, useEffect, useState} from 'react';
import {css} from '@styled/css';
import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import {useParams} from 'next/navigation';

import {Card, SmallCard, Spinner} from '@/components';
import {FindTagBySlug} from '@/graphql/query/tags';
import {useSearchArticles} from '@/hooks';

import PaginationSection from './pagination-section';
import {Cards, Container, Wrapper} from './tags.styled';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;
const READMORE_PAGE_COUNT = 12;

interface ArticleType {
  _id: string;
  slug: string;
  publishDate: string;
  title: string;
  thumbnail?: {_id: string};
}

interface TagsProps {}

const Tags: FC<TagsProps> = () => {
  const params = useParams();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [page, setPage] = useState(1);

  const findTagQuery = useQuery({
    queryKey: ['find-tag', params.tagId],
    queryFn: () => FindTagBySlug({slug: params.tagId as string}),
  });

  const {data, isLoading}: {data: any; isLoading: boolean} = useSearchArticles({
    tagId: findTagQuery.data!.result!._id,
    page,
  });

  useEffect(() => {
    if (data) {
      const _articles: ArticleType[] = data.article.searchArticles.results;
      setArticles(_articles);
    }
  }, [data]);

  if (isLoading) return <Spinner />;

  const {totalCount, totalPages} = data?.article.searchArticles;
  const startResult = (+page - 1) * READMORE_PAGE_COUNT + 1;
  const endResult = Math.min(+page * READMORE_PAGE_COUNT, totalCount || 0);

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

export default Tags;

const renderCard = (article: ArticleType) => (
  <Card
    key={article._id}
    articleLink={`/articles/${article.slug}`}
    date={moment(article.publishDate).format('DD MMMM YYYY')}
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
