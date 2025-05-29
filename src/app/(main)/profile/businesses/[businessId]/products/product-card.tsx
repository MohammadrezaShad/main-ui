import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import Link from 'next/link';

import {IconChevronRight, IconDrop, IconEyeOpen, IconRedirect, IconStar} from '@/assets';
import {ImageType} from '@/graphql';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

interface ProductCardProps {
  id: string;
  slug: string;
  title: string;
  thumbnail?: ImageType;
  company: string;
  rating: number;
  waterRating: number;
  price: string;
  businessId: string;
  keywords: string[];
  view: number;
  redirect: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  slug,
  title,
  thumbnail,
  company,
  rating,
  waterRating,
  price,
  businessId,
  keywords,
  view,
  redirect,
}) => (
  <div
    className={css({
      borderWidth: '1px',
      backgroundColor: 'white',
      borderColor: 'gray3',
      width: '100%',
    })}
  >
    <div
      style={{
        backgroundImage: thumbnail
          ? `url(${IMAGE_STORAGE_URL}/${thumbnail?.filename}-${thumbnail?._id})`
          : '',
        backgroundColor: thumbnail ? '' : '#333333',
      }}
      className={css({
        mb: '2',
        bgRepeat: 'no-repeat',
        bgPosition: 'center',
        bgSize: 'cover',
        display: 'flex',
        alignItems: 'end',
        overflow: 'hidden',
        gap: '0.5',
        height: '[170px]',
        p: '2',
      })}
    >
      {keywords?.slice(0, 3)?.map(keyword => (
        <span
          key={keyword}
          className={css({
            bgColor: 'success',
            color: 'white',
            rounded: 'md',
            p: '1',
            textStyle: 'captionB',
            w: 'fit',
            fontSize: '8px',
          })}
        >
          {keyword}
        </span>
      ))}
    </div>
    <div className={css({p: '4'})}>
      <Link
        role='heading'
        aria-roledescription='product title'
        href={`/profile/businesses/${businessId}/products/${id}/edit`}
        className={css({textStyle: 'headline4', color: 'text.primary', mb: '2'})}
      >
        {title}
      </Link>
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
        <Link href={`/products/${slug}`}>
          <IconChevronRight className={css({w: '6', h: '6', color: 'gray4'})} />
        </Link>
      </div>
      <div className={css({display: 'flex', alignItems: 'center', gap: '2', my: '4'})}>
        <IconDrop className={css({w: '6', h: '6'})} />
        <p className={css({textStyle: 'body', color: 'gray4'})}>{waterRating}/10</p>
      </div>
      <div className={css({textStyle: 'headline4', color: 'primary'})}>${price}</div>

      <div className={css({w: 'full', h: '1px', bgColor: 'gray3', my: '4'})} />
      <Box display='flex' gap={4} mt={6}>
        <div className={css({w: 'full', display: 'flex', alignItems: 'center', gap: '2'})}>
          <IconEyeOpen className={css({w: '6', h: '6', color: 'gray4'})} />
          <p className={css({fontSize: 'sm', color: 'gray.600'})}>{view}</p>
        </div>
        <div className={css({w: 'full', display: 'flex', alignItems: 'center', gap: '2'})}>
          <IconRedirect className={css({w: '6', h: '6', color: 'gray4'})} />
          <p className={css({fontSize: 'sm', color: 'gray.600'})}>{redirect}</p>
        </div>
      </Box>
    </div>
  </div>
);

export default ProductCard;
