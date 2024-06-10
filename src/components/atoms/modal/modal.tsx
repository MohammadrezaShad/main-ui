'use client';

import * as React from 'react';
import {createPortal} from 'react-dom';
import {css, cx} from '@styled/css';

import {IconClose} from '@/assets';

export default function Modal({
  children,
  isOpen$,
  onClose,
  className = '',
}: {
  children: React.ReactNode;
  isOpen$: boolean;
  onClose?: () => void;
  className?: string;
}) {
  const isOpen = isOpen$;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return isOpen
    ? createPortal(
        <div
          role='dialog'
          className={cx(
            className,
            css({
              position: 'fixed',
              inset: '0',
              zIndex: '[99]',
              display: {
                base: 'grid',
                mdDown: 'block',
              },
              placeContent: {
                base: 'center',
                mdDown: 'stretch',
              },
              backgroundColor: '#00000050',
            }),
          )}
        >
          {onClose && (
            <button
              className={css({
                position: 'fixed',
                top: '4',
                left: {
                  base: '16',
                  mdDown: '4',
                },
                bgColor: '#FFF',
                rounded: 'full',
                shadow: 'lg',
                padding: '1',
                cursor: 'pointer',
              })}
              onClick={onClose}
              type='button'
            >
              <IconClose />
            </button>
          )}
          {children}
        </div>,
        document.body,
      )
    : null;
}
