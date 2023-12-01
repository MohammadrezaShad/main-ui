import {IconWater} from '@/assets';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import Link from 'next/link';
import {Card, CategoryImage, Container} from './category-card.styled';

const CategoryCard = () => {
  return (
    <Container>
      <Card>
        <CategoryImage>
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
        <Box mt='7'>
          <div
            className={css({
              textStyle: 'caption',
              color: 'text.primary',
              textAlign: 'center',
            })}
          >
            Articles: 234
          </div>
        </Box>
        <Box mt='1'>
          <h3
            className={css({
              textStyle: 'headline3',
              color: 'text.primary',
              textAlign: 'center',
            })}
          >
            Water Crisis
          </h3>
        </Box>
        <Box mt='9'>
          <Link href=''>
            <div
              className={css({
                textAlign: 'center',
                textStyle: 'body2',
                color: 'primary',
              })}
            >
              SHOW MORE
            </div>
          </Link>
        </Box>
      </Card>
    </Container>
  );
};

export default CategoryCard;
