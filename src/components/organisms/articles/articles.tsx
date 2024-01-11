import {ImageCard} from '@/components/molecules/image-card';
import {ArticleType} from '@/graphql/generated/types';
import {css} from '@styled/css';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

function generateSeries(length: number): number[] {
  const series: number[] = [1, 3, 4, 6, 9, 11];

  for (let i = 0; i < length; i++) {
    const current = series[series.length - 1];
    const nextElement = current % 2 === 1 ? current + 2 : current + 1;
    series.push(nextElement);
  }

  return series;
}

const Articles = ({articles}: {articles: Array<ArticleType>}) => {
  const selectedIndexes = generateSeries(500);

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
