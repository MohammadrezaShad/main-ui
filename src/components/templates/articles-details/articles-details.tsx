'use client';

import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import {useParams} from 'next/navigation';

import {IconEmail, IconFacebook, IconInstagram, IconLink, IconX} from '@/assets';
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
import {CookieName} from '@/constants';
import {
  addBookmark,
  ArticleType,
  deleteBookmark,
  DeleteOneArticleBookmarkInput,
  findArticleByName,
  findRelatedArticles,
  getArticlePdfById,
  recordVisitStatistics,
  UserOutputType,
} from '@/graphql';
import useClipboard from '@/hooks/use-clipboard';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = () => {
  const queryClient = useQueryClient();
  const token = getCookie(CookieName.AUTH_TOKEN);
  const params = useParams();
  const {data, refetch} = useQuery({
    queryKey: ['get-article', params.articleId],
    queryFn: () => findArticleByName({slug: params.articleId as string}, token),
  }) as any;
  const article: ArticleType = data.article!.findArticleByName.result;
  const {copyToClipboard} = useClipboard();

  const socialMediaLinks: {
    id: number;
    icon: any;
    action: any;
    type?: 'button' | 'link';
  }[] = [
    {
      id: 1,
      icon: IconX,
      action: `https://twitter.com/intent/tweet?text=${article.title}&url=${BASE_URL}/${
        article.slug
      }${article?.tags ? `&hashtags=${article.tags.map(tag => tag.title).join(',')}` : ''}`,
      type: 'link',
    },
    {id: 2, icon: IconInstagram, action: () => shareImageAsset(), type: 'button'},
    {
      id: 3,
      icon: IconFacebook,
      action: ``,
      type: 'link',
    },
    {
      id: 4,
      icon: IconEmail,
      action: `mailto:?subject=${article.title}&body=Check%20out%20this%20article:%20${BASE_URL}/${article.slug}`,
      type: 'link',
    },
    {id: 5, icon: IconLink, action: () => copyLinkToClipboard(), type: 'button'},
  ];

  async function shareImageAsset() {
    const response = await fetch(
      `${IMAGE_STORAGE_URL}/${article?.thumbnail?.filename}-${article?.thumbnail?._id}`,
    );
    const blob = await response.blob();
    const filesArray = [
      new File([blob], `${article?.title}.png`, {
        type: 'image/png',
        lastModified: new Date().getTime(),
      }),
    ];
    const shareData = {
      title: `${article?.title}`,
      files: filesArray,
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    }
  }

  async function copyLinkToClipboard() {
    await copyToClipboard(`${BASE_URL}/${article.slug}`);
    toast.success('Link copied to clipboard');
  }

  const res = useQuery({
    queryKey: ['get-related-articles'],
    queryFn: () => findRelatedArticles({articleId: article._id, count: 3}),
  }) as any;
  const getArticlePdfByIdQuery = useQuery({
    queryKey: ['get-pdf'],
    queryFn: () => getArticlePdfById({id: article._id}),
  });

  const relatedArticles: ArticleType[] = res.isSuccess
    ? res.data.article!.findRelatedArticles.results
    : [];
  const articlePdfDownloadUrl = getArticlePdfByIdQuery.isSuccess ? getArticlePdfByIdQuery.data : '';

  const formattedDate = new Date(article.publishDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const createBookmarkMutation = useMutation({
    mutationFn: (input: {article: string}) => addBookmark(input, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['get-user-bookmarked-articles']});
      refetch();
    },
  });
  const removeBookmarkMutation = useMutation({
    mutationFn: (input: DeleteOneArticleBookmarkInput) => deleteBookmark(input, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['get-user-bookmarked-articles']});
      refetch();
    },
  });

  const recordVisitStatisticsMutation = useMutation({
    mutationFn: (input: {article: string}) => recordVisitStatistics(input, token!),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['get-user-visits']}),
  });

  const handleToggleBookmark = async (articleId: string) => {
    if (!token) return;
    if (article.isBookmark) {
      await removeBookmarkMutation.mutateAsync({articleId});
    } else {
      await createBookmarkMutation.mutateAsync({article: articleId});
    }
  };

  useEffect(() => {
    recordVisitStatisticsMutation.mutateAsync({article: article._id});
  }, []);

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
            author={article.author as UserOutputType}
            readingDuration={article.readingDuration}
            handleToggleBookmark={handleToggleBookmark}
            isBookmark={article.isBookmark}
          />

          <Box className={css({hideBelow: 'md'})}>
            <SocialMediaLinks links={socialMediaLinks} />
          </Box>
        </Box>
        {article.thumbnail ? (
          <Image
            unoptimized
            alt={article.title ?? ''}
            src={`${IMAGE_STORAGE_URL}/${article.thumbnail?.filename}-${article.thumbnail?._id}`}
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

        {articlePdfDownloadUrl ? (
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
            <div
              className={css({
                textStyle: 'h4',
                color: 'text.primary',
              })}
            >
              Download or read the full article as a PDF
            </div>
            <Box
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '4',
                mdDown: {
                  w: 'full',
                  justifyContent: 'space-between',
                },
              })}
            >
              <Link
                target='_blank'
                href={articlePdfDownloadUrl}
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
                href={articlePdfDownloadUrl}
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
            '& img': {
              mx: 'auto',
              my: '1',
              w: 'full',
              h: 'auto',
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
      {article.author && <UserInfo author={article.author} />}

      {relatedArticles.length > 0 ? (
        <div
          className={css({
            pb: '8',
            borderBottom: '1px solid token(colors.gray3)',
            mb: '10',
          })}
        >
          <div
            className={css({
              textStyle: 'headline3',
              color: 'text.primary',
              mb: '6',
            })}
          >
            Related Articles
          </div>

          <RecentArticles posts={relatedArticles} />
        </div>
      ) : null}

      {/* <h3
        className={css({
          textStyle: 'headline3',
          color: 'text.primary',
        })}
      >
        Reviews
      </h3>

      <Review />
      <Review>
        <Review>
          <button
            type='button'
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
