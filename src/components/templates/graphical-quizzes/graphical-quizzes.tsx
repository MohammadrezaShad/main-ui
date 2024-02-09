'use client';

import {IconClose, coin} from '@/assets';
import {Modal} from '@/components/atoms/modal';
import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import Image from 'next/image';
import {bgMaze} from '@/assets';

export default function GraphicalQuizzes() {
  const targetQuiz$ = useObservable<boolean>(false);

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        bgColor: 'white',
        mx: '-8',
      })}
    >
      <header
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          alignSelf: 'stretch',
          w: 'full',
          whiteSpace: 'nowrap',
          mdDown: {pl: '5', pr: '5', maxW: 'full'},
          minH: '[160px]',
          pos: 'relative',
        })}
      >
        <div
          style={{
            backgroundImage: `url(${bgMaze.src})`,
          }}
          className={css({
            w: 'full',
            maxW: '[640px]',
            mdDown: {pl: '5', pr: '5'},
            bgRepeat: 'no-repeat',
            bgSize: 'cover',
          })}
        >
          <div
            className={css({
              bg: 'linear-gradient(90deg, rgba(4,25,14,1) 0%, rgba(4,25,14,1) 25%, rgba(4,25,14,0) 33%, rgba(4,25,14,0) 66%, rgba(4,25,14,1) 75%, rgba(4,25,14,1) 100%)',
              position: 'absolute',
              inset: '0',
            })}
          ></div>
          <span className={css({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'text.invert',
            textStyle: 'h1'
          })} >Graphical Quizzes</span>
        </div>
      </header>
      <div
        className={css({
          px: '16',
          mt: '6',
          w: 'full',
          maxW: '960px',
          mdDown: {maxW: 'full'},
        })}
      >
        <div className={css({mt: '6', mdDown: {maxW: 'full'}})}>
          <div className={css({display: 'flex', gap: '5', mdDown: {flexDir: 'column', gap: '0'}})}>
            <div
              className={css({
                display: 'flex',
                flexDir: 'column',
                w: '33%',
                mdDown: {ml: '0', w: 'full'},
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  flexGrow: '1',
                  pb: '6',
                  w: 'full',
                  bgColor: 'white',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'gray3',
                  mdDown: {mt: '6', flexDir: 'row', borderWidth: '0'},
                })}
              >
                <img
                  loading='lazy'
                  srcSet='https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&'
                  className={css({
                    w: 'full',
                    aspectRatio: '1.33',
                    mdDown: {aspectRatio: 'square', w: '[112px]', h: '[112px]', objectFit: 'cover'},
                  })}
                />
                <div
                  className={css({
                    display: 'flex',
                    flexDir: 'column',
                    alignSelf: 'flex-start',
                    mt: '7',
                    ml: '6',
                    mdDown: {ml: '2.5', mt: '0'},
                  })}
                >
                  <div
                    className={css({
                      fontSize: 'xs',
                      lineHeight: 'xs',
                      fontWeight: 'light',
                      color: 'gray4',
                    })}
                  >
                    20 Questions
                  </div>
                  <div
                    className={css({
                      mt: '2',
                      fontSize: 'base',
                      lineHeight: 'base',
                      fontWeight: 'medium',
                      color: 'text.primary',
                    })}
                  >
                    Water Saving Quiz
                  </div>
                  <button
                    onClick={() => targetQuiz$.set(true)}
                    type='button'
                    className={css({
                      cursor: 'pointer',
                      mt: '9',
                      textAlign: 'left',
                      fontSize: 'sm',
                      lineHeight: 'sm',
                      color: 'primary',
                      mdDown: {mt: '8'},
                    })}
                  >
                    START THE QUIZ
                  </button>
                </div>
              </div>
            </div>
            <div
              className={css({
                display: 'flex',
                flexDir: 'column',
                ml: '5',
                w: '33%',
                mdDown: {ml: '0', w: 'full'},
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  flexGrow: '1',
                  pb: '6',
                  w: 'full',
                  bgColor: 'white',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'gray3',
                  mdDown: {mt: '6', flexDir: 'row', borderWidth: '0'},
                })}
              >
                <img
                  loading='lazy'
                  srcSet='https://cdn.builder.io/api/v1/image/assets/TEMP/ae6c2284c437e7dad2e5eb0bcd2647c5a2e1cc2d156db2e0e47e61ddda4f8cca?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ae6c2284c437e7dad2e5eb0bcd2647c5a2e1cc2d156db2e0e47e61ddda4f8cca?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ae6c2284c437e7dad2e5eb0bcd2647c5a2e1cc2d156db2e0e47e61ddda4f8cca?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ae6c2284c437e7dad2e5eb0bcd2647c5a2e1cc2d156db2e0e47e61ddda4f8cca?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ae6c2284c437e7dad2e5eb0bcd2647c5a2e1cc2d156db2e0e47e61ddda4f8cca?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ae6c2284c437e7dad2e5eb0bcd2647c5a2e1cc2d156db2e0e47e61ddda4f8cca?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ae6c2284c437e7dad2e5eb0bcd2647c5a2e1cc2d156db2e0e47e61ddda4f8cca?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ae6c2284c437e7dad2e5eb0bcd2647c5a2e1cc2d156db2e0e47e61ddda4f8cca?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&'
                  className={css({
                    w: 'full',
                    aspectRatio: '1.33',
                    mdDown: {aspectRatio: 'square', w: '[112px]', h: '[112px]', objectFit: 'cover'},
                  })}
                />
                <div
                  className={css({
                    display: 'flex',
                    flexDir: 'column',
                    alignSelf: 'flex-start',
                    mt: '7',
                    ml: '6',
                    mdDown: {ml: '2.5', mt: '0'},
                  })}
                >
                  <div
                    className={css({
                      fontSize: 'xs',
                      lineHeight: 'xs',
                      fontWeight: 'light',
                      color: 'gray4',
                    })}
                  >
                    20 Questions
                  </div>
                  <div
                    className={css({
                      mt: '2',
                      fontSize: 'base',
                      lineHeight: 'base',
                      fontWeight: 'medium',
                      color: 'text.primary',
                    })}
                  >
                    Water Crisis Quiz
                  </div>
                  <button
                    onClick={() => targetQuiz$.set(true)}
                    type='button'
                    className={css({
                      cursor: 'pointer',
                      mt: '9',
                      textAlign: 'left',
                      fontSize: 'sm',
                      lineHeight: 'sm',
                      color: 'primary',
                      mdDown: {mt: '8'},
                    })}
                  >
                    START THE QUIZ
                  </button>
                </div>
              </div>
            </div>
            <div
              className={css({
                display: 'flex',
                flexDir: 'column',
                ml: '5',
                w: '33%',
                mdDown: {ml: '0', w: 'full'},
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  flexGrow: '1',
                  pb: '6',
                  w: 'full',
                  bgColor: 'white',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'gray3',
                  mdDown: {mt: '6', flexDir: 'row', borderWidth: '0'},
                })}
              >
                <img
                  loading='lazy'
                  srcSet='https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/432ae614d587f42a5b08708c8e5c4e739cf4fef3111205962856702f53587694?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&'
                  className={css({
                    w: 'full',
                    aspectRatio: '1.33',
                    mdDown: {aspectRatio: 'square', w: '[112px]', h: '[112px]', objectFit: 'cover'},
                  })}
                />
                <div
                  className={css({
                    display: 'flex',
                    flexDir: 'column',
                    alignSelf: 'flex-start',
                    mt: '7',
                    ml: '6',
                    mdDown: {ml: '2.5', mt: '0'},
                  })}
                >
                  <div
                    className={css({
                      fontSize: 'xs',
                      lineHeight: 'xs',
                      fontWeight: 'light',
                      color: 'gray4',
                    })}
                  >
                    20 Questions
                  </div>
                  <div
                    className={css({
                      mt: '2',
                      fontSize: 'base',
                      lineHeight: 'base',
                      fontWeight: 'medium',
                      color: 'text.primary',
                    })}
                  >
                    Water Saving Quiz 2
                  </div>
                  <button
                    onClick={() => targetQuiz$.set(true)}
                    type='button'
                    className={css({
                      cursor: 'pointer',
                      mt: '9',
                      textAlign: 'left',
                      fontSize: 'sm',
                      lineHeight: 'sm',
                      color: 'primary',
                      mdDown: {mt: '8'},
                    })}
                  >
                    START THE QUIZ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {true ? (
              <div
                className={css({
                  mt: 6,
                  mb: -6,
                })}
              >
                <button
                  type='button'
                  onClick={() => {}} //fetchNextPage()
                  className={css({
                    backgroundColor: 'primary',
                    px: '4',
                    py: '3',
                    mx: 'auto',
                    display: 'block',
                    cursor: 'pointer',
                  })}
                >
                  <span
                    className={css({
                      textStyle: 'body',
                      color: 'text.invert',
                    })}
                  >
                    Show more
                  </span>
                </button>
              </div>
            ) : null}
      <Modal isOpen$={targetQuiz$} onClose={() => targetQuiz$.set(false)}>
        <form
          className={css({
            display: 'flex',
            flexDir: 'column',
            p: '8',
            bgColor: 'white',
            maxW: '480px',
            mdDown: {
              maxW: 'full',
              px: '8',
              py: '6',
              h: 'calc(100vh - 84px)',
              w: '100%',
              zIndex: '1',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            },
          })}
        >
          <header
            className={css({
              display: 'flex',
              gap: '5',
              justifyContent: {base: 'space-between', mdDown: 'center'},
            })}
          >
            <Image
              unoptimized
              width={128}
              height={128}
              src={coin}
              alt=''
              className={css({
                w: '16',
                h: '16',
                aspectRatio: 'square',
                objectFit: 'contain',
                objectPosition: 'center',
                overflow: 'hidden',
                flexShrink: '0',
                mdDown: {w: '32', h: '32'},
              })}
            />
            <button
              type='button'
              onClick={() => targetQuiz$.set(false)}
              className={css({
                cursor: 'pointer',
                alignSelf: 'flex-start',
                w: '6',
                aspectRatio: 'square',
                hideBelow: 'md',
              })}
            >
              <IconClose />
            </button>
          </header>
          <h1
            className={css({
              mt: '5',
              fontSize: '2xl',
              lineHeight: '2xl',
              fontWeight: 'medium',
              color: 'text.primary',
              mdDown: {
                textAlign: 'center',
                textStyle: 'h3',
              },
            })}
          >
            You need to pay 100 coins to start the quiz
          </h1>
          <div
            className={css({
              display: 'flex',
              gap: '4',
              mt: '8',
              fontSize: 'base',
              lineHeight: 'base',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              mdDown: {
                flexDir: 'column',
                position: 'absolute',
                left: '8',
                right: '8',
                bottom: '6',
              },
            })}
          >
            <button
              type='button'
              className={css({
                pl: '12',
                pr: '12',
                py: '3',
                w: {
                  base: '1/3',
                  mdDown: 'full',
                },
                color: 'white',
                bgColor: 'primary',
              })}
              aria-label='Pay'
            >
              Pay
            </button>
            <button
              type='button'
              onClick={() => targetQuiz$.set(false)}
              className={css({
                pl: '10',
                pr: '10',
                py: '3',
                w: {
                  base: '1/3',
                  mdDown: 'full',
                },
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'gray3',
                color: 'gray4',
              })}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
