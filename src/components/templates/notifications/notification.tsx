'use client';

import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {useRouter} from 'next/navigation';

import {IconArrowRight, IconInfo} from '@/assets';

export default function Profile() {
  const router = useRouter();

  return (
    <div
      className={flex({
        flexDir: 'column',
        justifyContent: 'start',
        flex: '1',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexGrow: '1',
          flexDir: 'column',
          mt: '7',
          alignItems: 'flex-start',
        })}
      >
        <div className={flex({alignItems: 'center', gap: '3'})}>
          <button
            type='button'
            aria-label='back to dashboard'
            onClick={() => router.push('/profile')}
          >
            <IconArrowRight className={css({rotate: '180deg', hideFrom: 'md'})} />
          </button>
          <h3
            className={css({
              textStyle: 'h3',
              color: 'text.primary',
            })}
          >
            Notifications
          </h3>
        </div>
        {/** Empty state */}
        <div
          className={flex({
            alignSelf: 'center',
            flex: 0,
            flexBasis: '0%',
            flexDir: 'column',
            alignItems: 'center',
            my: 'auto',
          })}
        >
          <IconInfo
            className={css({
              w: '16',
              h: '16',
            })}
          />
          <p
            className={css({
              textStyle: 'body',
              textAlign: 'center',
              mt: '5',
              color: 'gray4',
            })}
          >
            No notifications yet
          </p>
        </div>
      </div>
    </div>
  );
}
