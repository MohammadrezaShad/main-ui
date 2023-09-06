/* eslint-disable react/button-has-type */
import React from 'react';
import {cx} from '@styled/css';
import {button, type ButtonVariant} from '@styled/recipes/button';

type DefaultButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = Partial<ButtonVariant> &
  DefaultButtonProps & {
    children: React.ReactNode;
    className?: string;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const {children, size, color, visual, disabled, className} = props;
  const buttonClassName = button({size, color, visual, disabled});
  const rootClassName = cx(buttonClassName, className);

  return (
    <button {...props} className={rootClassName} ref={ref}>
      {children}
    </button>
  );
});

export default Button;
Button.displayName = 'Button';
