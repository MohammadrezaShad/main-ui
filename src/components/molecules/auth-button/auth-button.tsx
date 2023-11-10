'use client';

import {css, cx} from '@styled/css';

import {Button} from '@/components';

import {ButtonText} from './auth-button.styled';

interface AuthButtonProps {
  text?: string;
  className?: string;
  variant?: 'contained' | 'outlined';
}

export default function AuthButton({
  text = 'Login',
  className,
  variant = 'contained',
}: AuthButtonProps) {
  const defaultClassName = css({
    rounded: 0,
    '& svg': {
      transform: 'scale(0.7)',
      '& PATH': {
        fill: 'primary',
      },
    },
  });
  const buttonClass = cx(defaultClassName, className);
  return (
    <Button visual={variant} className={buttonClass} color='background'>
      <ButtonText textStyle='body1'>{text}</ButtonText>
    </Button>
  );
}
