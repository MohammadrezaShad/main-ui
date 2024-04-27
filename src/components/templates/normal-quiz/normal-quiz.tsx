'use client';

import {css} from '@styled/css';
import Image from 'next/image';
import {useState} from 'react';

import {IconCheck, coin} from '@/assets';
import RadioButton from '@/components/atoms/radio-button/radio-button';
import {CookieName} from '@/constants';
import {EndQuizInput, OptionType, QuestionType, QuizType, endQuiz, findQuizById} from '@/graphql';
import {Paths} from '@/utils';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {toast} from 'react-toastify';
import {Maybe} from 'yup';

interface Answer {
  answer: string;
  question: string;
}

const WaterSavingQuiz = () => {
  const params = useParams();
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [gainedCoins, setGainedCoins] = useState(0);
  const {data} = useQuery({
    queryKey: ['find-quiz-by-id', params.quizId],
    queryFn: () => findQuizById({id: params.quizId as string}),
  });
  const quiz = data?.result;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleClickNext = () => {
    if (!data || !data.result) return;
    if (
      currentQuestionIndex + 1 <= data?.result?.questions.length &&
      !answers[currentQuestionIndex]
    ) {
      toast.error('Please select an answer');
      return;
    }
    if (currentQuestionIndex + 1 === quiz?.questions.length) {
      handleClick();
    }
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleClickBack = () => {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const endQuizMutation = useMutation({
    mutationFn: ({args, token}: {args: EndQuizInput; token: string}) => endQuiz(args, token),
  });
  const [answers, setAnswers] = useState<Answer[]>([]);

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

  const handleClick = async () => {
    const token = getCookie(CookieName.AUTH_TOKEN);
    if (token) {
      try {
        const data = await endQuizMutation.mutateAsync({
          args: {quiz: params.quizId as string, answers},
          token,
        });
        if (data?.success) {
          setCorrectAnswerCount(data.correctAnswerCount);
          setWrongAnswerCount(data.wrongAnswerCount);
          setGainedCoins(data.gainedCoins);
          toast.success('Quiz successfully complete');
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

  return (
    <section className={css({display: 'flex', flexDir: 'column', bgColor: 'white'})}>
      <QuizHeader quiz={quiz} answers={answers} />
      {currentQuestionIndex + 1 <= (data?.result?.questions.length || 0) ? (
        <QuizContent
          questions={quiz?.questions ?? []}
          onSetAnswer={handleSetAnswer}
          currentIndex={currentQuestionIndex}
          onBack={handleClickBack}
          onNext={handleClickNext}
          answers={answers}
        />
      ) : (
        <QuizEndButton
          handleClick={handleClick}
          correct={correctAnswerCount}
          wrong={wrongAnswerCount}
          coins={gainedCoins}
        />
      )}
    </section>
  );
};

const QuizHeader = ({quiz, answers}: {quiz: Maybe<QuizType> | undefined; answers: Answer[]}) => {
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
          justifyContent: 'start',
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
            {quiz?.title}
          </h1>
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
              {quiz?.reward}
            </div>
          </div>
        </div>
      </div>
      <div className={css({display: 'flex', alignItems: 'center', gap: '2', mt: '9'})}>
        {Array.from({length: quiz?.questions.length || 0}).map((_, index) => {
          return (
            <div
              className={css({
                display: 'grid',
                placeContent: 'center',
                w: '6',
                h: '6',
                bgColor: !!answers[index] ? '#62C2CE' : 'gray.300',
              })}
            >
              {!!answers[index] && (
                <IconCheck
                  className={css({
                    '& path': {
                      fill: '#FFF',
                    },
                  })}
                />
              )}
            </div>
          );
        })}
      </div>
    </header>
  );
};

const QuizContent = ({
  questions,
  onSetAnswer,
  currentIndex,
  onBack,
  onNext,
  answers,
}: {
  questions: QuestionType[];
  onSetAnswer: any;
  currentIndex: number;
  onBack: any;
  onNext: any;
  answers: Answer[];
}) => (
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
      borderColor: 'gray2',
      mdDown: {pl: '5', pr: '5', mt: '10', maxW: 'full'},
    })}
  >
    <div className={css({display: 'flex', gap: '5', flexDir: 'column', mdDown: {gap: '0'}})}>
      <>
        <QuizQuestion
          key={questions[currentIndex]._id}
          question={questions[currentIndex]}
          index={currentIndex + 1}
        />
        <QuizOptions
          questionId={questions[currentIndex]._id}
          handleClick={onSetAnswer}
          options={questions[currentIndex].options}
          answers={answers}
          currentIndex={currentIndex}
        />
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '8',
          })}
        >
          <button
            type='button'
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
              color: 'gray.400',
              whiteSpace: 'nowrap',
              border: '1px solid token(colors.gray3)',
              bgColor: 'white',
              mdDown: {pl: '5', pr: '5'},
              cursor: 'pointer',
            })}
            onClick={onBack}
          >
            Prev
          </button>
          <button
            type='button'
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
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </>
    </div>
  </div>
);

