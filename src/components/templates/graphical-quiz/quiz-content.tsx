/* eslint-disable no-nested-ternary */
import {SetStateAction} from 'react';
import {css} from '@styled/css';
import Image from 'next/image';
import Link from 'next/link';

import {IconCheck} from '@/assets';
import {ImageType, QuizPointsType, QuizType} from '@/graphql';

import QuizEndButton from './end-quiz-button';
import QuizQuestions from './quiz-questions';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

interface Props {
  title: string;
  areas: QuizPointsType[];
  completedQuizzesIds: string[];
  currentQuizIndex: number | null;
  currentIndex: number;
  currentQuestionIndex: number;
  quizzes: QuizType[];
  handleSetAnswer: any;
  handleClickBack: any;
  handleClickNext: any;
  answers: any;
  correctAnswers: number;
  wrongAnswers: number;
  gainedCoins: number;
  handleGoToNextQuiz: (reward: number) => void;
  image: ImageType;
  currentQuiz: QuizType;
  setCurrentQuizIndex: React.Dispatch<SetStateAction<number | null>>;
}

const QuizContent = ({
  title,
  areas,
  completedQuizzesIds,
  currentQuizIndex,
  currentIndex,
  currentQuestionIndex,
  quizzes,
  handleSetAnswer,
  handleClickBack,
  handleClickNext,
  answers,
  correctAnswers,
  wrongAnswers,
  gainedCoins,
  handleGoToNextQuiz,
  image,
  currentQuiz,
  setCurrentQuizIndex,
}: Props) => {
  const generateIcon = (index: number) => {
    if (completedQuizzesIds.includes(quizzes[index]._id))
      return (
        <IconCheck
          className={css({
            stroke: 'success',
            '& path': {fill: 'success'},
            w: '[24px]',
            h: '[24px]',
          })}
        />
      );
    if (currentQuizIndex === index)
      return (
        <span className={css({color: '#FFF', zIndex: '10'})}>
          {currentIndex + 1}/{currentQuiz?.questions.length}
        </span>
      );
    return <span className={css({color: '#FFF', zIndex: '10'})}>{index + 1}</span>;
  };

  const blueBorderStyle = {
    background: `conic-gradient(#44BAEB ${(currentIndex / currentQuiz?.questions.length) * 100}%, #EBEBEB ${(currentIndex / currentQuiz?.questions.length) * 100}%)`,
  };

  return (
    <>
      <div
        className={css({
          display: 'flex',
          mb: '[93px]',
          flexDir: 'column',
          alignItems: 'center',
          mdDown: {
            mb: '8',
          },
        })}
      >
        <h1
          className={css({
            alignSelf: 'stretch',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            color: 'text.primary',
            textStyle: 'title2',
          })}
        >
          {title}
        </h1>
      </div>
      <div
        className={css({
          position: 'relative',
          display: 'inline-block',
          width: 'full',
          height: 'auto',
        })}
      >
        <Image
          id='quiz-image'
          useMap='#image-map'
          unoptimized
          src={`${IMAGE_STORAGE_URL}/${image.filename}-${image._id}?w=960&q=85`}
          width={960}
          height={540}
          alt=''
          className={css({
            w: '[960px]',
            h: '[540px]',
            objectFit: 'contain',
            mx: 'auto',
            mdDown: {
              w: '[375px]',
              h: '[282px]',
            },
          })}
        />
        <map name='image-map'>
          {areas.map(area => (
            <area alt='' key={crypto.randomUUID()} {...area.point} />
          ))}
        </map>
        {areas.map((area, index) => {
          // eslint-disable-next-line no-restricted-globals
          const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
          const imageWidth = width > 768 ? 960 : 375;
          const imageHeight = width > 768 ? 540 : 282;
          const x = ((area.point.x - 5) / imageWidth) * 100;
          const y = ((area.point.y - 5) / imageHeight) * 100;
          return (
            <button
              type='button'
              onClick={() => (currentQuestionIndex ? null : setCurrentQuizIndex(index))}
              style={{left: `${x}%`, top: `${y}%`}}
              key={crypto.randomUUID()}
              className={css({
                border: completedQuizzesIds.includes(quizzes[index]._id)
                  ? '4px solid token(colors.success)'
                  : currentQuizIndex === index
                    ? 'none'
                    : '4px solid white',
                position: 'absolute',
                width: '10',
                height: '10',
                borderRadius: '50%',
                bgGradient: 'to-b',
                gradientFrom:
                  completedQuizzesIds.includes(quizzes[index]._id) || currentQuizIndex === index
                    ? 'white'
                    : '',
                gradientTo:
                  completedQuizzesIds.includes(quizzes[index]._id) || currentQuizIndex === index
                    ? 'white'
                    : '',
                color: currentQuizIndex === index ? 'transparent' : 'white',
                zIndex: '10',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mdDown: {
                  display: 'none',
                },
                cursor: currentIndex ? 'default' : 'pointer',
              })}
            >
              {!completedQuizzesIds.includes(quizzes[index]._id) && (
                <>
                  {currentQuizIndex === index && (
                    <div
                      className={css({
                        pos: 'absolute',
                        inset: '0',
                        rounded: 'full',
                      })}
                      style={blueBorderStyle}
                    />
                  )}
                  <div
                    style={{backgroundColor: area.color || 'white'}}
                    className={css({
                      pos: 'absolute',
                      inset: currentQuizIndex === index ? '1' : '0',
                      rounded: 'full',
                    })}
                  />
                </>
              )}
              {generateIcon(index)}
            </button>
          );
        })}
      </div>
      {completedQuizzesIds.length === quizzes.length ? (
        <Link
          href='/quizzes/graphical'
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
            marginTop: '[88px]',
          })}
        >
          Finish
        </Link>
      ) : currentQuestionIndex + 1 <= currentQuiz?.questions.length ? (
        <QuizQuestions
          questions={currentQuiz?.questions ?? []}
          onSetAnswer={handleSetAnswer}
          currentIndex={currentQuestionIndex}
          onBack={handleClickBack}
          onNext={handleClickNext}
          answers={answers}
          quiz={currentQuiz}
        />
      ) : currentQuestionIndex ? (
        <QuizEndButton
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          gainedCoins={gainedCoins}
          handleGoToNextQuiz={handleGoToNextQuiz}
        />
      ) : null}
    </>
  );
};

export default QuizContent;
