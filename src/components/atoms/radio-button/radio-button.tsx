import React from 'react';
import {cx} from '@styled/css';

import {Checkmark, Container, Input} from './radio-button.styled';

type DefaultRadioButtonProps = React.InputHTMLAttributes<HTMLInputElement>;
export type RadioButtonProps = DefaultRadioButtonProps & {
  className?: string;
  classes?: {
    container?: string;
    checkmark?: string;
  };
};

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (props: RadioButtonProps, ref) => {
    const {className, classes, disabled, ...otherProps} = props;
    const inputClassName = cx('peer', className);
    const containerClassName = cx(classes?.container);
    const checkmarkClassName = cx(classes?.checkmark);

    return (
      <Container className={containerClassName} disabled={disabled}>
        <Input
          type='radio'
          {...otherProps}
          className={inputClassName}
          ref={ref}
          disabled={disabled}
        />
        <Checkmark className={checkmarkClassName} />
      </Container>
    );
  },
);

export default RadioButton;
RadioButton.displayName = 'RadioButton';
