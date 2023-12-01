import {css, cx} from '@styled/css';

interface Props {
  text: string;
  className?: string;
}

const PrimarySubtitle = ({text, className}: Props) => {
  const defualtClassName = css({
    textStyle: 'subtitle1',
    color: 'text.primary',
    lineHeight: '1.148',
  });
  const subtitleClass = cx(defualtClassName, className);
  return <h6 className={subtitleClass}>{text}</h6>;
};

export default PrimarySubtitle;
