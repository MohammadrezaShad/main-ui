'use client';

import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {IconArrowRight} from '@/assets';

export default function CollectionsView() {
  const router = useRouter();

  return (
    <div
      className={css({
        gap: '5',
        display: 'flex',
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
            flexDir: 'column',
            alignItems: 'stretch',
            mt: '7',
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
              Collections
            </h3>
          </div>
          <div
            className={css({
              display: 'flex',
              alignItems: 'stretch',
              gap: '8',
              mt: '10',
              borderBottom: '1px solid token(colors.gray3)',
            })}
          >
            <button
              type='button'
              className={css({
                pb: '4',
                borderBottom: '2px solid',
                borderColor: 'primary',
                textStyle: 'h4',
                cursor: 'pointer',
                color: 'text.primary',
              })}
            >
              Articles
            </button>
            <button
              type='button'
              className={css({
                pb: '4',
                textStyle: 'h4',
                cursor: 'pointer',
                color: 'gray4',
              })}
            >
              Corporates
            </button>
          </div>
          <ul
            className={flex({
              mt: '10',
              flexDir: 'column',
              gap: '4',
            })}
          >
            <li
              className={flex({
                flexDir: 'column',
                flex: 1,
                alignItems: 'stretch',
                border: '1px solid token(colors.gray3)',
                pr: '4',
              })}
            >
              <div
                className={flex({
                  alignItems: 'stretch',
                  justifyContent: 'space-between',
                  gap: '4',
                })}
              >
                <Image
                  unoptimized
                  width={128}
                  height={128}
                  alt=''
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/eb456fdd1ecb37b29e21a79aa6c76f635d947ea637a0759778af0879359b13f9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275'
                  className={css({
                    aspectRatio: 'square',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    w: '32',
                    overflow: 'hidden',
                    flexShrink: '0',
                  })}
                />
                <div
                  className={flex({
                    flex: 1,
                    flexDir: 'column',
                    alignItems: 'stretch',
                    alignSelf: 'stretch',
                    py: '6',
                  })}
                >
                  <span
                    className={css({
                      textStyle: 'caption',
                      color: 'gray4',
                    })}
                  >
                    20 June 2023
                  </span>
                  <h6
                    className={css({
                      textStyle: 'h4',
                      mt: '1',
                      color: 'text.primary',
                    })}
                  >
                    Water: a commons beyond economic value
                  </h6>
                  <button
                    type='button'
                    className={css({
                      color: 'primary',
                      mt: 'auto',
                      textStyle: 'body2',
                      w: 'max-content',
                      px: '3',
                      py: '1.5',
                      ml: '-3',
                      cursor: 'pointer',
                    })}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
            <li
              className={flex({
                flexDir: 'column',
                flex: 1,
                alignItems: 'stretch',
                border: '1px solid token(colors.gray3)',
                pr: '4',
              })}
            >
              <div
                className={flex({
                  alignItems: 'stretch',
                  justifyContent: 'space-between',
                  gap: '4',
                })}
              >
                <Image
                  unoptimized
                  width={128}
                  height={128}
                  alt=''
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/eb456fdd1ecb37b29e21a79aa6c76f635d947ea637a0759778af0879359b13f9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275'
                  className={css({
                    aspectRatio: 'square',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    w: '32',
                    overflow: 'hidden',
                    flexShrink: '0',
                  })}
                />
                <div
                  className={flex({
                    flex: 1,
                    flexDir: 'column',
                    alignItems: 'stretch',
                    alignSelf: 'stretch',
                    py: '6',
                  })}
                >
                  <span
                    className={css({
                      textStyle: 'caption',
                      color: 'gray4',
                    })}
                  >
                    20 June 2023
                  </span>
                  <h6
                    className={css({
                      textStyle: 'h4',
                      mt: '1',
                      color: 'text.primary',
                    })}
                  >
                    Water: a commons beyond economic value
                  </h6>
                  <button
                    type='button'
                    className={css({
                      color: 'primary',
                      mt: 'auto',
                      textStyle: 'body2',
                      w: 'max-content',
                      px: '3',
                      py: '1.5',
                      ml: '-3',
                      cursor: 'pointer',
                    })}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
