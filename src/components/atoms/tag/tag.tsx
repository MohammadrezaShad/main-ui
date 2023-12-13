import {css} from '@styled/css';
import Link from 'next/link';

const Tag = ({text, href}: {text: string; href: string}) => (
  <li
    className={css({
      padding: '3px 4px',
      bg: 'gray2',
      borderRadius: '4px',
    })}
  >
    <Link href={href}>
      <span
        className={css({
          textStyle: 'caption',
          color: 'gray4',
        })}
      >
        {text}
      </span>
    </Link>
  </li>
);

export default Tag;
