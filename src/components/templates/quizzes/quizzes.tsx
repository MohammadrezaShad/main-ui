'use client';

import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import Image from 'next/image';
import Link from 'next/link';

import {coin, IconClose} from '@/assets';
import {Avatar} from '@/components';
import {Modal} from '@/components/atoms/modal';
import {Paths} from '@/utils';

export default function Quizzes() {
  const targetQuiz$ = useObservable<boolean>(false);
  return (
    <div
      className={css({display: 'flex', flexDir: 'column', bgColor: 'white', overflowY: 'hidden'})}
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignSelf: 'center',
          px: {
            base: '5',
            mdDown: '0',
          },
          mt: {
            base: '16',
            mdDown: '6',
          },
          w: 'full',
          maxW: {
            base: '960px',
            mdDown: 'full',
          },
        })}
      >
        <div
          className={css({
            alignSelf: 'center',
            textAlign: 'center',
            color: 'text.primary',
            textStyle: 'h1',
          })}
        >
          Quizzes
        </div>
        <div
          className={css({
            mt: {
              base: '14',
              mdDown: '6',
            },
            maxW: {
              mdDown: 'full',
            },
          })}
        >
          <div className={css({display: 'flex', gap: '5', overflowY: 'auto', scrollbar: 'hidden'})}>
            <div
              className={css({
                display: 'flex',
                flexDir: 'column',
                ml: '5',
                w: '6/12',
                mdDown: {ml: '0', w: 'full'},
              })}
            >
              <div
                className={css({
                  border: '1px solid token(colors.gray3)',
                  justifyContent: 'space-between',
                  display: 'flex',
                  flexDir: 'column',
                  flexGrow: '1',
                  w: 'full',
                  fontSize: 'base',
                  lineHeight: 'base',
                  fontWeight: 'medium',
                  whiteSpace: 'nowrap',
                  bgColor: 'white',
                  color: 'text.primary',
                  mdDown: {mt: '6', maxW: 'full'},
                })}
              >
                <img
                  alt=''
                  srcSet='https://cdn.builder.io/api/v1/image/assets/TEMP/2642dd8e7a148c4e76203bd052e0e9be7c768169ba5433021516ec40c53f8eb9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2642dd8e7a148c4e76203bd052e0e9be7c768169ba5433021516ec40c53f8eb9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2642dd8e7a148c4e76203bd052e0e9be7c768169ba5433021516ec40c53f8eb9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2642dd8e7a148c4e76203bd052e0e9be7c768169ba5433021516ec40c53f8eb9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2642dd8e7a148c4e76203bd052e0e9be7c768169ba5433021516ec40c53f8eb9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2642dd8e7a148c4e76203bd052e0e9be7c768169ba5433021516ec40c53f8eb9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2642dd8e7a148c4e76203bd052e0e9be7c768169ba5433021516ec40c53f8eb9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2642dd8e7a148c4e76203bd052e0e9be7c768169ba5433021516ec40c53f8eb9?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&'
                  className={css({
                    w: 'full',
                    aspectRatio: '1.33',
                    mdDown: {aspectRatio: 'portrait', objectFit: 'cover', h: '[351px]'},
                  })}
                />
                <div
                  className={css({
                    alignSelf: 'center',
                    mt: '8',
                    textStyle: 'h2',
                    textAlign: 'center',
                    mdDown: {
                      px: '5',
                    },
                  })}
                >
                  Graphical Quizzes
                </div>
                <div
                  className={css({
                    alignSelf: 'center',
                    mt: '3',
                    textAlign: 'center',
                    textStyle: 'body',
                    color: 'text.primary',
                  })}
                >
                  26 Available Quizzes
                </div>
                <Link
                  href={`${Paths.Quiz.getPath()}/graphical`}
                  className={css({
                    cursor: 'pointer',
                    px: '16',
                    py: '5',
                    mt: '5',
                    color: 'white',
                    bgColor: 'primary',
                    textAlign: 'center',
                    mdDown: {px: '5', maxW: 'full'},
                  })}
                >
                  Show more
                </Link>
              </div>
            </div>
            <div
              className={css({
                display: 'flex',
                flexDir: 'column',
                ml: '5',
                w: '6/12',
                mdDown: {ml: '0', w: 'full'},
              })}
            >
              <div
                className={css({
                  border: '1px solid token(colors.gray3)',
                  justifyContent: 'space-between',
                  display: 'flex',
                  flexDir: 'column',
                  flexGrow: '1',
                  w: 'full',
                  fontSize: 'base',
                  lineHeight: 'base',
                  fontWeight: 'medium',
                  whiteSpace: 'nowrap',
                  bgColor: 'white',
                  color: 'text.primary',
                  mdDown: {mt: '6', maxW: 'full'},
                })}
              >
                <img
                  alt=''
                  loading='lazy'
                  srcSet='https://cdn.builder.io/api/v1/image/assets/TEMP/1eec5d2e291fbe185707fbe9cb830897d5652d5ab05b6807f8ae869bb769c445?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eec5d2e291fbe185707fbe9cb830897d5652d5ab05b6807f8ae869bb769c445?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eec5d2e291fbe185707fbe9cb830897d5652d5ab05b6807f8ae869bb769c445?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eec5d2e291fbe185707fbe9cb830897d5652d5ab05b6807f8ae869bb769c445?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eec5d2e291fbe185707fbe9cb830897d5652d5ab05b6807f8ae869bb769c445?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eec5d2e291fbe185707fbe9cb830897d5652d5ab05b6807f8ae869bb769c445?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eec5d2e291fbe185707fbe9cb830897d5652d5ab05b6807f8ae869bb769c445?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1eec5d2e291fbe185707fbe9cb830897d5652d5ab05b6807f8ae869bb769c445?apiKey=89ab6d1f78ed4babb16b79acd6ff9275&'
                  className={css({
                    w: 'full',
                    aspectRatio: '1.33',
                    mdDown: {aspectRatio: 'portrait', objectFit: 'cover', h: '[351px]'},
                  })}
                />
                <div
                  className={css({
                    alignSelf: 'center',
                    mt: '8',
                    textStyle: 'h2',
                    textAlign: 'center',
                    mdDown: {
                      px: '5',
                      textStyle: 'h2',
                    },
                  })}
                >
                  Normal Quizzes
                </div>
                <div
                  className={css({
                    alignSelf: 'center',
                    mt: '3',
                    textAlign: 'center',
                    textStyle: 'body',
                    color: 'text.primary',
                  })}
                >
                  234 Available Quizzes
                </div>
                <Link
                  href={`${Paths.Quiz.getPath()}/normal`}
                  className={css({
                    cursor: 'pointer',
                    px: '16',
                    py: '5',
                    mt: '5',
                    color: 'white',
                    bgColor: 'primary',
                    textAlign: 'center',
                    mdDown: {px: '5', maxW: 'full'},
                  })}
                >
                  Show more
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={css({
            flexShrink: '0',
            mt: '8',
            h: '[1px]',
            bgColor: 'gray3',
            mdDown: {maxW: 'full'},
          })}
        />
        <div
          className={css({
            mt: '9',
            fontSize: '2xl',
            lineHeight: '2xl',
            fontWeight: 'medium',
            color: 'text.primary',
            mdDown: {maxW: 'full'},
          })}
        >
          Top Quizzes
        </div>
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
                  alt=''
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
                  alt=''
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
                  alt=''
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
        <div
          className={css({
            flexShrink: '0',
            mt: '8',
            h: '[1px]',
            bgColor: 'gray3',
            mdDown: {maxW: 'full'},
          })}
        />
        <h3
          className={css({
            mt: '9',
            color: 'text.primary',
            mdDown: {maxW: 'full'},
            textStyle: 'h3',
          })}
        >
          The Best People
        </h3>
        <div className={css({mt: '6', mdDown: {maxW: 'full'}})}>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: '4',
              gap: '5',
              mdDown: {gridTemplateColumns: '1'},
            })}
          >
            <div className={css({display: 'flex', gap: '4'})}>
              <Avatar size={48} />
              <div
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  flex: '1',
                  pl: '5',
                  pr: '5',
                  mt: 'auto',
                  mb: 'auto',
                })}
              >
                <h2
                  className={css({
                    fontSize: 'base',
                    lineHeight: 'base',
                    fontWeight: 'medium',
                    whiteSpace: 'nowrap',
                    color: 'text.primary',
                  })}
                >
                  Sergio Aquinna
                </h2>
                <p className={css({mt: '2', fontSize: 'sm', lineHeight: 'sm', color: 'gray4'})}>
                  Score: 4456
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                cursor: 'pointer',
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
                cursor: 'pointer',
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
