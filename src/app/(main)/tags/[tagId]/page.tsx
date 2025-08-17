// app/tags/[tagId]/page.tsx
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';

import {TagsView} from '@/components';
import {TagType} from '@/graphql/generated/types';
import {searchArticles} from '@/graphql/query/articles';
import {FindTagBySlug} from '@/graphql/query/tags';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const revalidate = 180;

export async function generateMetadata({
  params: initalParams,
}: {
  params: {tagId: string};
}): Promise<Metadata> {
  const params = await initalParams;

  const tagData: any = await FindTagBySlug({slug: params.tagId});
  const tag: TagType = tagData?.result;
  if (!tag) {
    return {
      title: 'Not found',
      description: 'The page not found',
    };
  }
  return {
    title: tag.seoSetting?.general?.title || tag.title,
    description: tag.seoSetting?.general?.description || tag.description,
    alternates: {
      canonical:
        tag.seoSetting?.general?.canonicalUrl ||
        `${process.env.NEXT_PUBLIC_BASE_URL}/tags/${tag.slug}`,
    },
    keywords: tag.seoSetting?.general?.focusKeyword,
    robots: {
      follow: tag.seoSetting?.general?.nofollow || true,
      index: tag.seoSetting?.general?.noindex || true,
      googleBot: {
        follow: tag.seoSetting?.general?.nofollow || true,
        index: !tag.seoSetting?.general?.noindex || true,
      },
    },
  };
}

const Page = async ({params: initialParams}: {params: {tagId: string}}) => {
  const queryClient = getQueryClient();
  const params = await initialParams;
  // 1) Prefetch the tag by slug
  await queryClient.prefetchQuery({
    queryKey: ['find-tag', params.tagId],
    queryFn: () => FindTagBySlug({slug: params.tagId}),
  });

  const tagData: any = queryClient.getQueryData(['find-tag', params.tagId]);
  const tag = tagData?.result;
  if (!tag?._id) {
    notFound(); // better than redirect for 404
  }

  // 2) Prefetch first page of articles using the TAG _id
  const page = 1;
  await queryClient.prefetchQuery({
    // IMPORTANT: key matches client hook exactly
    queryKey: ['search-articles', tag._id, page],
    queryFn: () => searchArticles({tags: [tag._id], count: 12, page}),
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
        <TagsView />
      </Hydrate>
    </div>
  );
};

export default Page;
