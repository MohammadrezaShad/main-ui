'use client';

import {IconChevronDown} from '@/assets';
import {Avatar} from '@/components';
import {User} from '@/graphql/generated/types';
import {getUser} from '@/graphql/query/users/get-user';
import {css} from '@styled/css';
import {useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Link from 'next/link';

function UserInfo() {
  const authToken = getCookie('authToken')!;
  const {data} = useQuery({
    queryKey: ['get-profile', 2],
    queryFn: () => getUser(authToken),
  }) as any;
  const user: User = data!.auth.getUser;
  return (
    <header
      className={css({
        alignItems: 'center',
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '5',
        mt: 'auto',
        mb: 'auto',
        hideBelow: 'md',
      })}
    >
      <button type='button' className={css({cursor: 'pointer'})}>
        <IconChevronDown className={css({fill: 'gray4'})} />
      </button>
      <div
        className={css({
          alignSelf: 'center',
          display: 'flex',
          flexBasis: '0%',
          flexDir: 'column',
          mt: 'auto',
          mb: 'auto',
          alignItems: 'flex-end',
        })}
      >
        <div
          className={css({
            color: 'zinc.800',
            textAlign: 'right',
            fontSize: 'base',
            lineHeight: 'base',
            whiteSpace: 'nowrap',
          })}
        >
          {user.displayName}
        </div>
        <div
          className={css({
            color: 'neutral.500',
            textAlign: 'right',
            fontSize: 'xs',
            lineHeight: 'xs',
            fontWeight: 'light',
            alignSelf: 'stretch',
            whiteSpace: 'nowrap',
            mt: '2',
          })}
        >
          {user.email}
        </div>
      </div>
      <Link href='/profile'>
        <Avatar size={40} src={user.avatar?.filename} />
      </Link>
    </header>
  );
}

export default UserInfo;
