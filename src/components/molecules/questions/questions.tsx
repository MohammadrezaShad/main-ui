import {css} from '@styled/css';
import Link from 'next/link';

import {FaqType} from '@/graphql/generated/types';

import {Expandable} from '..';

const Questions = ({faqs}: {faqs: FaqType[]}) => (
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
      <Link href='/'>
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
    {faqs.map(faq => (
      <Expandable key={faq.question} faq={faq} />
    ))}
  </>
);

export default Questions;
