'use client';

import {Observable} from '@legendapp/state';
import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import {Container} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useQuery} from '@tanstack/react-query';
import {setCookie} from 'cookies-next';
import {useFormik} from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

import {IconClose} from '@/assets';
import {Modal} from '@/components/atoms/modal';
import {CookieName} from '@/constants';
import {signin} from '@/graphql/query/sign-in';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {toast} from 'react-toastify';

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
  const router = useRouter();
  const enabled$ = useObservable<boolean>(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async ({email, password}) => {
      enabled$.set(true);
    },
  });
  const {errors, touched, values, handleChange, handleSubmit} = formik;

  const {data, error, isLoading} = useQuery({
    queryKey: ['header-login'],
    queryFn: () => signin({email: values.email, password: values.password}),
    enabled: enabled$.use(),
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
        setCookie(CookieName.AUTH_TOKEN, data.auth.signin.token, {
          expires: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        });
        setTimeout(() => {
          onClose();
          router.refresh();
        }, 2000);
      } else {
        notifyError('Your account is not verified yet.');
      }
    }
  }, [data]);

  return (
    <Modal onClose={onClose} isOpen$={isOpen$}>
      <Container
        style={{height: '100%'}}
        onClick={e => e.stopPropagation()}
        className={flex({
          backgroundColor: 'white',
          flexDirection: 'column',
          alignItems: 'center',
          px: 10,
          py: 8,
          overflow: 'auto',
          alignSelf: 'center',
          position: 'relative',
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
        <h3
          className={css({
            textStyle: 'headline3',
            color: 'text.primary',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            mt: '7',
          })}
        >
          Sign in to Waterlyst
        </h3>
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
        <form className={flex({flexDirection: 'column'})} onSubmit={handleSubmit}>
          <input
            className={css({
              color: 'text.primary',
              textStyle: 'body2',
              borderRadius: '4px',
              bgColor: 'white',
              w: 'full',
              mt: '8',
              pl: '4',
              pr: '16',
              py: '5',
              border:
                errors.email && touched.email
                  ? `1px solid token(colors.danger)`
                  : `1px solid token(colors.gray3)`,
            })}
            placeholder='Email'
            autoComplete='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            id='email'
          />
          <input
            className={css({
              color: 'text.primary',
              textStyle: 'body2',
              borderRadius: '4px',
              bgColor: 'white',
              w: 'full',
              mt: '4',
              pl: '4',
              pr: '16',
              py: '5',
              border:
                errors.password && touched.password
                  ? `1px solid token(colors.danger)`
                  : `1px solid token(colors.gray3)`,
            })}
            placeholder='Password'
            type='password'
            autoComplete='current-password'
            name='password'
            value={values.password}
            onChange={handleChange}
            id='password'
          />
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
            disabled={isLoading}
          >
            {isLoading ? 'Please wait ...' : 'Log in'}
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
      </Container>
    </Modal>
  );
}
