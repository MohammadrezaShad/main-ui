import {css, cx} from '@styled/css';
import {InputHTMLAttributes} from 'react';
import {Container, Input, Label} from './text-field.styled';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  classes?: {
    container?: string;
  };
  hasError?: boolean;
}

const TextField = ({label, className, classes, hasError, ...otherProps}: Props) => {
  const inputClassName = cx('peer', className);
  const containerClassName = cx(classes?.container);

  return (
    <Container className={containerClassName}>
      <Input hasError={hasError} className={inputClassName} {...otherProps} />
      <Label
        className={css({
          top: otherProps.value ? '0' : '50%',
          transform: otherProps.value
            ? 'translateY(-50%) scale(0.9)'
            : 'translate(0, -50%) scale(1)',
        })}
        htmlFor={otherProps.id}
      >
        {label}
      </Label>
    </Container>
  );
};

export default TextField;
