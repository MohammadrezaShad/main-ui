'use client';

import {useEffect, useState} from 'react';
import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {bgMaze, coin, IconClose} from '@/assets';
import {Modal} from '@/components/atoms/modal';
import {QuizCard} from '@/components/molecules';
import {CookieName} from '@/constants';
import {findGraphicalQuizById, GraphicalQuizType, searchGraphicalQuizzes} from '@/graphql';
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

export default function GraphicalQuizzes() {
  const token: string | undefined = getCookie(CookieName.AUTH_TOKEN);
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<GraphicalQuizType[]>([]);
  const [page, setPage] = useState(1);
  const targetQuiz$ = useObservable<GraphicalQuizType>();
  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['search-graphical-quizzes'],
    queryFn: ({pageParam}) => searchGraphicalQuizzes({count: 12, page: pageParam}, token || ''),
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
    // try {
    //   const response = await payAndFindGraphical({id}, token);
    //   if (response.success && token) {
    router.push(`${Paths.Quiz.getPath()}/graphical/${id}`);
    //   }
    // } catch (error: Error | any) {
    //   toast.error(error.message);
    // }
  };

  const renderContent = () => {
    if (!token) return <HeadTitle>Please log in to view quizzes.</HeadTitle>;
    if (quizzes.length > 0)
      return (
        <CardList>
          {quizzes.map(quiz => (
            <QuizCard key={quiz._id} getQuizInfo={getQuizInfo} quiz={quiz} />
          ))}
        </CardList>
      );
    return <HeadTitle>There are currently no quizzes.</HeadTitle>;
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
    <Container>
      <Header>
        <Banner
          style={{
            backgroundImage: `url(${bgMaze.src})`,
          }}
        >
          <Title>Graphical Quizzes</Title>
        </Banner>
      </Header>
      <Wrapper>
        <div className={css({mt: '6', mdDown: {maxW: 'full'}})}>{renderContent()}</div>
      </Wrapper>
      {hasNextPage ? (
        <div
          className={css({
            mt: 6,
            mb: -6,
          })}
        >
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
                display: 'none',
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
              Yes
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
    </Container>
  );
}
