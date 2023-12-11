'use client';
import {IconFacebook, IconInstagram, IconLinkedIn, IconNotify, IconRG, IconTwitter} from '@/assets';
import {AuthButton, Avatar, Card, Chip, SmallCard, SocialMediaLinks} from '@/components';
import {findUserById} from '@/graphql';
import {ArticleType, User} from '@/graphql/generated/types';
import {searchArticlesByAUthorId} from '@/graphql/query/articles/search-articles-by-author-id';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex, grid} from '@styled/patterns';
import {useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';
import {useState} from 'react';
import {Actions, Cards, Chips, Container, Tab, Tabs, Wrapper} from './author.styled';

const socialMediaLinks = [
  {icon: IconTwitter, href: ''},
  {icon: IconLinkedIn, href: ''},
  {icon: IconFacebook, href: ''},
  {icon: IconRG, href: ''},
  {icon: IconInstagram, href: ''},
];

enum ETabs {
  ARTICLES = 'articles',
  JOURNALS = 'journals',
  CV = 'CV',
}

export default function Author() {
  const [selectedTab, setSelectedTab] = useState<string>(ETabs.ARTICLES);
  const params = useParams();
  const {data} = useQuery({
    queryKey: ['get-user', 1],
    queryFn: () => findUserById({id: params.authorId as string}),
  }) as any;
  const response = useQuery({
    queryKey: ['search-articles', 2],
    queryFn: () =>
      searchArticlesByAUthorId({authors: [params.authorId as string], count: 9, page: 1}),
  }) as any;
  const user: User = data.users!.findUserById;
  const articles: ArticleType[] = response.data.article.searchArticles.results;
  const totalCount: number = response.data.article.searchArticles.totalCount;
  return (
    <Container>
      <Wrapper>
        <div
          className={grid({
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: '5',
            w: 'full',
            gridTemplateColumns: {
              base: 2,
              mdDown: 1,
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
              <Avatar size={128} src={user.avatar?.filename ?? undefined} />
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
            className={flex({
              grow: 1,
              basis: '0%',
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
              _isActive={selectedTab == ETabs.ARTICLES}
            >
              <span>Articles</span>
            </Tab>
            <Tab
              onClick={() => setSelectedTab(ETabs.JOURNALS)}
              _isActive={selectedTab == ETabs.JOURNALS}
            >
              <span>ISI Articles & Journals</span>
            </Tab>
            <Tab onClick={() => setSelectedTab(ETabs.CV)} _isActive={selectedTab == ETabs.CV}>
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
                articleLink={`/articles/${article._id}`}
                date={article.publishDate}
                imageUrl={article.thumbnail?.preview}
                title={article.title}
              />
            ))}
          </Cards>
          <Cards hideFrom='md'>
            {articles.map(article => (
              <SmallCard
                key={article._id}
                articleLink={`/articles/${article._id}`}
                date={article.publishDate}
                imageUrl={article.thumbnail?.preview}
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

      {totalCount > 9 ? (
        <Box mt='12' display='flex' justifyContent='center'>
          <AuthButton
            text='Load More'
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
