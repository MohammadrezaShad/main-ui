/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {useEffect, useRef, useState} from 'react';
import {css, cx} from '@styled/css';
import {SystemStyleObject} from '@styled/types';

import {IconChevronDown} from '@/assets';

export type Option = {
  id: string;
  value: string;
  label: string;
};

type AsyncSelectProps = {
  loadOptions: (inputValue: string) => Promise<Option[]>;
  /** For single: Option | null; for multi: Option[] */
  onChange: (value: any | Option | Option[]) => void;
  placeholder?: string;
  defaultOptions?: boolean;
  className?: SystemStyleObject;
  isMulti?: boolean;
  /** Disable interactions */
  isDisabled?: boolean;
  /** Initial selected value(s) (won’t trigger onChange). */
  defaultValue?: Option | Option[] | null;
};

const AsyncSelect = ({
  loadOptions,
  onChange,
  className,
  defaultOptions,
  placeholder,
  isMulti = false,
  isDisabled = false,
  defaultValue = null,
}: AsyncSelectProps) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // selection state
  const [selected, setSelected] = useState<Option | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<Option[]>([]);

  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const didApplyDefault = useRef(false);
  const didMount = useRef(false);

  // Apply defaultValue once on mount (or when remounted via key)
  useEffect(() => {
    if (didApplyDefault.current) return;
    didApplyDefault.current = true;

    if (defaultValue) {
      if (isMulti && Array.isArray(defaultValue)) {
        // de-dup
        const uniq = defaultValue.filter((v, i, arr) => arr.findIndex(t => t.id === v.id) === i);
        setSelectedMulti(uniq);
      } else if (!isMulti && !Array.isArray(defaultValue)) {
        setSelected(defaultValue);
        setInputValue(defaultValue.label);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close menu when disabled toggles on
  useEffect(() => {
    if (isDisabled) setIsOpen(false);
  }, [isDisabled]);

  // Load default options once
  useEffect(() => {
    if (defaultOptions && !didMount.current) {
      didMount.current = true;
      (async () => {
        setLoading(true);
        try {
          const initial = await loadOptions('');
          setOptions(initial);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [defaultOptions, loadOptions]);

  // Debounced async load on input changes
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const results = await loadOptions(inputValue);
        setOptions(results);
      } finally {
        setLoading(false);
      }
    };

    const t = setTimeout(() => {
      if (inputValue) fetchOptions();
      if (!inputValue && defaultOptions && options.length === 0) {
        (async () => {
          setLoading(true);
          try {
            const initial = await loadOptions('');
            setOptions(initial);
          } finally {
            setLoading(false);
          }
        })();
      }
    }, 300);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, loadOptions]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const commitSingle = (opt: Option) => {
    if (isDisabled) return;
    setSelected(opt);
    setInputValue(opt.label);
    setIsOpen(false);
    onChange(opt);
  };

  const commitMultiAdd = (opt: Option) => {
    if (isDisabled) return;
    if (selectedMulti.find(o => o.id === opt.id)) return;
    const next = [...selectedMulti, opt];
    setSelectedMulti(next);
    onChange(next);
    setInputValue('');
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const removeChip = (id: string) => {
    if (isDisabled) return;
    const next = selectedMulti.filter(o => o.id !== id);
    setSelectedMulti(next);
    onChange(next.length ? next : []);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    if (isMulti && inputValue === '' && selectedMulti.length > 0 && e.key === 'Backspace') {
      e.preventDefault();
      const next = selectedMulti.slice(0, -1);
      setSelectedMulti(next);
      onChange(next.length ? next : []);
    }
  };

  // Hide already-selected options in multi mode
  const renderOptions = isMulti
    ? options.filter(o => !selectedMulti.some(s => s.id === o.id))
    : options;

  const openMenu = () => {
    if (isDisabled) return;
    setIsOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div
      ref={selectRef}
      aria-disabled={isDisabled}
      className={css({position: 'relative', width: 'full', opacity: isDisabled ? 0.6 : 1})}
    >
      {/* Control */}
      <div
        className={cx(
          css({
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2',
            minH: '12',
            w: 'full',
            p: '2',
            rounded: 'md',
            border: '1px solid token(colors.gray3)',
            cursor: isDisabled ? 'not-allowed' : 'text',
            background: isDisabled ? 'token(colors.gray.50)' : 'white',
          }),
        )}
        onClick={openMenu}
      >
        {/* Chips for multi */}
        {isMulti &&
          selectedMulti.map(opt => (
            <span
              key={opt.id}
              className={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1',
                bg: 'token(colors.gray.100)',
                rounded: 'sm',
                px: '2',
                py: '1',
                fontSize: 'sm',
              })}
            >
              {opt.label}
              <button
                type='button'
                aria-label={`Remove ${opt.label}`}
                onClick={e => {
                  e.stopPropagation();
                  removeChip(opt.id);
                }}
                disabled={isDisabled}
                className={css({
                  ml: '1',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  color: 'gray.500',
                  _hover: {color: 'gray.700'},
                })}
              >
                ×
              </button>
            </span>
          ))}

        {/* Input */}
        <input
          ref={inputRef}
          type='text'
          disabled={isDisabled}
          value={isMulti ? inputValue : inputValue || (selected?.label ?? '')}
          onChange={e => {
            if (isDisabled) return;
            if (!isMulti && selected && e.target.value !== selected.label) {
              setSelected(null);
              onChange(null);
            }
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => openMenu()}
          onKeyDown={handleBackspace}
          placeholder={
            (!isMulti && !selected) || (isMulti && selectedMulti.length === 0)
              ? placeholder
              : undefined
          }
          className={css({
            flex: '1',
            minW: '80px',
            border: 'none',
            outline: 'none',
            h: '8',
            bg: 'transparent',
          })}
        />

        <IconChevronDown
          onClick={(e: {stopPropagation: () => void}) => {
            e.stopPropagation();
            if (isDisabled) return;
            setIsOpen(o => !o);
            inputRef.current?.focus();
          }}
          className={css({
            fill: 'gray.400',
            position: 'absolute',
            right: '2',
            top: '50%',
            transform: `translateY(-50%)${isOpen ? ' rotate(-180deg)' : ''}`,
            transition: 'transform 0.2s ease-in-out',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            pointerEvents: isDisabled ? 'none' : 'auto',
          })}
        />
      </div>

      {/* Menu */}
      {isOpen && !isDisabled && (
        <ul
          role='listbox'
          aria-multiselectable={isMulti}
          className={css({
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            overflowY: 'auto',
            bg: 'white',
            border: '1px solid token(colors.gray.200)',
            rounded: 'md',
            mt: '1',
            zIndex: '10',
            boxShadow: 'md',
            maxH: '60',
            maxHeight: '250px',
          })}
        >
          {loading ? (
            <li className={css({p: '2', textAlign: 'center'})}>Loading...</li>
          ) : renderOptions.length === 0 ? (
            <li className={css({p: '2', color: 'gray.500'})}>No options</li>
          ) : (
            renderOptions.map(option => (
              <li
                key={option.id}
                role='option'
                aria-selected={false}
                tabIndex={0}
                onClick={() => {
                  if (isMulti) commitMultiAdd(option);
                  else commitSingle(option);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (isMulti) commitMultiAdd(option);
                    else commitSingle(option);
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
