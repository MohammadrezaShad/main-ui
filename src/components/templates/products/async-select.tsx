import {useEffect, useRef, useState} from 'react';
import {css} from '@styled/css';

import {IconChevronDown} from '@/assets';

type Option = {
  id: string;
  value: string;
  label: string;
};

type AsyncSelectProps = {
  loadOptions: (inputValue: string) => Promise<Option[]>;
  onChange: (value: Option) => void;
  placeholder?: string;
  defaultOptions?: boolean;
};

const AsyncSelect = ({loadOptions, onChange, defaultOptions, placeholder}: AsyncSelectProps) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (defaultOptions && isInitialMount.current) {
      isInitialMount.current = false;
      const fetchDefaultOptions = async () => {
        setLoading(true);
        try {
          const initialOptions = await loadOptions('');
          setOptions(initialOptions);
        } finally {
          setLoading(false);
        }
      };
      fetchDefaultOptions();
    }
  }, [defaultOptions, loadOptions]);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      const results = await loadOptions(inputValue);
      setOptions(results);
      setLoading(false);
    };

    const debounceTimer = setTimeout(() => {
      if (inputValue) {
        fetchOptions();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [inputValue, loadOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className={css({position: 'relative', width: 'full'})}>
      <input
        type='text'
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={css({
          width: 'full',
          p: '2',
          border: 'none',
          rounded: 'md',
          outline: 'none',
          _focus: {
            borderColor: 'token(colors.gray.400)',
          },
        })}
      />

      <IconChevronDown
        onClick={() => setIsOpen(true)}
        className={css({
          fill: 'gray.400',
          position: 'absolute',
          right: '2',
          top: '50%',
          transform: `translateY(-50%) ${isOpen ? 'rotate(-180deg)' : ''}`,
          transition: 'transform 0.2s ease-in-out',
          cursor: 'pointer',
        })}
      />

      {isOpen && (
        <ul
          className={css({
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            maxH: '60',
            overflowY: 'auto',
            bg: 'white',
            border: '1px solid token(colors.gray.200)',
            rounded: 'md',
            mt: '1',
            zIndex: '10',
            boxShadow: 'md',
            maxHeight: '250px',
          })}
        >
          {loading ? (
            <li className={css({p: '2', textAlign: 'center'})}>Loading...</li>
          ) : (
            options.map(option => (
              <li
                key={option.id}
                role='option'
                aria-selected={false}
                tabIndex={0}
                onClick={() => {
                  onChange(option);
                  setInputValue(option.label);
                  setIsOpen(false);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onChange(option);
                    setInputValue(option.label);
                    setIsOpen(false);
                  }
                }}
                className={css({
                  p: '2',
                  cursor: 'pointer',
                  _hover: {bg: 'token(colors.gray.100)'},
                })}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default AsyncSelect;
