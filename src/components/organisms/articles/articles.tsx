import {ImageCard} from '@/components/molecules/image-card';
import {ArticleType} from '@/graphql/generated/types';
import {css} from '@styled/css';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const Articles = ({articles}: {articles: Array<ArticleType>}) => {
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
          articleLink={`/articles/${article.slug}`}
          date={article.publishDate}
          imageUrl={`${IMAGE_STORAGE_URL}/${article.thumbnail?._id}`}
          title={article.title}
          aspectRatio={!selectedIndexes.includes(index) ? 'square' : 'portrait'}
        />
      ))}
    </div>
  );
};

export default Articles;
