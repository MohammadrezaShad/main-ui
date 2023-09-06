'use client';

import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import LegendProvider from '@/providers/legend.provider';

type MainProvidersProps = {
  children: React.ReactNode;
};

export default function MainProviders({children}: MainProvidersProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: 3,
          },
        },
      }),
  );

  return (
    <LegendProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </LegendProvider>
  );
}
