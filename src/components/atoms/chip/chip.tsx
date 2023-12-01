import {Wrapper} from './chip.styled';

interface Props {
  text: string;
  type: 'success' | 'simple';
}

const Chip = ({text, type}: Props) => {
  return <Wrapper type={type}>{text}</Wrapper>;
};

export default Chip;
