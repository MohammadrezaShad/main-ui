import {coin} from '@/assets';
import {css} from '@styled/css';
import Image from 'next/image';

const QuizEndButton = ({
  correctAnswers,
  wrongAnswers,
  gainedCoins,
  handleGoToNextQuiz,
}: {
  correctAnswers: number;
  wrongAnswers: number;
  gainedCoins: number;
  handleGoToNextQuiz: (z: number) => void;
}) => (
  <div
    className={css({
      border: '1px solid token(colors.gray2)',
      display: 'flex',
      flexDir: 'column',
      gap: '4',
      alignItems: 'center',
      justifyContent: 'center',
      p: '8',
      mt: '4',
    })}
  >
    <Image
      unoptimized
      width={128}
      height={128}
      src={coin}
      alt=''
      className={css({
        w: '16',
        h: '16',
        aspectRatio: 'square',
        objectFit: 'contain',
        objectPosition: 'center',
        overflow: 'hidden',
        flexShrink: '0',
        mdDown: {w: '32', h: '32'},
      })}
    />
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8',
      })}
    >
      <p
        className={css({
          textStyle: 'body',
          color: 'success',
        })}
      >
        {correctAnswers} Correct Answers
      </p>
      <p
        className={css({
          textStyle: 'body',
          color: 'danger',
        })}
      >
        {wrongAnswers} Wrong Answer
      </p>
    </div>
    <button
      type='button'
      className={css({
        justifyContent: 'center',
        alignSelf: 'center',
        pl: '12',
        pr: '12',
        pt: '3',
        pb: '3',
        mt: '4',
        fontSize: 'base',
        lineHeight: 'base',
        textAlign: 'center',
        color: 'white',
        whiteSpace: 'nowrap',
        bgColor: 'sky.400',
        mdDown: {pl: '5', pr: '5'},
        cursor: 'pointer',
      })}
      onClick={() => handleGoToNextQuiz(gainedCoins)}
    >
      Collect your {gainedCoins} points
    </button>
  </div>
);

export default QuizEndButton;
