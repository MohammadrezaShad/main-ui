import {css, cx} from '@styled/css';

interface Props {
  title: string;
  className?: string;
}

const PrimaryTitle = ({title, className}: Props) => {
  const defaultClassName = css({
    textStyle: 'title2',
    color: 'text.primary',
    lineHeight: '1.149',
  });
  const titleClass = cx(defaultClassName, className);
  return <h1 className={titleClass}>{title}</h1>;
};

export default PrimaryTitle;
