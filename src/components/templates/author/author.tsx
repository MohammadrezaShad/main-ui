/* eslint-disable no-nested-ternary */

'use client';

import {useEffect, useMemo, useState} from 'react';
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
import {useParams} from 'next/navigation';
import * as Yup from 'yup';

import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconNotify,
  IconTelegram,
  IconWhatsapp,
  IconX as IconTwitter,
} from '@/assets';
import {
  Avatar,
  Button,
  Card,
  Chip,
  SmallCard,
  SocialMediaLinks,
  TextArea,
  TextField,
} from '@/components';
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

import {Actions, Cards, Chips, Container, ContentBox, Tab, Tabs, Wrapper} from './author.styled';
import EditModal from './edit-modal';
import ISITable from './isiTable';

const ADMIN_PANEL_URL = process.env.NEXT_PUBLIC_ADMIN_PANEL_URL;
const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const qk = {
  user: (id: string) => ['author', 'user', id] as const,
  profile: () => ['author', 'profile'] as const,
  articles: (id: string) => ['author', 'articles', id] as const,
  isi: (id: string) => ['author', 'isi', id] as const,
};

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
  journal: Yup.string().required().min(3),
  year: Yup.mixed().required(),
});

enum ETabs {
  ARTICLES = 'articles',
  JOURNALS = 'journals',
  CV = 'CV',
}

interface IsiColumn {
  title: string;
  value: keyof IsiType;
  width?: string;
}

const INITIAL_COLUMNS: IsiColumn[] = [
  {title: 'Title', value: 'title'},
  {title: 'Year', value: 'year', width: '150px'},
];

