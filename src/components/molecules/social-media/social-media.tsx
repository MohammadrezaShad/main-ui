import {css, cx} from '@styled/css';
import Link from 'next/link';
import React from 'react';

interface SocialMediaLinkProps {
  icon: React.ComponentType<{className: string}>;
  href: string;
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({icon: Icon, href}) => (
  <li>
    <Link
      className={css({
        display: 'grid',
        placeItems: 'center',
      })}
      href={href}
    >
      <Icon className={css({fill: '#272727', width: 6, height: 6})} />
    </Link>
  </li>
);

interface SocialMediaLinksProps {
  links: {icon: React.ComponentType<{className: string}>; href: string; id: number}[];
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
    {links.map(link => (
      <SocialMediaLink key={link.id} {...link} />
    ))}
  </ul>
);

export default SocialMediaLinks;
