'use client';

import {toast} from 'react-toastify';
import {css} from '@styled/css';
import {getCookie} from 'cookies-next';
import Image from 'next/image';

import {CookieName} from '@/constants';
import {GraphicalQuizType, QuizType} from '@/graphql';

import {Button, Container, ContentWrapper, QuestionCount, Title, Wrapper} from './quiz-card.styled';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const QuizCard = ({quiz, getQuizInfo}: {quiz: QuizType | GraphicalQuizType; getQuizInfo: any}) => {
  const renderQuestionCount = () => {
    if (quiz.__typename === 'QuizType') return `${quiz.questions.length} Questions`;
    if (quiz.__typename === 'GraphicalQuizType') return `${quiz.quizPoints.length} quizzes`;
    return '';
  };

  const handleClickQuiz = () => {
    const token = getCookie(CookieName.AUTH_TOKEN);
    if (!token) {
      toast.error('You must log in first');
    } else {
      getQuizInfo(quiz._id);
    }
  };

  return (
    <Container>
      <Wrapper>
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
        <ContentWrapper>
          <QuestionCount>{renderQuestionCount()}</QuestionCount>
          <Title>{quiz.title}</Title>
          <Button onClick={handleClickQuiz} type='button'>
            START THE QUIZ
          </Button>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

export default QuizCard;
