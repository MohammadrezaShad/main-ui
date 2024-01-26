'use client';

import {IconArrowRight} from '@/assets';
import {AuthButton, TextField} from '@/components';
import RadioButton from '@/components/atoms/radio-button/radio-button';
import {CookieName} from '@/constants';
import {User} from '@/graphql/generated/types';
import {getUser} from '@/graphql/query/users/get-user';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';

export default function Settings() {
  const authToken = getCookie(CookieName.AUTH_TOKEN)!;
  const {data} = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
  }) as any;
  const user: User = data!.auth.getUser;
  const router = useRouter();

  return (
    <div
      className={css({bgColor: 'white', display: 'flex', flexDir: 'column', alignItems: 'center'})}
    >
      <div
        className={css({
          gap: '5',
          display: 'flex',
          w: 'full',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
            alignItems: 'stretch',
            w: 'full',
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
                Settings
              </h3>
            </div>
            <Box
              className={flex({
                flexDir: 'column',
                gap: '6',
                w: 'full',
                mt: '8',
              })}
            >
              <TextField title='First Name' />
              <TextField title='Last Name' />
              <TextField title='Nickname' />
            </Box>
            <h5
              className={css({
                color: 'text.primary',
                alignSelf: 'stretch',
                whiteSpace: 'nowrap',
                textStyle: 'h3',
                mt: '9',
              })}
            >
              Gender
            </h5>
            <div
              className={css({
                alignItems: 'stretch',
                display: 'flex',
                w: '72px',
                maxW: 'full',
                gap: '3',
                mt: '4',
              })}
            >
              <RadioButton name='gender' />
              <div
                className={css({
                  color: 'text.primary',
                  textStyle: 'body',
                })}
              >
                Female
              </div>
            </div>

            <div
              className={css({
                alignItems: 'stretch',
                display: 'flex',
                w: '72px',
                maxW: 'full',
                gap: '3',
                mt: '4',
              })}
            >
              <RadioButton name='gender' />
              <div
                className={css({
                  color: 'text.primary',
                  textStyle: 'body',
                })}
              >
                Male
              </div>
            </div>

            <div
              className={css({
                alignItems: 'stretch',
                display: 'flex',
                w: '72px',
                maxW: 'full',
                gap: '3',
                mt: '4',
              })}
            >
              <RadioButton name='gender' />
              <div
                className={css({
                  color: 'text.primary',
                  textStyle: 'body',
                })}
              >
                Other
              </div>
            </div>
            <Box
              className={flex({
                flexDir: 'column',
                gap: '6',
                w: 'full',
                mt: '8',
              })}
            >
              <TextField title='My Hometown' />
              <TextField title='My Blog or Website' />
            </Box>
            <div
              className={css({
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'space-between',
                gap: '5',
                mt: '12',
              })}
            >
              <AuthButton
                text='Save changes'
                className={css({
                  '& span': {color: 'text.invert'},
                  w: 'max-content',
                  px: 4,
                  py: 3,
                  bg: 'primary',
                })}
              />
              <AuthButton
                text='Cancel'
                variant='outlined'
                className={css({
                  '& span': {color: 'gray4'},
                  w: 'max-content',
                  px: 4,
                  py: 3,
                  border: '1px solid token(colors.gray3)',
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
