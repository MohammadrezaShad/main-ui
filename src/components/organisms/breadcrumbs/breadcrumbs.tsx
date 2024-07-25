import {css} from '@styled/css';
import Link from 'next/link';

interface Props {
  links: Array<{title: string; href: string}>;
}

const Breadcrumbs = ({links}: Props) => (
  <nav className={css({display: 'flex'})} aria-label='Breadcrumb'>
    <ol
      className={css({
        display: 'inline-flex',
        alignItems: 'center',
        mr: '1',
        ml: '1',
        md: {mr: '2', ml: '2'},
      })}
    >
      <li className={css({display: 'inline-flex', alignItems: 'center'})}>
        <Link
          href='/'
          className={css({
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 'sm',
            lineHeight: 'sm',
            fontWeight: 'medium',
            color: 'gray.700',
            _hover: {color: 'primary', _dark: {color: 'white'}},
            _dark: {color: 'gray.400'},
          })}
        >
          <svg
            className={css({w: '3', h: '3', me: '2.5'})}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
          </svg>
          Home
        </Link>
      </li>
      {links.map((link, index) => (
        <li key={link.href}>
          <div className={css({display: 'flex', alignItems: 'center'})}>
            <svg
              className={css({
                _rtl: {
                  transform:
                    'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
                },
                w: '3',
                h: '3',
                color: 'gray.400',
                ml: '1',
                mr: '1',
              })}
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 6 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 9 4-4-4-4'
              />
            </svg>
            <Link
              href={link.href}
              className={css({
                ms: '1',
                fontSize: 'sm',
                lineHeight: 'sm',
                fontWeight: 'medium',
                color: 'gray.700',
                _hover: {color: 'primary', _dark: {color: 'white'}},
                md: {ms: '2'},
                _dark: {color: 'gray.400'},
                textTransform: 'capitalize',
              })}
            >
              {link.title}
            </Link>
          </div>
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
