import React from 'react';
import {Url} from 'url';
import {LinkContainer} from './card-link.styled';

interface Props extends React.LinkHTMLAttributes<HTMLElement> {
  href: string;
}

const CardLink = ({href, children}: Props) => {
  return <LinkContainer href={href}>{children}</LinkContainer>;
};

export default CardLink;
