'use client';

import React from 'react';
import {useObservable, useSelector} from '@legendapp/state/react';
import {css, cx} from '@styled/css';

import {IconChevronDown, IconChevronUp} from '@/assets';
import {Button, VikoCard} from '@/components';

import {Container, Item, List} from './viko-showcase.styled';

interface VikoShowcaseProps {
  className?: string;
}

export default function VikoShowcase({className, ...otherProps}: VikoShowcaseProps) {
  const willShowMore$ = useObservable(false);
  const items = Array.from({length: 10}, (_, idx) => idx + 1);
  const willShowMore = useSelector(() => willShowMore$.get());
  const itemRef = React.useRef<HTMLDivElement>(null);
  const itemHeight = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const defaultClassName = css({h: willShowMore ? 'auto' : '280px', overflow: 'hidden'});
  const vikoShowcaseClass = cx(defaultClassName, className);

  function getSnapshot() {
    return itemRef.current?.clientHeight;
  }

  function subscribe(callback: (this: Window, ev: UIEvent) => any) {
    window.addEventListener('resize', callback);
    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
      window.removeEventListener('resize', callback);
    };
  }

  console.log(itemHeight);

  return (
    <Container>
      <List className={vikoShowcaseClass} {...otherProps}>
        {items.map((item, index) => (
          <Item key={item} ref={!index ? itemRef : undefined}>
            <VikoCard />
          </Item>
        ))}
      </List>
      <Button
        color='backgroundSecondary'
        className={css({
          display: 'flex',
          color: 'primary',
          mt: 6,
          mx: 'auto',
          border: '1px solid token(colors.strokeSecondary)',
          boxShadow: 'b3',
          rounded: 'xl',
          width: '128px',
        })}
        onClick={() => willShowMore$.set(!willShowMore)}
      >
        {!willShowMore ? 'بیشتر' : 'کمتر'}

        {willShowMore ? (
          <IconChevronUp
            className={css({
              ml: -2,
              '&  path': {
                fill: 'primary',
              },
            })}
          />
        ) : (
          <IconChevronDown
            className={css({
              ml: -2,
              '&  path': {
                fill: 'primary',
              },
            })}
          />
        )}
      </Button>
    </Container>
  );
}
