import {css} from '@styled/css';

interface Props {
  date: string;
}

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
      {date}
    </span>
  </div>
);

export default PostDate;
