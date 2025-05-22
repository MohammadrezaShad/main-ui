'use client';

import {css} from '@styled/css';
import {useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Link from 'next/link';

import {Avatar} from '@/components';
import {CookieName} from '@/constants';
import {getUser} from '@/graphql';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

function UserInfo() {
  const authToken = getCookie(CookieName.AUTH_TOKEN)!;
  const {data, isLoading} = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
  });
  const user = data;
  if (isLoading) return null;
  return (
    <Link href='/profile'>
      <div
        className={css({
          alignItems: 'center',
          alignSelf: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '3',
          mt: 'auto',
          mb: 'auto',
          hideBelow: 'md',
        })}
      >
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
            {user?.displayName}
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
            })}
          >
            {user?.email}
          </div>
        </div>
        <Avatar
          size={40}
          src={
            user?.avatar?._id
              ? `${IMAGE_STORAGE_URL}/${user?.avatar?.filename}-${user?.avatar?._id}`
              : ''
          }
          alt=''
        />
      </div>
    </Link>
  );
}

export default UserInfo;
