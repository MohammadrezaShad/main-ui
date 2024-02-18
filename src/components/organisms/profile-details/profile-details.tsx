'use client';

import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {useRouter} from 'next/navigation';

import {IconArrowRight} from '@/assets';
import {Chip} from '@/components';
import {CookieName} from '@/constants';
import {getUser} from '@/graphql';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';

const tags = ['water crisis', 'TagName', 'TagName254', 'Another tag'];

const ProfileDetails = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authToken = getCookie(CookieName.AUTH_TOKEN)!;
  const {data} = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
  });
  const user = data;

  const renderHometown = () => (user?.hometown ? user.hometown : `You haven't told us yet`);

  const renderDateRegistered = () =>
    user?.createdAt
      ? new Date(+user.createdAt).toLocaleDateString(navigator.language, {
          year: 'numeric',
          month: 'long',
        })
      : '';

  return (
    <div
      className={flex({
        bgColor: 'gray1',
        flexDir: 'column',
        alignItems: 'stretch',
        p: '6',
        mdDown: {
          bgColor: 'white',
          px: 0,
          w: 'full',
        },
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
          About you
        </h3>
      </div>
      <div
        className={css({
          textStyle: 'h4',
          color: 'text.primary',
          mt: '7',
        })}
      >
        Hometown
      </div>
      <p
        className={css({
          textStyle: 'body1',
          color: 'gray4',
          mt: '3.5',
        })}
      >
        {renderHometown()}
      </p>
      <div
        className={css({
          textStyle: 'h4',
          color: 'text.primary',
          mt: '7',
        })}
      >
        Registred Since
      </div>
      <p
        className={css({
          textStyle: 'body1',
          color: 'gray4',
          mt: '3.5',
        })}
      >
        {renderDateRegistered()}
      </p>
      <div
        className={css({
          textStyle: 'h4',
          color: 'text.primary',
          mt: '7',
        })}
      >
        Number of Quizzes
      </div>
      <p
        className={css({
          textStyle: 'body1',
          color: 'gray4',
          mt: '3.5',
        })}
      >
        23
      </p>
      <div
        className={css({
          textStyle: 'h4',
          color: 'text.primary',
          mt: '7',
        })}
      >
        Correct Answer
      </div>
      <p
        className={css({
          textStyle: 'body1',
          color: 'gray4',
          mt: '3.5',
        })}
      >
        54 (78%)
      </p>
      <div
        className={css({
          textStyle: 'h4',
          color: 'text.primary',
          mt: '7',
        })}
      >
        Your Favorite Categories
      </div>
      <div
        className={flex({
          alignItems: 'stretch',
          gap: '2',
          mt: '2',
          flexWrap: 'wrap',
        })}
      >
        {tags.map(item => (
          <Chip key={item} type='success' text={item} />
        ))}
      </div>
    </div>
  );
};

export default ProfileDetails;
