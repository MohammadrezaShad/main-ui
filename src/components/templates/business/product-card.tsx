import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import Link from 'next/link';

import {IconChevronRight, IconDrop, IconLocation, IconStar} from '@/assets';
import {Button} from '@/components/atoms';

interface ProductCardProps {
  title: string;
  company: string;
  rating: number;
  waterRating: number;
  price: string;
  location: string;
  keywords: string[];
  onCallClick: () => void;
  onWebsiteClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  company,
  rating,
  waterRating,
  price,
  location,
  keywords,
  onCallClick,
  onWebsiteClick,
}) => (
  <div
    className={css({
      borderWidth: '1px',
      backgroundColor: 'white',
      borderColor: 'gray3',
    })}
  >
    <div
      className={css({
        mb: '2',
        bgColor: 'text.primary',
        display: 'flex',
        alignItems: 'end',
        flexWrap: 'wrap',
        gap: '2',
        height: '[170px]',
        p: '2',
      })}
    >
      {keywords.map(keyword => (
        <span
          key={keyword}
          className={css({
            bgColor: 'success',
            color: 'white',
            rounded: 'md',
            p: '1',
            textStyle: 'captionB',
            w: 'fit',
          })}
        >
          {keyword}
        </span>
      ))}
    </div>
    <div className={css({p: '4'})}>
      <h3 className={css({textStyle: 'headline4', color: 'text.primary', mb: '2'})}>{title}</h3>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        })}
      >
        <div className={css({display: 'flex', alignItems: 'center', gap: '3'})}>
          <p className={css({textStyle: 'caption', color: 'text.primary'})}>{company}</p>
          <div className={css({display: 'flex', alignItems: 'center', gap: '2'})}>
            <IconStar className={css({w: '4', h: '4', color: 'gray4'})} />
            <p className={css({textStyle: 'caption', color: 'text.primary'})}>{rating}/5</p>
          </div>
        </div>
        <Link href='/'>
          <IconChevronRight className={css({w: '6', h: '6', color: 'gray4'})} />
        </Link>
      </div>
      <div className={css({display: 'flex', alignItems: 'center', gap: '2', my: '4'})}>
        <IconDrop className={css({w: '6', h: '6'})} />
        <p className={css({textStyle: 'body', color: 'gray4'})}>{waterRating}/10</p>
      </div>
      <div className={css({textStyle: 'headline4', color: 'primary'})}>{price}</div>
      <div className={css({w: 'full', h: '1px', bgColor: 'gray3', my: '4'})} />
      <div className={css({display: 'flex', alignItems: 'center', gap: '2'})}>
        <IconLocation className={css({w: '6', h: '6', color: 'gray4'})} />
        <p className={css({fontSize: 'sm', color: 'gray.600'})}>{location}</p>
      </div>
      <Box display='flex' gap={4} mt={6}>
        <Button
          className={css({
            bgColor: 'transparent',
            borderRadius: 0,
            border: '1px solid #E3E3E3',
            color: '#6E7072',
            w: '1/2',
          })}
        >
          Call
        </Button>
        <Button
          className={css({
            bgColor: 'transparent',
            borderRadius: 0,
            border: '1px solid #E3E3E3',
            color: '#6E7072',
            w: '1/2',
          })}
        >
          Website
        </Button>
      </Box>
    </div>
  </div>
);

export default ProductCard;
