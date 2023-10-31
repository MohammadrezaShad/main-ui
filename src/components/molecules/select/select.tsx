/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import ReactSelect, {
  components as SelectComponents,
  DropdownIndicatorProps,
  Props,
} from 'react-select';
import {css, cx} from '@styled/css';
import {token} from '@styled/tokens';

import {IconChevronDown, IconChevronUp} from '@/assets';

import {Container} from './select.styled';

interface SelectProps extends Props {
  label?: string;
}

function DropdownIndicator(props: DropdownIndicatorProps) {
  const {selectProps} = props;
  return (
    <SelectComponents.DropdownIndicator {...props}>
      {selectProps.menuIsOpen ? <IconChevronUp /> : <IconChevronDown />}
    </SelectComponents.DropdownIndicator>
  );
}

export default function Select({
  className,
  isRtl = true,
  isSearchable = false,
  noOptionsMessage = () => 'موردی یافت نشد',
  placeholder = 'انتخاب کنید...',
  options,
  label,
  maxMenuHeight = 358,
  styles = {
    control: (base, state) => ({
      ...base,
      zIndex: '100',
      borderRadius: token('radii.xl'),
      borderColor: token('colors.strokeSecondary'),
      cursor: 'pointer',
      boxShadow: 'none',
      '&:hover': {
        borderColor: token('colors.strokeSecondary'),
        boxShadow: 'none',
      },
      '&:focus': {
        borderColor: token('colors.strokeSecondary'),
        boxShadow: 'none',
      },
    }),
    placeholder: base => ({
      ...base,
      fontSize: '14px', // change the font size of the placeholder
    }),
    singleValue: base => ({
      ...base,
      color: token('colors.text.primary'), // change the text color of the single value
      fontSize: '14px', // change the font size of the placeholder
      paddingTop: '2px', // change the padding of the single value
    }),
    menu: base => ({
      ...base,
      zIndex: '100',
      borderRadius: token('radii.xl'), // change the border radius of the menu
      padding: token('spacing.2'),
      boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.24)',
    }),
    menuList: base => ({
      ...base,
      // add custom CSS for the scroll bar
      '::-webkit-scrollbar': {
        width: '4px', // change the width of the scroll bar
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1', // change the background color of the track
        borderRadius: '5px', // change the border radius of the thumb
      },
      '::-webkit-scrollbar-thumb': {
        background: '#E0E0E0', // change the background color of the thumb
        borderRadius: '5px', // change the border radius of the thumb
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#E1E1E1', // change the background color of the thumb when hovered
      },
    }),
    option: (base, state) => ({
      ...base,
      display: 'flex',
      color: state.isSelected ? token('colors.secondary') : token('colors.text.primary'), // change the text color depending on the selection state
      background: state.isSelected ? '#EFF0F2' : '#ffffff', // change the background color depending on the selection state
      borderRadius: token('radii.xl'),
      paddingRight: token('spacing.4'),
      paddingLeft: token('spacing.4'),
      paddingTop: token('spacing.2'),
      height: '38px',
      cursor: 'pointer',
      '&:hover': {
        background: '#EFF0F2', // change the background color when hovered
      },
    }),
  },
  components = {
    DropdownIndicator,
    IndicatorSeparator: () => null,
  },
  ...otherProps
}: SelectProps) {
  const defaultClassName = css({w: '100%'});
  const selectClass = cx(defaultClassName, className);

  return (
    <Container className={selectClass}>
      {label ? (
        <label className={css({display: 'flex', pb: '4px', textStyle: 'body'})}>{label}</label>
      ) : null}
      <ReactSelect
        isSearchable={isSearchable}
        isRtl={isRtl}
        noOptionsMessage={noOptionsMessage}
        placeholder={placeholder}
        styles={styles}
        options={options}
        components={components}
        maxMenuHeight={maxMenuHeight}
        {...otherProps}
      />
    </Container>
  );
}
