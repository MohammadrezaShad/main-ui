'use client';

import Select from 'react-select';

import {Block, Container, Item, List} from './viko-filters.styled';

export default function VikoFilters() {
  return (
    <Container>
      <Block>
        <List>
          <Item>
            <Select />
          </Item>
          <Item>
            <Select />
          </Item>
          <Item>
            <Select />
          </Item>
          <Item>
            <Select />
          </Item>
        </List>
      </Block>
    </Container>
  );
}
