import {css} from '@styled/css';
import Image from 'next/image';

import {coin} from '@/assets';

interface Props {
  gainedCoins: number;
}

const QuizReward = ({gainedCoins}: Props) => (
  <div
    className={css({
      display: 'flex',
      gap: '5',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      maxW: 'full',
      w: 'full',
      maxWidth: '[156px]',
      mdDown: {flexWrap: 'wrap'},
      h: '[71px]',
    })}
  >
    <div
      className={css({
        display: 'flex',
        gap: '3',
        alignItems: 'center',
        p: '4',
        whiteSpace: 'nowrap',
        bgColor: 'white',
        border: '1px solid token(colors.gray3)',
        w: 'full',
      })}
    >
      <Image
        unoptimized
        width={32}
        height={32}
        src={coin}
        alt=''
        className={css({
          w: '8',
          h: '8',
          aspectRatio: 'square',
          objectFit: 'contain',
          objectPosition: 'center',
          overflow: 'hidden',
          flexShrink: '0',
        })}
      />
      <div className={css({display: 'flex', flexDir: 'column', flex: '1'})}>
        <div className={css({fontSize: 'sm', color: 'neutral.500'})}>You Earned</div>
        <div
          className={css({
            fontSize: 'xl',
            lineHeight: 'xl',
            fontWeight: 'medium',
            color: 'zinc.800',
          })}
        >
          {gainedCoins}
        </div>
      </div>
    </div>
  </div>
);

export default QuizReward;
