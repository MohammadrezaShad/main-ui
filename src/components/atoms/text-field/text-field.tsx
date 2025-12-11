import {InputHTMLAttributes, ReactNode} from 'react';
import {css, cx} from '@styled/css';

import {Container, FieldWrapper, HelperText, Input, Label} from './text-field.styled';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  classes?: {
    container?: string;
  };

  /**
   * Backward compatible flag.
   * If not provided, inferred from `error`.
   */
  hasError?: boolean;

  /**
   * New: error content (string or node).
   */
  error?: string | ReactNode;

  /**
   * New: helper text shown when no error.
   */
  helperText?: string | ReactNode;
}

const TextField = ({
  label,
  className,
  classes,
  hasError,
  error,
  helperText,
  ...otherProps
}: Props) => {
  const inputClassName = cx('peer', className);
  const containerClassName = cx(classes?.container);

  const hasValue =
    otherProps.value !== undefined && otherProps.value !== null
      ? String(otherProps.value).length > 0
      : false;

  const resolvedHasError = hasError ?? !!error;
  const message = error ?? helperText;

  const helperId = otherProps.id ? `${otherProps.id}-helper` : undefined;

  const ariaDescribedBy =
    message && helperId
      ? [otherProps['aria-describedby'], helperId].filter(Boolean).join(' ')
      : otherProps['aria-describedby'];

  return (
    <Container className={containerClassName}>
      <FieldWrapper>
        <Input
          hasError={resolvedHasError}
          className={inputClassName}
          aria-invalid={resolvedHasError || undefined}
          aria-describedby={ariaDescribedBy}
          {...otherProps}
        />

        <Label
          className={css({
            top: hasValue ? '0' : '50%',
            transform: hasValue ? 'translateY(-50%) scale(0.9)' : 'translate(0, -50%) scale(1)',
          })}
          htmlFor={otherProps.id}
        >
          {label}
        </Label>
      </FieldWrapper>

      {message ? (
        <HelperText
          id={helperId}
          hasError={resolvedHasError}
          role={resolvedHasError ? 'alert' : undefined}
        >
          {message}
        </HelperText>
      ) : null}
    </Container>
  );
};

export default TextField;
