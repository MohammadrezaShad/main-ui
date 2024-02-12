'use client';

import {css} from '@styled/css';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {IconCollection, IconDashboard, IconNotify, IconProfile, IconSetting} from '@/assets';

const menuItems = [
  {id: 1, title: 'Dashboard', icon: IconDashboard, href: '/activities'},
  {id: 2, title: 'My collections', icon: IconCollection, href: '/collections'},
  {id: 3, title: 'Notifications', icon: IconNotify, href: '/notifications'},
  {id: 4, title: 'About you', icon: IconProfile, href: '/about'},
  {id: 5, title: 'Settings', icon: IconSetting, href: '/settings'},
];

const ProfileNavigation = () => {
  const pathname = usePathname();
  const isActive = (link: string) => pathname.includes(link);
  return (
    <ul
      className={css({
        alignSelf: 'start',
        mt: '6',
        w: 'full',
        mr: '-8',
      })}
    >
      {menuItems.map(item => (
        <li
          className={css({
            display: {
              base: item.href === '/about' ? 'none' : 'flex',
              mdDown: 'block',
            },
            '&:not(:last-of-type)': {
              borderBottom: '1px solid token(colors.gray3)',
            },
          })}
          key={item.id}
        >
          <Link
            href={`/profile${item.href}`}
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '3',
              cursor: 'pointer',
              py: '4',
            })}
          >
            <item.icon
              className={css({
                fill: isActive(item.href) ? 'primary' : 'gray4',
              })}
            />
            <span
              className={css({
                display: 'inline-block',
                textStyle: 'body',
                color: isActive(item.href) ? 'primary' : 'gray4',
              })}
            >
              {item.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProfileNavigation;
