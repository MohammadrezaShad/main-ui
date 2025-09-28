/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */

'use client';

import {useCallback, useEffect} from 'react';
import {toast} from 'react-toastify';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import {useParams} from 'next/navigation';

import {IconEmail, IconFacebook, IconInstagram, IconLink, IconLinkedin, IconX} from '@/assets';
import {
  ArticleBody,
  ArticleInfo,
  Breadcrumbs,
  Button,
  PostDate,
  PrimarySubtitle,
  PrimaryTitle,
  Questions,
  RecentArticles,
  Review,
  SocialMediaLinks,
  Tags,
  UserInfo,
} from '@/components';
import {CookieName} from '@/constants';
import {useAuthContext} from '@/contexts';
import {
  addBookmark,
  ArticleType,
  CommentTypeEnum,
  createComment,
  type CreateCommentInput,
  deleteBookmark,
  DeleteOneArticleBookmarkInput,
  findArticleByName,
  findRelatedArticles,
  getArticlePdfById,
  getUser,
  recordVisitStatistics,
  searchComments,
  UserOutputType,
} from '@/graphql';
import useClipboard from '@/hooks/use-clipboard';
import {Paths} from '@/utils';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = () => {
  const queryClient = useQueryClient();
  const token = getCookie(CookieName.AUTH_TOKEN);
  const {isLoginOpen$} = useAuthContext();

  const userData = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(token as string),
  });

  const params = useParams();
  const {data, refetch} = useQuery({
    queryKey: ['get-article', params.articleId],
    queryFn: () => findArticleByName({slug: params.articleId as string}, token),
  }) as any;
  const article: ArticleType = data.article!.findArticleByName.result;
  const {copyToClipboard} = useClipboard();

  const commentsData = useQuery({
    queryKey: ['get-article-comments', article?.slug],
    queryFn: () => searchComments({post: article._id}),
  });

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
    {id: 5, icon: IconLinkedin, action: () => handleLinkedInShare(), type: 'button'},
    {id: 6, icon: IconLink, action: () => copyLinkToClipboard(), type: 'button'},
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

  function handleLinkedInShare() {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${BASE_URL}/${article.slug}`)}`;

    window.open(linkedInShareUrl, '_blank', 'noopener,noreferrer');
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

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get('comment') as string;
    if (!content || !token) return;
    try {
      postReview.mutateAsync({
        post: article._id,
        content,
        author: userData?.data?._id as string,
        token: token as string,
        type: CommentTypeEnum.Article,
      });
      e.currentTarget.reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const postReview = useMutation({
    mutationFn: (input: CreateCommentInput) => createComment(input, token!),
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: ['get-article-comments', article.slug]}),
  });

  const getBreadcrumbs = useCallback(() => {
    const links = [
      {
        title: article.hasPdf ? 'PDF Articles' : 'Articles',
        href: article.hasPdf ? '/pdf-articles' : '/articles',
      },
    ];
    if (article?.categories?.[0]) {
      links.push({
        title: article?.categories?.[0]?.title,
        href: `${article.hasPdf ? '/pdf-articles' : '/articles'}/categories/${article?.categories?.[0]?._id}/articles`,
      });
    }
    links.push({
      title: article.title,
      href: `${article.hasPdf ? '/pdf-articles' : '/articles'}/${article.slug}`,
    });
    return links;
  }, [params.articleId]);

  useEffect(() => {
    recordVisitStatisticsMutation.mutateAsync({article: article._id});
  }, []);

  useEffect(() => {
    import('../../star-rating');
  }, []);

  return (
    <>
      <Box mt={4}>
        <Breadcrumbs links={getBreadcrumbs()} />
      </Box>
      <div
        className={css({
          pt: '12',
        })}
      >
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
              <SocialMediaLinks articleId={article?._id as string} links={socialMediaLinks} />
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
                width: 'full',
                maxW: '[960px]',
                mx: 'auto',
                height: 'auto',
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
              '& h2': {
                textAlign: 'unset !important',
              },
            })}
            content={article.content}
          />
        </article>
        {article.tags && article.tags.length > 0 ? <Tags tags={article.tags} /> : null}
        <Box className={css({hideFrom: 'md', mb: '8'})}>
          <SocialMediaLinks articleId={article?._id as string} links={socialMediaLinks} />
        </Box>
        {article.faqs && article.faqs.length > 0 ? <Questions faqs={article.faqs} /> : null}
        {article.quiz ? (
          <Link
            className={css({
              borderRadius: 4,
              w: {
                lg: '33%',
                md: 'full',
              },
              border: '1px solid token(colors.gray3)',
              textStyle: 'lg',
              display: 'block',
              mt: '4',
              overflow: 'hidden',
            })}
            target='_blank'
            href={`${Paths.Quiz.getPath()}/normal/${article?.quiz?._id}`}
          >
            <Image
              alt={article?.quiz?.title || ''}
              unoptimized
              width={548}
              height={548}
              src={`${IMAGE_STORAGE_URL}/${article?.quiz?.thumbnail?.filename}-${article?.quiz?.thumbnail?._id}`}
            />
            <p
              className={css({
                p: '2',
                backgroundColor: 'primary',
                color: 'text.invert',
                _hover: {
                  bg: 'primary.dark',
                },
                fontSize: 'sm',
              })}
            >
              Take a quiz in &quot;{article?.quiz?.title}&quot;
            </p>
          </Link>
        ) : null}
        {article.graphicalQuiz ? (
          <Link
            className={css({
              borderRadius: 4,
              w: {
                lg: '33%',
                md: 'full',
              },
              border: '1px solid token(colors.gray3)',
              textStyle: 'lg',
              display: 'block',
              mt: '4',
              overflow: 'hidden',
            })}
            target='_blank'
            href={`${Paths.Quiz.getPath()}/graphical/${article?.graphicalQuiz?._id}`}
          >
            <Image
              alt={article?.graphicalQuiz?.title || ''}
              unoptimized
              width={548}
              height={548}
              src={`${IMAGE_STORAGE_URL}/${article?.graphicalQuiz?.thumbnail?.filename}-${article?.graphicalQuiz?.thumbnail?._id}`}
            />
            <p
              className={css({
                p: '2',
                backgroundColor: 'primary',
                color: 'text.invert',
                _hover: {
                  bg: 'primary.dark',
                },
                fontSize: 'sm',
              })}
            >
              Take a quiz in &quot;{article?.graphicalQuiz?.title}&quot;
            </p>
          </Link>
        ) : null}

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

        <h3
          className={css({
            textStyle: 'headline3',
            color: 'text.primary',
            mb: '6',
          })}
        >
          Reviews
        </h3>

        {userData?.data?._id ? (
          <form
            onSubmit={handleSubmitComment}
            className={css({
              display: 'flex',
              flexDir: 'column',
              alignItems: 'start',
              gap: '4',
            })}
            action=''
          >
            <textarea
              id='comment'
              name='comment'
              className={css({
                p: '4',
                border: '1px solid token(colors.gray3)',
                rounded: 'md',
                w: 'full',
                resize: 'none',
                _focusVisible: {
                  outline: 'none',
                  border: '1px solid token(colors.primary)',
                },
              })}
              placeholder='Write a comment ...'
              rows={8}
            />

            <Button
              type='submit'
              visual='contained'
              className={css({
                color: 'text.invert',
                w: 'max-content',
                px: 4,
                py: 3,
                bg: 'primary',
                borderRadius: 0,
              })}
            >
              Post Review
            </Button>
          </form>
        ) : (
          <p>Login to write a comment</p>
        )}

        {commentsData.data?.results?.map(comment => (
          <Review key={comment._id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default Page;