const QuizQuestion = ({question, index}: {question: QuestionType; index: number}) => (
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
        mdDown: {maxW: 'full'},
      })}
    >
      <h2 className={css({fontWeight: 'medium', mdDown: {maxW: 'full'}})}>
        {index < 10 ? `0${index}` : index}&nbsp;{question.question}
      </h2>
    </div>
  </div>
);

const QuizOptions = ({
  handleClick,
  options,
  questionId,
  answers,
  currentIndex,
}: {
  handleClick: any;
  options: OptionType[];
  questionId: string;
  answers: Answer[];
  currentIndex: number;
}) => (
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
      {options[0] && (
        <label
          htmlFor={`option1-${questionId}`}
          className={css({
            gridArea: '1 / 1 / 2 / 2',
            display: 'flex',
            gap: '6',
            mt: '4',
          })}
        >
          <RadioButton
            id={`option1-${questionId}`}
            name={`id-${questionId}`}
            onClick={() => handleClick(questionId, options[0].answer)}
            checked={answers[currentIndex]?.answer === options[0].answer}
          />
          <div className={css({mt: 'auto', mb: 'auto'})}>{options[0].answer}</div>
        </label>
      )}
      {options[1] && (
        <label
          htmlFor={`option2-${questionId}`}
          className={css({
            gridArea: '2 / 1 / 3 / 2',
            display: 'flex',
            gap: '6',
            mt: '4',
          })}
        >
          <RadioButton
            id={`option2-${questionId}`}
            name={`id-${questionId}`}
            onClick={() => handleClick(questionId, options[1].answer)}
            checked={answers[currentIndex]?.answer === options[1].answer}
          />
          <div className={css({mt: 'auto', mb: 'auto'})}>{options[1].answer}</div>
        </label>
      )}
      {options[2] && (
        <label
          htmlFor={`option3-${questionId}`}
          className={css({
            gridArea: '1 / 2 / 2 / 3',
            mdDown: {gridArea: '3 / 1 / 4 / 2'},
            display: 'flex',
            gap: '6',
            mt: '4',
          })}
        >
          <RadioButton
            id={`option3-${questionId}`}
            name={`id-${questionId}`}
            onClick={() => handleClick(questionId, options[2].answer)}
            checked={answers[currentIndex]?.answer === options[2].answer}
          />
          <div className={css({mt: 'auto', mb: 'auto'})}>{options[2].answer}</div>
        </label>
      )}
      {options[3] && (
        <label
          htmlFor={`option4-${questionId}`}
          className={css({
            gridArea: '2 / 2 / 3 / 3',
            mdDown: {gridArea: '4 / 1 / 5 / 2'},
            display: 'flex',
            gap: '6',
            mt: '4',
          })}
        >
          <RadioButton
            id={`option4-${questionId}`}
            name={`id-${questionId}`}
            onClick={() => handleClick(questionId, options[3].answer)}
            checked={answers[currentIndex]?.answer === options[3].answer}
          />
          <div className={css({mt: 'auto', mb: 'auto'})}>{options[3].answer}</div>
        </label>
      )}
    </div>
  </div>
);

const QuizEndButton = ({
  handleClick,
  coins,
  correct,
  wrong,
}: {
  handleClick: any;
  wrong: number;
  correct: number;
  coins: number;
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
        {correct} Correct Answers
      </p>
      <p
        className={css({
          textStyle: 'body',
          color: 'danger',
        })}
      >
        {wrong}Wrong Answers
      </p>
    </div>
    <Link
      href={`${Paths.Quiz.getPath()}/normal`}
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
    >
      Collect your {coins} points
    </Link>
  </div>
);

export default WaterSavingQuiz;
