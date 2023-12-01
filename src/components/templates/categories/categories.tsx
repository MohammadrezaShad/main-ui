import {CategoryCard, Divider, PrimarySubtitle, PrimaryTitle} from '@/components';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {Container, Wrapper} from './categories.styled';

export default function Categories() {
  return (
    <Container>
      <Box>
        <PrimaryTitle
          className={css({
            textAlign: 'center',
          })}
          title='Categories of Articles'
        />
        <PrimarySubtitle
          className={css({
            textAlign: 'center',
            mt: '4',
          })}
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Viverra justo nec
        ultrices dui sapien eget. Suspendisse in est ante in nibh mauris.
        Facilisis sed odio morbi quis commodo. Egestas maecenas pharetra
        convallis posuere morbi leo'
        />
      </Box>
      <Wrapper>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </Wrapper>
      <Divider label='Other Categories' />
      <Wrapper>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </Wrapper>
    </Container>
  );
}
