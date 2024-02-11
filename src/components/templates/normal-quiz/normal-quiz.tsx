'use client';

import {coin} from '@/assets';
import RadioButton from '@/components/atoms/radio-button/radio-button';
import useCountdownTimer from '@/hooks/use-countdown-timer';
import {css} from '@styled/css';
import Image from 'next/image';
import {useEffect} from 'react';

const WaterSavingQuiz = () => {
  const handleClick = () => {
    // Handle button click event
  };

  return (
    <section className={css({display: 'flex', flexDir: 'column', bgColor: 'white'})}>
      <QuizHeader />
      <QuizContent handleClick={handleClick} />
      <QuizEndButton handleClick={handleClick} />
    </section>
  );
};

const QuizHeader = () => {
  const {timeRemaining, percentageRemaining, isTimeout} = useCountdownTimer(300);

  useEffect(() => {
    if (isTimeout) {
      alert('Time is up!');
      console.log('Time is up!');
    }
  }, [isTimeout]);

  return (
    <header
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignSelf: 'center',
        mt: '14',
        w: 'full',
        maxW: '1004px',
        mdDown: {mt: '10', maxW: 'full'},
        position: 'relative',
      })}
    >
      <div
        className={css({
          display: 'flex',
          gap: '5',
          justifyContent: 'center',
          alignItems: 'flex-start',
          alignSelf: 'flex-end',
          maxW: 'full',
          w: 'full',
          mdDown: {flexWrap: 'wrap'},
        })}
      >
        <div className={css({display: 'flex', flexDir: 'column', alignItems: 'center', mt: '2'})}>
          <h1
            className={css({
              alignSelf: 'stretch',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              color: 'text.primary',
              textStyle: 'title2',
            })}
          >
            Water Saving Quiz
          </h1>
          <div
            className={css({
              display: 'flex',
              flexDir: 'column',
              justifyContent: 'center',
              // pr: '9',
              mt: '6',
              w: '64',
              maxW: 'full',
              bgColor: 'gray.200',
              mdDown: {pr: '5'},
            })}
          >
            <div
              style={{width: `${percentageRemaining}%`}}
              className={css({
                flexShrink: '0',
                h: '2.5',
                bgColor: 'primary',
                transition: 'width 1s ease',
              })}
            />
          </div>
          <div
            className={css({
              mt: '2',
              fontSize: 'xs',
              lineHeight: 'xs',
              fontWeight: 'light',
              whiteSpace: 'nowrap',
              color: 'zinc.800',
            })}
          >
            Time Remaining: {timeRemaining}
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            gap: '3',
            alignItems: 'center',
            p: '4',
            whiteSpace: 'nowrap',
            bgColor: 'neutral.100',
            position: 'absolute',
            right: '11',
            mdDown: {
              display: 'none',
            },
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
            <div className={css({fontSize: 'sm', color: 'neutral.500'})}>Reward</div>
            <div
              className={css({
                fontSize: 'xl',
                lineHeight: 'xl',
                fontWeight: 'medium',
                color: 'zinc.800',
              })}
            >
              250
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const QuizContent = ({handleClick}: {handleClick: any}) => {
  return (
    <div
      className={css({
        pt: '9',
        pb: '9',
        pr: '20',
        pl: '8',
        mt: '12',
        bgColor: 'white',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'color:var(.-Gray2,#EBEBEB)',
        mdDown: {pl: '5', pr: '5', mt: '10', maxW: 'full'},
      })}
    >
      <div className={css({display: 'flex', gap: '5', flexDir: 'column', mdDown: {gap: '0'}})}>
        <QuizQuestion handleClick={handleClick} />
        <QuizOptions handleClick={handleClick} />
      </div>
    </div>
  );
};

const QuizQuestion = ({handleClick}: {handleClick: any}) => {
  return (
    <div
      className={css({display: 'flex', flexDir: 'column', w: '77%', mdDown: {ml: '0', w: 'full'}})}
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          flexGrow: '1',
          fontSize: 'base',
          lineHeight: 'base',
          color: 'zinc.800',
          mdDown: {mt: '10', maxW: 'full'},
        })}
      >
        <h2 className={css({fontWeight: 'medium', mdDown: {maxW: 'full'}})}>
          01. Which one is more efficient?
        </h2>
      </div>
    </div>
  );
};

const QuizOptions = ({handleClick}: {handleClick: any}) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        ml: '5',
        w: 'full',
        mdDown: {ml: '0', w: 'full'},
      })}
    >
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          flexGrow: '1',
          mt: '4',
          fontSize: 'base',
          lineHeight: 'base',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          color: 'zinc.800',
          mdDown: {mt: '1', gridTemplateRows: 'repeat(4, 1fr)'},
        })}
      >
        <label
          className={css({
            gridArea: '1 / 1 / 2 / 2',
            display: 'flex',
            gap: '6',
            mt: '4',
          })}
        >
          <RadioButton name='options' onClick={handleClick} />
          <div className={css({mt: 'auto', mb: 'auto'})}>Dishwasher</div>
        </label>
        <label
          className={css({
            gridArea: '2 / 1 / 3 / 2',
            display: 'flex',
            gap: '6',
            mt: '4',
          })}
        >
          <RadioButton name='options' onClick={handleClick} />
          <div className={css({mt: 'auto', mb: 'auto'})}>Washing dishes under the tap</div>
        </label>
        <label
          className={css({
            gridArea: '1 / 2 / 2 / 3',
            mdDown: {gridArea: '3 / 1 / 4 / 2'},
            display: 'flex',
            gap: '6',
            mt: '4',
          })}
        >
          <RadioButton name='options' onClick={handleClick} />
          <div className={css({mt: 'auto', mb: 'auto'})}>Both</div>
        </label>
        <label
          className={css({
            gridArea: '2 / 2 / 3 / 3',
            mdDown: {gridArea: '4 / 1 / 5 / 2'},
            display: 'flex',
            gap: '6',
            mt: '4',
          })}
        >
          <RadioButton name='options' onClick={handleClick} />
          <div className={css({mt: 'auto', mb: 'auto'})}>None</div>
        </label>
      </div>
    </div>
  );
};

const QuizEndButton = ({handleClick}: {handleClick: any}) => {
  return (
    <button
      className={css({
        justifyContent: 'center',
        alignSelf: 'center',
        pl: '12',
        pr: '12',
        pt: '3',
        pb: '3',
        mt: '8',
        fontSize: 'base',
        lineHeight: 'base',
        textAlign: 'center',
        color: 'white',
        whiteSpace: 'nowrap',
        bgColor: 'sky.400',
        mdDown: {pl: '5', pr: '5'},
        cursor: 'pointer',
      })}
      onClick={handleClick}
    >
      End
    </button>
  );
};

export default WaterSavingQuiz;
