import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {Metadata} from 'next';
import {cookies} from 'next/headers';

import JsonLdScript from '@/components/shared/json-ld-script';
import {ArticlesDetails} from '@/components/templates/articles-details';
import {CookieName} from '@/constants';
import {ArticleType, StatusType, findArticleByName, searchArticles} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {getBlogArticleSchema, getBreadCrumbListSchema, getOrganizationSchema} from '@/utils';

export const revalidate = 3600;

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
    keywords: post.tags?.map(tag => tag.title).join(', '),
  };
}

export async function generateStaticParams(): Promise<any> {
  const data = (await searchArticles({status: StatusType.Publish, count: 100})) as any;
  const articles: Array<ArticleType> = data.article!.searchArticles.results;
  return articles.map(article => ({
    articleId: article.slug,
  }));
}

const Page = async ({params}: {params: {articleId: string}}) => {
  const token = getCookie(CookieName.AUTH_TOKEN, {cookies});
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-article', params.articleId],
    queryFn: () => findArticleByName({slug: params.articleId}, token),
  });
  const dehydratedState = dehydrate(queryClient);

  const data: any = await findArticleByName({slug: params.articleId}, token);
  if (!data) {
    return {
      title: 'Not found',
      description: 'The page not found',
    };
  }
  const post: ArticleType = data.article.findArticleByName.result;

  return (
    <section
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        mx: 'auto',
        maxWidth: '960px',
        p: {lgDown: 4},
      })}
    >
      <JsonLdScript id='organization' data={getOrganizationSchema()} />
      <JsonLdScript id={params.articleId} data={getBlogArticleSchema(post)} />
      <JsonLdScript
        id='breadcrumbs'
        data={getBreadCrumbListSchema([{title: 'Articles', pathName: '/articles'}], post.title)}
      />
      <Hydrate state={dehydratedState}>
        <ArticlesDetails />
      </Hydrate>
    </section>
  );
};

export default Page;
