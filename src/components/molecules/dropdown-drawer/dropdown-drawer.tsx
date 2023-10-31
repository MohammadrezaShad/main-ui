/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import dynamic from 'next/dynamic';

import {IconChevronDown, IconChevronUp, IconClose} from '@/assets';

import {
  Container,
  DrawerContainer,
  Item,
  List,
  Select,
  SelectIcon,
  SelectText,
  Title,
  TitleText,
} from './dropdown-drawer.styled';

const Drawer = dynamic(() => import('@/components/molecules/drawer'), {ssr: false});

interface Option {
  value: string;
  label: string;
}

interface SearchDrawerProps {
  label?: string;
  className?: string;
  options: Option[];
  onChange: (value: Option) => void;
}

export default function SearchDrawer({label, className, options, onChange}: SearchDrawerProps) {
  const isOpen$ = useObservable(false);
  const selectedOption$ = useObservable<Option>(options[0]);

  const isOpen = isOpen$.use();
  const selectedOption = selectedOption$.use();

  const onClose = () => {
    isOpen$.set(false);
  };

  const onChangeOption = (inputOption: Option) => {
    selectedOption$.set(inputOption);
    onChange(inputOption);
    onClose();
  };

  return (
    <Container className={className}>
      {label ? (
        <label className={css({display: 'flex', pb: '4px', textStyle: 'body'})}>{label}</label>
      ) : null}
      <Select onClick={() => isOpen$.set(true)}>
        <SelectText>{selectedOption.label}</SelectText>
        <SelectIcon>{isOpen ? <IconChevronUp /> : <IconChevronDown />}</SelectIcon>
      </Select>
      <Drawer
        open={isOpen}
        onClose={onClose}
        placement='bottom'
        className={css({roundedTop: 'xl'})}
      >
        <DrawerContainer>
          <Title>
            <TitleText>{label}</TitleText>
            <IconClose onClick={onClose} />
          </Title>
          <List>
            {options.map(option => (
              <Item
                onClick={() => onChangeOption(option)}
                key={option.value}
                active={option.value === selectedOption.value}
              >
                {option.label}
              </Item>
            ))}
          </List>
        </DrawerContainer>
      </Drawer>
    </Container>
  );
}
