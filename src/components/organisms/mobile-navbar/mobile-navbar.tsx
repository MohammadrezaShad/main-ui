'use client';

import {IconDoc, IconHome, IconMenu, IconProfile, IconQuiz} from '@/assets';
import {Avatar} from '@/components';
import {CookieName} from '@/constants';
import {useAuthContext} from '@/contexts';
import {User} from '@/graphql/generated/types';
import {getUser} from '@/graphql/query/users/get-user';
import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

interface Props {}

export default function MobileNavbar(props: Props) {
  const {isLoginOpen$} = useAuthContext();
  const pathname = usePathname();
  const isActive = (link: string) => pathname.includes(link);
  const authToken = getCookie(CookieName.AUTH_TOKEN)!;
  const {data, isLoading} = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
  }) as any;
  const user: User = data?.auth.getUser;
  if (isLoading) return null;

  return (
    <div
      className={css({
        bgColor: 'white',
        display: 'flex',
        w: 'full',
        flexDir: 'column',
        alignItems: 'stretch',
      })}
    >
      <ul
        className={css({
          w: 'full',
          alignSelf: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '5',
          px: '5',
          py: '4',
          alignItems: 'center',
        })}
      >
        <li
          className={flex({
            justifyContent: 'center',
            flex: 1,
          })}
        >
          {authToken ? (
            <Link
              href='/profile'
              className={css({
                color: isActive('/profile') ? 'primary' : 'gray4',
                textAlign: 'center',
                fontSize: 'xs',
                lineHeight: 'xs',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2.5',
                flexDir: 'column',
              })}
            >
              {user?.avatar?._id ? (
                <Avatar src={`${IMAGE_STORAGE_URL}/${user.avatar?._id}`} size={24} />
              ) : (
                <IconProfile
                  className={css({
                    fill: isActive('/profile') ? 'primary' : 'gray4',
                  })}
                />
              )}
              Profile
            </Link>
          ) : (
            <button
              type='button'
              className={css({
                color: isActive('/profile') ? 'primary' : 'gray4',
                textAlign: 'center',
                fontSize: 'xs',
                lineHeight: 'xs',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2.5',
                flexDir: 'column',
              })}
              onClick={() => isLoginOpen$.set(true)}
            >
              <IconProfile
                className={css({
                  fill: isActive('/profile') ? 'primary' : 'gray4',
                })}
              />
              Profile
            </button>
          )}
        </li>
        <li
          className={flex({
            justifyContent: 'center',
            flex: 1,
          })}
        >
          <Link
            href='/articles'
            className={css({
              color: isActive('/articles') ? 'primary' : 'gray4',
              textAlign: 'center',
              fontSize: 'xs',
              lineHeight: 'xs',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2.5',
              flexDir: 'column',
            })}
          >
            <IconDoc
              className={css({
                fill: isActive('/articles') ? 'primary' : 'gray4',
              })}
            />
            Articles
          </Link>
        </li>
        <li
          className={flex({
            justifyContent: 'center',
            flex: 1,
          })}
        >
          <Link
            href='/'
            className={css({
              color: pathname === '/' ? 'primary' : 'gray4',
              textAlign: 'center',
              fontSize: 'xs',
              lineHeight: 'xs',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2.5',
              flexDir: 'column',
            })}
          >
            <IconHome
              className={css({
                fill: pathname === '/' ? 'primary' : 'gray4',
              })}
            />
            Home
          </Link>
        </li>
        <li
          className={flex({
            justifyContent: 'center',
            flex: 1,
          })}
        >
          <Link
            href='/quizzes'
            className={css({
              color: isActive('/quizzes') ? 'primary' : 'gray4',
              textAlign: 'center',
              fontSize: 'xs',
              lineHeight: 'xs',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2.5',
              flexDir: 'column',
            })}
          >
            <IconQuiz
              className={css({
                fill: isActive('/quizzes') ? 'primary' : 'gray4',
              })}
            />
            Quiz
          </Link>
        </li>
        <li
          className={flex({
            justifyContent: 'center',
            flex: 1,
          })}
        >
          <button
            type='button'
            className={css({
              color: 'gray4',
              textAlign: 'center',
              fontSize: 'xs',
              lineHeight: 'xs',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2.5',
              flexDir: 'column',
            })}
          >
            <IconMenu />
            Menu
          </button>
        </li>
      </ul>
    </div>
  );
}
