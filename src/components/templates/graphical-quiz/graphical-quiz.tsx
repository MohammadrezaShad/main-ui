'use client';

import {css} from '@styled/css';
import {useEffect, useState} from 'react';

import {Spinner} from '@/components/atoms';
import {CookieName} from '@/constants';
import {
  EndQuizInput,
  ImageType,
  PointInputType,
  QuizType,
  endQuiz,
  findGraphicalQuizById,
  findQuizById,
} from '@/graphql';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {useParams} from 'next/navigation';
import {toast} from 'react-toastify';
import QuizContent from './quiz-content';
import QuizReward from './quiz-reward';
import QuizSummary from './quiz-summary';

interface Answer {
  answer: string;
  question: string;
}

const WaterSavingQuiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = getCookie(CookieName.AUTH_TOKEN)!;
  const params = useParams();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [gainedCoins, setGainedCoins] = useState(0);
  const [totalGainedCoins, setTotalGainedCoins] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const {data} = useQuery({
    queryKey: ['find-graphical-quiz-by-id', params.quizId],
    queryFn: () => findGraphicalQuizById({id: params.quizId as string}, token),
  });
  const quiz = data?.result;

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuizzesIds, setCompletedQuizzesIds] = useState<string[]>([]);

  const endQuizMutation = useMutation({
    mutationFn: ({args, token}: {args: EndQuizInput; token: string}) => endQuiz(args, token),
  });

  const handleClickNext = () => {
    // !TODO: CALL END QUIZ ON LAST QUESTION
    if (!data || !data.result) return;
    if (
      currentQuestionIndex + 1 <= quizzes[currentQuizIndex]?.questions.length &&
      !answers[currentQuestionIndex]
    ) {
      toast.error('Please select an answer');
      return;
    }
    if (currentQuestionIndex + 1 === quizzes[currentQuizIndex].questions.length) {
      handleClick();
    }
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleClickBack = () => {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleSetAnswer = (questionId: string, answer: string) => {
    const questionIndex = answers.findIndex(currentAnswer => currentAnswer.question === questionId);
    if (questionIndex === -1) {
      setAnswers(prev => [...prev, {question: questionId, answer}]);
    } else {
      const newAnswers = [...answers];
      newAnswers[questionIndex] = {question: questionId, answer};
      setAnswers(newAnswers);
    }
  };

  const handleGoToNextQuiz = (userGainedCoins: number) => {
    setTotalGainedCoins(prev => prev + userGainedCoins);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setCurrentQuizIndex(prev => prev + 1);
  };

  const handleClick = async () => {
    if (token) {
      try {
        const data = await endQuizMutation.mutateAsync({
          args: {quiz: quizzes[currentQuizIndex]._id as string, answers},
          token,
        });
        if (data?.success) {
          setCompletedQuizzesIds(prev => [...prev, quizzes[currentQuizIndex]._id]);
          setCorrectAnswers(data.correctAnswerCount);
          setWrongAnswers(data.wrongAnswerCount);
          setGainedCoins(data.gainedCoins);
        } else {
          toast.error(
            endQuizMutation.error?.message ??
              'An error occured. Please try again a few moments later',
          );
        }
      } catch (error: Error | any) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (data?.result) {
        const quizIds = quiz?.quizPoints.map(quiz => quiz.quiz);
        const quizzesPromise: Promise<any>[] = [];
        if (quizIds && quizIds?.length > 0) {
          quizIds?.forEach(async quizId => {
            quizzesPromise.push(findQuizById({id: quizId as string}, token));
          });
        }
        const response = await Promise.all(quizzesPromise);
        if (response && response.length > 0) {
          const newQuizzes: QuizType[] = [];
          response.forEach(response => {
            if (response?.result) newQuizzes.push(response.result);
          });
          setQuizzes(newQuizzes);
          setIsLoading(false);
        }
      }
    })();
  }, [data]);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <section
      className={css({
        display: 'flex',
        gap: '4',
        bgColor: 'white',
        px: '[43px]',
        mdDown: {
          flexDir: 'column',
          px: '0',
        },
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'flex-end',
          flex: '1',
          mdDown: {
            justifyContent: 'center',
          },
        })}
      >
        <QuizReward gainedCoins={totalGainedCoins} />
      </div>
      <div
        className={css({
          w: '[960px]',
          display: 'flex',
          flexDir: 'column',
          mdDown: {
            w: 'screen',
          },
        })}
      >
        <QuizContent
          handleSetAnswer={handleSetAnswer}
          currentIndex={currentQuestionIndex}
          handleClickBack={handleClickBack}
          handleClickNext={handleClickNext}
          answers={answers}
          areas={quiz?.quizPoints.map(quizPoint => quizPoint.point) as PointInputType[]}
          currentQuizIndex={currentQuizIndex}
          completedQuizzesIds={completedQuizzesIds}
          gainedCoins={gainedCoins}
          currentQuestionIndex={currentQuestionIndex}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          handleGoToNextQuiz={handleGoToNextQuiz}
          quizzes={quizzes}
          title={quiz?.title as string}
          image={quiz?.image as ImageType}
        />
      </div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'flex-start',
          flex: '1',
          mdDown: {
            display: 'none',
          },
        })}
      >
        <QuizSummary
          titles={quizzes.map(quiz => quiz.title) as string[]}
          prices={quizzes.map(quiz => quiz.reward) as number[]}
        />
      </div>
    </section>
  );
};

export default WaterSavingQuiz;
