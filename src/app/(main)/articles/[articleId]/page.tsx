import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {ArticlesDetails} from '@/components/templates/articles-details';
import {CookieName} from '@/constants';
import {ArticleType} from '@/graphql/generated/types';
import {findArticleByName} from '@/graphql/query/find-article-by-name';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {getCookie} from 'cookies-next';
import {Metadata} from 'next';
import {cookies} from 'next/headers';

export async function generateMetadata({params}: {params: {articleId: string}}): Promise<Metadata> {
  const token = getCookie(CookieName.AUTH_TOKEN, {cookies});
  const data: any = await findArticleByName({slug: params.articleId}, token);
  if (!data) {
    return {
      title: 'Not found',
      description: 'The page not found',
    };
  }
  const post: ArticleType = data.article.findArticleByName.result;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/articles/${post.slug}`,
    },
  };
}

const Page = async ({params}: {params: {articleId: string}}) => {
  const token = getCookie(CookieName.AUTH_TOKEN, {cookies});
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-article', params.articleId],
    queryFn: () => findArticleByName({slug: params.articleId}, token),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        mx: 'auto',
        maxWidth: '960px',
        p: {lgDown: 4},
      })}
    >
      <Hydrate state={dehydratedState}>
        <ArticlesDetails />
      </Hydrate>
    </div>
  );
};

export default Page;
