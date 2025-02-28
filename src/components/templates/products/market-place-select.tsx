'use client';

import {useState} from 'react';
import {css} from '@styled/css';
import {Flex} from '@styled/jsx';
import Link from 'next/link';

import {IconChevronDown} from '@/assets';
import {ProductType} from '@/graphql';

interface Props {
  product: ProductType;
}

export const MarketplaceSelect = ({product}: Props) => {
  const [selectedMarketplace, setSelectedMarketplace] = useState('');

  const marketplaces = [
    {label: 'Amazon', value: product?.amazon},
    {label: 'eBay', value: product?.eBay},
    {label: 'Walmart', value: product?.wallmart},
  ].filter(item => item.value);

  return (
    <Flex gap={4} mb={6}>
      <div className={css({position: 'relative', w: 'full'})}>
        <select
          onChange={e => setSelectedMarketplace(e.target.value)}
          className={css({
            pl: '6',
            border: '1px solid',
            borderColor: 'sky.400',
            rounded: '0',
            outline: 'none',
            cursor: 'pointer',
            w: 'full',
            appearance: 'none',
            h: '[48px]',
          })}
        >
          <option value=''>Select Marketplace</option>
          {marketplaces.map(({label, value}) => (
            <option key={label} value={value as string}>
              {label}
            </option>
          ))}
        </select>
        <IconChevronDown
          className={css({
            position: 'absolute',
            right: '6',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            w: '5',
            h: '5',
            fill: '#333333',
          })}
        />
      </div>

      <Link
        href={selectedMarketplace}
        className={css({
          justifyContent: 'center',
          alignSelf: 'center',
          px: '6',
          py: '3',
          fontSize: 'base',
          lineHeight: 'base',
          color: 'white',
          bgColor: 'sky.400',
          cursor: selectedMarketplace ? 'pointer' : 'not-allowed',
          opacity: selectedMarketplace ? 1 : 0.5,
          h: '[48px]',
        })}
      >
        Buy
      </Link>
    </Flex>
  );
};
