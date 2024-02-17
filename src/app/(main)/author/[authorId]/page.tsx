import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {cookies} from 'next/headers';

import {AuthorView} from '@/components';
import {CookieName} from '@/constants';
import {findUserById, searchArticlesByAuthorId} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async ({params}: {params: {authorId: string}}) => {
  const cookieStore = cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-user', 1],
    queryFn: () => findUserById({id: params.authorId}, authToken),
  });
  await queryClient.prefetchQuery({
    queryKey: ['search-articles', 2],
    queryFn: () => searchArticlesByAuthorId({authors: [params.authorId], count: 9, page: 1}),
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
        <AuthorView />
      </Hydrate>
    </div>
  );
};

export default Page;
