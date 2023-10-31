'use client';

import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';

import {Checkbox, DropdownDrawer, Select} from '@/components';

import {Block, Box, Container, Item, Label, List} from './media-filters.styled';

interface Option {
  value: string;
  label: string;
}
const options = [
  {value: 'all', label: 'all'},
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'},
];

export default function MediaFilters() {
  const selectClassName = css({hideBelow: 'md'});
  const drawerClassName = css({hideFrom: 'md'});
  const filters$ = useObservable({
    category: options[0],
    genre: options[0],
    lang: options[0],
    sort: options[0],
  });
  const filters = filters$.use();

  const onChange = (key: keyof typeof filters, value: Option) => {
    filters$.set({...filters, [key]: value});
  };

  return (
    <Container>
      <Block>
        <Box>
          <Checkbox id='exclusive' />
          <Label htmlFor='exclusive'>اختصاصی</Label>
        </Box>
        <Box>
          <Checkbox id='news' />
          <Label htmlFor='news'>اخبار روز</Label>
        </Box>
      </Block>
      <Block>
        <List>
          <Item>
            <Select label='دسته بندی' className={selectClassName} options={options} />
            <DropdownDrawer
              label='دسته بندی'
              className={drawerClassName}
              options={options}
              onChange={value => onChange('category', value as Option)}
            />
          </Item>
          <Item>
            <Select
              label='ژانر'
              className={selectClassName}
              options={options}
              onChange={value => onChange('genre', value as Option)}
            />
            <DropdownDrawer
              label='ژانر'
              className={drawerClassName}
              options={options}
              onChange={value => onChange('genre', value as Option)}
            />
          </Item>
          <Item>
            <Select
              label='زبان'
              className={selectClassName}
              options={options}
              onChange={value => onChange('lang', value as Option)}
            />
            <DropdownDrawer
              label='زبان'
              className={drawerClassName}
              options={options}
              onChange={value => onChange('lang', value as Option)}
            />
          </Item>
          <Item>
            <Select
              label='مرتب سازی'
              className={selectClassName}
              options={options}
              onChange={value => onChange('sort', value as Option)}
            />
            <DropdownDrawer
              label='مرتب سازی'
              className={drawerClassName}
              options={options}
              onChange={value => onChange('sort', value as Option)}
            />
          </Item>
        </List>
      </Block>
    </Container>
  );
}
