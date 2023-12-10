import {IconClose} from '@/assets';
import {Modal} from '@/components/atoms/modal';
import {Observable} from '@legendapp/state';
import {css} from '@styled/css';
import {Container} from '@styled/jsx';
import {flex} from '@styled/patterns';
import Link from 'next/link';

export default function SignUp({isOpen$}: {isOpen$: Observable<boolean>}) {
  const onClose = () => {
    isOpen$.set(false);
  };

  return (
    <Modal onClose={onClose} isOpen$={isOpen$}>
      <Container
        style={{maxHeight: '99%'}}
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
          Sign in to Waterworld
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
          <Link href='' className={css({fontWeight: 'medium', color: 'primary'})}>
            Terms of Use
          </Link>
          <span className={css({textStyle: 'caption', color: 'text.primary'})}>
            &nbsp; and
            <br />
            acknowledge Waterworld’s&nbsp;
          </span>
          <Link href='' className={css({fontWeight: 'medium', color: 'primary'})}>
            Privacy Policy
          </Link>
        </div>
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
              border: '1px solid token(colors.gray3)',
            })}
            placeholder='First Name'
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
              border: '1px solid token(colors.gray3)',
            })}
            placeholder='Last Name'
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
            border: '1px solid token(colors.gray3)',
          })}
          placeholder='Email'
          type='email'
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
            border: '1px solid token(colors.gray3)',
          })}
          placeholder='Password'
          type='password'
        />

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
          })}
        >
          Sign Up
        </button>
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
