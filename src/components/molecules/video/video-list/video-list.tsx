import {css, cx} from '@styled/css';

import {VideoMiniCard} from '@/components';

import {Container, Item} from './video-list.styled';

interface VideoListProps {
  className?: string;
  classes?: {
    item?: string;
    container?: string;
  };
}

export default function VideoList({className, classes}: VideoListProps) {
  const defaultClassName = css({});
  const videoListClass = cx(defaultClassName, className, classes?.container);
  const items = [1, 2, 3, 4, 5, 6];

  return (
    <Container className={videoListClass}>
      {items.map(item => (
        <Item key={item} className={classes?.item}>
          <VideoMiniCard />
        </Item>
      ))}
    </Container>
  );
}
