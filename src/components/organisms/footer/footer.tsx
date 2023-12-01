'use client';
import {IconFacebook, IconInstagram, IconTwitter} from '@/assets';
import {Logo} from '@/components';
import {FooterNavbar} from '@/components/molecules/navbar/footer';
import {SmallSelect} from '@/components/molecules/small-select';
import {css} from '@styled/css';
import Link from 'next/link';
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
        <ul
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          })}
        >
          <li>
            <Link
              className={css({
                display: 'grid',
                placeItems: 'center',
              })}
              href=''
            >
              <IconTwitter className={css({fill: '#272727', w: 6, h: 6})} />
            </Link>
          </li>
          <li>
            <Link
              className={css({
                display: 'grid',
                placeItems: 'center',
              })}
              href=''
            >
              <IconInstagram className={css({fill: '#272727', w: 6, h: 6})} />
            </Link>
          </li>
          <li>
            <Link
              className={css({
                display: 'grid',
                placeItems: 'center',
              })}
              href=''
            >
              <IconFacebook className={css({fill: '#272727', w: 6, h: 6})} />
            </Link>
          </li>
        </ul>
        <FooterNavbar items={navbarItems} />
        <SmallSelect options={languages} />
      </Wrap>
    </Container>
  );
};

export default Footer;
