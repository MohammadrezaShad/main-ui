import {css} from '@styled/css';

interface Props {
  text: string;
}

const PrimarySubtitle = ({text}: Props) => {
  return (
    <h6
      className={css({
        textStyle: 'subtitle1',
        color: 'text.primary',
        lineHeight: '1.148',
      })}
    >
      {text}
    </h6>
  );
};

export default PrimarySubtitle;
