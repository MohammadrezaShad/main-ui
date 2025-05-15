'use client';

import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {useRouter, useSearchParams} from 'next/navigation';

import {IconArrowRight, IconChevronLeft, IconChevronRight, IconInfo} from '@/assets';
import {Spinner} from '@/components';
import {CookieName} from '@/constants';
import {deleteBookmark, DeleteOneArticleBookmarkInput, searchCompanies} from '@/graphql';
import {useUpdateSearchParam} from '@/hooks';

import {Pagination} from '../articles/articles.styled';
import {Companies, Container, PageTitle, Wrapper} from './business.styled';
import BusinessItem from './business-item';

export default function BusinessesView() {
  const searchParams = useSearchParams();
  const page = +(searchParams.get('page') ?? '1');
  const queryClient = useQueryClient();
  const authToken = getCookie(CookieName.AUTH_TOKEN)!;
  const {data, isLoading} = useQuery({
    queryKey: ['get-companies'],
    queryFn: () => searchCompanies({count: 10, page: 1}),
  });
  const router = useRouter();
  const updateSearchParams = useUpdateSearchParam();

  const totalPages = data?.totalPages as number;
  const totalCount = data?.totalCount;
  const count = 10;

  const startResult = (+page - 1) * count + 1;
  const endResult = Math.min(+page * count, totalCount || 0);

  // TODO: Replace with delete business
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
          <PageTitle>Businesses</PageTitle>
        </div>
        {isLoading ? <Spinner /> : null}
        {!data?.results || data?.results.length < 1 ? (
          <div
            className={flex({
              alignSelf: 'center',
              flex: 0,
              flexBasis: '0%',
              flexDir: 'column',
              alignItems: 'center',
              my: 'auto',
            })}
          >
            <IconInfo
              className={css({
                w: '16',
                h: '16',
              })}
            />
            <p
              className={css({
                textStyle: 'body',
                textAlign: 'center',
                mt: '5',
                color: 'gray4',
              })}
            >
              You have no businesses yet.
            </p>
          </div>
        ) : (
          <>
            <Companies>
              {data?.results?.map(article => (
                <BusinessItem
                  key={article._id}
                  article={article}
                  onRemoveBookmark={handleRemoveBookmark}
                />
              ))}
            </Companies>
            <div
              className={css({
                mt: 6,
                mb: -6,
                mx: 'auto',
              })}
            >
              <Pagination
                nextLabel={<IconChevronRight className={css({w: '6', h: '6'})} />}
                onPageChange={current => updateSearchParams('page', String(current.selected + 1))}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel={<IconChevronLeft />}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLabel='...'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
                renderOnZeroPageCount={null}
              />
              <span
                className={css({
                  color: 'gray4',
                  fontWeight: 300,
                  fontSize: '14px',
                  textAlign: 'center',
                })}
              >
                Showing {startResult}-{endResult} of {totalCount || 0}
              </span>
            </div>
          </>
        )}
      </Wrapper>
    </Container>
  );
}
