import {css} from '@styled/css';
import Image from 'next/image';

import {coin, IconCheck} from '@/assets';
import RadioButton from '@/components/atoms/radio-button/radio-button';
import {OptionType, QuestionType, QuizType} from '@/graphql';

interface Answer {
  answer: string;
  question: string;
}

const QuizQuestions = ({
  questions,
  onSetAnswer,
  currentIndex,
  onBack,
  onNext,
  answers,
  quiz,
}: {
  questions: QuestionType[];
  onSetAnswer: any;
  currentIndex: number;
  onBack: any;
  onNext: any;
  answers: Answer[];
  quiz: QuizType;
}) => (
  <div
    id='quiz-questions-container'
    className={css({
      pt: '9',
      pb: '9',
      pr: '8',
      pl: '8',
      mt: '12',
      w: '[728px]',
      bgColor: 'white',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'gray2',
      mdDown: {pl: '5', pr: '5', mt: '10', maxW: 'full'},
      marginTop: '[-44px]',
      zIndex: '10',
      mx: 'auto',
    })}
  >
    <div className={css({display: 'flex', gap: '4', flexDir: 'column', mdDown: {gap: '0'}})}>
      <div
        className={css({
          display: 'flex',
          w: 'full',
          alignItems: 'start',
          justifyContent: 'space-between',
          mdDown: {
            display: 'none',
          },
        })}
      >
        <div>
          <h2 className={css({textStyle: 'headline3'})}>{quiz.title}</h2>
          <div className={css({display: 'flex', alignItems: 'center', gap: '2'})}>
            {Array.from({length: quiz?.questions.length || 0}).map((_, index) => (
              <div
                key={crypto.randomUUID()}
                className={css({
                  display: 'grid',
                  placeContent: 'center',
                  w: '6',
                  h: '6',
                  bgColor: answers?.[index] && index !== currentIndex ? '#62C2CE' : 'gray.300',
                })}
              >
                {answers?.[index] && index !== currentIndex && (
                  <IconCheck
                    className={css({
                      '& path': {
                        fill: '#FFF',
                      },
                    })}
                  />
                )}
              </div>
            ))}
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
            w: 'max-content',
            h: '[56px]',
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
      <QuizQuestion
        key={questions[currentIndex]?._id}
        question={questions[currentIndex]}
        index={currentIndex + 1}
      />
      <QuizOptions
        questionId={questions[currentIndex]?._id}
        handleClick={onSetAnswer}
        options={questions[currentIndex]?.options}
        answers={answers}
        currentIndex={currentIndex}
      />
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '4',
          mdDown: {
            mt: '4',
          },
        })}
      >
        <button
          type='button'
          className={css({
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 'base',
            lineHeight: 'base',
            textAlign: 'center',
            color: 'gray.400',
            whiteSpace: 'nowrap',
            border: '1px solid token(colors.gray3)',
            bgColor: 'white',
            mdDown: {pl: '5', pr: '5'},
            cursor: 'pointer',
            h: '10',
            w: '[73px]',
            display: 'flex',
            alignItems: 'center',
          })}
          onClick={onBack}
        >
          PREV
        </button>
        <button
          type='button'
          className={css({
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 'base',
            lineHeight: 'base',
            textAlign: 'center',
            color: 'white',
            whiteSpace: 'nowrap',
            bgColor: 'sky.400',
            mdDown: {pl: '5', pr: '5'},
            cursor: 'pointer',
            h: '10',
            w: '[73px]',
            display: 'flex',
            alignItems: 'center',
          })}
          onClick={onNext}
        >
          NEXT
        </button>
      </div>
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
        {index < 10 ? `0${index}` : index}.&nbsp;{question.question}
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
      w: 'full',
      mdDown: {ml: '0', w: 'full'},
    })}
  >
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
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
      <div
        className={css({
          display: 'flex',
          alignItems: 'start',
          mdDown: {
            flexDir: 'column',
          },
          gap: '4',
          w: 'full',
        })}
      >
        {options[0] && (
          <label
            htmlFor={`option1-${questionId}`}
            className={css({
              w: '1/2',
              display: 'flex',
              mdDown: {
                w: 'full',
              },
              gap: '6',
              mt: '4',
              ml: '-4',
            })}
          >
            <RadioButton
              id={`option1-${questionId}`}
              name={`id-${questionId}`}
              onClick={() => handleClick(questionId, options[0].answer)}
              checked={answers[currentIndex]?.answer === options[0].answer}
            />
            <div className={css({mb: 'auto', whiteSpace: 'normal', textAlign: 'start'})}>
              A: {options[0].answer}
            </div>
          </label>
        )}
        {options[1] && (
          <label
            htmlFor={`option2-${questionId}`}
            className={css({
              w: '1/2',
              display: 'flex',
              mdDown: {
                w: 'full',
              },
              gap: '6',
              mt: '4',
              ml: '-4',
            })}
          >
            <RadioButton
              id={`option2-${questionId}`}
              name={`id-${questionId}`}
              onClick={() => handleClick(questionId, options[1].answer)}
              checked={answers[currentIndex]?.answer === options[1].answer}
            />
            <div className={css({mb: 'auto', whiteSpace: 'normal', textAlign: 'start'})}>
              B: {options[1].answer}
            </div>
          </label>
        )}
      </div>
      <div
        className={css({
          display: 'flex',
          alignItems: 'start',
          mdDown: {
            flexDir: 'column',
          },
          gap: '4',
          w: 'full',
        })}
      >
        {options[2] && (
          <label
            htmlFor={`option3-${questionId}`}
            className={css({
              w: '1/2',
              display: 'flex',
              mdDown: {
                w: 'full',
              },
              gap: '6',
              mt: '4',
              ml: '-4',
            })}
          >
            <RadioButton
              id={`option3-${questionId}`}
              name={`id-${questionId}`}
              onClick={() => handleClick(questionId, options[2].answer)}
              checked={answers[currentIndex]?.answer === options[2].answer}
            />
            <div className={css({mb: 'auto', whiteSpace: 'normal', textAlign: 'start'})}>
              C: {options[2].answer}
            </div>
          </label>
        )}
        {options[3] && (
          <label
            htmlFor={`option4-${questionId}`}
            className={css({
              w: '1/2',
              display: 'flex',
              mdDown: {
                w: 'full',
              },
              gap: '6',
              mt: '4',
              ml: '-4',
            })}
          >
            <RadioButton
              id={`option4-${questionId}`}
              name={`id-${questionId}`}
              onClick={() => handleClick(questionId, options[3].answer)}
              checked={answers[currentIndex]?.answer === options[3].answer}
            />
            <div className={css({mb: 'auto', whiteSpace: 'normal', textAlign: 'start'})}>
              D: {options[3].answer}
            </div>
          </label>
        )}
      </div>
    </div>
  </div>
);

export default QuizQuestions;
