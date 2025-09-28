/* eslint-disable react/no-array-index-key */
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

// Use the same reference size you used when authoring the points
const REF_W = 960;
const REF_H = 540;
// Show hotspots on mobile too? (true shows them; false hides as before)
const SHOW_HOTSPOTS_ON_MOBILE = true;

interface Props {
  title: string;
  areas: QuizPointsType[];
  completedQuizzesIds: string[];
  currentQuizIndex: number | null;
  currentIndex: number;
  currentQuestionIndex: number;
  quizzes: QuizType[];
  handleSetAnswer: (questionId: string, answer: string) => void;
  handleClickBack: () => void;
  handleClickNext: () => void;
  answers: {question: string; answer: string}[];
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
  const totalQuestions = currentQuiz?.questions?.length ?? 0;

  const generateIcon = (index: number) => {
    if (completedQuizzesIds.includes(quizzes[index]._id)) {
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
    }
    if (currentQuizIndex === index) {
      return (
        <span className={css({color: '#FFF', zIndex: '10'})}>
          {Math.min(currentIndex + 1, totalQuestions)}/{totalQuestions}
        </span>
      );
    }
    return <span className={css({color: '#FFF', zIndex: '10'})}>{index + 1}</span>;
  };

  const progress = totalQuestions > 0 ? Math.min(100, (currentIndex / totalQuestions) * 100) : 0;

  const blueBorderStyle = {
    background: `conic-gradient(#44BAEB ${progress}%, #EBEBEB ${progress}%)`,
  };

  return (
    <>
      <div
        className={css({
          display: 'flex',
          mb: '[93px]',
          flexDir: 'column',
          alignItems: 'center',
          mdDown: {mb: '8'},
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
          width={REF_W}
          height={REF_H}
          alt=''
          className={css({
            w: '[960px]',
            h: '[540px]',
            objectFit: 'contain',
            mx: 'auto',
            mdDown: {w: '[375px]', h: '[282px]'},
          })}
        />

        {/* Optional: keep image map for accessibility / hit testing if needed */}
        <map name='image-map'>
          {(areas ?? []).map((area, idx) => (
            <area alt='' key={`${area.point.x}-${area.point.y}-${idx}`} {...area.point} />
          ))}
        </map>

        {(areas ?? []).map((area, index) => {
          // Normalize to reference size, then position with percentages (SSR-safe)
          const xPct = (area.point.x / REF_W) * 100;
          const yPct = (area.point.y / REF_H) * 100;

          const done = completedQuizzesIds.includes(quizzes[index]._id);
          const active = currentQuizIndex === index;

          return (
            <button
              type='button'
              onClick={() => (currentQuestionIndex ? null : setCurrentQuizIndex(index))}
              style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                transform: 'translate(-50%, -50%)',
              }}
              key={`${area.point.x}-${area.point.y}-${index}`}
              className={css({
                border: done
                  ? '4px solid token(colors.success)'
                  : active
                    ? 'none'
                    : '4px solid white',
                position: 'absolute',
                width: '10',
                height: '10',
                borderRadius: '50%',
                bgGradient: 'to-b',
                gradientFrom: done || active ? 'white' : '',
                gradientTo: done || active ? 'white' : '',
                color: active ? 'transparent' : 'white',
                zIndex: '10',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...(SHOW_HOTSPOTS_ON_MOBILE
                  ? {}
                  : {
                      // previous behavior: hide on mobile
                      mdDown: {display: 'none'},
                    }),
                cursor: currentIndex ? 'default' : 'pointer',
              })}
              aria-label={`Open quiz ${index + 1}`}
            >
              {!done && (
                <>
                  {active && (
                    <div
                      className={css({pos: 'absolute', inset: '0', rounded: 'full'})}
                      style={blueBorderStyle}
                    />
                  )}
                  <div
                    style={{backgroundColor: area.color || 'white'}}
                    className={css({
                      pos: 'absolute',
                      inset: active ? '1' : '0',
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
      ) : currentQuestionIndex + 1 <= totalQuestions ? (
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
