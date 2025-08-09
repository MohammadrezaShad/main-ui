import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {Metadata} from 'next';
import {cookies} from 'next/headers';

import {AuthorView} from '@/components';
import {CookieName} from '@/constants';
import {findUserById, searchArticlesByAuthorId, User} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export async function generateMetadata({
  params: initalParams,
}: {
  params: {authorId: string};
}): Promise<Metadata> {
  const params = await initalParams;

  const cookieStore = await cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const data: any = await findUserById({id: params.authorId}, authToken);
  if (!data) {
    return {
      title: 'Not found',
      description: 'The page not found',
    };
  }
  const author: User = data.users!.findUserById;

  function getAuthorName() {
    if (!author) return 'Unknow Author';
    if (author.displayName) return author.displayName;
    if (author.firstName && author.lastName) return `${author.firstName} ${author.lastName}`;
    if (author.username) return author.username;
    return 'Unknow Author';
  }

  return {
    title: getAuthorName(),
    description: '',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/author/${params.authorId}`,
    },
    robots: {
      follow: true,
      index: true,
      googleBot: {
        follow: true,
        index: true,
      },
    },
  };
}

const Page = async ({params: initalParams}: {params: {authorId: string}}) => {
  const params = await initalParams;
  const cookieStore = await cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-user', params.authorId],
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
