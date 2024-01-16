'use client';

import {Observable} from '@legendapp/state';
import {css} from '@styled/css';
import * as React from 'react';
import {createPortal} from 'react-dom';

export default function Modal({
  children,
  isOpen$,
  onClose,
}: {
  children: React.ReactNode;
  isOpen$: Observable<boolean>;
  onClose?: () => void;
}) {
  const isOpen = isOpen$.use();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return isOpen
    ? createPortal(
        <div
          role='dialog'
          className={css({
            position: 'fixed',
            inset: '0',
            zIndex: 40,
            display: {
              base: 'grid',
              mdDown: 'block',
            },
            placeContent: {
              base: 'center',
              mdDown: 'stretch',
            },
            backgroundColor: '#00000050',
          })}
        >
          {children}
        </div>,
        document.body,
      )
    : null;
}
