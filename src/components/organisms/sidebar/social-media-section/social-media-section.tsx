'use client';

import React from 'react';

import {IconInstagram, IconTelegram, IconTwitter, IconWhatsapp} from '@/assets';

import {Container, Item, List, Text} from './social-media-section.styled';

export default React.memo(function SocialMediaSection() {
  return (
    <Container>
      <Text>شبکه های اجتماعی</Text>
      <List>
        <Item>
          <IconTwitter />
        </Item>
        <Item>
          <IconInstagram />
        </Item>
        <Item>
          <IconWhatsapp />
        </Item>
        <Item>
          <IconTelegram />
        </Item>
      </List>
    </Container>
  );
});
