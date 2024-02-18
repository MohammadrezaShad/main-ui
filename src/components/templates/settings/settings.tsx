'use client';

import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';

import {IconArrowRight} from '@/assets';
import {AuthButton, TextField} from '@/components';
import RadioButton from '@/components/atoms/radio-button/radio-button';
import {CookieName} from '@/constants';
import {getUser} from '@/graphql/query/users/get-user';

export default function Settings() {
  const authToken = getCookie(CookieName.AUTH_TOKEN)!;
  const {data} = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
  });
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
              <TextField label='First Name' />
              <TextField label='Last Name' />
              <TextField label='Nickname' />
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
            <label
              htmlFor='female'
              className={css({
                alignItems: 'stretch',
                display: 'flex',
                w: '72px',
                maxW: 'full',
                gap: '3',
                mt: '4',
              })}
            >
              <RadioButton id='female' name='gender' />
              <div
                className={css({
                  color: 'text.primary',
                  textStyle: 'body',
                })}
              >
                Female
              </div>
            </label>

            <label
              htmlFor='male'
              className={css({
                alignItems: 'stretch',
                display: 'flex',
                w: '72px',
                maxW: 'full',
                gap: '3',
                mt: '4',
              })}
            >
              <RadioButton id='male' name='gender' />
              <div
                className={css({
                  color: 'text.primary',
                  textStyle: 'body',
                })}
              >
                Male
              </div>
            </label>

            <label
              htmlFor='other'
              className={css({
                alignItems: 'stretch',
                display: 'flex',
                w: '72px',
                maxW: 'full',
                gap: '3',
                mt: '4',
              })}
            >
              <RadioButton id='other' name='gender' />
              <div
                className={css({
                  color: 'text.primary',
                  textStyle: 'body',
                })}
              >
                Other
              </div>
            </label>
            <Box
              className={flex({
                flexDir: 'column',
                gap: '6',
                w: 'full',
                mt: '8',
              })}
            >
              <TextField label='My Hometown' />
              <TextField label='My Blog or Website' />
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
