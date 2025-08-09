import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import type {Metadata} from 'next';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

import JsonLdScript from '@/components/shared/json-ld-script';
import {ArticlesDetails} from '@/components/templates/articles-details';
import {CookieName} from '@/constants';
import {ArticleType, findArticleByName} from '@/graphql';
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

export async function generateMetadata({
  params: initalParams,
}: {
  params: {articleId: string};
}): Promise<Metadata> {
  const params = await initalParams;

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
      follow: post.seoSetting?.general?.nofollow || true,
      index: post.seoSetting?.general?.noindex || true,
      googleBot: {
        follow: post.seoSetting?.general?.nofollow || true,
        index: !post.seoSetting?.general?.noindex || true,
      },
    },
  };
}

const Page = async ({params: initalParams}: {params: {articleId: string}}) => {
  const params = await initalParams;

  const token = getCookie(CookieName.AUTH_TOKEN, {cookies});
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-article', params.articleId],
    queryFn: () => findArticleByName({slug: params.articleId}, token),
  });
  const dehydratedState = dehydrate(queryClient);

  const data: any = queryClient.getQueryData(['get-article', params.articleId]);
  if (!data) {
    redirect('/not-found');
  }
  const post: ArticleType = data.article.findArticleByName.result;

  return (
    <section
      className={css({
        display: 'flex',
        flexDir: 'column',
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
