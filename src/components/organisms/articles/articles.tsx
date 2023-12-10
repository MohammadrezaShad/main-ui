import {ImageCard} from '@/components/molecules/image-card';
import {ArticleType} from '@/graphql/generated/types';
import {css} from '@styled/css';

const Articles = ({articles}: {articles: Array<ArticleType>}) => {
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
          articleLink={`articles/${article._id}`}
          date={article.publishDate}
          imageUrl={article.thumbnail?.preview}
          title={article.title}
          aspectRatio={index % 2 == 0 ? 'square' : 'portrait'}
        />
      ))}
    </div>
  );
};

export default Articles;
