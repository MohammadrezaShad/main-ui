'use client';

import {useRef} from 'react';
import {toast} from 'react-toastify';
import {css} from '@styled/css';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {useParams, usePathname} from 'next/navigation';

import {IconDashboard, IconDoc, IconEdit, IconProduct} from '@/assets';
import {findCompanyById, updateCompany, uploadImage} from '@/graphql';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

export default function Sidebar() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const params = useParams();
  const {data} = useQuery({
    queryKey: ['find-business', params.businessId],
    queryFn: () => findCompanyById({id: params.businessId as string}),
  });
  const isActive = (link: string) => pathname.includes(link);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const uploaded = await uploadImage(file, {});
      const imageId = uploaded?.image?._id;
      if (!imageId) throw new Error('Upload succeeded but no image ID returned');
      await updateCompany({id: params.businessId as string, profileImage: imageId});
      return uploaded;
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success('Business cover image updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update business cover`);
    },
  });

  return (
    <aside
      className={css({
        w: '320px',
        borderRightWidth: '1px',
        borderColor: 'gray.200',
        p: '6',
        display: 'flex',
        flexDir: 'column',
        mdDown: {
          w: 'full',
          borderRightWidth: '0',
          px: '2',
        },
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          mb: '8',
          mdDown: {
            flexDir: 'row',
            alignItems: 'center',
            gap: '4',
            mb: '4',
          },
        })}
      >
        <div
          className={css({
            pos: 'relative',
            w: '32',
            h: '32',
            mb: '4',
            mdDown: {
              w: '20',
              h: '20',
              flexShrink: '0',
            },
          })}
        >
          {data?.result?.cover ? (
            <Image
              src={`${IMAGE_STORAGE_URL}/${data?.result?.profileImage?.filename}-${data?.result?.profileImage?._id}`}
              alt='Company Logo'
              width={128}
              height={128}
              className={css({rounded: 'full', objectFit: 'cover', aspectRatio: 'square'})}
            />
          ) : (
            <div
              className={css({
                w: '128',
                h: '128',
                backgroundColor: 'gray3',
                aspectRatio: 'square',
                flexShrink: '0',
                rounded: 'full',
              })}
            />
          )}
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) uploadMutation.mutate(file);
            }}
            className={css({
              pos: 'absolute',
              top: '0',
              left: '0',
              w: 'full',
              h: 'full',
              opacity: '0',
              cursor: 'pointer',
              display: 'none',
            })}
          />
          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className={css({
              pos: 'absolute',
              bottom: '0',
              right: '0',
              bgColor: 'white',
              rounded: 'full',
              p: '1',
              borderWidth: '1 !importantpx',
              borderColor: 'gray.200',
            })}
          >
            <IconEdit className={css({w: '6', h: '6'})} />
          </button>
        </div>
        <h1
          className={css({
            fontSize: 'xl',
            lineHeight: 'xl',
            fontWeight: 'bold',
            textAlign: 'center',
          })}
        >
          {data?.result?.title}
        </h1>
      </div>

      <nav className={css({flex: '1'})}>
        <ul
          className={css({
            alignSelf: 'start',
            mt: '6',
            w: 'full',
            mr: '-8',
            mdDown: {
              display: 'flex',
              flexDir: 'row',
              alignItems: 'center',
              gap: '2',
            },
          })}
        >
          <li
            className={css({
              display: {
                mdDown: 'block',
              },
              '&:not(:last-of-type)': {
                borderBottom: '1px solid token(colors.gray3)',
              },
              mdDown: {
                borderWidth: '0 !important',
                w: 'full',
              },
            })}
          >
            <Link
              href={`/profile/businesses/${params.businessId}`}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '3',
                cursor: 'pointer',
                py: '4',
                mdDown: {
                  gap: '1',
                },
              })}
            >
              <div>
                <IconDashboard className={css({w: '6', h: '6', fill: 'gray.400'})} />
              </div>
              <span
                className={css({
                  display: 'inline-block',
                  textStyle: 'body',
                  color:
                    pathname === `/profile/businesses/${params.businessId}` ? 'primary' : 'gray4',
                })}
              >
                Dashboard
              </span>
            </Link>
          </li>
          <li
            className={css({
              display: {
                mdDown: 'block',
              },
              '&:not(:last-of-type)': {
                borderBottom: '1px solid token(colors.gray3)',
              },
              mdDown: {
                borderWidth: '0 !important',
                w: 'full',
              },
            })}
          >
            <Link
              href={`/profile/businesses/${params.businessId}/products`}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '3',
                cursor: 'pointer',
                py: '4',
                mdDown: {
                  gap: '1',
                },
              })}
            >
              <div>
                <IconProduct className={css({w: '6', h: '6', color: 'gray.400'})} />
              </div>
              <span
                className={css({
                  display: 'inline-block',
                  textStyle: 'body',
                  color: isActive('/products') ? 'primary' : 'gray4',
                })}
              >
                Products
              </span>
            </Link>
          </li>
          <li
            className={css({
              display: {
                mdDown: 'block',
              },
              '&:not(:last-of-type)': {
                borderBottom: '1px solid token(colors.gray3)',
              },
              mdDown: {
                borderWidth: '0 !important',
                w: 'full',
              },
            })}
          >
            <Link
              href={`/profile/businesses/${params.businessId}/info`}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '3',
                cursor: 'pointer',
                py: '4',
                mdDown: {
                  gap: '1',
                },
              })}
            >
              <div>
                <IconDoc className={css({w: '6', h: '6', fill: 'gray.400'})} />
              </div>
              <span
                className={css({
                  display: 'inline-block',
                  textStyle: 'body',
                  color: isActive('/info') ? 'primary' : 'gray4',
                })}
              >
                Information
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