export default function Author() {
  const params = useParams();
  const authorId = params.authorId as string;

  const token = getCookie(CookieName.AUTH_TOKEN)!;
  const queryClient = useQueryClient();

  const [selectedTab, setSelectedTab] = useState<string>(ETabs.ARTICLES);

  const [isEdit, setIsEdit] = useState<IsiType | undefined>(undefined);
  const [isNewIsiOpen, setIsNewIsiOpen] = useState(false);

  const isDelete$ = useObservable<{isOpen: boolean; entityId: string}>({
    isOpen: false,
    entityId: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ---------------- Queries ----------------
  const {data: authorRes} = useQuery({
    queryKey: qk.user(authorId),
    queryFn: () => findUserById({id: authorId}, token),
    staleTime: 30_000,
  }) as any;

  const currentUser = useQuery({
    queryKey: qk.profile(),
    queryFn: () => getUser(token),
    staleTime: 30_000,
  });

  const user: User = authorRes?.users?.findUserById;
  const currenUserId = currentUser.data?._id;
  const isOwner = user?._id && currenUserId && user._id === currenUserId;

  const isiQuery = useQuery({
    queryKey: qk.isi(authorId),
    queryFn: () => searchIsi({author: authorId, count: 100}),
    staleTime: 30_000,
  });

  const articlesQuery = useInfiniteQuery({
    queryKey: qk.articles(authorId),
    queryFn: ({pageParam}) =>
      searchArticlesByAuthorId({authors: [authorId], count: 9, page: pageParam}),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, _allPages, lastPageParam: number) => {
      const totalPages = lastPage?.article?.searchArticles?.totalPages;
      if (!totalPages) return undefined;
      return lastPageParam + 1 <= totalPages ? lastPageParam + 1 : undefined;
    },
    staleTime: 30_000,
  }) as any;

  const articles: ArticleType[] = useMemo(() => {
    const pages = articlesQuery.data?.pages ?? [];
    const results = pages.flatMap((p: any) => p?.article?.searchArticles?.results ?? []);
    const map = new Map(results.map((a: any) => [a._id, a]));
    return Array.from(map.values()) as ArticleType[];
  }, [articlesQuery.data]);

  // ---------------- Mutations ----------------
  const updateUserMutation = useMutation({
    mutationFn: (args: UpdateUserInput) => updateUser(args, token),
  });

  const createIsiMutation = useMutation({
    mutationFn: (args: CreateIsiInput) => createIsi(args, token),
  });

  const deleteIsiMutation = useMutation({
    mutationFn: (args: DeleteIsiInput) => deleteIsi(args, token),
  });

  // ---------------- Forms ----------------
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
        const response = await createIsiMutation.mutateAsync({
          title: isiFormik.values.title,
          doi: isiFormik.values.doi,
          journal: isiFormik.values.journal,
          year: parseInt(isiFormik.values.year?.format('YYYY') || '0', 10),
        });

        if (response.success) {
          queryClient.invalidateQueries({queryKey: qk.isi(authorId)});
          toast.success('ISI record created successfully');
          setIsNewIsiOpen(false);
          isiFormik.resetForm();
        } else {
          toast.error('An error occurred');
        }
      } catch (error: any) {
        toast.error(error?.message || 'Create failed');
      }
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
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
        const response = await updateUserMutation.mutateAsync({...formik.values});

        if (response.success) {
          queryClient.invalidateQueries({queryKey: qk.user(authorId)});
          toast.success('CV updated successfully');
        } else {
          toast.error('An error occurred');
        }
      } catch (error: any) {
        toast.error(error?.message || 'Update failed');
      }
    },
  });

  // ---------------- Handlers ----------------
  const handleClickNewArticle = () => setIsModalOpen(true);

  const handleISIDelete = async () => {
    const {entityId} = isDelete$.get();
    if (!entityId) return;

    try {
      const resp = await deleteIsiMutation.mutateAsync({id: entityId});
      if (resp.success) {
        queryClient.invalidateQueries({queryKey: qk.isi(authorId)});
        isDelete$.isOpen.set(false);
        isDelete$.entityId.set('');
        toast.success('ISI record deleted');
      } else {
        toast.error('An error occurred');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Delete failed');
    }
  };

  // Close modal via iframe postMessage
  useEffect(() => {
    if (!isModalOpen) return;

    const receiveMessage = (event: MessageEvent<any>) => {
      if (event?.data === 'removetheiframe') setIsModalOpen(false);
    };

    window.addEventListener('message', receiveMessage);
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('message', receiveMessage);
  }, [isModalOpen]);

  // ---------------- Social links ----------------
  const socialMediaLinks = useMemo(
    () =>
      [
        {id: 1, icon: IconTwitter, action: user?.twitter, type: 'link' as const},
        {id: 2, icon: IconLinkedIn, action: user?.linkedin, type: 'link' as const},
        {id: 3, icon: IconFacebook, action: user?.facebook, type: 'link' as const},
        {id: 4, icon: IconTelegram, action: user?.telegram, type: 'link' as const},
        {id: 5, icon: IconInstagram, action: user?.instagram, type: 'link' as const},
        {id: 6, icon: IconWhatsapp, action: user?.whatsApp, type: 'link' as const},
      ].filter(l => Boolean(l.action)),
    [
      user?.twitter,
      user?.linkedin,
      user?.facebook,
      user?.telegram,
      user?.instagram,
      user?.whatsApp,
    ],
  );

  // ---------------- Render helpers ----------------
  const renderArticlesTab = () => (
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

      {articlesQuery.hasNextPage ? (
        <Box mt='10' display='flex' justifyContent='center'>
          <Button
            onClick={() => articlesQuery.fetchNextPage()}
            visual='contained'
            className={css({
              color: 'text.invert',
              w: 'max-content',
              px: 5,
              py: 3,
              bg: 'primary',
            })}
          >
            Load More
          </Button>
        </Box>
      ) : null}

      {!articles.length ? (
        <Box
          className={css({
            mt: '6',
            p: '6',
            textAlign: 'center',
            border: '1px dashed #E3E3E3',
            borderRadius: '12px',
            color: 'gray4',
          })}
        >
          No articles published yet.
        </Box>
      ) : null}
    </>
  );

  const renderIsiTab = () => {
    if (!user?._id) return null;

    if (isOwner) {
      return (
        <div className={css({position: 'relative'})}>
          <Box
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: '4',
              mdDown: {flexDir: 'column', alignItems: 'stretch', gap: '3'},
            })}
          >
            <h3 className={css({textStyle: 'headline5'})}>Your ISI Records</h3>
            <Button onClick={() => setIsNewIsiOpen(true)} type='button'>
              New ISI
            </Button>
          </Box>

          <ISITable
            columns={INITIAL_COLUMNS}
            data={(isiQuery.data?.results ?? []) as IsiType[]}
            onEdit={(isi: IsiType) => setIsEdit(isi)}
            deleteEntity$={isDelete$}
          />
        </div>
      );
    }

    const publicIsi = (isiQuery.data?.results ?? []) as IsiType[];

    return publicIsi.length ? (
      <>
        <Cards hideBelow='md'>
          {publicIsi.map(isi => (
            <Card key={isi._id} articleLink={isi.doi as string} title={isi.title as string} />
          ))}
        </Cards>

        <Cards hideFrom='md'>
          {publicIsi.map(isi => (
            <SmallCard key={isi._id} articleLink={isi.doi as string} title={isi.title as string} />
          ))}
        </Cards>
      </>
    ) : (
      <Box
        className={css({
          p: '6',
          textAlign: 'center',
          border: '1px dashed #E3E3E3',
          borderRadius: '12px',
          color: 'gray4',
        })}
      >
        No ISI items available.
      </Box>
    );
  };

  const renderCvTab = () => {
    if (!user?._id) return null;

    if (isOwner) {
      const {errors, touched, values, handleChange, handleSubmit} = formik;

      return (
        <form onSubmit={handleSubmit}>
          <Box width='100%' mt='8px'>
            <TextField
              label='Email'
              type='email'
              name='email'
              value={values.email}
              onChange={handleChange}
              id='email'
              error={!!touched.email && !!errors.email}
              helperText={touched.email && (errors.email as string)}
            />
          </Box>

          <Box width='100%' mt='20px'>
            <TextArea
              rows={1}
              label='Education'
              name='education'
              value={values.education}
              onChange={handleChange}
              id='education'
            />
          </Box>

          <Box mt='20px'>
            <TextArea
              rows={1}
              label='Contact'
              name='contact'
              value={values.contact}
              onChange={handleChange}
              id='contact'
            />
          </Box>

          <Box mt='20px'>
            <TextArea
              rows={1}
              label='Expertise'
              name='expertise'
              value={values.expertise}
              onChange={handleChange}
              id='expertise'
            />
          </Box>

          <Box mt='20px'>
            <TextArea
              rows={2}
              label='Description'
              name='description'
              value={values.description}
              onChange={handleChange}
              id='description'
            />
          </Box>

          <Box mt='24px'>
            <Button type='submit' disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </Box>
        </form>
      );
    }

    return (
      <Flex flexDir='column' gap={3}>
        <span>
          <strong>Education:</strong> {user?.education || '-'}
        </span>
        <span>
          <strong>Contact:</strong> {user?.contact || '-'}
        </span>
        <span>
          <strong>Expertise:</strong> {user?.expertise || '-'}
        </span>
        <span>
          <strong>Description:</strong> {user?.description || '-'}
        </span>
      </Flex>
    );
  };

  // ---------------- UI Guard ----------------
  if (!user?._id) {
    return (
      <Container>
        <Wrapper>
          <Box p='6'>
            <span className={css({color: 'gray4'})}>Author data is not available.</span>
          </Box>
        </Wrapper>
      </Container>
    );
  }

  return (
    <Container>
      {/* Header Card */}
      <Wrapper>
        <div
          className={css({
            display: 'grid',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: '6',
            w: 'full',
            gridTemplateColumns: {base: '2', mdDown: '1'},
            position: 'relative',
          })}
        >
          {/* Left Identity */}
          <div
            className={flex({
              alignItems: 'stretch',
              gap: '6',
              justifyContent: 'space-between',
              flexDirection: {base: 'row', mdDown: 'column'},
            })}
          >
            <Box alignSelf='center'>
              <Avatar
                size={128}
                src={
                  user?.avatar?._id
                    ? `${IMAGE_STORAGE_URL}/${user.avatar.filename}-${user.avatar._id}`
                    : ''
                }
                alt=''
              />
            </Box>

            <div
              className={flex({
                grow: 1,
                basis: '0%',
                flexDir: 'column',
                justifyContent: 'center',
                alignItems: {base: 'stretch', mdDown: 'center'},
                mt: '1',
                gap: '3',
              })}
            >
              <div
                className={flex({
                  flexDirection: 'column',
                  alignItems: {base: 'start', mdDown: 'center'},
                })}
              >
                <h1
                  className={css({
                    textStyle: 'headline3',
                    color: 'text.primary',
                  })}
                >
                  {user.displayName || user.username || 'Unknown Author'}
                </h1>
                <p className={css({textStyle: 'body2', color: 'gray4'})}>{user.email}</p>
              </div>

              <Chips>
                <Chip
                  text={user?.isStrategicCollaborator ? 'Strategic Collaborator' : user?.role}
                  type='success'
                />
              </Chips>
            </div>
          </div>

          {/* Right Actions + Socials */}
          <div
            className={css({
              display: 'flex',
              flexGrow: 1,
              flexBasis: '0%',
              flexDir: 'column',
              alignItems: 'end',
              justifyContent: 'space-between',
              w: 'full',
              position: {base: 'relative', mdDown: 'static'},
              gap: '4',
            })}
          >
            <Actions>
              {isOwner ? (
                <>
                  <IconNotify
                    className={css({
                      fill: 'gray4',
                      position: {mdDown: 'absolute'},
                      top: {mdDown: '0'},
                      right: {mdDown: '0'},
                    })}
                  />
                  <Button
                    onClick={handleClickNewArticle}
                    visual='contained'
                    className={css({
                      color: 'white',
                      w: 'max-content',
                      px: 5,
                      py: 3,
                      bgColor: 'primary',
                    })}
                  >
                    Write New Article
                  </Button>
                </>
              ) : null}
            </Actions>

            <Box
              className={css({
                position: 'absolute',
                bottom: {base: '-50%', mdDown: 'unset'},
                top: {mdDown: '0'},
                left: {mdDown: '0'},
              })}
            >
              <SocialMediaLinks
                classNames={css({
                  flexDirection: {base: 'row', mdDown: 'column'},
                })}
                links={socialMediaLinks as any}
              />
            </Box>
          </div>
        </div>

        {/* Premium Tabs */}
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
            <span className={css({hideBelow: 'md'})}>ISI Articles & Journals</span>
            <span className={css({hideFrom: 'md'})}>ISI Articles</span>
          </Tab>
          <Tab onClick={() => setSelectedTab(ETabs.CV)} _isActive={selectedTab === ETabs.CV}>
            <span className={css({hideBelow: 'md'})}>Curriculum vitae</span>
            <span className={css({hideFrom: 'md'})}>CV</span>
          </Tab>
        </Tabs>
      </Wrapper>

      {/* Tab Content Panels (ALL look like CV now) */}
      {selectedTab === ETabs.ARTICLES ? <ContentBox>{renderArticlesTab()}</ContentBox> : null}

      {selectedTab === ETabs.JOURNALS ? <ContentBox>{renderIsiTab()}</ContentBox> : null}

      {selectedTab === ETabs.CV ? <ContentBox>{renderCvTab()}</ContentBox> : null}

      {/* Create article iframe modal */}
      <Modal
        isOpen$={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={css({
          display: {base: '!grid'},
          placeContent: {base: '!center'},
        })}
      >
        <iframe
          id='editor'
          className={css({w: '[90vw]', h: '[90vh]', borderRadius: '12px'})}
          title='create new article'
          src={`${ADMIN_PANEL_URL}/create-article`}
          allowFullScreen
        />
      </Modal>

      {/* Delete confirm */}
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

      {/* New ISI modal */}
      <Modal isOpen$={isNewIsiOpen} onClose={() => setIsNewIsiOpen(false)}>
        <form
          onSubmit={isiFormik.handleSubmit}
          className={css({
            w: '[50vw]',
            mdDown: {w: '[90vw]'},
          })}
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 16,
          }}
        >
          <Box width='100%' mt='16px'>
            <TextField
              label='Title'
              name='title'
              value={isiFormik.values.title}
              onChange={isiFormik.handleChange}
              required
            />
          </Box>

          <Box width='100%' mt='16px'>
            <TextField
              label='DOI'
              name='doi'
              value={isiFormik.values.doi}
              onChange={isiFormik.handleChange}
              required
            />
          </Box>

          <Box width='100%' mt='16px'>
            <TextField
              label='Journal'
              name='journal'
              value={isiFormik.values.journal}
              onChange={isiFormik.handleChange}
              required
            />
          </Box>

          <Box mt='16px'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Year'
                sx={{width: '100%'}}
                name='year'
                onChange={(value: any) => {
                  if (value?.isValid?.()) isiFormik.setFieldValue('year', value, false);
                }}
                value={isiFormik.values.year}
                openTo='year'
              />
            </LocalizationProvider>
          </Box>

          <Box display='flex' gap='12px' mt='24px'>
            <Button type='submit' disabled={createIsiMutation.isPending}>
              {createIsiMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
            <Button visual='outlined' onClick={() => setIsNewIsiOpen(false)} type='button'>
              Cancel
            </Button>
          </Box>
        </form>
      </Modal>

      {/* Edit ISI modal */}
      <Modal isOpen$={!!isEdit} onClose={() => setIsEdit(undefined)}>
        {!!isEdit && (
          <EditModal
            isi={isEdit}
            onClose={() => setIsEdit(undefined)}
            token={token}
            authorId={authorId}
          />
        )}
      </Modal>
    </Container>
  );
}
