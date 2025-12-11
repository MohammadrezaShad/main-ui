'use client';

import {useMemo} from 'react';
import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import {type InfiniteData, useInfiniteQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Link from 'next/link';

import {bgMaze, IconClose, IconDrop} from '@/assets';
import {Modal} from '@/components/atoms/modal';
import {QuizCard} from '@/components/molecules';
import {CookieName} from '@/constants';
import {findGraphicalQuizById, type GraphicalQuizType, searchGraphicalQuizzes} from '@/graphql';
import {Paths} from '@/utils';

import {
  Banner,
  Button,
  CardList,
  Container,
  Header,
  HeadTitle,
  Title,
  Wrapper,
} from './graphical-quiz.styled';

// One page shape returned by the query function
type GraphicalPage = Awaited<ReturnType<typeof searchGraphicalQuizzes>>;

export default function GraphicalQuizzes() {
  const token = (getCookie(CookieName.AUTH_TOKEN) as string) || '';
  const targetQuiz$ = useObservable<GraphicalQuizType>();

  const {data, fetchNextPage, hasNextPage, isLoading} = useInfiniteQuery<
    GraphicalPage, // TQueryFnData (per page)
    Error, // TError
    GraphicalPage, // TData
    readonly ['search-graphical-quizzes', {count: number}], // TQueryKey
    number // TPageParam
  >({
    queryKey: ['search-graphical-quizzes', {count: 12}] as const,
    queryFn: ({pageParam = 1}) => searchGraphicalQuizzes({count: 12, page: pageParam}, token),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = lastPage?.totalPages ?? 1;
      const next = pages.length + 1;
      return next <= totalPages ? next : undefined;
    },
    staleTime: 60_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Derive quizzes directly from hydrated data to avoid empty flash
  const quizzes = useMemo<GraphicalQuizType[]>(() => {
    if (!data) return [];
    return (data as unknown as InfiniteData<GraphicalPage>).pages.flatMap(p => p?.results ?? []);
  }, [data]);

  const totalCount = (data as InfiniteData<GraphicalPage> | undefined)?.pages?.[0]?.totalCount ?? 0;

  const getQuizInfo = async (id: string) => {
    const quiz = await findGraphicalQuizById({id}, token);
    targetQuiz$.set(quiz.result);
  };

  return (
    <Container>
      <Header>
        <Banner style={{backgroundImage: `url(${bgMaze.src})`}}>
          <Title>Graphical Quizzes</Title>
        </Banner>
      </Header>

      <Wrapper>
        <div className={css({mt: '6', mdDown: {maxW: 'full'}})}>
          {/* Show empty state ONLY when we know there are zero items */}
          {isLoading ? null : totalCount === 0 ? (
            <HeadTitle>There are currently no quizzes.</HeadTitle>
          ) : (
            <CardList>
              {quizzes.map(q => (
                <QuizCard key={q._id} getQuizInfo={getQuizInfo} quiz={q} />
              ))}
            </CardList>
          )}
        </div>
      </Wrapper>

      {hasNextPage ? (
        <div className={css({mt: 6, mb: -6})}>
          <Button type='button' onClick={() => fetchNextPage()}>
            <span>Show more</span>
          </Button>
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
            <IconDrop className={css({w: '16', h: '16', mdDown: {w: '8', h: '8'}})} />
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
              {/* (tiny typo fix if you want) IconClose uses className prop */}
              <IconClose className={css({color: '#272727'})} />
            </button>
          </header>

          <h1
            className={css({
              mt: '5',
              fontSize: '2xl',
              lineHeight: '2xl',
              fontWeight: 'medium',
              color: 'text.primary',
              mdDown: {textAlign: 'center', textStyle: 'h3'},
            })}
          >
            Are you sure you want to start this quiz?
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
            <Link
              href={`${Paths.Quiz.getPath()}/graphical/${targetQuiz$?.get()?._id ?? ''}`}
              className={css({
                pl: '12',
                pr: '12',
                py: '3',
                cursor: 'pointer',
                w: {base: '1/3', mdDown: 'full'},
                color: 'white',
                bgColor: 'primary',
                textAlign: 'center',
              })}
              aria-label='Start graphical quiz'
              onClick={() => targetQuiz$.set(undefined)}
            >
              Yes
            </Link>
            <button
              type='button'
              onClick={() => targetQuiz$.set(undefined)}
              className={css({
                pl: '10',
                pr: '10',
                py: '3',
                cursor: 'pointer',
                w: {base: '1/3', mdDown: 'full'},
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
    </Container>
  );
}
