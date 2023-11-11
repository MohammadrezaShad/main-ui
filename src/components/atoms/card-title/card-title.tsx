import React from 'react';
import {Title} from './card-title.styled';
import {css, cx} from '@styled/css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CardTitle = ({children, className}: Props) => {
  const defaultClassName = css({
    color: 'text.primary',
    fontWeight: 500,
    w: 'full',
  });
  const titleClass = cx(defaultClassName, className);
  return <h6 className={titleClass}>{children}</h6>;
};

export default CardTitle;
