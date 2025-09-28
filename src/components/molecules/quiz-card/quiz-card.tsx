'use client';

import {css} from '@styled/css';
import Image from 'next/image';
import Link from 'next/link';

import {IconWater} from '@/assets';
import {GraphicalQuizType, QuizType} from '@/graphql';

import {Container, ContentWrapper, QuestionCount, Title, Wrapper} from './quiz-card.styled';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const QuizCard = ({quiz, getQuizInfo}: {quiz: QuizType | GraphicalQuizType; getQuizInfo: any}) => {
  const renderQuestionCount = () => {
    if (quiz.__typename === 'QuizType' || Object.prototype.hasOwnProperty.call(quiz, 'questions'))
      // @ts-expect-error Might not have question
      return `${quiz.questions?.length} Questions`;
    if (
      quiz.__typename === 'GraphicalQuizType' ||
      Object.prototype.hasOwnProperty.call(quiz, 'quizPoints')
    )
      // @ts-expect-error Might not have quizPoints
      return `${quiz.quizPoints?.length} quizzes`;
    return '';
  };

  const handleClickQuiz = () => {
    getQuizInfo(quiz._id);
  };

  return (
    <Container>
      <Wrapper>
        {quiz.thumbnail?.filename ? (
          <Image
            width={128}
            height={128}
            unoptimized
            alt=''
            src={`${IMAGE_STORAGE_URL}/${quiz.thumbnail?.filename}-${quiz.thumbnail?._id}`}
            className={css({
              w: 'full',
              aspectRatio: '1.33',
              objectFit: 'cover',
              mdDown: {aspectRatio: 'square', w: '[112px]', h: '[112px]'},
            })}
          />
        ) : (
          <div
            className={css({
              w: 'full',
              aspectRatio: '1.33',
              objectFit: 'cover',
              mdDown: {aspectRatio: 'square', w: '[112px]', h: '[112px]'},
              position: 'relative',
              bgColor: 'gray1',
            })}
          >
            <IconWater
              className={css({
                w: '6',
                h: '6',
                position: 'absolute',
                top: '20%',
                left: '60%',
              })}
            />
            <IconWater
              className={css({
                w: '16',
                h: '16',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              })}
            />
          </div>
        )}
        <ContentWrapper>
          <QuestionCount>{renderQuestionCount()}</QuestionCount>
          <Title>{quiz.title}</Title>
          <Link
            href={`${quiz.__typename === 'QuizType' ? `/quizzes/normal` : '/quizzes/graphical'}/${quiz._id}`}
            className={css({
              mt: 'auto',
              color: 'info',
            })}
          >
            START THE QUIZ
          </Link>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

export default QuizCard;
