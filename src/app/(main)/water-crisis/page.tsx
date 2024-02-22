import {WaterCrisisView} from '@/components';
import {StatusType, searchArticles} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['water-crisis', 1],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 12, page: 1}),
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
        <WaterCrisisView />
      </Hydrate>
    </div>
  );
};

export default Page;
