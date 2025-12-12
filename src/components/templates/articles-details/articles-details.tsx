/* eslint-disable no-restricted-syntax */
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
  Avatar,
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

  const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

  function getAuthorName(a?: UserOutputType | null) {
    if (!a) return 'Unknown Author';
    if (a.displayName) return a.displayName;
    if (a.firstName && a.lastName) return `${a.firstName} ${a.lastName}`;
    if (a.username) return a.username;
    return 'Unknown Author';
  }

  function uniqueById<T extends {_id?: string | number} | null | undefined>(items: T[]) {
    const seen = new Set<string | number>();
    const out: T[] = [];
    for (const it of items) {
      const id = it && (it as any)._id;
      if (id == null) {
        out.push(it as T);
        // eslint-disable-next-line no-continue
        continue;
      }
      if (!seen.has(id)) {
        seen.add(id);
        out.push(it as T);
      }
    }
    return out;
  }

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

  // co-authors from API (assumes populated objects)
  const rawCoAuthors = (article.otherAuthors || []) as (UserOutputType | null | undefined)[];

  // remove main author + de-dupe
  const mainId = (article.author as UserOutputType | null)?._id;
  const coAuthors = uniqueById(
    rawCoAuthors.filter(Boolean).filter(u => (u as UserOutputType)._id !== mainId),
  ) as UserOutputType[];

  const strategicAuthors = coAuthors ?? null;

  const rawGuestAuthors = (article.guestAuthors || []) as (UserOutputType | null | undefined)[];

  const guestAuthors = uniqueById(
    rawGuestAuthors.filter(Boolean).filter(u => (u as UserOutputType)._id !== mainId),
  ) as UserOutputType[];

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
              // coAuthors={article.otherAuthors || []}
            />

            <Box className={css({hideBelow: 'md'})}>
              <SocialMediaLinks articleId={article?._id as string} links={socialMediaLinks} />
            </Box>
          </Box>

          {(strategicAuthors.length > 0 || guestAuthors.length > 0) && (
            <Box
              className={css({
                mt: '3',
                mb: '6',
                display: 'flex',
                gap: '4',
                flexWrap: 'wrap',
                alignItems: 'stretch',
              })}
            >
              {/* Strategic block */}
              {strategicAuthors.length > 0 && (
                <div
                  className={css({
                    flex: '1 1 420px',
                    border: '1px solid token(colors.gray3)',
                    rounded: 'md',
                    p: '3',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3',
                    minW: '0',
                    backgroundColor: 'gray1',
                  })}
                  title={`Strategic Collaborator: ${strategicAuthors.map(getAuthorName).join(', ')}`}
                >
                  <span
                    className={css({
                      textStyle: 'caption',
                      color: 'text.secondary',
                      backgroundColor: 'gray2',
                      border: '1px solid token(colors.gray3)',
                      px: '2',
                      py: '0.5',
                      rounded: 'full',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    })}
                  >
                    Strategic Collaborator
                  </span>

                  {/* avatars (optional, hidden on very small screens) */}
                  <div
                    className={css({
                      display: {base: 'none', sm: 'flex'},
                      alignItems: 'center',
                      gap: '1',
                    })}
                  >
                    {strategicAuthors.slice(0, 3).map((u, i) => {
                      const src = u?.avatar?._id
                        ? `${IMAGE_STORAGE_URL}/${u.avatar?.filename}-${u.avatar?._id}`
                        : '';
                      return (
                        <div
                          key={u._id ?? `guest-${i}`}
                          className={css({
                            ml: i === 0 ? 0 : '-2',
                            border: '1px solid token(colors.gray3)',
                            rounded: 'full',
                          })}
                          title={getAuthorName(u)}
                        >
                          <Avatar src={src} alt={getAuthorName(u)} size={26} />
                        </div>
                      );
                    })}
                    {strategicAuthors.length > 3 && (
                      <div
                        className={css({
                          ml: '-2',
                          h: 6,
                          w: 6,
                          rounded: 'full',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid token(colors.gray3)',
                          backgroundColor: 'gray2',
                          textStyle: 'caption',
                          color: 'text.secondary',
                          px: 1,
                        })}
                      >
                        +{strategicAuthors.length - 3}
                      </div>
                    )}
                  </div>

                  {/* names list that WRAPS when needed */}
                  <div
                    className={css({
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1.5',
                      minW: 0,
                      textStyle: 'body2',
                      color: 'text.primary',
                    })}
                  >
                    {strategicAuthors.map((u, idx) => (
                      <span key={u._id} className={css({display: 'inline'})}>
                        <Link
                          href={`/author/${u._id}`}
                          className={css({color: 'text.primary', _hover: {color: 'primary'}})}
                        >
                          {getAuthorName(u)}
                        </Link>
                        {idx < strategicAuthors.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Guest block */}
              {guestAuthors.length > 0 && (
                <div
                  className={css({
                    flex: '1 1 420px',
                    border: '1px solid token(colors.gray3)',
                    rounded: 'md',
                    p: '3',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3',
                    minW: '0',
                    backgroundColor: 'gray1',
                  })}
                  title={`Guest authors: ${guestAuthors.map(getAuthorName).join(', ')}`}
                >
                  <span
                    className={css({
                      textStyle: 'caption',
                      color: 'text.secondary',
                      backgroundColor: 'gray2',
                      border: '1px solid token(colors.gray3)',
                      px: '2',
                      py: '0.5',
                      rounded: 'full',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    })}
                  >
                    Special Guest Author
                  </span>

                  {/* avatars (optional, hidden on very small screens) */}
                  <div
                    className={css({
                      display: {base: 'none', sm: 'flex'},
                      alignItems: 'center',
                      gap: '1',
                    })}
                  >
                    {guestAuthors.slice(0, 3).map((u, i) => {
                      const src = u?.avatar?._id
                        ? `${IMAGE_STORAGE_URL}/${u.avatar?.filename}-${u.avatar?._id}`
                        : '';
                      return (
                        <div
                          key={u._id ?? `guest-${i}`}
                          className={css({
                            ml: i === 0 ? 0 : '-2',
                            border: '1px solid token(colors.gray3)',
                            rounded: 'full',
                          })}
                          title={getAuthorName(u)}
                        >
                          <Avatar src={src} alt={getAuthorName(u)} size={26} />
                        </div>
                      );
                    })}
                    {guestAuthors.length > 3 && (
                      <div
                        className={css({
                          ml: '-2',
                          h: 6,
                          w: 6,
                          rounded: 'full',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid token(colors.gray3)',
                          backgroundColor: 'gray2',
                          textStyle: 'caption',
                          color: 'text.secondary',
                          px: 1,
                        })}
                      >
                        +{guestAuthors.length - 3}
                      </div>
                    )}
                  </div>

                  {/* names list that WRAPS when needed */}
                  <div
                    className={css({
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1.5',
                      minW: 0,
                      textStyle: 'body2',
                      color: 'text.primary',
                    })}
                  >
                    {guestAuthors.map((u, idx) => (
                      <span key={u._id} className={css({display: 'inline'})}>
                        <Link
                          href={`/author/${u._id}`}
                          className={css({color: 'text.primary', _hover: {color: 'primary'}})}
                        >
                          {getAuthorName(u)}
                        </Link>
                        {idx < guestAuthors.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Box>
          )}
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
                borderRadius: '8px',
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
