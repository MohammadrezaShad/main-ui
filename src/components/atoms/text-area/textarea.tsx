import {TextareaHTMLAttributes} from 'react';
import {css, cx} from '@styled/css';

import {Container, Label, TextArea as TextAreaStyled} from './textarea.styled';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  className?: string;
  classes?: {
    container?: string;
  };
  hasError?: boolean;
}

const TextArea = ({label, className, classes, hasError, ...otherProps}: Props) => {
  const inputClassName = cx('peer', className);
  const containerClassName = cx(classes?.container);

  return (
    <Container className={containerClassName}>
      <TextAreaStyled hasError={hasError} className={inputClassName} {...otherProps} />
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

export default TextArea;
