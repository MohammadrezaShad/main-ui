import {ArticlesDetails} from '@/components/templates/articles-details';
import {findArticleById} from '@/graphql/query/find-article-by-id';
import {findRelatedArticles} from '@/graphql/query/find-related-articles';
import {getArticlePdfById} from '@/graphql/query/get-article-pdf-by-id';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

const Page = async ({params}: {params: {articleId: string}}) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-articles'],
    queryFn: () => findArticleById({id: params.articleId}),
  });
  await queryClient.prefetchQuery({
    queryKey: ['get-related-articles'],
    queryFn: () => findRelatedArticles({articleId: params.articleId, count: 3}),
  });
  await queryClient.prefetchQuery({
    queryKey: ['get-pdf'],
    queryFn: () => getArticlePdfById(params.articleId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={css({display: 'flex', flexDir: 'column', rowGap: 8})}>
      <Hydrate state={dehydratedState}>
        <ArticlesDetails />
      </Hydrate>
    </div>
  );
};

export default Page;
