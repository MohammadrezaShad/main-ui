'use client';

import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {useParams} from 'next/navigation';

import {IconEmail, IconFacebook, IconInstagram, IconLink, IconTwitter} from '@/assets';
import {
  ArticleBody,
  ArticleInfo,
  PostDate,
  PrimarySubtitle,
  PrimaryTitle,
  Questions,
  RecentArticles,
  SocialMediaLinks,
  Tags,
  UserInfo,
} from '@/components';
import {ArticleType} from '@/graphql/generated/types';
import {findArticleByName} from '@/graphql/query/find-article-by-name';
import {findRelatedArticles} from '@/graphql/query/find-related-articles';
import {getArticlePdfById} from '@/graphql/query/get-article-pdf-by-id';

const socialMediaLinks = [
  {icon: IconTwitter, href: ''},
  {icon: IconInstagram, href: ''},
  {icon: IconFacebook, href: ''},
  {icon: IconEmail, href: ''},
  {icon: IconLink, href: ''},
];

const Page = () => {
  const params = useParams();
  const {data} = useQuery({
    queryKey: ['get-article', params.articleId],
    queryFn: () => findArticleByName({slug: params.articleId as string}),
  }) as any;
  const article: ArticleType = data.article!.findArticleByName.result;

  const res = useQuery({
    queryKey: ['get-related-articles'],
    queryFn: () => findRelatedArticles({articleId: article._id, count: 3}),
  }) as any;
  const pdf = useQuery({
    queryKey: ['get-pdf'],
    queryFn: () => getArticlePdfById(article._id),
  }) as any;

  const relatedArticles: ArticleType[] = res.isSuccess
    ? res.data.article!.findRelatedArticles.results
    : [];
  const articlePdf = pdf.isSuccess ? pdf.data.article.getArticlePdfById : [];

  const formattedDate = new Date(article.publishDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      <PostDate date={formattedDate} />

      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          gap: 4,
          mb: '4',
          mt: '3',
        })}
      >
        <PrimaryTitle title={article.title} />
        {article.excerpt ? <PrimarySubtitle text={article.excerpt} /> : null}
      </div>
      <article
        className={flex({
          flexDir: 'column',
          textStyle: 'body',
          color: 'text.primary',
        })}
      >
        <Box
          className={flex({
            justifyContent: 'space-between',
            alignItems: {
              base: 'center',
              mdDown: 'start',
            },
            order: {
              mdDown: 2,
            },
            mb: '8',
          })}
        >
          <ArticleInfo
            articleId={article._id}
            author={article.author}
            readingDuration={article.readingDuration}
          />

          <Box className={css({hideBelow: 'md'})}>
            <SocialMediaLinks links={socialMediaLinks} />
          </Box>
        </Box>
        {article.thumbnail ? (
          <Image
            alt={article.thumbnail.alt ?? ''}
            src={article.thumbnail.filename}
            width={960}
            height={540}
            className={css({
              objectFit: 'cover',
              mb: '8',
              order: {
                mdDown: 1,
              },
            })}
          />
        ) : null}

        {articlePdf ? (
          <Box
            className={flex({
              alignItems: {
                base: 'center',
                mdDown: 'start',
              },
              justifyContent: 'space-between',
              p: '6',
              backgroundColor: 'gray1',
              mb: '6',
              order: {
                mdDown: 3,
              },
              flexDirection: {mdDown: 'column'},
              gap: {mdDown: '4'},
            })}
          >
            <h6
              className={css({
                textStyle: 'h4',
                color: 'text.primary',
              })}
            >
              Download or read the full article as a PDF
            </h6>
            <Box
              className={flex({
                alignItems: 'center',
                gap: '4',
              })}
            >
              <Link
                target='_blank'
                href={articlePdf}
                className={css({
                  '& span': {color: 'gray4'},
                  w: 'max-content',
                  px: 4,
                  py: 3,
                  border: '1px solid token(colors.gray3)',
                })}
              >
                <span>Read File</span>
              </Link>

              <Link
                download
                target='_blank'
                href={articlePdf}
                className={css({
                  '& span': {color: 'white'},
                  w: 'max-content',
                  px: 4,
                  py: 3,
                  border: '1px solid token(colors.gray3)',
                  bgColor: 'primary',
                })}
              >
                <span>Download PDF</span>
              </Link>
            </Box>
          </Box>
        ) : null}

        <ArticleBody
          className={css({
            order: {
              mdDown: 4,
            },
          })}
          content={article.content}
        />
      </article>
      {article.tags ? <Tags tags={article.tags} /> : null}
      <Box className={css({hideFrom: 'md', mb: '8'})}>
        <SocialMediaLinks links={socialMediaLinks} />
      </Box>
      {article.faqs ? <Questions faqs={article.faqs} /> : null}
      <UserInfo author={article.author} />

      {relatedArticles.length > 0 ? (
        <div
          className={css({
            pb: '8',
            borderBottom: '1px solid token(colors.gray3)',
            mb: '10',
          })}
        >
          <h3
            className={css({
              textStyle: 'headline3',
              color: 'text.primary',
              mb: '6',
            })}
          >
            Related Articles
          </h3>

          <RecentArticles posts={relatedArticles} />
        </div>
      ) : null}

      <h3
        className={css({
          textStyle: 'headline3',
          color: 'text.primary',
        })}
      >
        Reviews
      </h3>

      {/* <Review />
      <Review>
        <Review>
          <button
            className={css({
              color: 'primary',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: '4',
            })}
          >
            More Comments
            <IconChevronDown fill='#44BAEB' />
          </button>
        </Review>
      </Review> */}
    </div>
  );
};

export default Page;
