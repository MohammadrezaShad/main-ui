'use client';

import {Observable} from '@legendapp/state';
import {css} from '@styled/css';
import {Container} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useMutation} from '@tanstack/react-query';
import {useFormik} from 'formik';
import Link from 'next/link';
import {toast} from 'react-toastify';
import * as Yup from 'yup';

import {IconClose} from '@/assets';
import {Modal} from '@/components/atoms/modal';
import {SignupInputType} from '@/graphql/generated/types';
import {signUp} from '@/graphql/mutation/auth/sign-up';
import 'react-toastify/dist/ReactToastify.css';

const schema = Yup.object().shape({
  firstname: Yup.string(),
  lastname: Yup.string(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
});

export default function SignUp({
  isOpen$,
  isLoginOpen$,
}: {
  isOpen$: Observable<boolean>;
  isLoginOpen$: Observable<boolean>;
}) {
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
  const {mutateAsync, data, isLoading} = useMutation({
    mutationFn: (input: SignupInputType) => signUp(input),
  }) as any;
  const onClose = () => {
    isOpen$.set(false);
  };
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async ({firstname, lastname, email, password}) => {
      const input = {displayName: `${firstname} ${lastname}`, email, password};
      try {
        const signinData = await mutateAsync(input);
        notifySuccess('Signed up successfully');
        setTimeout(() => {
          onClose();
        }, 1000);
      } catch (error: any) {
        notifyError('message' in error ? (error.message as string) : 'Unknown error occured/');
      }
    },
  });
  const {errors, touched, values, handleChange, handleSubmit} = formik;

  const handleSigninClick = () => {
    isOpen$.set(false);
    isLoginOpen$.set(true);
  };

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
          mdDown: {
            maxHeight: 'full !important',
            height: 'full',
            width: 'full',
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
          Sign up for Waterworld
        </h3>
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
        <form
          className={css({
            display: 'flex',
            flexDir: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: '4',
            mt: '6',
          })}
          onSubmit={handleSubmit}
        >
          <div
            className={css({
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              gap: '4',
              mt: '6',
            })}
          >
            <input
              className={css({
                color: 'text.primary',
                textStyle: 'body2',
                borderRadius: '4px',
                bgColor: 'white',
                w: 'full',
                mt: '4',
                px: '4',
                py: '5',
                border:
                  errors.firstname && touched.firstname
                    ? `1px solid token(colors.danger)`
                    : `1px solid token(colors.gray3)`,
              })}
              placeholder='First Name'
              autoComplete='given-name'
              name='firstname'
              value={values.firstname}
              onChange={handleChange}
              id='firstname'
            />
            <input
              className={css({
                color: 'text.primary',
                textStyle: 'body2',
                borderRadius: '4px',
                bgColor: 'white',
                w: 'full',
                mt: '4',
                px: '4',
                py: '5',
                border:
                  errors.lastname && touched.lastname
                    ? `1px solid token(colors.danger)`
                    : `1px solid token(colors.gray3)`,
              })}
              placeholder='Last Name'
              autoComplete='family-name'
              name='lastname'
              value={values.lastname}
              onChange={handleChange}
              id='lastname'
            />
          </div>
          <input
            className={css({
              color: 'text.primary',
              textStyle: 'body2',
              borderRadius: '4px',
              bgColor: 'white',
              w: 'full',
              mt: '4',
              px: '4',
              py: '5',
              border:
                errors.email && touched.email
                  ? `1px solid token(colors.danger)`
                  : `1px solid token(colors.gray3)`,
            })}
            placeholder='Email'
            type='email'
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
              px: '4',
              py: '5',
              border:
                errors.password && touched.password
                  ? `1px solid token(colors.danger)`
                  : `1px solid token(colors.gray3)`,
            })}
            placeholder='Password'
            type='password'
            autoComplete='new-password'
            name='password'
            value={values.password}
            onChange={handleChange}
            id='password'
          />

          <button
            type='submit'
            className={css({
              textStyle: 'body',
              color: 'white',
              bgColor: 'primary',
              mt: '4',
              px: '16',
              py: '3',
              alignSelf: 'stretch',
              cursor: 'pointer',
            })}
          >
            Sign Up
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
            Already on Waterworld?
          </div>
          <button
            type='button'
            onClick={handleSigninClick}
            className={css({
              color: 'primary',
              textAlign: 'center',
              cursor: 'pointer',
            })}
          >
            Log in
          </button>
        </div>
      </Container>
    </Modal>
  );
}
