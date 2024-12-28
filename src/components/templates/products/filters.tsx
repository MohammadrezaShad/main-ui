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
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #E3E3E3',
        px: '9',
        py: '4',
        mx: '6',
        gap: '8',
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
  );
};

export default Filters;
