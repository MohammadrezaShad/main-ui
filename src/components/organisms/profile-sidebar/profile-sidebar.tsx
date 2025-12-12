'use client';

import {useRef, useState} from 'react';
import {toast} from 'react-toastify';
import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {deleteCookie, getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';

import {IconDrop, IconLogout} from '@/assets';
import {Avatar, Button} from '@/components';
import {CookieName} from '@/constants';
import {getUser, updateUser} from '@/graphql';
import {Paths} from '@/utils';

import ProfileNavigation from '../profile-navigation/profile-navigation';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const ProfileSidebar = () => {
  const [coverImage, setCoverImage] = useState<File>();
  const avatarPreviewRef = useRef<HTMLImageElement>(null);
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

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = function (e) {
        if (avatarPreviewRef.current?.hasAttribute('src')) {
          avatarPreviewRef.current.src = e.target?.result as string;
        } else {
          avatarPreviewRef.current!.innerHTML = `
            <img
              style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
              width={134}
              height={134}
              alt={alt}
              src=${e.target?.result as string}
            />
            `;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUserMutation = useMutation({
    mutationFn: (avatar: any) => updateUser({}, authToken!, avatar),
  });

  const handleUpdateAvatar = async () => {
    try {
      await updateUserMutation.mutateAsync(coverImage);
      queryClient.clear();
      toast.success('Avatar updated successfully');
      setCoverImage(undefined);
    } catch (error: Error | any) {
      toast.error(error.message);
    }
  };

  const handleResetAvatar = () => {
    setCoverImage(undefined);
    avatarPreviewRef.current!.src = user?.avatar?._id
      ? `${IMAGE_STORAGE_URL}/${user.avatar?.filename}-${user.avatar?._id}`
      : '';
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
      <label
        className={css({
          cursor: 'pointer',
          pos: 'relative',
          rounded: 'full',
          overflow: 'hidden',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pos: 'absolute',
            inset: 0,
            bgColor: 'gray1',
            opacity: 0,
            _hover: {
              opacity: 0.5,
            },
            transition: 'opacity 0.3s ease',
            color: 'gray.800',
          })}
        >
          Click to change
        </div>
        <input
          style={{display: 'none', opacity: 0, visibility: 'hidden'}}
          type='file'
          accept='image/*'
          onChange={handlePhotoChange}
        />
        <span className={css({srOnly: true})}>Change Profile image</span>
        <Avatar
          ref={avatarPreviewRef}
          size={134}
          src={
            user?.avatar?._id
              ? `${IMAGE_STORAGE_URL}/${user.avatar?.filename}-${user.avatar?._id}`
              : ''
          }
          alt=''
        />
      </label>
      {coverImage ? (
        <>
          <Button
            onClick={handleUpdateAvatar}
            visual='contained'
            className={css({
              color: 'text.invert',
              w: 'max-content',
              px: 4,
              py: 3,
              bg: 'primary',
              mt: '4',
              borderRadius: '8px',
            })}
            type='button'
          >
            Save
          </Button>
          <Button
            onClick={handleResetAvatar}
            visual='outlined'
            className={css({
              color: 'text.primary',
              w: 'max-content',
              px: 4,
              py: 3,
              bg: 'white',
              mt: '4',
              borderRadius: '8px',
            })}
            type='button'
          >
            Reset
          </Button>
        </>
      ) : null}
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
          <IconDrop
            className={css({
              w: '8',
              h: '8',
            })}
          />
          <p
            className={css({
              textStyle: 'body2',
              color: 'gray4',
              textAlign: 'center',
            })}
          >
            Drops
          </p>
        </div>
        <h1
          className={css({
            textStyle: 'h1',
            color: 'gray4',
            textAlign: 'center',
          })}
        >
          {user?.coins ?? 0}
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
