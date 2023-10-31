import React from 'react';

import {
  IconCall,
  IconCrown,
  IconFilm,
  IconHomw2,
  IconInformation,
  IconMovie,
  IconNews,
  IconSupport,
} from '@/assets';
import Paths from '@/utils/paths';

import {NavigationItem} from './navigation-section';

export const useSidebar = () => {
  const secontionOneList: NavigationItem[] = React.useMemo(
    () => [
      {
        text: 'صفحه اول',
        link: Paths.Home.getPath(),
        icon: IconHomw2,
      },
      {
        text: 'ویکو',
        link: Paths.Viko.getPath(),
        icon: IconFilm,
      },
      {
        text: 'اختصاصی',
        link: Paths.Exclusive.getPath(),
        icon: IconCrown,
      },
      {
        text: 'اخبار',
        link: Paths.News.getPath(),
        icon: IconNews,
      },
    ],
    [],
  );
  const secontionTwoList: NavigationItem[] = React.useMemo(
    () => [
      {
        text: 'فیلم و سریال',
        link: Paths.Media.getPath(),
        icon: IconMovie,
      },
    ],
    [],
  );
  const secontionThreeList: NavigationItem[] = React.useMemo(
    () => [
      {
        text: 'پشتیبانی',
        link: Paths.Support.getPath(),
        icon: IconSupport,
      },
      {
        text: 'درباره ما',
        link: Paths.AboutUs.getPath(),
        icon: IconInformation,
      },
      {
        text: 'تماس با ما',
        link: Paths.ContactUs.getPath(),
        icon: IconCall,
      },
    ],
    [],
  );

  return {secontionOneList, secontionTwoList, secontionThreeList};
};
