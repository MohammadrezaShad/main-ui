'use client';

import React from 'react';
import {css} from '@styled/css';

import {AuthButton} from '@/components';

import {Container, Text} from './auth-section.styled';

export default React.memo(function AuthSection() {
  return (
    <Container>
      <Text>برای نظر دادن و اشتراک گذاری در سایت عضو شوید.</Text>
      <AuthButton
        className={css({
          width: '100%',
        })}
        text='ورود به سایت'
      />
    </Container>
  );
});
