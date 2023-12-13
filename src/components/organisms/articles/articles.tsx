import {css} from '@styled/css';

import {ImageCard} from '@/components/molecules/image-card';
import {ArticleType} from '@/graphql/generated/types';

const Articles = ({articles}: {articles: Array<ArticleType>}) => (
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
        imageUrl={article.thumbnail?.preview}
        title={article.title}
        aspectRatio={index % 2 === 0 ? 'square' : 'portrait'}
      />
    ))}
  </div>
);

export default Articles;
