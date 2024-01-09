'use client';

import {IconFacebook, IconInstagram, IconTwitter} from '@/assets';
import {Logo, SocialMediaLinks} from '@/components';
import {FooterNavbar} from '@/components/molecules/navbar/footer';
import {SmallSelect} from '@/components/molecules/small-select';
import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import {useEffect} from 'react';
import {Container, Wrap} from './footer.styled';

const navbarItems = [
  {id: 1, title: 'Terms of Use', href: '#'},
  {id: 2, title: 'Privacy Policy', href: '#'},
  {id: 3, title: 'FAQ', href: '#'},
  {id: 4, title: 'Site Map', href: '#'},
  {id: 5, title: 'Contact us', href: '#'},
  {id: 6, title: 'About us', href: '#'},
];

const languages = [
  {id: 1, value: 'en', label: 'English'},
  {id: 2, value: 'fa', label: 'Persian'},
];

const socialMediaLinks = [
  {id: 1, icon: IconTwitter, href: ''},
  {id: 2, icon: IconInstagram, href: ''},
  {id: 3, icon: IconFacebook, href: ''},
];

const Footer = () => {
  const isClient$ = useObservable(false);

  useEffect(() => {
    isClient$.set(true);
  }, []);

  return (
    <Container>
      <Logo />
      <span
        className={css({
          textStyle: 'caption',
          color: 'gray4',
          mt: 2,
          mb: 10,
        })}
      >
        @ 2023 Waterworld Inc. All rights reserved.
      </span>
      <Wrap className={css({justifyContent: 'space-between', w: 'full'})}>
        <SocialMediaLinks links={socialMediaLinks} />
        <FooterNavbar items={navbarItems} />
        {isClient$.use() && <SmallSelect options={languages} />}
      </Wrap>
    </Container>
  );
};

export default Footer;
