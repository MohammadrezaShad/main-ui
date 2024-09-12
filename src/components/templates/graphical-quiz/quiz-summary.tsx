import {css} from '@styled/css';

import {IconDrop} from '@/assets';

interface Props {
  prices: number[];
  titles: string[];
}

const QuizSummary = ({prices, titles}: Props) => (
  <div className={css({display: 'flex', flexDir: 'column', alignItems: 'stretch', mt: '2'})}>
    <div
      className={css({
        display: 'flex',
        gap: '3',
        alignItems: 'center',
        p: '4',
        whiteSpace: 'nowrap',
        bgColor: 'neutral.100',
        maxWidth: '[137px]',
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
        <div className={css({fontSize: 'sm', color: 'neutral.500'})}>Reward</div>
        <div
          className={css({
            fontSize: 'xl',
            lineHeight: 'xl',
            fontWeight: 'medium',
            color: 'zinc.800',
          })}
        >
          {prices.reduce((prev, curr) => prev + curr, 0)}
        </div>
      </div>
    </div>
    <ul
      className={css({
        border: '1px solid token(colors.gray3)',
        px: '4',
        py: '5',
        borderTop: 'none',
        maxWidth: '[137px]',
        w: 'full',
      })}
    >
      {prices.map((price, index) => (
        <li
          className={css({
            display: 'flex',
            flexDir: 'column',
          })}
          key={crypto.randomUUID()}
        >
          <span
            className={css({
              textStyle: 'captionB',
              color: 'text.primary',
            })}
          >
            {titles[index]}
          </span>
          <div className={css({display: 'flex', gap: '1', alignItems: 'center'})}>
            <span
              className={css({
                textStyle: 'h4',
                color: 'primary',
              })}
            >
              {price}
            </span>
            <span
              className={css({
                textStyle: 'caption',
                color: 'gray4',
              })}
            >
              points
            </span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default QuizSummary;
