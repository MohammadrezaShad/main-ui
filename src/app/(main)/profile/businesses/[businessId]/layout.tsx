import type React from 'react';
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {findCompanyById, searchCompanyCategories} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

import Sidebar from '../_components/sidebar';

interface Props {
  children: React.ReactNode;
  params: {
    businessId: string;
  };
}

export default async function RootLayout({children, params: initalParams}: Props) {
  const params = await initalParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['find-business', params.businessId],
    queryFn: () => findCompanyById({id: params.businessId}),
  });

  await queryClient.prefetchQuery({
    queryKey: ['search-business-categories'],
    queryFn: () => searchCompanyCategories({}),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div
      className={css({
        display: 'flex',
        bgColor: 'white',
        mdDown: {
          flexDirection: 'column',
        },
      })}
    >
      <Hydrate state={dehydratedState}>
        <Sidebar />
        {children}
      </Hydrate>
    </div>
  );
}
