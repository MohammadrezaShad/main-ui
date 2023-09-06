import React from 'react';
import {cx} from '@styled/css';

import {Checkmark, Container, Input} from './switch.styled';

type DefaultSwitchProps = React.InputHTMLAttributes<HTMLInputElement>;
export type SwitchProps = DefaultSwitchProps & {
  className?: string;
  classes?: {
    container?: string;
    checkmark?: string;
  };
};

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>((props: SwitchProps, ref) => {
  const {className, classes, disabled, ...otherProps} = props;
  const inputClassName = cx('peer', className);
  const containerClassName = cx(classes?.container);
  const checkmarkClassName = cx(classes?.checkmark);

  return (
    <Container className={containerClassName} disabled={disabled}>
      <Input
        type='checkbox'
        {...otherProps}
        className={inputClassName}
        ref={ref}
        disabled={disabled}
      />
      <Checkmark className={checkmarkClassName} />
    </Container>
  );
});

export default Switch;
Switch.displayName = 'Switch';
