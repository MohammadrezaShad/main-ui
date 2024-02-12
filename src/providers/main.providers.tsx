'use client';

import React from 'react';

import {DEFAULT_THEME, ThemeType} from '@/constants';
import {AuthProvider, LegendProvider, QueryClientProvider, ThemeProvider} from '@/providers';

type MainProvidersProps = {
  children: React.ReactNode;
  theme?: ThemeType;
};

export default function MainProviders({children, theme}: MainProvidersProps) {
  return (
    <LegendProvider>
      <QueryClientProvider>
        <ThemeProvider theme={theme || DEFAULT_THEME}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </LegendProvider>
  );
}
