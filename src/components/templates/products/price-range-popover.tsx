/* eslint-disable react/no-array-index-key */
import {useEffect, useRef, useState} from 'react';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import Slider from 'rc-slider';

import {IconChevronDown, IconChevronUp, IconTrash} from '@/assets';
import {Button} from '@/components/atoms';
import {useUpdateSearchParam} from '@/hooks';

import 'rc-slider/assets/index.css';

const PriceRangePopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState([0, 0]);
  const updateSearchParams = useUpdateSearchParam();
  const companyRatingRef = useRef<HTMLDivElement>(null);
  const isApplied = selectedRating[0] !== 0 || selectedRating[1] !== 0;

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (companyRatingRef.current && !companyRatingRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={companyRatingRef}
      className={css({
        position: 'relative',
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
        {isApplied ? (
          <div
            className={css({
              w: '1.5',
              h: '1.5',
              rounded: 'full',
              bg: 'red',
            })}
          />
        ) : null}
        Price Range
        {isOpen ? <IconChevronUp fill='#333333' /> : <IconChevronDown fill='#333333' />}
      </button>

      {isOpen ? (
        <div
          className={css({
            bg: 'white',
            position: 'absolute',
            w: '256px',
            h: 'max',
            border: `1px solid #E3E3E3`,
            p: '6',
          })}
        >
          <div
            className={css({
              w: 'full',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <h3
              className={css({
                textStyle: 'headline3',
                color: '#333333',
              })}
            >
              Price Range
            </h3>
            {isApplied ? (
              <button
                className={css({
                  cursor: 'pointer',
                  scale: '75%',
                })}
                type='button'
                onClick={() => setSelectedRating([0, 0])}
              >
                <IconTrash fill='#292D32' />
              </button>
            ) : null}
          </div>
          {selectedRating ? (
            <p
              className={css({
                textStyle: 'headline6',
                color: '#333333',
              })}
            >
              ${selectedRating[0]} - ${selectedRating[1]}
            </p>
          ) : null}
          <Box mt='4'>
            <Slider
              range
              min={0}
              max={10000}
              onChange={values => setSelectedRating(values as number[])}
              value={selectedRating}
            />
          </Box>
          <Button
            visual='outlined'
            className={css({
              rounded: 0,
              borderColor: '#E3E3E3',
              w: 'full',
              mt: '4',
              mx: 'auto',
            })}
            onClick={() => {
              updateSearchParams({
                lowPrice: selectedRating[0].toString(),
                highPrice: selectedRating[1].toString(),
              });
            }}
          >
            Apply
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default PriceRangePopover;
