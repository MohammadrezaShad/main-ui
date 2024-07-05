import {css, cx} from '@styled/css';

interface Props {
  text: string;
  className?: string;
}

const PrimarySubtitle = ({text, className}: Props) => {
  const defualtClassName = css({
    textStyle: {
      base: 'subtitle1',
      lgDown: 'body',
    },
    color: 'text.primary',
    lineHeight: '1.148',
    lineClamp: '2',
  });
  const subtitleClass = cx(defualtClassName, className);
  return <p className={subtitleClass}>{text}</p>;
};

export default PrimarySubtitle;
