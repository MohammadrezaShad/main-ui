'use client';

import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import Image from 'next/image';

import {bgMaze, coin, IconClose} from '@/assets';
import {Modal} from '@/components/atoms/modal';
import {QuizCard} from '@/components/molecules';
import {CookieName} from '@/constants';
import {
  findGraphicalQuizById,
  GraphicalQuizType,
  payAndFindGraphical,
  searchGraphicalQuizzes,
} from '@/graphql';
import {Paths} from '@/utils';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';

export default function GraphicalQuizzes() {
  const token = getCookie(CookieName.AUTH_TOKEN)!;
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<GraphicalQuizType[]>([]);
  const [page, setPage] = useState(1);
  const targetQuiz$ = useObservable<GraphicalQuizType>();
  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['search-graphical-quizzes'],
    queryFn: ({pageParam}) => searchGraphicalQuizzes({count: 12, page: pageParam}, token),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages, lastPagParam, allPagesParam) => {
      const totalPages = lastPage?.totalPages;
      if (totalPages) {
        return lastPagParam + 1 <= totalPages ? lastPagParam + 1 : undefined;
      }

      return undefined;
    },
  });

  const getQuizInfo = async (id: string) => {
    const quiz = await findGraphicalQuizById({id}, token);
    targetQuiz$.set(quiz.result);
  };

  const startQuiz = async (id: string) => {
    try {
      const response = await payAndFindGraphical({id}, token);
      if (response.success && token) {
        router.push(`${Paths.Quiz.getPath()}/graphical/${response.result?._id}`);
      }
    } catch (error: Error | any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (data) {
      const _articles =
        data?.pages.reduce(
          (acc: any, currentPage: any, index: any) =>
            index !== 0 ? [...acc, ...currentPage?.results] : [...acc],
          data?.pages[0]?.results,
        ) || [];
      setQuizzes(_articles);
    }
  }, [data]);

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        bgColor: 'white',
        mx: '-8',
      })}
    >
      <header
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          alignSelf: 'stretch',
          w: 'full',
          whiteSpace: 'nowrap',
          mdDown: {pl: '5', pr: '5', maxW: 'full'},
          minH: '[160px]',
          pos: 'relative',
        })}
      >
        <div
          style={{
            backgroundImage: `url(${bgMaze.src})`,
          }}
          className={css({
            w: 'full',
            maxW: '[640px]',
            mdDown: {pl: '5', pr: '5'},
            bgRepeat: 'no-repeat',
            bgSize: 'cover',
          })}
        >
          <div
            className={css({
              bg: 'linear-gradient(90deg, rgba(4,25,14,1) 0%, rgba(4,25,14,1) 25%, rgba(4,25,14,0) 33%, rgba(4,25,14,0) 66%, rgba(4,25,14,1) 75%, rgba(4,25,14,1) 100%)',
              position: 'absolute',
              inset: '0',
            })}
          />
          <span
            className={css({
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'text.invert',
              textStyle: 'h1',
            })}
          >
            Graphical Quizzes
          </span>
        </div>
      </header>
      <div
        className={css({
          px: '16',
          mt: '6',
          w: 'full',
          maxW: '960px',
          mdDown: {maxW: 'full'},
        })}
      >
        <div className={css({mt: '6', mdDown: {maxW: 'full'}})}>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 3,
              gap: '5',
              mdDown: {gridTemplateColumns: 1, gap: '0'},
            })}
          >
            {quizzes.map(quiz => (
              <QuizCard key={quiz._id} getQuizInfo={getQuizInfo} quiz={quiz} />
            ))}
          </div>
        </div>
      </div>
      {hasNextPage ? (
        <div
          className={css({
            mt: 6,
            mb: -6,
          })}
        >
          <button
            type='button'
            onClick={() => fetchNextPage()}
            className={css({
              backgroundColor: 'primary',
              px: '4',
              py: '3',
              mx: 'auto',
              display: 'block',
              cursor: 'pointer',
            })}
          >
            <span
              className={css({
                textStyle: 'body',
                color: 'text.invert',
              })}
            >
              Show more
            </span>
          </button>
        </div>
      ) : null}
      <Modal isOpen$={!!targetQuiz$.use()} onClose={() => targetQuiz$.set(undefined)}>
        <form
          className={css({
            display: 'flex',
            flexDir: 'column',
            p: '8',
            bgColor: 'white',
            maxW: '480px',
            mdDown: {
              maxW: 'full',
              px: '8',
              py: '6',
              h: 'calc(100vh - 84px)',
              w: '100%',
              zIndex: '1',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            },
          })}
        >
          <header
            className={css({
              display: 'flex',
              gap: '5',
              justifyContent: {base: 'space-between', mdDown: 'center'},
            })}
          >
            <Image
              unoptimized
              width={128}
              height={128}
              src={coin}
              alt=''
              className={css({
                w: '16',
                h: '16',
                aspectRatio: 'square',
                objectFit: 'contain',
                objectPosition: 'center',
                overflow: 'hidden',
                flexShrink: '0',
                mdDown: {w: '32', h: '32'},
              })}
            />
            <button
              type='button'
              onClick={() => targetQuiz$.set(undefined)}
              className={css({
                cursor: 'pointer',
                alignSelf: 'flex-start',
                w: '6',
                aspectRatio: 'square',
                hideBelow: 'md',
              })}
            >
              <IconClose />
            </button>
          </header>
          <h1
            className={css({
              mt: '5',
              fontSize: '2xl',
              lineHeight: '2xl',
              fontWeight: 'medium',
              color: 'text.primary',
              mdDown: {
                textAlign: 'center',
                textStyle: 'h3',
              },
            })}
          >
            You need to pay {targetQuiz$.use()?.price} coins to start the quiz
          </h1>
          <div
            className={css({
              display: 'flex',
              gap: '4',
              mt: '8',
              fontSize: 'base',
              lineHeight: 'base',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              mdDown: {
                flexDir: 'column',
                position: 'absolute',
                left: '8',
                right: '8',
                bottom: '6',
              },
            })}
          >
            <button
              type='button'
              onClick={() => startQuiz(targetQuiz$.get()._id)}
              className={css({
                pl: '12',
                pr: '12',
                py: '3',
                cursor: 'pointer',
                w: {
                  base: '1/3',
                  mdDown: 'full',
                },
                color: 'white',
                bgColor: 'primary',
              })}
              aria-label='Pay'
            >
              Pay
            </button>
            <button
              type='button'
              onClick={() => targetQuiz$.set(undefined)}
              className={css({
                pl: '10',
                pr: '10',
                py: '3',
                cursor: 'pointer',
                w: {
                  base: '1/3',
                  mdDown: 'full',
                },
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'gray3',
                color: 'gray4',
              })}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
