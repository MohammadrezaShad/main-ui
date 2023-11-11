import {IconChevronDown, IconGlobal} from '@/assets';
import {css} from '@styled/css';
import Select, {SingleValueProps, components} from 'react-select';

const IndicatorSeparator = ({innerProps}: any) => {
  return <span style={{display: 'none'}} {...innerProps} />;
};
const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <IconChevronDown className={css({fill: '#333333'})} />
    </components.DropdownIndicator>
  );
};

const ValueContainer = ({children, ...props}: any) => {
  return (
    components.ValueContainer && (
      <components.ValueContainer
        className={css({
          gap: 3,
        })}
        {...props}
      >
        {!!children && (
          <IconGlobal
            className={css({
              w: 6,
              h: 6,
              gridArea: '1 / 1 / 2 / 2',
            })}
          />
        )}
        {children}
      </components.ValueContainer>
    )
  );
};
const SingleValue = ({children, ...props}: SingleValueProps<any>) => (
  <components.SingleValue
    className={css({
      gridArea: '1 / 2 / 2 / 3 !important',
    })}
    {...props}
  >
    {children}
  </components.SingleValue>
);

const SmallSelect = ({options}: {options: Array<any>}) => {
  return (
    <Select
      styles={{
        control: (baseStyles: any, state: any) => ({
          ...baseStyles,
          border: state.isFocused ? '1px solid #6E7072' : 0,
          backgroundColor: '#F7F7F7',
          cursor: 'pointer',
        }),
      }}
      defaultValue={options[0]}
      options={options}
      components={{SingleValue, IndicatorSeparator, DropdownIndicator, ValueContainer}}
    />
  );
};

export default SmallSelect;
