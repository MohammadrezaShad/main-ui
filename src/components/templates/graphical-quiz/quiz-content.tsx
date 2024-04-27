import {IconCheck} from '@/assets';
import {ImageType, PointType, QuizType} from '@/graphql';
import {css} from '@styled/css';
import Image from 'next/image';
import Link from 'next/link';
import QuizEndButton from './end-quiz-button';
import QuizQuestions from './quiz-questions';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

interface Props {
  title: string;
  quizImage: ImageType;
  areas: PointType[];
  completedQuizzesIds: string[];
  currentQuizIndex: number;
  currentIndex: number;
  questionsCount: number;
  currentQuestionIndex: number;
  questions: any[];
  quizzes: QuizType[];
  handleSetAnswer: any;
  handleClickBack: any;
  handleClickNext: any;
  answers: any;
  correctAnswers: number;
  wrongAnswers: number;
  gainedCoins: number;
  handleGoToNextQuiz: any;
}

const QuizContent = ({
  title,
  areas,
  completedQuizzesIds,
  currentQuizIndex,
  quizImage,
  currentIndex,
  questionsCount,
  currentQuestionIndex,
  questions,
  quizzes,
  handleSetAnswer,
  handleClickBack,
  handleClickNext,
  answers,
  correctAnswers,
  wrongAnswers,
  gainedCoins,
  handleGoToNextQuiz,
}: Props) => {
  const generateBorder = (index: number) => {
    if (completedQuizzesIds[index]) return '2px solid token(colors.success)';
    if (currentQuizIndex === index) return '2px solid token(colors.gray2)';
    return '2px solid white';
  };

  const generateGradientFrom = (index: number) => {
    if (completedQuizzesIds[index]) return 'white';
    if (currentQuizIndex === index) return 'white';
    return '#B8EAFF';
  };

  const generateGadientTo = (index: number) => {
    if (completedQuizzesIds[index]) return 'white';
    if (currentQuizIndex === index) return 'white';
    return '#62C2CE';
  };

  const generateIcon = (index: number) => {
    if (completedQuizzesIds[index])
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
    if (currentQuizIndex === index) return `${currentIndex + 1}/${questionsCount}`;
    return index + 1;
  };

  return (
    <>
      <div
        className={css({
          display: 'flex',
          mb: '[93px]',
          flexDir: 'column',
          alignItems: 'center',
          mt: '2',
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
          src={`${IMAGE_STORAGE_URL}/${quizImage._id}?w=960&q=85`}
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
            <area alt='' key={crypto.randomUUID()} {...area} />
          ))}
        </map>
        {areas.map((area, index) => {
          const x =
            ((area.x - 5) / (document.querySelector('#quiz-image') as HTMLImageElement)?.width) *
            100;
          const y =
            ((area.y - 5) / (document.querySelector('#quiz-image') as HTMLImageElement)?.height) *
            100;
          return (
            <div
              style={{left: `${x}%`, top: `${y}%`}}
              key={crypto.randomUUID()}
              className={css({
                border: generateBorder(index),
                position: 'absolute',
                width: '10',
                height: '10',
                borderRadius: '50%',
                bgGradient: 'to-b',
                gradientFrom: generateGradientFrom(index),
                gradientTo: generateGadientTo(index),
                color: currentQuizIndex === index ? 'primary' : 'white',
                zIndex: '50', // Ensure it's above the image
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mdDown: {
                  display: 'none',
                },
              })}
            >
              {generateIcon(index)}
            </div>
          );
        })}
      </div>
      {currentQuizIndex + 1 > quizzes.length ? (
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
      ) : null}
      {currentQuestionIndex + 1 <= quizzes[currentQuizIndex]?.questions.length ? (
        <QuizQuestions
          questions={questions ?? []}
          onSetAnswer={handleSetAnswer}
          currentIndex={currentQuestionIndex}
          onBack={handleClickBack}
          onNext={handleClickNext}
          answers={answers}
          quiz={quizzes[currentQuizIndex]}
        />
      ) : (
        <QuizEndButton
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          gainedCoins={gainedCoins}
          handleGoToNextQuiz={handleGoToNextQuiz}
        />
      )}
    </>
  );
};

export default QuizContent;
