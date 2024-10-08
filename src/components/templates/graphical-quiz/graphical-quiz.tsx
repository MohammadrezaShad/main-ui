'use client';

import {useEffect, useMemo, useState} from 'react';
import {toast} from 'react-toastify';
import {css} from '@styled/css';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {useParams} from 'next/navigation';

import {Spinner} from '@/components/atoms';
import {CookieName} from '@/constants';
import {
  endQuiz,
  EndQuizInput,
  findGraphicalQuizById,
  findQuizByPoint,
  ImageType,
  QuizPointsType,
  QuizType,
} from '@/graphql';
import {isSmallScreen} from '@/utils';

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
  const [currentQuiz, setCurrentQuiz] = useState<QuizType | null>(null);
  const {data} = useQuery({
    queryKey: ['find-graphical-quiz-by-id', params.quizId],
    queryFn: () => findGraphicalQuizById({id: params.quizId as string}, token),
  });
  const quiz = useMemo(() => data?.result, [data]);
  const quizzes = useMemo(
    () => data?.result?.quizPoints.map(quiz => quiz.quizObject),
    [data?.result?.quizPoints],
  );

  const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuizzesIds, setCompletedQuizzesIds] = useState<string[]>([]);

  const endQuizMutation = useMutation({
    mutationFn: ({args, token}: {args: EndQuizInput; token: string}) => endQuiz(args, token),
  });

  const handleClickNext = () => {
    if (!data || !data.result || !currentQuiz) return;
    if (
      currentQuestionIndex + 1 <= currentQuiz.questions.length &&
      !answers[currentQuestionIndex]
    ) {
      toast.error('Please select an answer');
      return;
    }
    if (currentQuestionIndex + 1 === currentQuiz.questions.length) {
      handleClick();
    } else setCurrentQuestionIndex(prev => prev + 1);
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
    // eslint-disable-next-line no-nested-ternary
    setCurrentQuizIndex(prev => (isSmallScreen() ? (prev !== null ? prev + 1 : 0) : null));
  };

  const handleClick = async () => {
    if (!currentQuiz) return;
    if (token) {
      try {
        const data = await endQuizMutation.mutateAsync({
          args: {quiz: currentQuiz._id as string, answers},
          token,
        });
        if (data?.success) {
          setCompletedQuizzesIds(prev => [...prev, currentQuiz._id]);
          setCurrentQuiz(null);
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
      if (data?.result && currentQuizIndex !== null && currentQuizIndex >= 0) {
        const currentQuizId = params.quizId as string;
        const currentQuizPoints = data.result.quizPoints[currentQuizIndex].point;
        try {
          const response = await findQuizByPoint(
            {id: currentQuizId, point: currentQuizPoints},
            token,
          );
          setCurrentQuiz(response.result as QuizType);
          setCurrentQuestionIndex(0);
          setAnswers([]);
        } catch (error: Error | any) {
          toast.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (currentQuizIndex === null) setIsLoading(false);
    })();
  }, [currentQuizIndex]);

  useEffect(() => {
    const quizQuestionsContainer = document.querySelector('#quiz-questions-container');
    if (quizQuestionsContainer) {
      quizQuestionsContainer.scrollIntoView({behavior: 'smooth'});
    }
  }, [currentQuiz]);

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
        pt: '[56px]',
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
            mb: '6',
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
          currentQuiz={currentQuiz as QuizType}
          handleSetAnswer={handleSetAnswer}
          currentIndex={currentQuestionIndex}
          handleClickBack={handleClickBack}
          handleClickNext={handleClickNext}
          answers={answers}
          areas={quiz?.quizPoints as QuizPointsType[]}
          currentQuizIndex={currentQuizIndex}
          completedQuizzesIds={completedQuizzesIds}
          gainedCoins={gainedCoins}
          currentQuestionIndex={currentQuestionIndex}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          handleGoToNextQuiz={handleGoToNextQuiz}
          quizzes={quizzes as QuizType[]}
          title={quiz?.title as string}
          image={quiz?.image as ImageType}
          setCurrentQuizIndex={setCurrentQuizIndex}
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
          titles={quizzes?.map(quiz => quiz?.title) as string[]}
          prices={quizzes?.map(quiz => quiz?.reward) as number[]}
        />
      </div>
    </section>
  );
};

export default WaterSavingQuiz;
