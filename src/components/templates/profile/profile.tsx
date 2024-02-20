'use client';

import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import moment from 'moment';
import Image from 'next/image';
import {useRouter, useSearchParams} from 'next/navigation';

import {IconArrowRight, IconChevronLeft, IconChevronRight, IconInfo} from '@/assets';
import {Spinner} from '@/components';
import {CookieName} from '@/constants';
import {getUserVisits} from '@/graphql';
import {useUpdateSearchParam} from '@/hooks';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {Pagination} from '../articles/articles.styled';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

export default function Profile() {
  const searchParams = useSearchParams();
  const page = +(searchParams.get('page') ?? '1');
  const token = getCookie(CookieName.AUTH_TOKEN);
  const {data, isLoading} = useQuery({
    queryKey: ['get-user-visits', page],
    queryFn: () => getUserVisits({count: 10, page: page}, token!),
    placeholderData: keepPreviousData,
  });
  const router = useRouter();
  const updateSearchParams = useUpdateSearchParam();

  const totalPages = data?.totalPages as number;
  const totalCount = data?.totalCount;
  const count = 10;

  const startResult = (+page - 1) * count + 1;
  const endResult = Math.min(+page * count, totalCount || 0);

  return (
    <div
      className={flex({
        flexDir: 'column',
        justifyContent: 'start',
        flex: '1',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexGrow: '1',
          flexDir: 'column',
          mt: '7',
          alignItems: 'flex-start',
        })}
      >
        <div className={flex({alignItems: 'center', gap: '3'})}>
          <button
            type='button'
            aria-label='back to dashboard'
            onClick={() => router.push('/profile')}
          >
            <IconArrowRight className={css({rotate: '180deg', hideFrom: 'md'})} />
          </button>
          <h3
            className={css({
              textStyle: 'h3',
              color: 'text.primary',
            })}
          >
            Recent Activity
          </h3>
        </div>
        {isLoading ? (
          <Spinner />
        ) : !data?.results || data?.results.length < 1 ? (
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
              We don&apos;t have any recent activity for you right now.
            </p>
          </div>
        ) : (
          <>
            <ul
              className={css({
                mt: '10',
                w: 'full',
              })}
            >
              {data.results.map(result => (
                <li
                  key={result._id}
                  className={flex({
                    flexDir: 'column',
                    flex: 1,
                    alignItems: 'stretch',
                    pb: '4',
                    '&:not(:last-of-type)': {
                      borderBottom: '1px solid token(colors.gray3)',
                      mb: '4',
                    },
                  })}
                >
                  <div
                    className={flex({
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    })}
                  >
                    <span
                      className={css({
                        textStyle: 'body',
                        color: 'text.primary',
                      })}
                    >
                      You Visited
                    </span>
                    <span
                      className={css({
                        textStyle: 'body2',
                        color: 'gray4',
                      })}
                    >
                      {moment(result.updatedAt).fromNow()}
                    </span>
                  </div>
                  <div
                    className={flex({
                      alignItems: 'stretch',
                      justifyContent: 'space-between',
                      gap: '4',
                      mt: '3',
                    })}
                  >
                    {result.article.thumbnail?._id ? (
                      <Image
                        unoptimized
                        width={64}
                        height={64}
                        alt=''
                        src={`${IMAGE_STORAGE_URL}/${result.article.thumbnail?._id}`}
                        className={css({
                          aspectRatio: 'square',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          w: '16',
                          overflow: 'hidden',
                          flexShrink: '0',
                        })}
                      />
                    ) : (
                      <div
                        className={css({
                          width: '64px',
                          height: '64px',
                          backgroundColor: 'gray3',
                          aspectRatio: 'square',
                          flexShrink: '0',
                        })}
                      />
                    )}
                    <div
                      className={flex({
                        flex: 1,
                        flexDir: 'column',
                        alignItems: 'stretch',
                        alignSelf: 'start',
                      })}
                    >
                      <span
                        className={css({
                          textStyle: 'caption',
                          color: 'gray4',
                        })}
                      >
                        {moment(result.article.publishDate).format('DD MMMM YYYY')}
                      </span>
                      <h6
                        className={css({
                          textStyle: 'h4',
                          mt: '2.5',
                          color: 'text.primary',
                        })}
                      >
                        {result.article.title}
                      </h6>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div
              className={css({
                mt: 6,
                mb: -6,
                mx: 'auto',
              })}
            >
              <Pagination
                nextLabel={<IconChevronRight />}
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

        {/** Content */}
      </div>
    </div>
  );
}
