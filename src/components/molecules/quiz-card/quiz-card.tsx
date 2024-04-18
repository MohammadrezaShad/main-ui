'use client';

import {QuizType} from '@/graphql';
import {css} from '@styled/css';
import Image from 'next/image';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const QuizCard = ({quiz, getQuizInfo}: {quiz: QuizType; getQuizInfo: any}) => (
  <div
    className={css({
      display: 'flex',
      flexDir: 'column',
      w: '100%',
      mdDown: {ml: '0', w: 'full'},
    })}
  >
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        flexGrow: '1',
        pb: '6',
        w: 'full',
        bgColor: 'white',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'gray3',
        mdDown: {mt: '6', flexDir: 'row', borderWidth: '0'},
      })}
    >
      <Image
        width={128}
        height={128}
        unoptimized
        alt=''
        src={`${IMAGE_STORAGE_URL}/${quiz.thumbnail?._id}`}
        className={css({
          w: 'full',
          aspectRatio: '1.33',
          objectFit: 'cover',
          mdDown: {aspectRatio: 'square', w: '[112px]', h: '[112px]'},
        })}
      />
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignSelf: 'flex-start',
          mt: '7',
          ml: '6',
          mdDown: {ml: '2.5', mt: '0'},
        })}
      >
        <div
          className={css({
            fontSize: 'xs',
            lineHeight: 'xs',
            fontWeight: 'light',
            color: 'gray4',
          })}
        >
          {quiz.questions.length} Questions
        </div>
        <div
          className={css({
            mt: '2',
            fontSize: 'base',
            lineHeight: 'base',
            fontWeight: 'medium',
            color: 'text.primary',
          })}
        >
          {quiz.title}
        </div>
        <button
          onClick={() => getQuizInfo(quiz._id)}
          type='button'
          className={css({
            cursor: 'pointer',
            mt: '9',
            textAlign: 'left',
            fontSize: 'sm',
            lineHeight: 'sm',
            color: 'primary',
            mdDown: {mt: '8'},
          })}
        >
          START THE QUIZ
        </button>
      </div>
    </div>
  </div>
);

export default QuizCard;
