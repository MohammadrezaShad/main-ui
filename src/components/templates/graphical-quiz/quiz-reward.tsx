import {css} from '@styled/css';

import {IconDrop} from '@/assets';

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
      <IconDrop
        className={css({
          w: '8',
          h: '8',
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
