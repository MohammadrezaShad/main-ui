'use client';

import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import {IconFacebook, IconInstagram, IconLinkedIn, IconNotify, IconRG, IconTwitter} from '@/assets';
import {AuthButton, Avatar, Card, Chip, SmallCard, SocialMediaLinks} from '@/components';
import {CookieName} from '@/constants';
import {ArticleType, User, findUserById, searchArticlesByAuthorId} from '@/graphql';
import {getUser} from '@/graphql/query/users/get-user';

import {Actions, Cards, Chips, Container, Tab, Tabs, Wrapper} from './author.styled';

const ADMIN_PANEL_URL = process.env.NEXT_PUBLIC_ADMIN_PANEL_URL;
const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const socialMediaLinks = [
  {id: 1, icon: IconTwitter, href: ''},
  {id: 2, icon: IconLinkedIn, href: ''},
  {id: 3, icon: IconFacebook, href: ''},
  {id: 4, icon: IconRG, href: ''},
  {id: 5, icon: IconInstagram, href: ''},
];

enum ETabs {
  ARTICLES = 'articles',
  JOURNALS = 'journals',
  CV = 'CV',
}

export default function Author() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const token = getCookie(CookieName.AUTH_TOKEN)!;
  const [selectedTab, setSelectedTab] = useState<string>(ETabs.ARTICLES);
  const params = useParams();
  const {data} = useQuery({
    queryKey: ['get-user', params.authorId as string],
    queryFn: () => findUserById({id: params.authorId as string}, token),
  }) as any;
  const currentUser = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(token),
  });
  const response = useInfiniteQuery({
    queryKey: ['search-articles', params.authorId as string],
    queryFn: ({pageParam}) =>
      searchArticlesByAuthorId({authors: [params.authorId as string], count: 9, page: pageParam}),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages, lastPagParam, allPagesParam) => {
      const totalPages = lastPage?.article?.searchArticles?.totalPages;
      if (totalPages) {
        return lastPagParam + 1 <= totalPages ? lastPagParam + 1 : undefined;
      }

      return undefined;
    },
  }) as any;
  const user: User = data.users!.findUserById;
  const currenUserId = currentUser.data?._id;
  const router = useRouter();

  const handleClickNewArticle = () => {
    router.push(`${ADMIN_PANEL_URL}/articles/new`);
  };

  useEffect(() => {
    if (response.data) {
      const _articles =
        response.data?.pages.reduce(
          (acc: any, page: any, index: any) =>
            index !== 0 ? [...acc, ...page?.article?.searchArticles.results] : [...acc],
          response.data?.pages[0]?.article?.searchArticles.results,
        ) || [];
      console.log('🚀 ~ useEffect ~ _articles:', _articles);
      setArticles(_articles);
    }
  }, [response.data]);

  return (
    <Container>
      <Wrapper>
        <div
          className={css({
            display: 'grid',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: '5',
            w: 'full',
            gridTemplateColumns: {
              base: '2',
              mdDown: '1',
            },
            position: 'relative',
          })}
        >
          <div
            className={flex({
              alignItems: 'stretch',
              gap: '6',
              justifyContent: 'space-between',
              flexDirection: {
                base: 'row',
                mdDown: 'column',
              },
            })}
          >
            <Box alignSelf='center'>
              <Avatar size={128} src={`${IMAGE_STORAGE_URL}/${user.avatar?._id}` ?? undefined} />
            </Box>

            <div
              className={flex({
                grow: 1,
                basis: '0%',
                flexDir: 'column',
                justifyContent: 'space-between',
                alignItems: {
                  base: 'stretch',
                  mdDown: 'center',
                },
                mt: '1',
              })}
            >
              <div
                className={flex({
                  flexDirection: 'column',
                  alignItems: {
                    base: 'start',
                    mdDown: 'center',
                  },
                })}
              >
                <h3
                  className={css({
                    textStyle: 'headline3',
                    color: 'text.primary',
                  })}
                >
                  {user.displayName}
                </h3>
                <p
                  className={css({
                    textStyle: 'body2',
                    color: 'gray4',
                  })}
                >
                  {user.email}
                </p>
              </div>

              <div>
                <p
                  className={css({
                    mt: '9',
                    textStyle: 'body2',
                  })}
                >
                  {/** TODO: INSERT BIO */}
                </p>
                <Chips>
                  <Chip text={user.role} type='success' />
                  {/* <Chip text='Since: October 2018' type='simple' /> */}
                </Chips>
              </div>
            </div>
          </div>
          <div
            className={css({
              display: 'flex',
              flexGrow: 1,
              flexBasis: '0%',
              flexDir: 'column',
              alignItems: 'end',
              justifyContent: 'space-between',
              w: 'full',
              position: {
                base: 'relative',
                mdDown: 'static',
              },
            })}
          >
            <Actions>
              {params.authorId === currenUserId ? (
                <>
                  {' '}
                  <IconNotify
                    className={css({
                      fill: 'gray4',
                      position: {
                        mdDown: 'absolute',
                      },
                      top: {
                        mdDown: '0',
                      },
                      right: {
                        mdDown: '0',
                      },
                    })}
                  />
                  <AuthButton
                    onClick={handleClickNewArticle}
                    text='Write New Article'
                    variant='contained'
                    className={css({
                      '& span': {color: 'white'},
                      w: 'max-content',
                      px: 4,
                      py: 3,
                      bgColor: 'primary',
                    })}
                  />
                </>
              ) : (
                <>
                  <AuthButton
                    text='Follow'
                    variant='outlined'
                    className={css({
                      '& span': {color: 'gray4'},
                      w: 'max-content',
                      px: 4,
                      py: 3,
                      border: '1px solid token(colors.gray3)',
                    })}
                  />
                  <AuthButton
                    text='Report'
                    variant='outlined'
                    className={css({
                      '& span': {color: 'gray4'},
                      w: 'max-content',
                      px: 4,
                      py: 3,
                      border: '1px solid token(colors.gray3)',
                    })}
                  />
                </>
              )}
            </Actions>

            <Box
              className={css({
                position: 'absolute',
                bottom: {
                  base: '-50%',
                  mdDown: 'unset',
                },
                top: {
                  mdDown: '0',
                },
                left: {
                  mdDown: '0',
                },
              })}
            >
              <SocialMediaLinks
                classNames={css({
                  flexDirection: {
                    base: 'row',
                    mdDown: 'column',
                  },
                })}
                links={socialMediaLinks}
              />
            </Box>
          </div>
        </div>
        <Box
          className={flex({
            w: 'full',
            justifyContent: 'space-between',
            gap: '5',
            mt: '6',
            alignItems: 'center',
          })}
        >
          <Tabs>
            <Tab
              onClick={() => setSelectedTab(ETabs.ARTICLES)}
              _isActive={selectedTab === ETabs.ARTICLES}
            >
              <span>Articles</span>
            </Tab>
            <Tab
              onClick={() => setSelectedTab(ETabs.JOURNALS)}
              _isActive={selectedTab === ETabs.JOURNALS}
            >
              <span>ISI Articles & Journals</span>
            </Tab>
            <Tab onClick={() => setSelectedTab(ETabs.CV)} _isActive={selectedTab === ETabs.CV}>
              <span className={css({hideBelow: 'md'})}>Curriculum vitae</span>
              <span className={css({hideFrom: 'md'})}>CV</span>
            </Tab>
          </Tabs>
        </Box>
      </Wrapper>
      {selectedTab === ETabs.ARTICLES ? (
        <>
          <Cards hideBelow='md'>
            {articles.map(article => (
              <Card
                key={article._id}
                articleLink={`/articles/${article.slug}`}
                date={article.publishDate}
                imageUrl={`${IMAGE_STORAGE_URL}/${article.thumbnail?._id}`}
                title={article.title}
              />
            ))}
          </Cards>
          <Cards hideFrom='md'>
            {articles.map(article => (
              <SmallCard
                key={article._id}
                articleLink={`/articles/${article.slug}`}
                date={article.publishDate}
                imageUrl={`${IMAGE_STORAGE_URL}/${article.thumbnail?._id}`}
                title={article.title}
              />
            ))}
          </Cards>
        </>
      ) : null}

      {/** RELATED TO ISI ARTICLES AND JOURNALS */}
      {/* {selectedTab === ETabs.JOURNALS ? <Cards>
        <Card articleLink='' title='Lorem ipsum dolor sit amet consectetur' />
        <Card articleLink='' title='Lorem ipsum dolor sit amet consectetur' />
        <Card articleLink='' title='Lorem ipsum dolor sit amet consectetur' />
        <Card articleLink='' title='Lorem ipsum dolor sit amet consectetur' />
        <Card articleLink='' title='Lorem ipsum dolor sit amet consectetur' />
      </Cards> : null */}

      {response.hasNextPage ? (
        <Box mt='12' display='flex' justifyContent='center'>
          <AuthButton
            text='Load More'
            onClick={() => response.fetchNextPage()}
            className={css({
              '& span': {color: 'text.invert'},
              w: 'max-content',
              px: 4,
              py: 3,
              hideBelow: 'md',
              bg: 'primary',
            })}
          />
        </Box>
      ) : null}
    </Container>
  );
}
