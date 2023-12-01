import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import Button from '@/components/atoms/button/button';
import HomeVide from '@/components/templates/home';
import getQueryClient from '@/helpers/get-query-client';
import Hydrate from '@/providers/hydrate.provider';
import {gqlFetch} from '@/service/fetch';

async function getData() {
  const res = await gqlFetch(
    process.env.NEXT_PUBLIC_API as string,
    `query SearchCachedTrendLinks {
        trendLinks {
          searchCachedTrendLinks {
            error
            results {
              _id
              link
              title
            }
            status
            success
            totalCount
            totalPages
          }
        }
  }`,
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['hydrate-data'], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <Hydrate state={dehydratedState}>
        <HomeVide />
      </Hydrate>
      <Button visual='contained' size='md' color='textPrimary'>
        red
      </Button>
      <div
        className={css({
          fontSize: 'xxx-large',
          fontWeight: 'bold',
          textStyle: 'body2',
          color: 'text.primary',
          borderRadius: 'md',
          px: 3,
        })}
      >
        Hello 🐼!
      </div>
    </main>
  );
}
