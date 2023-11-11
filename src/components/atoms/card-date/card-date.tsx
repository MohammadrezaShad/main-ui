import React from 'react';
import {DateContainer} from './card-date.styles';
import {css, cx} from '@styled/css';

interface Props {
  dateTime: string;
  children: React.ReactNode;
  className?: string;
}

const CardDate = ({dateTime, children, className}: Props) => {
  const defaultClassName = css({
    color: 'gray4',
    fontWeight: 500,
    w: 'full',
  });
  const dateClass = cx(defaultClassName, className);
  return (
    <DateContainer className={dateClass} dateTime={dateTime}>
      {children}
    </DateContainer>
  );
};

export default CardDate;
