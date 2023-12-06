'use client';
import {IconCollection, IconDashboard, IconNotify, IconSetting} from '@/assets';
import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import Link from 'next/link';
import {useParams, usePathname} from 'next/navigation';

const menuItems = [
  {id: 1, title: 'Dashboard', icon: IconDashboard, href: '#'},
  {id: 2, title: 'My collections', icon: IconCollection, href: 'collections'},
  {id: 3, title: 'Notifications', icon: IconNotify, href: 'notifications'},
  {id: 4, title: 'Settings', icon: IconSetting, href: 'settings'},
];

const ProfileNavigation = () => {
  const params = useParams();
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
        <li key={item.id}>
          <Link
            href={`/profile/${params.profileId}/${item.href}`}
            className={flex({
              alignItems: 'center',
              gap: '3',
              cursor: 'pointer',
              py: '4',
              '&:not(:last-of-type)': {
                borderBottom: '1px solid token(colors.gray3)',
              },
            })}
          >
            <item.icon
              className={css({
                fill: isActive(item.href) ? 'primary' : 'gray4',
              })}
            />
            <span
              className={css({
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
