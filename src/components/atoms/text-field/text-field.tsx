import {cx} from '@styled/css';
import React from 'react';

import {Container, Input, Label} from './text-field.styled';

type DefaultTextFieldProps = React.InputHTMLAttributes<HTMLInputElement>;
export type TextFieldProps = DefaultTextFieldProps & {
  className?: string;
  title?: string;
  classes?: {
    container?: string;
    label?: string;
  };
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props: TextFieldProps, ref) => {
    const {className, classes, disabled, title, ...otherProps} = props;
    const inputClassName = cx('peer', className);
    const containerClassName = cx(classes?.container);

    return (
      <Container className={containerClassName} disabled={disabled}>
        <Input
          type='text'
          className={inputClassName}
          ref={ref}
          disabled={disabled}
          {...otherProps}
        />
        <Label>{title}</Label>
      </Container>
    );
  },
);

export default TextField;
TextField.displayName = 'TextField';
