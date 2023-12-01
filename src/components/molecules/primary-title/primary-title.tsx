import {css} from '@styled/css';

interface Props {
  title: string;
}

const PrimaryTitle = ({title}: Props) => {
  return (
    <h1
      className={css({
        textStyle: 'title2',
        color: 'text.primary',
        lineHeight: '1.149',
      })}
    >
      {title}
    </h1>
  );
};

export default PrimaryTitle;
