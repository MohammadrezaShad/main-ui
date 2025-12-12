'use client';

import {toast} from 'react-toastify';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {FormikValues, useFormik} from 'formik';
import {useRouter} from 'next/navigation';

import {IconArrowRight} from '@/assets';
import {Button, TextField} from '@/components';
import RadioButton from '@/components/atoms/radio-button/radio-button';
import {CookieName} from '@/constants';
import {GenderEnum, updateUser} from '@/graphql';
import {getUser} from '@/graphql/query/users/get-user';

export default function Settings() {
  const authToken = getCookie(CookieName.AUTH_TOKEN)!;
  const queryClient = useQueryClient();
  const {data} = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
  });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      gender: data?.gender,
      firstName: data?.firstName,
      lastName: data?.lastName,
      nickname: data?.nickname,
      hometown: data?.hometown,
      website: data?.website,
      facebook: data?.facebook || '',
      twitter: data?.twitter || '',
      instagram: data?.instagram || '',
      whatsApp: data?.whatsApp || '',
      telegram: data?.telegram || '',
      linkedin: data?.linkedin || '',
    },
    // validationSchema: schema,
    onSubmit: async (values: FormikValues) => {
      try {
        await updateUserMutation.mutateAsync({...values});
        queryClient.clear();
        toast.success('Author edited successfully');
      } catch (error: Error | any) {
        toast.error(error.message);
      }
    },
  });
  const {errors, touched, values, handleChange, isSubmitting, handleSubmit} = formik;
  const updateUserMutation = useMutation({
    mutationFn: (items: any) => updateUser(items, authToken!),
  });

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
          <form
            onSubmit={handleSubmit}
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
              <div
                className={css({
                  textStyle: 'h3',
                  color: 'text.primary',
                })}
              >
                Settings
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
              <TextField
                label='First Name'
                name='firstName'
                id='firstName'
                onChange={handleChange}
                value={values.firstName}
              />
              <TextField
                label='Last Name'
                name='lastName'
                id='lastName'
                onChange={handleChange}
                value={values.lastName}
              />
              <TextField
                label='Nickname'
                name='nickname'
                id='nickname'
                onChange={handleChange}
                value={values.nickname}
              />
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
              <RadioButton
                id='female'
                name='gender'
                value={GenderEnum.Female}
                checked={values.gender === GenderEnum.Female}
                onChange={handleChange}
              />
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
              <RadioButton
                id='male'
                name='gender'
                value={GenderEnum.Male}
                checked={values.gender === GenderEnum.Male}
                onChange={handleChange}
              />
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
              <RadioButton
                id='other'
                name='gender'
                value={GenderEnum.Other}
                checked={values.gender === GenderEnum.Other}
                onChange={handleChange}
              />
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
              <TextField
                label='My Hometown'
                name='hometown'
                id='hometown'
                value={values.hometown}
                onChange={handleChange}
              />
              <TextField
                name='website'
                id='website'
                label='My Blog or Website'
                value={values.website}
                onChange={handleChange}
              />
              <TextField
                label='Facebook'
                type='text'
                name='facebook'
                value={values.facebook}
                onChange={handleChange}
                id='facebook'
              />
              <TextField
                label='Twitter'
                type='text'
                name='twitter'
                value={values.twitter}
                onChange={handleChange}
                id='twitter'
              />
              <TextField
                label='Instagram'
                type='text'
                name='instagram'
                value={values.instagram}
                onChange={handleChange}
                id='instagram'
              />
              <TextField
                label='WhatsApp'
                type='text'
                name='whatsApp'
                value={values.whatsApp}
                onChange={handleChange}
                id='whatsApp'
              />
              <TextField
                label='Telegram'
                type='text'
                name='telegram'
                value={values.telegram}
                onChange={handleChange}
                id='telegram'
              />
              <TextField
                label='Linkedin'
                type='text'
                name='linkedin'
                value={values.linkedin}
                onChange={handleChange}
                id='linkedin'
              />
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
              <Button
                type='submit'
                visual='contained'
                className={css({
                  color: 'text.invert',
                  w: 'max-content',
                  px: 4,
                  py: 3,
                  bg: 'primary',
                  borderRadius: '8px',
                })}
              >
                Save changes
              </Button>
              <Button
                onClick={() => router.push('/profile')}
                type='button'
                visual='outlined'
                className={css({
                  color: {
                    base: 'gray4',
                    _hover: 'white',
                  },
                  w: 'max-content',
                  px: 4,
                  py: 3,
                  borderColor: 'gray3',
                  borderRadius: '8px',
                })}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
