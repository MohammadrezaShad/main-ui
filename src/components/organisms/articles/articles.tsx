import {css} from '@styled/css';

import {ImageCard} from '@/components/molecules/image-card';
import {ArticleType} from '@/graphql/generated/types';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const Articles = ({articles, hasPdf}: {articles: Array<ArticleType>; hasPdf?: boolean}) => {
  const selectedIndexes = [1, 3, 4, 6, 9, 11];

  return (
    <div
      className={css({
        columns: {
          base: 3,
          mdDown: 1,
        },
        gap: 6,
      })}
    >
      {articles.map((article, index) => (
        <ImageCard
          key={article._id}
          articleLink={`/${hasPdf ? 'articles' : 'pdf-articles'}/${article.slug}`}
          date={article.publishDate}
          imageUrl={
            article.thumbnail?._id ? `${IMAGE_STORAGE_URL}/${article.thumbnail?._id}` : undefined
          }
          title={article.title}
          aspectRatio={!selectedIndexes.includes(index) ? 'square' : 'portrait'}
        />
      ))}
    </div>
  );
};

export default Articles;
