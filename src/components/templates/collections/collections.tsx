'use client';

import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {useRouter} from 'next/navigation';

import {IconArrowRight} from '@/assets';
import {CookieName} from '@/constants';
import {DeleteOneArticleBookmarkInput, deleteBookmark, getUserBookmarkedArticles} from '@/graphql';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import BookmarkItem from './bookmark-item';
import {Bookmarks, Container, PageTitle, Tab, Tabs, Wrapper} from './collections.styled';

export default function CollectionsView() {
  const queryClient = useQueryClient();
  const authToken = getCookie(CookieName.AUTH_TOKEN)!;
  const {data} = useQuery({
    queryKey: ['get-user-bookmarked-articles'],
    queryFn: () => getUserBookmarkedArticles({}, authToken),
  });
  const router = useRouter();

  const removeBookmarkMutation = useMutation({
    mutationFn: (input: DeleteOneArticleBookmarkInput) => deleteBookmark(input, authToken!),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['get-user-bookmarked-articles']}),
  });

  const handleRemoveBookmark = async (articleId: string) => {
    if (!authToken) return;
    await removeBookmarkMutation.mutateAsync({articleId});
  };

  return (
    <Container>
      <Wrapper>
        <div className={flex({alignItems: 'center', gap: '3'})}>
          <button
            type='button'
            aria-label='back to dashboard'
            onClick={() => router.push('/profile')}
          >
            <IconArrowRight className={css({rotate: '180deg', hideFrom: 'md'})} />
          </button>
          <PageTitle>Collections</PageTitle>
        </div>
        <Tabs>
          <Tab active={true}>Articles</Tab>
          <Tab>Corporates</Tab>
        </Tabs>
        <Bookmarks>
          {data?.results?.map(article => (
            <BookmarkItem
              key={article._id}
              article={article}
              onRemoveBookmark={handleRemoveBookmark}
            />
          ))}
        </Bookmarks>
      </Wrapper>
    </Container>
  );
}
