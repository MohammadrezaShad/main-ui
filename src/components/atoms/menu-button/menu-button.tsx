'use client';

import {css, cx} from '@styled/css';

import Menu from '@/assets/vectors/icon-menu.svg';
import {useMenuContext} from '@/contexts';

import {Container} from './menu-buttonstyled';

interface MenuButtonProps {
  className?: string;
}

export default function MenuButton({className}: MenuButtonProps) {
  const defaultClassName = css({});
  const containerClass = cx(defaultClassName, className);
  const {isToggled$: isOpen$} = useMenuContext();
  const isOpen = isOpen$.use();

  const handleToggleMenu = () => {
    isOpen$.set(!isOpen);
  };

  return (
    <Container className={containerClass} onClick={handleToggleMenu}>
      <Menu />
    </Container>
  );
}
