import {css, cx} from '@styled/css';
import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CardTitle = ({children, className}: Props) => {
  const defaultClassName = css({
    color: 'text.primary',
    fontWeight: 500,
    w: 'full',
    mdDown: {
      textStyle: 'h4',
    },
    lineClamp: '2',
    lineHeight: '[18.38px]',
    height: '[36px]',
    mb: '4',
  });
  const titleClass = cx(defaultClassName, className);
  return <div className={titleClass}>{children}</div>;
};

export default CardTitle;
