import {ArticleType, StatusType} from '@/graphql/generated/types';
import {searchArticles} from '@/graphql/query/search-articles';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const data: any = await searchArticles({status: StatusType.Publish, count: 1000});
  const articles: ArticleType[] = data.article.searchArticles.results;

  const artilceUrls = articles.map(article => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.updatedAt,
  }));

  return [...artilceUrls];
}
