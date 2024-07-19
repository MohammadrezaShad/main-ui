/* eslint-disable no-nested-ternary */

'use client';

import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {useObservable} from '@legendapp/state/react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {css} from '@styled/css';
import {Box, Flex} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {useFormik} from 'formik';
import moment from 'moment';
import {useParams, useRouter} from 'next/navigation';
import * as Yup from 'yup';

import {IconFacebook, IconInstagram, IconLinkedIn, IconNotify, IconRG, IconTwitter} from '@/assets';
import {Avatar, Button, Card, Chip, SmallCard, SocialMediaLinks, TextField} from '@/components';
import {Modal} from '@/components/atoms/modal';
import {CookieName} from '@/constants';
import {
  ArticleType,
  createIsi,
  type CreateIsiInput,
  deleteIsi,
  type DeleteIsiInput,
  findUserById,
  type IsiType,
  searchArticlesByAuthorId,
  searchIsi,
  updateUser,
  type UpdateUserInput,
  User,
} from '@/graphql';
import {getUser} from '@/graphql/query/users/get-user';

import {Actions, Cards, Chips, Container, Tab, Tabs, Wrapper} from './author.styled';
import EditModal from './edit-modal';
import ISITable from './isiTable';

const ADMIN_PANEL_URL = process.env.NEXT_PUBLIC_ADMIN_PANEL_URL;
const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const schema = Yup.object().shape({
  email: Yup.string().email(),
  education: Yup.string().min(3),
  contact: Yup.string().min(3),
  expertise: Yup.string().min(3),
  description: Yup.string().min(3),
});

const isiSchema = Yup.object().shape({
  title: Yup.string().required().min(3),
  doi: Yup.string().required().min(8),
  journal: Yup.string().required().min(8),
  year: Yup.string().required().min(3).max(30),
});

const socialMediaLinks: {
  id: number;
  icon: any;
  action: any;
  type: 'button' | 'link';
}[] = [
  {id: 1, icon: IconTwitter, action: '', type: 'link'},
  {id: 2, icon: IconLinkedIn, action: '', type: 'link'},
  {id: 3, icon: IconFacebook, action: '', type: 'link'},
  {id: 4, icon: IconRG, action: '', type: 'link'},
  {id: 5, icon: IconInstagram, action: '', type: 'link'},
];

enum ETabs {
  ARTICLES = 'articles',
  JOURNALS = 'journals',
  CV = 'CV',
}
interface IsiColumn {
  title: string;
  value: keyof IsiType;
  width?: string | undefined;
}

