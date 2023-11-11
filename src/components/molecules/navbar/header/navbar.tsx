import Link from 'next/link';
import {Container, Item} from './navbar.styled';

const Navbar = () => {
  return (
    <Container>
      <Item _isActive={true}>
        <Link href=''>Articles</Link>
      </Item>
      <Item>
        <Link href=''>About</Link>
      </Item>
      <Item>
        <Link href=''>Quizzes</Link>
      </Item>
      <Item>
        <Link href=''>Water Crisis</Link>
      </Item>
      <Item>
        <Link href=''>Contact</Link>
      </Item>
    </Container>
  );
};

export default Navbar;
