import {CookieName} from '@/constants';
import {ArticleType} from '@/graphql/generated/types';
import {findArticleByName} from '@/graphql/query/find-article-by-name';
import {getCookie} from 'cookies-next';
import {cookies} from 'next/headers';
import {ImageResponse} from 'next/og';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

export const size = {
  width: 900,
  height: 450,
};

export const contentType = 'image/png';

export default async function Image({params}: {params: {articleId: string}}) {
  const token = getCookie(CookieName.AUTH_TOKEN, {cookies});
  const data: any = await findArticleByName({slug: params.articleId}, token);
  const post: ArticleType = data.article.findArticleByName.result;

  return new ImageResponse(
    (
      <div tw='relative flex items-center justify-center'>
        <img
          width='900'
          height='450'
          src={`${IMAGE_STORAGE_URL}/${post.thumbnail?._id}`}
          alt={post.title ?? ''}
          style={{
            objectFit: 'cover',
          }}
        />
        <div tw='absolute bg-black flex opacity-0.5 inset-0' />
        <div tw='absolute top-2 flex items-center w-full'>
          <p tw='text-gray-700 text-center text-4xl font-bold m-5'>{post.title}</p>
          <p tw='text-gray-500 text-xl font-bold m-5'>{post.author.displayName}</p>
        </div>
      </div>
    ),
    size,
  );
}
