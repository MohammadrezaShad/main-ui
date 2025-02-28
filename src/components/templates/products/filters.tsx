import {useEffect, useRef, useState} from 'react';
import {css} from '@styled/css';
import {useSearchParams} from 'next/navigation';

import {Button} from '@/components/atoms';
import {useUpdateSearchParam} from '@/hooks';

import CompanyRatingPopover from './company-rating-popover';
import PriceRangePopover from './price-range-popover';
import RatingPopover from './product-rating-popover';

const Filters = () => {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParam();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div
        className={css({
          hideFrom: 'md',
          border: '1px solid #E3E3E3',
          p: '6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        })}
      >
        <div
          ref={popoverRef}
          className={css({
            bg: 'white',
            px: '6',
          })}
        >
          <button
            className={css({
              textStyle: 'body',
              color: '#333333',
              display: 'flex',
              alignItems: 'center',
              gap: '2',
            })}
            onClick={handleToggle}
            type='button'
          >
            Filters
          </button>

          {isOpen ? (
            <div
              className={css({
                bg: 'white',
                position: 'absolute',
                w: 'full',
                h: 'max',
                border: `1px solid #E3E3E3`,
                p: '6',
                zIndex: '10',
                display: 'flex',
                flexDirection: 'column',
                gap: '4',
                left: '0',
              })}
            >
              <RatingPopover />
              <CompanyRatingPopover />
              <PriceRangePopover />
            </div>
          ) : null}
        </div>

        {searchParams.size ? (
          <Button
            visual='outlined'
            className={css({
              rounded: 0,
              borderColor: '#E3E3E3',
              ml: 'auto',
            })}
            onClick={() => {
              updateSearchParams({
                categories: '',
                city: '',
                minimumCompanyRating: '',
                minimumProductRating: '',
                lowPrice: '',
                highPrice: '',
              });
            }}
          >
            Reset Filters
          </Button>
        ) : null}
      </div>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #E3E3E3',
          px: {base: '4', md: '9'},
          py: '4',
          mx: {base: '2', md: '6'},
          gap: {base: '4', md: '8'},
          flexWrap: {base: 'wrap', md: 'nowrap'},
          hideBelow: 'md',
        })}
      >
        <RatingPopover />
        <CompanyRatingPopover />
        <PriceRangePopover />

        {searchParams.size ? (
          <Button
            visual='outlined'
            className={css({
              rounded: 0,
              borderColor: '#E3E3E3',
              ml: 'auto',
            })}
            onClick={() => {
              updateSearchParams({
                categories: '',
                city: '',
                minimumCompanyRating: '',
                minimumProductRating: '',
                lowPrice: '',
                highPrice: '',
              });
            }}
          >
            Reset Filters
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default Filters;
