import {ImageCard} from '@/components/molecules/image-card';
import {css} from '@styled/css';

const Articles = ({articles}: {articles: Array<any>}) => {
  return (
    <div
      className={css({
        columns: 3,
        gap: 6,
      })}
    >
      {articles.map(article => (
        <ImageCard
          key={article.id}
          articleLink={article.link}
          date={article.date}
          imageUrl={article.image}
          title={article.title}
          aspectRatio={article.aspect}
        />
      ))}
    </div>
  );
};

export default Articles;
