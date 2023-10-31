import {VikoCard} from '@/components';

import {Container, Item} from './viko-collection.styled';

export default function VikoCollection() {
  const items = Array.from({length: 16}, (_, idx) => idx + 1);
  return (
    <Container>
      {items.map(item => (
        <Item key={item}>
          <VikoCard />
        </Item>
      ))}
    </Container>
  );
}
