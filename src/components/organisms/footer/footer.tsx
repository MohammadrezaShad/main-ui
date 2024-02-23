'use client';

import {css} from '@styled/css';
import {flex} from '@styled/patterns';

import {IconFacebook, IconGlobal, IconInstagram, IconX} from '@/assets';
import {Logo, SocialMediaLinks} from '@/components';
import {FooterNavbar} from '@/components/molecules/navbar/footer';

import {Container, Wrap} from './footer.styled';

const navbarItems = [
  {id: 1, title: 'Terms of Use', href: '#'},
  {id: 2, title: 'Privacy Policy', href: '#'},
  {id: 3, title: 'FAQ', href: '/faqs'},
  {id: 4, title: 'Site Map', href: '/sitemap.xml'},
  {id: 5, title: 'Contact us', href: '#'},
  {id: 6, title: 'About us', href: '#'},
];

const languages = [
  {id: 1, value: 'en', label: 'English'},
  {id: 2, value: 'fa', label: 'Persian'},
];

const socialMediaLinks = [
  {id: 1, icon: IconX, action: ''},
  {id: 2, icon: IconInstagram, action: ''},
  {id: 3, icon: IconFacebook, action: ''},
];

const Footer = () => (
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
      @ {new Date().getFullYear()} Waterlyst Inc. All rights reserved.
    </span>
    <Wrap className={css({justifyContent: 'space-between', w: 'full'})}>
      <SocialMediaLinks links={socialMediaLinks} />
      <FooterNavbar items={navbarItems} />
      <div
        className={flex({
          alignItems: 'center',
          gap: '3',
        })}
      >
        <IconGlobal />
        <select
          style={{backgroundColor: 'transparent'}}
          className={css({
            color: 'text.primary',
            w: '80px',
            cursor: 'pointer',
          })}
        >
          {languages.map(lang => (
            <option key={lang.id} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </Wrap>
  </Container>
);

export default Footer;
