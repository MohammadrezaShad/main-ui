import {Expandable, TextField} from '@/components';
import {css} from '@styled/css';

const QUESTIONS = [
  {
    id: 1,
    question: 'Which Country is lack of water?',
    answer:
      'According to the World Resources Institute, Lebanon has the third-highest risk for water scarcity in the world, just behind Qatar and Israel. Overall, the Middle East is the region with the highest rates of water scarcity, and the effects carry an impact beyond borders.',
  },
];

const page = () => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        mx: 'auto',
        w: 'full',
        maxWidth: '960px',
        p: {lgDown: 4},
      })}
    >
      <h2
        className={css({
          textStyle: {
            base: 'title2',
            mdDown: 'h1',
          },
          color: 'text.primary',
          mt: '14',
          mb: {
            base: '6',
            mdDown: '4',
          },
          textAlign: 'center',
          w: 'full',
        })}
      >
        Questions? Look here.
      </h2>
      <p
        className={css({
          textStyle: 'body',
          color: 'gray4',
          textAlign: 'center',
          mb: {
            base: '8',
            mdDown: '6',
          },
        })}
      >
        Can’t find an answer? Contact us at Contact Page or email contact@waterdrop.com{' '}
      </p>
      <TextField
        label='Search'
        type='search'
        classes={{
          container: css({mb: {base: '16', mdDown: '8'}, w: 'full', maxW: '328px', mx: 'auto'}),
        }}
      />
      {QUESTIONS.map(faq => (
        <Expandable key={faq.question} faq={faq} />
      ))}
    </div>
  );
};

export default page;
