'use client';

import {useState} from 'react';
import {toast} from 'react-toastify';
import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Link from 'next/link';
import {useRouter, useSearchParams} from 'next/navigation';

import {IconArrowRight, IconChevronLeft, IconChevronRight, IconInfo} from '@/assets';
import {Button, Spinner} from '@/components';
import {Modal} from '@/components/atoms/modal';
import {deleteCompany, DeleteCompanyInput, searchCompanies} from '@/graphql';
import {useUpdateSearchParam} from '@/hooks';

import {Pagination} from '../articles/articles.styled';
import {Companies, Container, PageTitle, Wrapper} from './business.styled';
import BusinessItem from './business-item';

export default function BusinessesView() {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const page = +(searchParams.get('page') ?? '1');
  const queryClient = useQueryClient();
  const {data, isLoading} = useQuery({
    queryKey: ['get-companies'],
    queryFn: () => searchCompanies({count: 10, page: 1}),
  });
  const router = useRouter();
  const updateSearchParams = useUpdateSearchParam();

  const totalPages = data?.totalPages as number;
  const totalCount = data?.totalCount;
  const count = 10;

  const startResult = (+page - 1) * count + 1;
  const endResult = Math.min(+page * count, totalCount || 0);

  const removeBusinessMutation = useMutation({
    mutationFn: (input: DeleteCompanyInput) => deleteCompany(input),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['get-companies']}),
  });

  const handleOpenConfirmDialog = (id: string) => {
    setBusinessToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
    setBusinessToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!businessToDelete) return;

    try {
      await removeBusinessMutation.mutateAsync({id: businessToDelete});
      toast.success('Business deleted successfully.');
    } catch (error) {
      console.error('Failed to delete business:', error);
      toast.error('Failed to delete business. Please try again.');
    } finally {
      handleCloseConfirmDialog();
    }
  };

  return (
    <Container>
      <Wrapper>
        <div className={flex({alignItems: 'center', gap: '3'})}>
          <button
            type='button'
            aria-label='back to dashboard'
            onClick={() => router.push('/profile')}
          >
            <IconArrowRight className={css({rotate: '180deg', hideFrom: 'md'})} />
          </button>
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              w: 'full',
            })}
          >
            <PageTitle>Companies</PageTitle>
            <Link
              href='/profile/businesses/add'
              className={css({
                color: 'white',
                w: 'max-content',
                px: 4,
                py: 3,
                bgColor: 'primary',
              })}
            >
              New Company
            </Link>
          </div>
        </div>
        {isLoading ? <Spinner /> : null}
        {!data?.results || data?.results.length < 1 ? (
          <div
            className={flex({
              alignSelf: 'center',
              flex: 0,
              flexBasis: '0%',
              flexDir: 'column',
              alignItems: 'center',
              my: 'auto',
            })}
          >
            <IconInfo
              className={css({
                w: '16',
                h: '16',
              })}
            />
            <p
              className={css({
                textStyle: 'body',
                textAlign: 'center',
                mt: '5',
                color: 'gray4',
              })}
            >
              You have no businesses yet.
            </p>
          </div>
        ) : (
          <>
            <Companies>
              {data.results.map(business => (
                <BusinessItem
                  key={business._id}
                  article={business}
                  onRemoveBookmark={() => handleOpenConfirmDialog(business._id)}
                />
              ))}
            </Companies>
            <div
              className={css({
                mt: 6,
                mb: -6,
                mx: 'auto',
              })}
            >
              <Pagination
                nextLabel={<IconChevronRight className={css({w: '6', h: '6'})} />}
                onPageChange={current => updateSearchParams('page', String(current.selected + 1))}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel={<IconChevronLeft />}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLabel='...'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
                renderOnZeroPageCount={null}
              />
              <span
                className={css({
                  color: 'gray4',
                  fontWeight: 300,
                  fontSize: '14px',
                  textAlign: 'center',
                })}
              >
                Showing {startResult}-{endResult} of {totalCount || 0}
              </span>
            </div>
          </>
        )}
      </Wrapper>

      {/* Confirmation Dialog */}
      {isConfirmDialogOpen && (
        <Modal isOpen$={!!businessToDelete} onClose={handleCloseConfirmDialog}>
          <div
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
            <h2 className={css({mb: '4', fontSize: 'lg', fontWeight: 'bold'})}>Confirm Deletion</h2>
            <p className={css({mb: '4'})}>
              Are you sure you want to delete this business? This action cannot be undone.
            </p>
            <div className={css({display: 'flex', justifyContent: 'flex-end', gap: '2'})}>
              <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
              <Button onClick={handleConfirmDelete}>Delete</Button>
            </div>
          </div>
        </Modal>
      )}
    </Container>
  );
}
