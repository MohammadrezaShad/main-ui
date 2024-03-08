'use client';

import {css} from '@styled/css';
import Image from 'next/image';
import {useEffect, useState} from 'react';

import {coin} from '@/assets';
import RadioButton from '@/components/atoms/radio-button/radio-button';
import {CookieName} from '@/constants';
import {EndQuizInput, OptionType, QuestionType, QuizType, endQuiz, findQuizById} from '@/graphql';
import useCountdownTimer from '@/hooks/use-countdown-timer';
import {Paths} from '@/utils';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {useParams, useRouter} from 'next/navigation';
import {toast} from 'react-toastify';
import {Maybe} from 'yup';

const WaterSavingQuiz = () => {
  const router = useRouter();
  const params = useParams();
  const {data} = useQuery({
    queryKey: ['find-quiz-by-id', params.quizId],
    queryFn: () => findQuizById({id: params.quizId as string}),
  });
  const quiz = data?.result;

  const endQuizMutation = useMutation({
    mutationFn: ({args, token}: {args: EndQuizInput; token: string}) => endQuiz(args, token),
  });
  const [answers, setAnswers] = useState<{answer: string; question: string}[]>([]);

  const handleSetAnswer = (questionId: string, answer: string) => {
    const questionIndex = answers.findIndex(answer => answer.question == questionId);
    if (questionIndex) {
      setAnswers(prev => [...prev, {question: questionId, answer}]);
    } else {
      const newAnswers = [...answers];
      newAnswers[questionIndex] = {question: questionId, answer};
      setAnswers(newAnswers);
    }
  };

  const handleClick = async () => {
    const token = getCookie(CookieName.AUTH_TOKEN);
    // Handle button click event
    if (token) {
      try {
        await endQuizMutation.mutateAsync({
          args: {quiz: params.quizId as string, answers},
          token,
        });
        if (endQuizMutation.data?.success) {
          toast.success('Quiz successfully complete');
          setTimeout(() => {
            router.push(`${Paths.Quiz.getPath()}/normal`);
          }, 1000);
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
      <QuizHeader quiz={quiz} />
      <QuizContent questions={quiz?.questions ?? []} onSetAnswer={handleSetAnswer} />
      <QuizEndButton handleClick={handleClick} />
    </section>
  );
};

const QuizHeader = ({quiz}: {quiz: Maybe<QuizType> | undefined}) => {
  const {timeRemaining, percentageRemaining, isTimeout} = useCountdownTimer(quiz?.duration ?? 300);

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
              {quiz?.reward}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const QuizContent = ({questions, onSetAnswer}: {questions: QuestionType[]; onSetAnswer: any}) => (
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
      {questions.map((question, index) => (
        <>
          <QuizQuestion key={question._id} question={question} index={index + 1} />
          <QuizOptions
            questionId={question._id}
            handleClick={onSetAnswer}
            options={question.options}
          />
        </>
      ))}
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
}: {
  handleClick: any;
  options: OptionType[];
  questionId: string;
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
          />
          <div className={css({mt: 'auto', mb: 'auto'})}>{options[3].answer}</div>
        </label>
      )}
    </div>
  </div>
);

const QuizEndButton = ({handleClick}: {handleClick: any}) => (
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
    onClick={handleClick}
  >
    End
  </button>
);

export default WaterSavingQuiz;
