import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import type {Metadata} from 'next';
import {cookies} from 'next/headers';

import JsonLdScript from '@/components/shared/json-ld-script';
import {ArticlesDetails} from '@/components/templates/articles-details';
import {CookieName} from '@/constants';
import {ArticleType, findArticleByName, searchArticles, StatusType} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {
  getBlogArticleSchema,
  getBreadCrumbListSchema,
  getFAQSchema,
  getOrganizationSchema,
  getPersonSchema,
} from '@/utils';

export const revalidate = 180;

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
    title: post.seoSetting?.general?.title || post.title,
    description: post.seoSetting?.general?.description || post.excerpt,
    alternates: {
      canonical:
        post.seoSetting?.general?.canonicalUrl ||
        `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${post.slug}`,
    },
    keywords: post.seoSetting?.general?.focusKeyword || post.tags?.map(tag => tag.title).join(', '),
    authors: [{name: post.author ? `${post.author.firstName} ${post.author.lastName}` : 'User'}],
    creator: post.author ? `${post.author.firstName} ${post.author.lastName}` : 'User',
    robots: {
      follow: !post.seoSetting?.general?.nofollow,
      index: !post.seoSetting?.general?.noindex,
      googleBot: {
        follow: !post.seoSetting?.general?.nofollow,
        index: !post.seoSetting?.general?.noindex,
      },
    },
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
      {post.author && <JsonLdScript id={post.author._id} data={getPersonSchema(post.author)} />}
      {post.faqs && post.faqs.length > 0 && (
        <JsonLdScript id='faqs' data={getFAQSchema(post.faqs)} />
      )}
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
