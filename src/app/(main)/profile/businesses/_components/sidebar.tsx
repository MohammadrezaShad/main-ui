'use client';

import {css} from '@styled/css';
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {useParams, usePathname} from 'next/navigation';

import {IconDashboard, IconDoc, IconEdit, IconProduct} from '@/assets';
import {findCompanyById} from '@/graphql';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

export default function Sidebar() {
  const pathname = usePathname();
  const params = useParams();
  const {data} = useQuery({
    queryKey: ['find-business', params.businessId],
    queryFn: () => findCompanyById({id: params.businessId as string}),
  });
  const isActive = (link: string) => pathname.includes(link);
  return (
    <aside
      className={css({
        w: '320px',
        borderRightWidth: '1px',
        borderColor: 'gray.200',
        p: '6',
        display: 'flex',
        flexDir: 'column',
      })}
    >
      <div className={css({display: 'flex', flexDir: 'column', alignItems: 'center', mb: '8'})}>
        <div className={css({pos: 'relative', w: '32', h: '32', mb: '4'})}>
          {data?.result?.cover ? (
            <Image
              src={`${IMAGE_STORAGE_URL}/${data?.result?.cover?.filename}-${data?.result?.cover?._id}`}
              alt='Company Logo'
              width={128}
              height={128}
              className={css({rounded: 'full', objectFit: 'cover'})}
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
          <button
            type='button'
            className={css({
              pos: 'absolute',
              bottom: '0',
              right: '0',
              bgColor: 'white',
              rounded: 'full',
              p: '1',
              borderWidth: '1px',
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
          })}
        >
          <li
            className={css({
              display: {
                // base: item.href === '/about' ? 'none' : 'flex',
                mdDown: 'block',
              },
              '&:not(:last-of-type)': {
                borderBottom: '1px solid token(colors.gray3)',
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
                // base: item.href === '/about' ? 'none' : 'flex',
                mdDown: 'block',
              },
              '&:not(:last-of-type)': {
                borderBottom: '1px solid token(colors.gray3)',
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
                // base: item.href === '/about' ? 'none' : 'flex',
                mdDown: 'block',
              },
              '&:not(:last-of-type)': {
                borderBottom: '1px solid token(colors.gray3)',
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
