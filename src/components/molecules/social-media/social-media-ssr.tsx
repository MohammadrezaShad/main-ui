import React from 'react';
import {css, cx} from '@styled/css';
import Link from 'next/link';

interface SocialMediaLinkProps {
  icon: React.ComponentType<{className: string}>;
  action: any;
  type?: 'button' | 'link';
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({icon: Icon, action, type}) => (
  <li>
    {type === 'link' ? (
      <Link
        rel='dofollow'
        target='_blank'
        className={css({
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
        })}
        href={action}
      >
        <Icon className={css({fill: '#272727', width: 6, height: 6})} />
      </Link>
    ) : (
      <button
        type='button'
        onClick={action}
        className={css({
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
        })}
      >
        <Icon className={css({fill: '#272727', width: 6, height: 6})} />
      </button>
    )}
  </li>
);

interface SocialMediaLinksProps {
  links: {
    icon: React.ComponentType<{className: string}>;
    action: any;
    id: number;
    type?: 'button' | 'link';
  }[];
  classNames?: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({links, classNames}) => (
  <ul
    className={cx(
      css({
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }),
      classNames,
    )}
  >
    {links
      .filter(link => link.action !== '' && link.action !== null && link.action !== undefined)
      .map(link => (
        <SocialMediaLink key={link.id} {...link} />
      ))}
  </ul>
);

export default SocialMediaLinks;
