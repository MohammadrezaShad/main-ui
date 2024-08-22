'use client';

import React from 'react';
import {css, cx} from '@styled/css';
import {useRouter} from 'next/navigation';

import {shareToSocialNetworks} from '@/graphql';

interface SocialMediaLinkProps {
  icon: React.ComponentType<{className: string}>;
  action: any;
  type?: 'button' | 'link';
  articleId?: string;
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({icon: Icon, action, type, articleId}) => {
  const router = useRouter();
  return (
    <li>
      {type === 'link' ? (
        <button
          type='button'
          onClick={() => {
            if (articleId) shareToSocialNetworks({id: articleId});
            router.push(action);
          }}
          className={css({
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
          })}
        >
          <Icon className={css({fill: '#272727', width: 6, height: 6})} />
        </button>
      ) : (
        <button
          type='button'
          onClick={() => {
            if (articleId) shareToSocialNetworks({id: articleId});
            action();
          }}
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
};

interface SocialMediaLinksProps {
  links: {
    icon: React.ComponentType<{className: string}>;
    action: any;
    id: number;
    type?: 'button' | 'link';
  }[];
  classNames?: string;
  articleId?: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({links, classNames, articleId}) => (
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
        <SocialMediaLink articleId={articleId} key={link.id} {...link} />
      ))}
  </ul>
);

export default SocialMediaLinks;
