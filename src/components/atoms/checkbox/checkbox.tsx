import React from 'react';
import {cx} from '@styled/css';

import {Checkmark, Container, Input} from './checkbox.styled';

type DefaultCheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;
export type CheckboxProps = DefaultCheckboxProps & {
  className?: string;
  classes?: {
    container?: string;
    checkmark?: string;
  };
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props: CheckboxProps, ref) => {
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

export default Checkbox;
Checkbox.displayName = 'Checkbox';
