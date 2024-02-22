import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {YouTubeView} from '@/components';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const PLAYLIST_ID = 'PLyCSJvxjzJynD1L7YowrEK2afhjDkn7m5';

const Page = async () => {
  const response = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`,
  );
  const data = await response.json();
  const queryClient = getQueryClient();
  //   await queryClient.prefetchQuery({
  //     queryKey: ['find-tag', params.tagId],
  //     queryFn: () => FindTagBySlug({slug: params.tagId}),
  //   });
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
        <YouTubeView data={data} />
      </Hydrate>
    </div>
  );
};

export default Page;
