import {IconCheck, coin} from '@/assets';
import RadioButton from '@/components/atoms/radio-button/radio-button';
import {OptionType, QuestionType, QuizType} from '@/graphql';
import {css} from '@styled/css';
import Image from 'next/image';

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
    <div className={css({display: 'flex', gap: '5', flexDir: 'column', mdDown: {gap: '0'}})}>
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
          <h2 className={css({textStyle: 'headline3'})}>Quiz {currentIndex + 1}</h2>
          <div className={css({display: 'flex', alignItems: 'center', gap: '2'})}>
            {Array.from({length: quiz?.questions.length || 0}).map((_, index) => (
              <div
                key={crypto.randomUUID()}
                className={css({
                  display: 'grid',
                  placeContent: 'center',
                  w: '6',
                  h: '6',
                  bgColor: answers?.[index] ? '#62C2CE' : 'gray.300',
                })}
              >
                {answers?.[index] && (
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
            checked={answers?.[currentIndex]?.answer === options[0].answer}
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
            checked={answers?.[currentIndex]?.answer === options[1].answer}
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
            checked={answers?.[currentIndex]?.answer === options[2].answer}
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
            checked={answers?.[currentIndex]?.answer === options[3].answer}
          />
          <div className={css({mt: 'auto', mb: 'auto'})}>{options[3].answer}</div>
        </label>
      )}
    </div>
  </div>
);

export default QuizQuestions;
