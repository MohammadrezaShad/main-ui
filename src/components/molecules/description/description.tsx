// app/components/expandable-text.tsx (or wherever)
// "use client" is required because we keep local UI state.

'use client';

import {useState} from 'react';
import {css, cva} from '@styled/css';

type ExpandableTextProps = {
  children: React.ReactNode;
  maxLines?: number;
  expandLabel?: string;
  collapseLabel?: string;
  className?: string;
};

const pill = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1',
    px: '2',
    py: '0.5',
    fontSize: 'sm',
    fontWeight: 'medium',
    rounded: 'full',
    // “highlight” look
    bg: 'yellow.200',
    color: 'gray.900',
    borderWidth: '1px',
    borderColor: 'yellow.400',
    boxShadow: 'inset 0 -2px 0 0 token(colors.yellow.300)',
    cursor: 'pointer',
    _hover: {bg: 'yellow.300'},
    _active: {translate: 'y(1px)'},
  },
});

export function Description({
  children,
  maxLines = 3,
  expandLabel = 'Expand',
  collapseLabel = 'Collapse',
  className,
}: ExpandableTextProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={css({
        position: 'relative',
        bg: {base: 'white', _dark: 'gray.900'},
        rounded: 'md',
        p: '3',
        textAlign: 'justify',
      })}
    >
      <div
        // the text block
        className={css({
          wordBreak: 'break-word',
          // clamp when closed
          ...(open
            ? {}
            : {
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }),
        })}
        aria-expanded={open}
      >
        {children}
      </div>
    </div>
  );
}
