'use client';

import {toast} from 'react-toastify';
import {Observable} from '@legendapp/state';
import {css} from '@styled/css';
import {Container} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useMutation} from '@tanstack/react-query';
import {useFormik} from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import * as Yup from 'yup';

import {IconClose} from '@/assets';
import ProfileCircle from '@/assets/images/profile-circle.png';
import {TextField} from '@/components';
import {Modal} from '@/components/atoms/modal';
import {signUp, SignupInputType} from '@/graphql';

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
    <Modal onClose={onClose} isOpen$={isOpen$.use()}>
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
          <IconClose classname={css({color: '#272727'})} />
        </button>
        <Image
          alt=''
          unoptimized
          width={64}
          height={64}
          src={ProfileCircle}
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
          Sign up for Waterlyst
        </h1>
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
            By proceeding, you agree to Waterlyst’s&nbsp;
          </span>
          <Link href='/' className={css({fontWeight: 'medium', color: 'primary'})}>
            Terms of Use
          </Link>
          <span className={css({textStyle: 'caption', color: 'text.primary'})}>
            &nbsp; and
            <br />
            acknowledge WaterLyst’s&nbsp;
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
            <TextField
              hasError={!!errors.firstname && touched.firstname}
              label='First Name'
              autoComplete='given-name'
              name='firstname'
              value={values.firstname}
              onChange={handleChange}
              id='firstname'
            />

            <TextField
              hasError={!!errors.lastname && touched.lastname}
              label='Last Name'
              autoComplete='family-name'
              name='lastname'
              value={values.lastname}
              onChange={handleChange}
              id='lastname'
            />
          </div>
          <TextField
            hasError={!!errors.email && touched.email}
            label='Email'
            type='email'
            autoComplete='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            id='email'
          />
          <TextField
            hasError={!!errors.password && touched.password}
            label='Password'
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
            Already on Waterlyst?
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
