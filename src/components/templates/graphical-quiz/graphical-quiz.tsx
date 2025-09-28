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

const GraphicalQuizView = () => {
  const token = getCookie(CookieName.AUTH_TOKEN) || undefined;
  const params = useParams<{quizId: string}>();

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [gainedCoins, setGainedCoins] = useState(0);
  const [totalGainedCoins, setTotalGainedCoins] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<QuizType | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuizzesIds, setCompletedQuizzesIds] = useState<string[]>([]);

  // Fetch main graphical quiz (SSR prefetched + hydrated)
  const {data} = useQuery({
    queryKey: ['find-graphical-quiz-by-id', params.quizId],
    queryFn: () => findGraphicalQuizById({id: params.quizId}, token),
    enabled: !!params.quizId, // guard
    staleTime: 60_000,
  });

  const quiz = useMemo(() => data?.result, [data]);
  const quizzes = useMemo(
    () => data?.result?.quizPoints?.map(p => p.quizObject) ?? [],
    [data?.result?.quizPoints],
  );

  const endQuizMutation = useMutation({
    mutationFn: ({args, token}: {args: EndQuizInput; token?: string}) => endQuiz(args, token),
  });

  const handleClickNext = () => {
    if (!currentQuiz) return;
    const total = currentQuiz.questions?.length ?? 0;

    // require answer for current question
    if (currentQuestionIndex + 1 <= total && !answers[currentQuestionIndex]) {
      toast.error('Please select an answer');
      return;
    }

    if (currentQuestionIndex + 1 === total) {
      // eslint-disable-next-line no-void
      void handleSubmitQuiz();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleClickBack = () => {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleSetAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => {
      const idx = prev.findIndex(a => a.question === questionId);
      if (idx === -1) return [...prev, {question: questionId, answer}];
      const next = [...prev];
      next[idx] = {question: questionId, answer};
      return next;
    });
  };

  const handleGoToNextQuiz = (userGainedCoins: number) => {
    setTotalGainedCoins(prev => prev + userGainedCoins);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    // eslint-disable-next-line no-nested-ternary
    setCurrentQuizIndex(prev => (isSmallScreen() ? (prev !== null ? prev + 1 : 0) : null));
  };

  const handleSubmitQuiz = async () => {
    if (!currentQuiz) return;
    try {
      const resp = await endQuizMutation.mutateAsync({
        args: {quiz: currentQuiz._id as string, answers},
        token,
      });
      if (resp?.success) {
        setCompletedQuizzesIds(prev => [...prev, currentQuiz._id]);
        setCurrentQuiz(null);
        setCorrectAnswers(resp.correctAnswerCount);
        setWrongAnswers(resp.wrongAnswerCount);
        setGainedCoins(resp.gainedCoins);
      } else {
        toast.error(
          endQuizMutation.error?.message ?? 'An error occurred. Please try again in a few moments.',
        );
      }
    } catch (err: any) {
      toast.error(err?.message ?? 'Something went wrong');
    }
  };

  // Load the FIRST point-quiz (or subsequent ones) once main data is present
  useEffect(() => {
    if (!data?.result) return;

    if (currentQuizIndex === null) {
      setIsLoading(false);
      return;
    }

    const point = data.result.quizPoints?.[currentQuizIndex]?.point;
    if (!point) {
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        const resp = await findQuizByPoint({id: params.quizId, point}, token);
        setCurrentQuiz(resp.result as QuizType);
        setCurrentQuestionIndex(0);
        setAnswers([]);
      } catch (error: any) {
        toast.error(error?.message ?? 'Failed to load quiz');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentQuizIndex, data?.result, params.quizId, token]);

  // Auto-scroll to Q&A when the new quiz loads
  useEffect(() => {
    const el = document.querySelector('#quiz-questions-container');
    if (el) el.scrollIntoView({behavior: 'smooth'});
  }, [currentQuiz]);

  if (isLoading && !quiz) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

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
          mdDown: {justifyContent: 'center', mb: '6'},
        })}
      >
        <QuizReward gainedCoins={totalGainedCoins} />
      </div>

      <div
        className={css({
          w: '[960px]',
          display: 'flex',
          flexDir: 'column',
          mdDown: {w: 'screen'},
        })}
      >
        {quiz && (
          <QuizContent
            title={quiz.title as string}
            areas={quiz.quizPoints as QuizPointsType[]}
            completedQuizzesIds={completedQuizzesIds}
            currentQuizIndex={currentQuizIndex}
            currentIndex={currentQuestionIndex}
            currentQuestionIndex={currentQuestionIndex}
            quizzes={quizzes as QuizType[]}
            handleSetAnswer={handleSetAnswer}
            handleClickBack={handleClickBack}
            handleClickNext={handleClickNext}
            answers={answers}
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
            gainedCoins={gainedCoins}
            handleGoToNextQuiz={handleGoToNextQuiz}
            image={quiz.image as ImageType}
            currentQuiz={currentQuiz as QuizType}
            setCurrentQuizIndex={setCurrentQuizIndex}
          />
        )}
      </div>

      <div
        className={css({
          display: 'flex',
          justifyContent: 'flex-start',
          flex: '1',
          mdDown: {display: 'none'},
        })}
      >
        <QuizSummary
          titles={(quizzes ?? []).map(q => q?.title) as string[]}
          prices={(quizzes ?? []).map(q => q?.reward) as number[]}
        />
      </div>
    </section>
  );
};

export default GraphicalQuizView;
