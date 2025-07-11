import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import Link from 'next/link';

import {IconChevronRight, IconDrop, IconLocation, IconStar} from '@/assets';
import {Button} from '@/components/atoms';
import {createCompanyCallNumber, createCompanyLocationClick, ImageType, Maybe} from '@/graphql';
import {openMapSelector} from '@/utils';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

interface ProductCardProps {
  id: string;
  title: string;
  thumbnail?: ImageType;
  company: string;
  companyId: string;
  rating: number;
  waterRating: number;
  price: string;
  location: string;
  keywords: string[];
  phoneNumber: string;
  sellerCompanyId: string;
  website: string;
  coords: {
    lat?: Maybe<number> | undefined;
    lng?: Maybe<number> | undefined;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  thumbnail,
  company,
  companyId,
  rating,
  waterRating,
  price,
  location,
  keywords,
  phoneNumber,
  sellerCompanyId,
  website,
  coords,
}) => {
  const handleCreateCall = async (companyId: string, callNumber: string) => {
    await createCompanyCallNumber({
      company: sellerCompanyId,
    });
    window.open(`tel:${callNumber}`, '_self');
  };
  const handleCreateLocationClick = async () => {
    await createCompanyLocationClick({
      company: sellerCompanyId,
    });
    openMapSelector(coords?.lat, coords?.lng);
  };
  return (
    <div
      className={css({
        borderWidth: '1px',
        backgroundColor: 'white',
        borderColor: 'gray3',
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
          href={`/products/${id}`}
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
            <Link
              href={`/business/${companyId}`}
              className={css({textStyle: 'caption', color: 'text.primary'})}
            >
              {company}
            </Link>
            <div className={css({display: 'flex', alignItems: 'center', gap: '2'})}>
              <IconStar className={css({w: '4', h: '4', color: 'gray4'})} />
              <p className={css({textStyle: 'caption', color: 'text.primary'})}>{rating}/5</p>
            </div>
          </div>
          <Link href={`/products/${id}`}>
            <IconChevronRight className={css({w: '6', h: '6', color: 'gray4'})} />
          </Link>
        </div>
        <div className={css({display: 'flex', alignItems: 'center', gap: '2', my: '4'})}>
          <IconDrop className={css({w: '6', h: '6'})} />
          <p className={css({textStyle: 'body', color: 'gray4'})}>{waterRating}/10</p>
        </div>
        <div className={css({textStyle: 'headline4', color: 'primary'})}>${price}</div>
        <div className={css({w: 'full', h: '1px', bgColor: 'gray3', my: '4'})} />
        <div className={css({display: 'flex', alignItems: 'center', gap: '2'})}>
          <IconLocation className={css({w: '6', h: '6', color: 'gray4'})} />
          <Button
            onClick={handleCreateLocationClick}
            className={css({
              bgColor: 'transparent',
              _hover: {bgColor: 'transparent'},
              fontSize: 'sm',
              color: 'gray.600',
            })}
          >
            {location}
          </Button>
        </div>
        <Box display='flex' gap={4} mt={6}>
          <Button
            type='button'
            onClick={() => handleCreateCall(companyId, phoneNumber)}
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgColor: 'transparent',
              borderRadius: 0,
              border: '1px solid #E3E3E3',
              color: '#6E7072',
              w: '1/2',
              py: '6',
              _hover: {
                bgColor: 'slate.100',
              },
            })}
          >
            Call
          </Button>
          <Link
            rel='dofollow'
            target='_blank'
            href={website}
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgColor: 'transparent',
              borderRadius: 0,
              border: '1px solid #E3E3E3',
              color: '#6E7072',
              w: '1/2',
              py: '3',
              _hover: {
                bgColor: 'slate.100',
              },
            })}
          >
            Website
          </Link>
        </Box>
      </div>
    </div>
  );
};

export default ProductCard;
