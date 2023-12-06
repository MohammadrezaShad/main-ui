import {IconInfo} from '@/assets';
import {css} from '@styled/css';
import {flex} from '@styled/patterns';
import Image from 'next/image';

export default function Profile() {
  return (
    <div
      className={flex({
        flexDir: 'column',
        justifyContent: 'start',
        flex: '1',
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
        <h3
          className={css({
            textStyle: 'h3',
            color: 'text.primary',
          })}
        >
          Recent Activity
        </h3>
        {/** Empty state */}
        <div
          className={flex({
            alignSelf: 'center',
            flex: 0,
            flexBasis: '0%',
            flexDir: 'column',
            alignItems: 'center',
            my: 'auto',
          })}
        >
          <IconInfo
            clasName={css({
              w: '16',
              h: '16',
            })}
          />
          <p
            className={css({
              textStyle: 'body',
              textAlign: 'center',
              mt: '5',
              color: 'gray4',
            })}
          >
            We don't have any recent activity for you right now.
          </p>
        </div>
        {/** Content */}

        <ul
          className={css({
            mt: '10',
          })}
        >
          <li
            className={flex({
              flexDir: 'column',
              flex: 1,
              alignItems: 'stretch',
              pb: '4',
              '&:not(:last-of-type)': {
                borderBottom: '1px solid token(colors.gray3)',
                mb: '4',
              },
            })}
          >
            <div
              className={flex({
                alignItems: 'center',
                justifyContent: 'space-between',
              })}
            >
              <span
                className={css({
                  textStyle: 'body',
                  color: 'text.primary',
                })}
              >
                You Bookmarked
              </span>
              <span
                className={css({
                  textStyle: 'body2',
                  color: 'gray4',
                })}
              >
                10 days ago
              </span>
            </div>
            <div
              className={flex({
                alignItems: 'stretch',
                justifyContent: 'space-between',
                gap: '4',
                mt: '3',
              })}
            >
              <Image
                width={64}
                height={64}
                alt=''
                src='https://cdn.builder.io/api/v1/image/assets/TEMP/eb456fdd1ecb37b29e21a79aa6c76f635d947ea637a0759778af0879359b13f9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275'
                className={css({
                  aspectRatio: 'square',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  w: '16',
                  overflow: 'hidden',
                  flexShrink: '0',
                })}
              />
              <div
                className={flex({
                  flex: 1,
                  flexDir: 'column',
                  alignItems: 'stretch',
                  alignSelf: 'start',
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
                    mt: '2.5',
                    color: 'text.primary',
                  })}
                >
                  Water: a commons beyond economic value
                </h6>
              </div>
            </div>
          </li>
          <li
            className={flex({
              flexDir: 'column',
              flex: 1,
              alignItems: 'stretch',
              pb: '4',
              '&:not(:last-of-type)': {
                borderBottom: '1px solid token(colors.gray3)',
              },
            })}
          >
            <div
              className={flex({
                alignItems: 'center',
                justifyContent: 'space-between',
              })}
            >
              <span
                className={css({
                  textStyle: 'body',
                  color: 'text.primary',
                })}
              >
                You Bookmarked
              </span>
              <span
                className={css({
                  textStyle: 'body2',
                  color: 'gray4',
                })}
              >
                10 days ago
              </span>
            </div>
            <div
              className={flex({
                alignItems: 'stretch',
                justifyContent: 'space-between',
                gap: '4',
                mt: '3',
              })}
            >
              <Image
                width={64}
                height={64}
                alt=''
                src='https://cdn.builder.io/api/v1/image/assets/TEMP/eb456fdd1ecb37b29e21a79aa6c76f635d947ea637a0759778af0879359b13f9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275'
                className={css({
                  aspectRatio: 'square',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  w: '16',
                  overflow: 'hidden',
                  flexShrink: '0',
                })}
              />
              <div
                className={flex({
                  flex: 1,
                  flexDir: 'column',
                  alignItems: 'stretch',
                  alignSelf: 'start',
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
                    mt: '2.5',
                    color: 'text.primary',
                  })}
                >
                  Water: a commons beyond economic value
                </h6>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
