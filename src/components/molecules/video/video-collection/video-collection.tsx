import {VideoCard} from '@/components';

import {Container, Item} from './video-collection.styled';

export default function VideoCollection() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Container>
      {items.map(item => (
        <Item key={item}>
          <VideoCard />
        </Item>
      ))}
    </Container>
  );
}
