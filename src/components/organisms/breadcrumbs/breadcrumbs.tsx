import {css} from '@styled/css';
import Link from 'next/link';

import {IconChevronRight, IconHome} from '@/assets';

interface Props {
  links: Array<{title: string; href: string}>;
}

const Breadcrumbs = ({links}: Props) => (
  <nav className={css({display: 'flex'})} aria-label='Breadcrumb'>
    <ol
      className={css({
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '2',
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
            '& svg path': {fill: 'gray.700'},
            _hover: {
              color: 'primary',
              '& svg path': {fill: 'primary'},
              _dark: {color: 'white', '& svg path': {fill: 'white'}},
            },
            _dark: {color: 'gray.400'},
          })}
        >
          <IconHome className={css({w: '4', h: '4', me: '2.5'})} />
          Home
        </Link>
      </li>
      {links.map((link, index) => (
        <li key={link.href}>
          <div className={css({display: 'flex', alignItems: 'center'})}>
            <IconChevronRight className={css({w: '6', h: '6'})} />
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
