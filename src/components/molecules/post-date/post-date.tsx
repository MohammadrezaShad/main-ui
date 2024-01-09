import {css} from '@styled/css';

interface Props {
  date: string;
}

const convertDateFormat = (inputDate: string): string => {
  const date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(date);

  return formattedDate;
};

const PostDate = ({date}: Props) => (
  <div
    className={css({
      backgroundColor: 'primary',
      borderRadius: 4,
      w: 'max-content',
      px: '1',
      py: '1px',
    })}
  >
    <span
      className={css({
        textStyle: 'body',
        color: 'text.invert',
      })}
    >
      {convertDateFormat(date)}
    </span>
  </div>
);

export default PostDate;
