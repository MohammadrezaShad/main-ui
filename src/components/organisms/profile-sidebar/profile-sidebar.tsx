'use client';

import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {deleteCookie, getCookie} from 'cookies-next';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {coin, IconLogout} from '@/assets';
import {Avatar} from '@/components';
import {CookieName} from '@/constants';
import {User} from '@/graphql/generated/types';
import {getUser} from '@/graphql/query/users/get-user';
import {Paths} from '@/utils';

import ProfileNavigation from '../profile-navigation/profile-navigation';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const ProfileSidebar = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const authToken = getCookie(CookieName.AUTH_TOKEN)!;
  const {data} = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
  }) as any;
  const user: User = data.auth!.getUser;

  const handleLogout = () => {
    deleteCookie(CookieName.AUTH_TOKEN, {path: '/'});
    queryClient.invalidateQueries({queryKey: ['get-profile']});
    queryClient.clear();
    setTimeout(() => {
      router.push(Paths.Home.getPath());
    }, 1000);
  };

  return (
    <div
      className={flex({
        border: '1px solid token(colors.gray3)',
        alignSelf: 'stretch',
        alignItems: 'center',
        flex: 0,
        flexDir: 'column',
        px: '8',
        py: '8',
      })}
    >
      <Avatar
        size={134}
        src={user.avatar?._id ? `${IMAGE_STORAGE_URL}/${user.avatar?._id}` : undefined}
      />
      <h3
        className={css({
          textStyle: 'headline3',
          color: 'text.primary',
          mt: '5',
          textAlign: 'center',
        })}
      >
        {user.displayName}
      </h3>
      <p
        className={css({
          textStyle: 'body2',
          color: 'gray4',
          mt: '1',
          textAlign: 'center',
        })}
      >
        {user.email}
      </p>
      <div
        className={flex({
          bg: 'gray1',
          alignSelf: 'stretch',
          w: 'full',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '5',
          mt: '6',
          pl: '6',
          pr: '7',
        })}
      >
        <div
          className={flex({
            alignItems: 'center',
            justify: 'center',
            gap: '3.5',
            p: '6',
          })}
        >
          <Image
            unoptimized
            width={32}
            height={32}
            src={coin}
            alt=''
            className={css({
              aspectRatio: 'square',
              objectFit: 'contain',
              objectPosition: 'center',
              overflow: 'hidden',
              flexShrink: '0',
            })}
          />
          <p
            className={css({
              textStyle: 'body2',
              color: 'gray4',
              textAlign: 'center',
            })}
          >
            Coins
          </p>
        </div>
        <h1
          className={css({
            textStyle: 'h1',
            color: 'gray4',
            textAlign: 'center',
          })}
        >
          717
        </h1>
      </div>
      <ProfileNavigation />
      <button
        onClick={handleLogout}
        type='button'
        className={flex({
          alignItems: 'center',
          gap: '3',
          cursor: 'pointer',
          mt: '12',
          w: 'full',
        })}
      >
        <IconLogout />
        <span
          className={css({
            textStyle: 'body',
            color: 'gray4',
          })}
        >
          Log out
        </span>
      </button>
    </div>
  );
};

export default ProfileSidebar;
