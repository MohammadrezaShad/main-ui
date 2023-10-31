import React from 'react';

import {Container, Text, Title} from './section.styled';

export interface SectionProps extends React.PropsWithChildren {
  className?: string;
  title: string;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>((props: SectionProps, ref) => {
  const {className, title, children} = props;

  return (
    <Container className={className} ref={ref}>
      <Title>
        <Text>{title}</Text>
      </Title>
      {children}
    </Container>
  );
});

export default Section;
Section.displayName = 'Section';
