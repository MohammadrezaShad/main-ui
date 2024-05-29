'use client';

import {useEffect} from 'react';
import {css} from '@styled/css';

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      className={css({
        display: 'flex',
        alignItems: 'center',
        h: 'full',
        p: '16',
        bgColor: 'white',
        color: 'gray.900',
      })}
    >
      <div
        className={css({
          w: 'container',
          maxW: 'container',
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pl: '5',
          pr: '5',
          ml: 'auto',
          mr: 'auto',
          mt: '8',
          mb: '8',
        })}
      >
        <div className={css({maxW: 'md', textAlign: 'center'})}>
          <h2
            className={css({
              mb: '8',
              fontWeight: 'extrabold',
              fontSize: '9xl',
              lineHeight: '9xl',
              color: 'gray.800',
            })}
          >
            Error
          </h2>
          <p
            className={css({
              fontSize: '2xl',
              lineHeight: '2xl',
              fontWeight: 'semibold',
              md: {fontSize: '3xl', lineHeight: '3xl'},
            })}
          >
            Sorry, an unexpected error has occured.
          </p>
          <p className={css({mt: '4', mb: '8', color: 'gray.600'})}>
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <a
            rel='noopener noreferrer'
            href='/'
            className={css({
              pl: '8',
              pr: '8',
              pt: '3',
              pb: '3',
              fontWeight: 'semibold',
              rounded: 'rounded',
              bgColor: 'primary',
              color: 'white',
            })}
          >
            Back to homepage
          </a>
        </div>
      </div>
    </section>
  );
}
