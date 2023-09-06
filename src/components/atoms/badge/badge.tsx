/* eslint-disable react/button-has-type */
import React from 'react';
import {cx} from '@styled/css';
import {badge, type BadgeVariant} from '@styled/recipes/badge';

type DefaultBadgeProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type BadgeProps = Partial<BadgeVariant> &
  DefaultBadgeProps & {
    children: React.ReactNode;
    className?: string;
  };

const Badge = React.forwardRef<HTMLButtonElement, BadgeProps>((props: BadgeProps, ref) => {
  const {children, size, color, visual, disabled, className} = props;
  const badgeClassName = badge({size, color, visual, disabled});
  const rootClassName = cx(badgeClassName, className);

  return (
    <button {...props} className={rootClassName} ref={ref}>
      {children}
    </button>
  );
});

export default Badge;
Badge.displayName = 'Badge';
