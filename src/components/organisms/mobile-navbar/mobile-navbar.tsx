'use client';

import {IconDoc, IconHome, IconMenu, IconProfile, IconQuiz} from '@/assets';
import {css} from '@styled/css';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function MobileNavbar() {
  const pathname = usePathname();
  const isActive = (link: string) => pathname.includes(link);

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
        <li>
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
            <IconProfile
              className={css({
                fill: isActive('/profile') ? 'primary' : 'gray4',
              })}
            />
            Profile
          </Link>
        </li>
        <li>
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
        <li>
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
        <li>
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
        <li>
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