const INITIAL_COLUMNS: IsiColumn[] = [
  {title: 'Title', value: 'title'},
  {title: 'Date', value: 'year', width: '150px'},
];
export default function Author() {
  const [isEdit, setIsEdit] = useState<IsiType | undefined>(undefined);
  const [isNewIsiOpen, setIsNewIsiOpen] = useState(false);
  const isDelete$ = useObservable<{isOpen: boolean; entityId: string}>({
    isOpen: false,
    entityId: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const token = getCookie(CookieName.AUTH_TOKEN)!;
  const [selectedTab, setSelectedTab] = useState<string>(ETabs.ARTICLES);
  const queryClient = useQueryClient();
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
  const user: User = data?.users!.findUserById;
  const currenUserId = currentUser.data?._id;
  const router = useRouter();

  const isiQuery = useQuery({
    queryKey: ['get-isi', params.authorId],
    queryFn: () => searchIsi({author: params.authorId as string}),
  });

  const handleClickNewArticle = () => {
    setIsModalOpen(true);
  };

  const {mutateAsync} = useMutation({
    mutationFn: (args: UpdateUserInput) => updateUser(args, token),
  });

  const createIsiMutation = useMutation({
    mutationFn: (args: CreateIsiInput) => createIsi(args, token),
  });

  const isiFormik = useFormik({
    initialValues: {
      title: '',
      doi: '',
      journal: '',
      year: null,
    } as any,
    validationSchema: isiSchema,
    onSubmit: async () => {
      try {
        const _response = await createIsiMutation.mutateAsync({
          ...isiFormik.values,
          year: parseInt(isiFormik.values.year?.format('YYYY') || '0', 10),
        });
        if (_response.success) {
          queryClient.clear();
          toast.success('ISI record created successfully');
          setTimeout(() => {
            setIsNewIsiOpen(false);
            isiFormik.resetForm();
          }, 1000);
        } else {
          toast.error('An error occured');
        }
      } catch (error: Error | any) {
        toast.error(error.message);
      }
    },
  });

  const deleteIsiMutation = useMutation({
    mutationFn: (args: DeleteIsiInput) => deleteIsi(args, token),
  });

  const handleISIDelete = async () => {
    try {
      const _response = await deleteIsiMutation.mutateAsync({id: isDelete$.get().entityId});
      if (_response.success) {
        isiQuery.refetch();
        isDelete$?.isOpen.set(false);
        isDelete$?.entityId.set(undefined);
      } else {
        toast.error('An error occured');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
      education: user?.education || '',
      contact: user?.contact || '',
      expertise: user?.expertise || '',
      description: user?.description || '',
    },
    validationSchema: schema,
    onSubmit: async () => {
      try {
        const _response = await mutateAsync({...values});
        if (_response.success) {
          queryClient.clear();
          toast.success('CV updated successfully');
        } else {
          toast.error('An eror occured');
        }
      } catch (error: Error | any) {
        toast.error(error.message);
      }
    },
  });
  const {errors, touched, values, handleChange, isSubmitting, handleSubmit} = formik;

  useEffect(() => {
    if (response.data) {
      const _articles =
        response.data?.pages.reduce(
          (acc: any, page: any, index: any) =>
            index !== 0 ? [...acc, ...page?.article?.searchArticles.results] : [...acc],
          response.data?.pages[0]?.article?.searchArticles.results,
        ) || [];
      setArticles(_articles);
    }
  }, [response.data]);

  useEffect(() => {
    if (!isModalOpen) return;
    const receiveMessage = (event: MessageEvent<any>) => {
      if (event.data === 'removetheiframe') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('message', receiveMessage, false);
  }, [isModalOpen]);

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
              <Avatar
                size={128}
                src={
                  user?.avatar?._id
                    ? `${IMAGE_STORAGE_URL}/${user?.avatar?.filename}-${user?.avatar?._id}`
                    : undefined
                }
              />
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
                <h1
                  className={css({
                    textStyle: 'headline3',
                    color: 'text.primary',
                  })}
                >
                  {user?.displayName}
                </h1>
                <p
                  className={css({
                    textStyle: 'body2',
                    color: 'gray4',
                  })}
                >
                  {user?.email}
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
                  <Chip text={user?.role} type='success' />
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
                  <Button
                    onClick={handleClickNewArticle}
                    visual='contained'
                    className={css({
                      color: 'white',
                      w: 'max-content',
                      px: 4,
                      py: 3,
                      bgColor: 'primary',
                    })}
                  >
                    Write New Article
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    visual='outlined'
                    className={css({
                      color: {
                        base: 'gray4',
                        _hover: 'white',
                      },
                      w: 'max-content',
                      px: 4,
                      py: 3,
                      border: '1px solid token(colors.gray3)',
                      borderRadius: 0,
                      display: 'none',
                    })}
                  >
                    Follow
                  </Button>
                  <Button
                    visual='outlined'
                    className={css({
                      color: {
                        base: 'gray4',
                        _hover: 'white',
                      },
                      w: 'max-content',
                      px: 4,
                      py: 3,
                      border: '1px solid token(colors.gray3)',
                      borderRadius: 0,
                      display: 'none',
                    })}
                  >
                    Report
                  </Button>
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
                date={moment(article.publishDate).format('DD MMMM YYYY')}
                imageUrl={
                  article.thumbnail
                    ? `${IMAGE_STORAGE_URL}/${article.thumbnail?.filename}-${article.thumbnail?._id}`
                    : undefined
                }
                title={article.title}
              />
            ))}
          </Cards>
          <Cards hideFrom='md'>
            {articles.map(article => (
              <SmallCard
                key={article._id}
                articleLink={`/articles/${article.slug}`}
                date={moment(article.publishDate).format('DD MMMM YYYY')}
                imageUrl={
                  article.thumbnail
                    ? `${IMAGE_STORAGE_URL}/${article.thumbnail?.filename}-${article.thumbnail?._id}`
                    : undefined
                }
                title={article.title}
              />
            ))}
          </Cards>

          {response.hasNextPage ? (
            <Box mt='12' display='flex' justifyContent='center'>
              <Button
                onClick={() => response.fetchNextPage()}
                visual='contained'
                className={css({
                  color: 'text.invert',
                  w: 'max-content',
                  px: 4,
                  py: 3,
                  hideBelow: 'md',
                  bg: 'primary',
                })}
              >
                Load More
              </Button>
            </Box>
          ) : null}
        </>
      ) : null}

      {/** RELATED TO ISI ARTICLES AND JOURNALS */}
      {selectedTab === ETabs.JOURNALS ? (
        user?._id === currenUserId ? (
          <div className={css({position: 'relative'})}>
            <Button
              onClick={() => setIsNewIsiOpen(true)}
              type='button'
              className={css({position: 'absolute', right: 0, marginTop: '3px'})}
            >
              New ISI
            </Button>
            <ISITable
              columns={INITIAL_COLUMNS}
              data={isiQuery.data?.results as IsiType[]}
              onEdit={(isi: IsiType) => setIsEdit(isi)}
              deleteEntity$={isDelete$}
            />
          </div>
        ) : (
          <Cards>
            {isiQuery?.data?.results?.map(isi => (
              <Card key={isi._id} articleLink={isi.doi as string} title={isi.title as string} />
            ))}
          </Cards>
        )
      ) : null}

      {selectedTab === ETabs.CV ? (
        user?._id === currenUserId ? (
          <form onSubmit={handleSubmit}>
            <Box width='100%' mt='25px'>
              <TextField
                label='Email'
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                id='email'
              />
            </Box>

            <Box width='100%' mt='25px'>
              <TextField
                label='Education'
                type='text'
                name='education'
                value={values.education}
                onChange={handleChange}
                id='education'
              />
            </Box>
            <Box mt='25px'>
              <TextField
                label='Contact'
                type='text'
                name='contact'
                value={values.contact}
                onChange={handleChange}
                id='contact'
              />
            </Box>
            <Box mt='25px'>
              <TextField
                label='Expertise'
                type='text'
                name='expertise'
                value={values.expertise}
                onChange={handleChange}
                id='expertise'
              />
            </Box>
            <Box my='25px'>
              <TextField
                label='Description'
                type='text'
                name='description'
                value={values.description}
                onChange={handleChange}
                id='description'
              />
            </Box>
            <Button type='submit'>Save changes</Button>
          </form>
        ) : (
          <Flex flexDir='column' padding={4} gap={2}>
            <span>Education: {user?.education}</span>
            <span>Contact: {user?.contact}</span>
            <span>Expertise: {user?.expertise}</span>
            <span>Description: {user?.description}</span>
          </Flex>
        )
      ) : null}
      <Modal
        isOpen$={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={css({
          display: {
            base: '!grid',
          },
          placeContent: {
            base: '!center',
          },
        })}
      >
        <iframe
          id='editor'
          className={css({w: '[90vw]', h: '[90vh]'})}
          title='create new article'
          src={`${ADMIN_PANEL_URL}/create-article`}
          allowFullScreen
        />
      </Modal>

      <Modal isOpen$={isDelete$.isOpen.use()} onClose={() => isDelete$.isOpen.set(false)}>
        <Box bg='white' padding='16px' borderRadius='16px'>
          <h3 className={css({mt: '2'})}>Are you sure you want to delete this ISI record?</h3>
          <Box display='flex' gap={2} mt={7}>
            <Button visual='contained' onClick={handleISIDelete} color='danger'>
              Yes
            </Button>
            <Button visual='contained' onClick={() => isDelete$.isOpen.set(false)}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal isOpen$={isNewIsiOpen} onClose={() => setIsNewIsiOpen(false)}>
        <form
          onSubmit={isiFormik.handleSubmit}
          className={css({
            w: '[50vw]',
            mdDown: {
              w: '[90vw]',
            },
          })}
          style={{
            marginBottom: '32px',
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Box width='100%' mt='25px'>
            <TextField
              label='Title'
              type='title'
              name='title'
              value={isiFormik.values.title}
              onChange={isiFormik.handleChange}
              id='title'
              required
            />
          </Box>
          <Box width='100%' mt='25px'>
            <TextField
              label='DOI'
              type='doi'
              name='doi'
              value={isiFormik.values.doi}
              onChange={isiFormik.handleChange}
              id='doi'
              required
            />
          </Box>

          <Box width='100%' mt='25px'>
            <TextField
              label='Journal'
              type='journal'
              name='journal'
              value={isiFormik.values.journal}
              onChange={isiFormik.handleChange}
              id='journal'
              required
            />
          </Box>
          <Box mt='25px'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Year'
                sx={{width: '100%'}}
                name='year'
                onChange={(value: any) => {
                  if (value.isValid()) {
                    isiFormik.setFieldValue('year', value, false);
                  } else {
                    console.log('error');
                  }
                }}
                value={isiFormik.values.year}
                openTo='year'
              />
            </LocalizationProvider>
            {isiFormik.touched.journal && isiFormik.errors.journal && <span>Error</span>}
          </Box>
          <Button className={css({mt: '24px'})} type='submit'>
            Save
          </Button>
          <Button
            visual='outlined'
            onClick={() => setIsNewIsiOpen(false)}
            className={css({mt: '24px', ml: '24px'})}
            type='button'
          >
            Cancel
          </Button>
        </form>
      </Modal>

      <Modal isOpen$={!!isEdit} onClose={() => setIsEdit(undefined)}>
        {!!isEdit && <EditModal isi={isEdit} onClose={() => setIsEdit(undefined)} token={token} />}
      </Modal>
    </Container>
  );
}
