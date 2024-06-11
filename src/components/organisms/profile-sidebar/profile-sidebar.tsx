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
import {Paths} from '@/utils';

import {getUser} from '@/graphql';
import ProfileNavigation from '../profile-navigation/profile-navigation';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

const ProfileSidebar = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const authToken = getCookie(CookieName.AUTH_TOKEN)!;
  const {data} = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
  });
  const user = data;

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
        p: '8',
        mdDown: {
          borderWidth: '0',
          px: '0',
          pos: 'relative',
        },
      })}
    >
      <Avatar
        size={134}
        src={user?.avatar?._id ? `${IMAGE_STORAGE_URL}/${user.avatar?._id}` : undefined}
      />
      <h1
        className={css({
          textStyle: 'headline3',
          color: 'text.primary',
          mt: '5',
          textAlign: 'center',
        })}
      >
        {user?.displayName}
      </h1>
      <p
        className={css({
          textStyle: 'body2',
          color: 'gray4',
          mt: '1',
          textAlign: 'center',
        })}
      >
        {user?.email}
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
          px: '6',
          py: '4',
        })}
      >
        <div
          className={flex({
            alignItems: 'center',
            justify: 'center',
            gap: '3',
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
          400
        </h1>
      </div>
      <ProfileNavigation />
      <button
        onClick={handleLogout}
        type='button'
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '3',
          cursor: 'pointer',
          mr: 'auto',
          mt: '12',
          mdDown: {
            pos: 'absolute',
            top: '-5',
            right: '0',
            w: 'max-content',
            display: 'inline-block',
            ml: 'auto',
          },
        })}
      >
        <IconLogout />
        <span
          className={css({
            textStyle: 'body',
            color: 'gray4',
            hideBelow: 'md',
          })}
        >
          Log out
        </span>
      </button>
    </div>
  );
};

export default ProfileSidebar;
