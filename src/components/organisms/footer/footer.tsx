'use client';
import {IconFacebook, IconInstagram, IconTwitter} from '@/assets';
import {Logo, SocialMediaLinks} from '@/components';
import {FooterNavbar} from '@/components/molecules/navbar/footer';
import {SmallSelect} from '@/components/molecules/small-select';
import {css} from '@styled/css';
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
  {icon: IconTwitter, href: ''},
  {icon: IconInstagram, href: ''},
  {icon: IconFacebook, href: ''},
];

const Footer = () => {
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
        <SmallSelect options={languages} />
      </Wrap>
    </Container>
  );
};

export default Footer;
