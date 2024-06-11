import {getCookie} from 'cookies-next';
import {cookies} from 'next/headers';
import {ImageResponse} from 'next/og';

import {CookieName} from '@/constants';
import {findArticleByName} from '@/graphql';
import {ArticleType} from '@/graphql/generated/types';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

export const size = {
  width: 1200,
  height: 630,
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
          width='1200'
          height='630'
          src={`${IMAGE_STORAGE_URL}/${post.thumbnail?.filename}-${post.thumbnail?._id}?w=1200&h=630`}
          alt={post.title ?? ''}
          style={{
            objectFit: 'cover',
          }}
        />
        <div tw='absolute bg-black flex opacity-0.5 inset-0' />
        <div tw='absolute top-2 left-2 flex flex-col bg-white/65 w-max rounded-2xl'>
          <p tw='text-gray-700 text-center text-4xl font-bold mt-5 mx-5 capitalize'>{post.title}</p>
          <p tw='text-gray-500 text-xl font-bold mx-5'>By:&nbsp;{post.author?.displayName}</p>
        </div>
      </div>
    ),
    size,
  );
}
