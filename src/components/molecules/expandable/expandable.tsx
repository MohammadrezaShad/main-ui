'use client';

import {useState} from 'react';
import {css} from '@styled/css';

import {IconAdd, IconMinus} from '@/assets';
import {FaqType} from '@/graphql/generated/types';

const Expandable = ({faq}: {faq: FaqType}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={css({
        py: 4,
        '&:not(:last-of-type)': {
          borderBottom: '1px solid token(colors.gray3)',
        },
      })}
    >
      <button
        type='button'
        onClick={() => setIsExpanded(previous => !previous)}
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          marginBottom: 2,
          cursor: 'pointer',
        })}
      >
        <span className={css({cursor: 'pointer'})}>{isExpanded ? <IconMinus /> : <IconAdd />}</span>
        <p
          className={css({
            textStyle: 'body',
            color: 'text.primary',
          })}
        >
          {faq.question}
        </p>
      </button>
      {isExpanded ? (
        <p
          className={css({
            textStyle: 'body2',
            color: 'gray4',
            pl: '36px',
          })}
        >
          {faq.answer}
        </p>
      ) : null}
    </div>
  );
};

export default Expandable;
