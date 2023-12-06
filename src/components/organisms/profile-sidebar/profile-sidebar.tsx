import {IconLogout, coin} from '@/assets';
import {Avatar} from '@/components';
import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import Image from 'next/image';
import ProfileNavigation from '../profile-navigation/profile-navigation';

const ProfileSidebar = () => {
  return (
    <div
      className={flex({
        border: '1px solid token(colors.gray3)',
        alignSelf: 'stretch',
        alignItems: 'center',
        flex: 0,
        flexDir: 'column',
        px: '8',
        pt: '12',
        pb: '8',
      })}
    >
      <Avatar src='https://i.pravatar.cc/134?u=guy' size={134} />
      <h3
        className={css({
          textStyle: 'headline3',
          color: 'text.primary',
          mt: '5',
          textAlign: 'center',
        })}
      >
        John Doe
      </h3>
      <p
        className={css({
          textStyle: 'body2',
          color: 'gray4',
          mt: '1',
          textAlign: 'center',
        })}
      >
        john.doe@email.com
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
