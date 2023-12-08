'use client';
import {IconAdd, IconMinus} from '@/assets';
import {FaqType} from '@/graphql/generated/types';
import {css} from '@styled/css';
import {useState} from 'react';

const Expandable = ({faq}: {faq: FaqType}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={css({
        py: 4,
        borderBottom: '1px solid token(colors.gray3)',
      })}
    >
      <div
        onClick={() => setIsExpanded(previous => !previous)}
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          marginBottom: 2,
          cursor: 'pointer',
        })}
      >
        <button className={css({cursor: 'pointer'})}>
          {isExpanded ? <IconMinus /> : <IconAdd />}
        </button>
        <p
          className={css({
            textStyle: 'body',
            color: 'text.primary',
          })}
        >
          {faq.question}
        </p>
      </div>
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
