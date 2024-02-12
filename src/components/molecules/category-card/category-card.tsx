import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import Image from 'next/image';

import {IconWater} from '@/assets';
import {CategoryType} from '@/graphql/generated/types';

import {Card, CategoryImage, Container} from './category-card.styled';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const CategoryCard = ({
  category,
  collapsed = false,
  id,
}: {
  category: CategoryType;
  collapsed?: boolean;
  id?: string;
}) => (
  <Container>
    <Card href={`/categories/${id ?? category.slug}/articles`} _small={collapsed}>
      {category.image ? (
        <Image
          unoptimized
          alt={category.image.alt ?? ''}
          width={category.image.width}
          height={category.image.height}
          src={`${IMAGE_STORAGE_URL}/${category.image?._id}`}
          className={css({mx: 'auto', display: collapsed ? 'none' : 'block'})}
        />
      ) : (
        <CategoryImage _hidden={collapsed}>
          <IconWater
            className={css({
              w: '6',
              h: '6',
              position: 'absolute',
              top: '20%',
              left: '60%',
            })}
          />
          <IconWater
            className={css({
              w: '16',
              h: '16',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            })}
          />
        </CategoryImage>
      )}
      <Box mt={collapsed ? 0 : '7'}>
        <div
          className={css({
            textStyle: 'caption',
            color: 'gray4',
            textAlign: 'center',
          })}
        >
          Articles: {category.postCount ?? 0}
        </div>
      </Box>
      <Box mt='1' w='10/12' mx='auto'>
        <h3
          title={category.title}
          className={css({
            textStyle: {
              base: 'headline3',
              lgDown: 'h4',
            },
            color: 'text.primary',
            textAlign: 'center',
            truncate: true,
          })}
        >
          {category.title}
        </h3>
      </Box>
      <Box display={collapsed ? 'none' : 'block'} mt='9'>
        <div
          className={css({
            textAlign: 'center',
            textStyle: 'body2',
            color: 'primary',
          })}
        >
          SHOW MORE
        </div>
      </Box>
    </Card>
  </Container>
);

export default CategoryCard;
