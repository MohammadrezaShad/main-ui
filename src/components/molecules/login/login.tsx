'use client';

import {Observable} from '@legendapp/state';
import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {setCookie} from 'cookies-next';
import {useFormik} from 'formik';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import * as Yup from 'yup';

import {IconClose} from '@/assets';
import {TextField} from '@/components';
import {Modal} from '@/components/atoms/modal';
import {CookieName} from '@/constants';
import {signin} from '@/graphql';

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
});

export default function Login({
  isOpen$,
  isSignUpOpen$,
}: {
  isOpen$: Observable<boolean>;
  isSignUpOpen$: Observable<boolean>;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const enabled$ = useObservable<boolean>(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async ({email, password}) => {
      await mutateAsync();
    },
  });
  const {errors, touched, values, handleChange, handleSubmit} = formik;

  const {data, error, mutateAsync, isPending} = useMutation({
    mutationFn: () => signin({email: values.email, password: values.password}),
  }) as any;

  const onClose = () => {
    isOpen$.set(false);
  };

  const handleSignUpClick = () => {
    isOpen$.set(false);
    isSignUpOpen$.set(true);
  };

  const notifyError = (text: string) =>
    toast(text, {
      type: 'error',
      hideProgressBar: true,
      theme: 'light',
      position: 'top-center',
    });
  const notifySuccess = (text: string) =>
    toast(text, {
      type: 'success',
      hideProgressBar: true,
      theme: 'light',
      position: 'top-center',
    });

  useEffect(() => {
    if (data) {
      if (data.auth.signin.token) {
        queryClient.invalidateQueries({queryKey: ['get-profile']});
        const expirationTime = 14 * 24 * 60 * 60 * 1000;
        const expirationDate = new Date(Date.now() + expirationTime);
        setCookie(CookieName.AUTH_TOKEN, data.auth.signin.token, {
          expires: expirationDate,
        });
        setTimeout(() => {
          onClose();
          router.refresh();
        }, 1000);
      } else {
        notifyError('Your account is not verified yet.');
      }
    }
  }, [data]);

  return (
    <Modal onClose={onClose} isOpen$={isOpen$.use()}>
      <div
        style={{height: '100%'}}
        className={css({
          display: 'flex',
          bgColor: 'white',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px',
          overflow: 'auto',
          alignSelf: 'center',
          pos: 'relative',
          _scrollbar: {
            display: 'none',
          },
        })}
      >
        <button
          type='button'
          onClick={onClose}
          className={css({
            position: 'absolute',
            right: 6,
            top: 6,
            cursor: 'pointer',
          })}
        >
          <IconClose />
        </button>
        <img
          alt=''
          loading='lazy'
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/a45419311858d85bf4d76527dd38c99cbe9789a7637a2a0f1df4cc44065002a5?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&'
          className={css({
            aspectRatio: 'square',
            objectFit: 'contain',
            objectPosition: 'center',
            w: '16',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            flexShrink: '0',
            maxW: 'full',
            mt: '2',
          })}
        />
        <h1
          className={css({
            textStyle: 'headline3',
            color: 'text.primary',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            mt: '7',
          })}
        >
          Sign in to Waterlyst
        </h1>
        <p
          className={css({
            textStyle: 'body2',
            color: 'text.primary',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            mt: '3.5',
          })}
        >
          Connect with great businesses
        </p>
        <div
          className={css({
            textAlign: 'center',
            fontSize: 'xs',
            lineHeight: 'xs',
            fontWeight: 'light',
            mt: '7',
          })}
        >
          <span className={css({textStyle: 'caption', color: 'text.primary'})}>
            By proceeding, you agree to Waterworld’s&nbsp;
          </span>
          <Link href='/' className={css({fontWeight: 'medium', color: 'primary'})}>
            Terms of Use
          </Link>
          <span className={css({textStyle: 'caption', color: 'text.primary'})}>
            &nbsp; and
            <br />
            acknowledge Waterworld’s&nbsp;
          </span>
          <Link href='/' className={css({fontWeight: 'medium', color: 'primary'})}>
            Privacy Policy
          </Link>
        </div>
        <form className={flex({flexDirection: 'column', w: 'full'})} onSubmit={handleSubmit}>
          <div className={flex({flexDirection: 'column', w: 'full', mt: '8', gap: '4'})}>
            <TextField
              autoComplete='email'
              type='email'
              name='email'
              value={values.email}
              onChange={handleChange}
              id='email'
              hasError={!!errors.email && touched.email}
              label='Email'
            />
            <TextField
              autoComplete='password'
              type='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              id='password'
              hasError={!!errors.password && touched.password}
              label='Password'
            />
          </div>
          <button
            type='button'
            className={css({
              textStyle: 'caption',
              color: 'primary',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              mt: '5',
              cursor: 'pointer',
            })}
          >
            Forgot password?
          </button>
          <button
            className={css({
              textStyle: 'body',
              color: 'white',
              bgColor: 'primary',
              mt: '4',
              px: '16',
              py: '3',
              alignSelf: 'stretch',
              cursor: 'pointer',
              _disabled: {
                brightness: '75%',
              },
            })}
            type='submit'
            disabled={isPending}
          >
            {isPending ? 'Please wait ...' : 'Log in'}
          </button>
        </form>
        <div
          className={css({
            textStyle: 'body2',
            alignItems: 'stretch',
            alignSelf: 'center',
            display: 'flex',
            gap: '1',
            mt: '6',
          })}
        >
          <div
            className={css({
              color: 'text.primary',
              textAlign: 'center',
            })}
          >
            New to Waterlyst?
          </div>
          <button
            type='button'
            onClick={handleSignUpClick}
            className={css({
              color: 'primary',
              textAlign: 'center',
              cursor: 'pointer',
            })}
          >
            Sign up
          </button>
        </div>
      </div>
    </Modal>
  );
}
