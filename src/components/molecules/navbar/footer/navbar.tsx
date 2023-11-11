import {css} from '@styled/css';
import Link from 'next/link';
import {Container} from './navbar.styled';

const Navbar = ({items}: {items: Array<any>}) => {
  return (
    <Container>
      {items.map(item => (
        <li key={item.id}>
          <Link className={css({textStyle: 'body', color: 'text.primary'})} href={item.href}>
            {item.title}
          </Link>
        </li>
      ))}
    </Container>
  );
};

export default Navbar;
