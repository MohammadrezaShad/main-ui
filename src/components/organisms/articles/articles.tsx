import {css} from '@styled/css';

import {ImageCard} from '@/components/molecules/image-card';
import {ArticleType} from '@/graphql/generated/types';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const Articles = ({articles, hasPdf}: {articles: Array<ArticleType>; hasPdf?: boolean}) => {
  const selectedIndexes = [1, 3, 4, 6, 9, 11];

  return (
    <>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          gap: '6',
          hideFrom: 'md',
          px: '4',
        })}
      >
        {articles.map((article, index) => (
          <ImageCard
            key={article._id}
            articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${article.slug}`}
            date={article.publishDate}
            imageUrl={
              article.thumbnail?._id
                ? `${IMAGE_STORAGE_URL}/${article.thumbnail?.filename}-${article.thumbnail?._id}`
                : undefined
            }
            title={article.title}
            aspectRatio={!selectedIndexes.includes(index) ? 'square' : 'portrait'}
          />
        ))}
      </div>
      <div
        className={css({
          display: {base: 'flex', mdDown: 'none'},
          alignItems: 'start',
          gap: 6,
          mdDown: {
            flexDir: 'column',
          },
        })}
      >
        <div
          className={css({
            w: 'full',
            flexDir: 'column',
            gap: '6',
            display: 'flex',
          })}
        >
          {articles[0] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[0]?.slug}`}
              date={articles[0]?.publishDate}
              imageUrl={
                articles[0]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[0]?.thumbnail?.filename}-${articles[0]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[0]?.title}
              aspectRatio='square'
            />
          )}
          {articles[3] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[3]?.slug}`}
              date={articles[3]?.publishDate}
              imageUrl={
                articles[3]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[3]?.thumbnail?.filename}-${articles[3]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[3]?.title}
              aspectRatio='portrait'
            />
          )}
          {articles[6] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[6]?.slug}`}
              date={articles[6]?.publishDate}
              imageUrl={
                articles[6]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[6]?.thumbnail?.filename}-${articles[6]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[6]?.title}
              aspectRatio='square'
            />
          )}
          {articles[9] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[9]?.slug}`}
              date={articles[9]?.publishDate}
              imageUrl={
                articles[9]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[9]?.thumbnail?.filename}-${articles[9]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[9]?.title}
              aspectRatio='portrait'
            />
          )}
        </div>
        <div className={css({w: 'full', display: 'flex', flexDir: 'column', gap: '6'})}>
          {articles[1] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[1]?.slug}`}
              date={articles[1]?.publishDate}
              imageUrl={
                articles[1]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[1]?.thumbnail?.filename}-${articles[1]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[1]?.title}
              aspectRatio='portrait'
            />
          )}
          {articles[4] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[4]?.slug}`}
              date={articles[4]?.publishDate}
              imageUrl={
                articles[4]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[4]?.thumbnail?.filename}-${articles[4]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[4]?.title}
              aspectRatio='square'
            />
          )}
          {articles[7] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[7]?.slug}`}
              date={articles[7]?.publishDate}
              imageUrl={
                articles[7]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[7]?.thumbnail?.filename}-${articles[7]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[7]?.title}
              aspectRatio='portrait'
            />
          )}
          {articles[10] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[10]?.slug}`}
              date={articles[10]?.publishDate}
              imageUrl={
                articles[10]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[10]?.thumbnail?.filename}-${articles[10]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[10]?.title}
              aspectRatio='square'
            />
          )}
        </div>
        <div className={css({w: 'full', display: 'flex', flexDir: 'column', gap: '6'})}>
          {articles[2] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[2]?.slug}`}
              date={articles[2]?.publishDate}
              imageUrl={
                articles[2]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[2]?.thumbnail?.filename}-${articles[2]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[2]?.title}
              aspectRatio='square'
            />
          )}
          {articles[5] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[5]?.slug}`}
              date={articles[5]?.publishDate}
              imageUrl={
                articles[5]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[5]?.thumbnail?.filename}-${articles[5]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[5]?.title}
              aspectRatio='portrait'
            />
          )}
          {articles[8] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[8]?.slug}`}
              date={articles[8]?.publishDate}
              imageUrl={
                articles[8]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[8]?.thumbnail?.filename}-${articles[8]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[8]?.title}
              aspectRatio='square'
            />
          )}
          {articles[11] && (
            <ImageCard
              articleLink={`/${hasPdf ? 'pdf-articles' : 'articles'}/${articles[11]?.slug}`}
              date={articles[11]?.publishDate}
              imageUrl={
                articles[11]?.thumbnail?._id
                  ? `${IMAGE_STORAGE_URL}/${articles[11]?.thumbnail?.filename}-${articles[11]?.thumbnail?._id}`
                  : undefined
              }
              title={articles[11]?.title}
              aspectRatio='portrait'
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Articles;
