import {IconAdd, IconMinus} from '@/assets';
import {css} from '@styled/css';
import Link from 'next/link';
import React from 'react';

const Questions = () => {
  return (
    <>
      <h3
        className={css({
          textStyle: 'headline3',
          color: 'text.primary',
        })}
      >
        Questions? Look here.
      </h3>
      <p
        className={css({
          textStyle: 'body2',
          color: 'gray4',
        })}
      >
        Can&apos;t find an answer? Contact us at{' '}
        <Link href=''>
          <span
            className={css({
              color: 'primary',
            })}
          >
            Contact Page
          </span>
        </Link>{' '}
        or email contact@waterdrop.com
      </p>

      {/** ACCORDION */}

      <div
        className={css({
          py: 4,
          borderBottom: '1px solid token(colors.gray3)',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            marginBottom: 2,
          })}
        >
          <button>
            <IconAdd />
          </button>
          <p
            className={css({
              textStyle: 'body',
              color: 'text.primary',
            })}
          >
            What is the water crisis?
          </p>
        </div>
      </div>

      <div
        className={css({
          py: 4,
          borderBottom: '1px solid token(colors.gray3)',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            marginBottom: 2,
          })}
        >
          <button>
            <IconAdd />
          </button>
          <p
            className={css({
              textStyle: 'body',
              color: 'text.primary',
            })}
          >
            What is causing the water crisis?
          </p>
        </div>
      </div>

      <div
        className={css({
          py: 4,
          borderBottom: '1px solid token(colors.gray3)',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            marginBottom: 2,
          })}
        >
          <button>
            <IconMinus />
          </button>
          <p
            className={css({
              textStyle: 'body',
              color: 'text.primary',
            })}
          >
            Which Country is lack of water?
          </p>
        </div>
        <p
          className={css({
            textStyle: 'body2',
            color: 'gray4',
            pl: '36px',
          })}
        >
          According to the World Resources Institute, Lebanon has the third-highest risk for water
          scarcity in the world, just behind Qatar and Israel. Overall, the Middle East is the
          region with the highest rates of water scarcity, and the effects carry an impact beyond
          borders.
        </p>
      </div>

      <div
        className={css({
          py: 4,
          borderBottom: '1px solid token(colors.gray3)',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            marginBottom: 2,
          })}
        >
          <button>
            <IconAdd />
          </button>
          <p
            className={css({
              textStyle: 'body',
              color: 'text.primary',
            })}
          >
            Which Country is lack of water?
          </p>
        </div>
      </div>
    </>
  );
};

export default Questions;
