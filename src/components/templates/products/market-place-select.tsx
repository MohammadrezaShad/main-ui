'use client';

import {useEffect, useMemo, useState} from 'react';
import {css} from '@styled/css';
import {Flex} from '@styled/jsx';

import {IconChevronDown} from '@/assets';
import {createProductRedirect, ProductRedirectTypeEnum, ProductType} from '@/graphql';

interface Props {
  product: ProductType;
}

type MarketItem = {
  label: string;
  type: ProductRedirectTypeEnum | 'Website';
  url: string;
};

const normalizeUrl = (u?: string | null) =>
  u && !/^https?:\/\//i.test(u) ? `https://${u}` : u || '';

export const MarketplaceSelect = ({product}: Props) => {
  const [selectedType, setSelectedType] = useState<string>('');

  const callNumber = product?.callNumber?.trim() || '';

  const marketplaces: MarketItem[] = useMemo(() => {
    const items: MarketItem[] = [
      {
        label: 'Amazon',
        type: ProductRedirectTypeEnum.Amazon,
        url: normalizeUrl(product?.amazon),
      },
      {
        label: 'eBay',
        type: ProductRedirectTypeEnum.Ebay,
        url: normalizeUrl(product?.eBay),
      },
      {
        label: 'Walmart',
        type: ProductRedirectTypeEnum.Wallmart,
        url: normalizeUrl(product?.wallmart),
      },
      {
        label: 'Website',
        type: 'Website',
        url: normalizeUrl((product as any)?.website),
      },
    ];

    return items.filter(x => Boolean(x.url));
  }, [product]);

  const selectedItem = marketplaces.find(m => String(m.type) === selectedType) || null;

  // Default select: pick the first available marketplace when data arrives/changes
  useEffect(() => {
    if (!marketplaces.length) {
      setSelectedType('');
      return;
    }

    setSelectedType(prev => {
      // keep current selection if still valid
      const stillValid = marketplaces.some(m => String(m.type) === prev);
      return stillValid ? prev : String(marketplaces[0].type);
    });
  }, [marketplaces]);

  const handleBuy = async () => {
    if (!selectedItem) return;

    // Log redirect (ignore failures)
    try {
      await createProductRedirect({
        company: product.sellerCompany._id,
        product: product._id,
        type: selectedItem.type as any,
      } as any);
    } catch {
      // ignore
    }

    window.open(selectedItem.url, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    if (!callNumber) return;
    window.open(`tel:${callNumber}`, '_self');
  };

  // If nothing to show on mobile, render nothing
  if (!marketplaces.length && !callNumber) return null;

  return (
    <Flex hideFrom='md' gap={4} mb={6} flexWrap='wrap'>
      {/* Marketplace dropdown */}
      {marketplaces.length ? (
        <div className={css({position: 'relative', w: 'full', flex: '1 1 220px'})}>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
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
              bgColor: 'white',
            })}
          >
            {marketplaces.map(({label, type}) => (
              <option key={String(type)} value={String(type)}>
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
      ) : null}

      {/* Buy button */}
      {marketplaces.length ? (
        <button
          type='button'
          onClick={handleBuy}
          disabled={!selectedItem}
          className={css({
            justifyContent: 'center',
            alignSelf: 'center',
            px: '6',
            py: '3',
            fontSize: 'base',
            lineHeight: 'base',
            color: 'white',
            bgColor: 'sky.400',
            h: '[48px]',
            opacity: selectedItem ? 1 : 0.5,
            cursor: selectedItem ? 'pointer' : 'not-allowed',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            flex: '0 0 auto',
          })}
        >
          Buy
        </button>
      ) : null}

      {/* Call seller button */}
      {callNumber ? (
        <button
          type='button'
          onClick={handleCall}
          className={css({
            justifyContent: 'center',
            alignSelf: 'center',
            px: '6',
            py: '3',
            fontSize: 'base',
            lineHeight: 'base',
            color: 'white',
            bgColor: 'gray.600',
            h: '[48px]',
            cursor: 'pointer',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            flex: '0 0 auto',
          })}
        >
          Call Seller
        </button>
      ) : null}
    </Flex>
  );
};
