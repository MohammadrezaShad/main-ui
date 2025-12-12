/* eslint-disable react/no-array-index-key */
import {useEffect, useRef, useState} from 'react';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';

import {IconChevronDown, IconChevronUp, IconStar, IconTrash} from '@/assets';
import {Button} from '@/components/atoms';
import {Ratings, Star} from '@/components/molecules/corporate-card/corporate-card.styled';
import {useUpdateSearchParam} from '@/hooks';

const RatingPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const updateSearchParams = useUpdateSearchParam();
  const popoverRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={popoverRef}
      className={css({
        position: 'relative',
        bg: 'white',
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
        {selectedRating ? (
          <div
            className={css({
              w: '1.5',
              h: '1.5',
              rounded: 'full',
              bg: 'red',
            })}
          />
        ) : null}
        Product Rating
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
            zIndex: '10',
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
              Product Rating
            </h3>
            {selectedRating ? (
              <button
                className={css({
                  cursor: 'pointer',
                  scale: '75%',
                })}
                type='button'
                onClick={() => updateSearchParams('minimumProductRating', '')}
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
              {selectedRating} star
            </p>
          ) : null}
          <Box mt='4'>
            <Ratings>
              {[...Array(5)].map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <button
                  className={css({
                    cursor: 'pointer',
                  })}
                  type='button'
                  key={index}
                  onClick={() => setSelectedRating(index + 1)}
                >
                  <Star bgColor={index < selectedRating ? 'primary' : 'gray3'}>
                    <IconStar
                      className={css({
                        w: '4',
                        h: '4',
                        color: 'white',
                      })}
                    />
                  </Star>
                </button>
              ))}
            </Ratings>
          </Box>
          <Button
            visual='outlined'
            className={css({
              borderRadius: '8px',
              borderColor: '#E3E3E3',
              w: 'full',
              mt: '4',
              mx: 'auto',
            })}
            onClick={() => updateSearchParams('minimumProductRating', selectedRating.toString())}
          >
            Apply
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default RatingPopover;
