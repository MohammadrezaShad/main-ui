'use client';

import {useEffect, useState} from 'react';
import {css} from '@styled/css';
import {useSearchParams} from 'next/navigation';
import {useDebounce} from 'use-debounce';

import {IconSearch} from '@/assets';
import {useUpdateSearchParam} from '@/hooks';

function SearchInput() {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParam();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [debouncedSearch] = useDebounce(searchValue, 500);

  useEffect(() => {
    updateSearchParams('search', debouncedSearch);
  }, [debouncedSearch, updateSearchParams]);
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        maxW: 'md',
        borderWidth: '1px',
        borderColor: 'gray.300',
        rounded: '0',
        _focusWithin: {ring: 'none', ringOffset: 'none', shadow: '1'},
        h: '12',
        mx: '6',
        p: '2',
      })}
    >
      <IconSearch className={css({stroke: 'gray3'})} />
      <input
        type='text'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder='Search products...'
        className={css({
          _focusWithin: {ring: 'none', ringOffset: 'none', shadow: '1'},
        })}
      />
    </div>
  );
}

export default SearchInput;
