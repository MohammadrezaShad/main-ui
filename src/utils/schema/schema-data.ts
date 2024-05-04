import {
  Article,
  CreativeWorkSeries,
  EntertainmentBusiness,
  FAQPage,
  Person,
  WithContext,
} from 'schema-dts';

import {ArticleType, FaqInputType, UserOutputType} from '@/graphql';
import {formatDate} from '../format-date';

type Crumb = {
  title: string;
  pathName: string;
};

type CrumbListElementData = {
  '@type': string;
  position: number;
  item: string;
  name: string;
};

export const getOrganizationSchema = () => ({
  '@context': 'http://schema.org',
  '@type': 'Organization',
  name: 'Waterlyst',
  alternateName: 'Waterlyst',
  url: process.env.NEXT_PUBLIC_BASE_URL,
  logo: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`,
  //   contactPoint: [
  //     {
  //       '@type': 'ContactPoint',
  //       telephone: '+982191000111',
  //       contactType: 'customerService',
  //       areaServed: 'IR',
  //       availableLanguage: 'persian',
  //     },
  //     {
  //       '@type': 'ContactPoint',
  //       telephone: '+982191000111',
  //       contactType: 'sales',
  //       areaServed: 'IR',
  //       availableLanguage: 'persian',
  //     },
  //   ],
  //   sameAs: [
  //     'https://twitter.com',
  //     'https://www.instagram.com/',
  //     'https://www.linkedin.com/company/',
  //   ],
});

export const getBlogArticleSchema = (article: ArticleType): WithContext<Article> => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: article.title,
  image: article.thumbnail
    ? `${process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL}/${article.thumbnail?._id}`
    : '',
  author: {
    '@type': 'Person',
    name: `${article.author?.firstName} ${article.author?.lastName}`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Waterlyst',
    logo: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/next.svg`,
    },
  },
  datePublished: formatDate(article.publishDate),
  dateModified: formatDate(article.updatedAt),
});

export const getBreadCrumbListSchema = (data: Crumb[], breadCrumbTitle?: string) => {
  const crumbListElementArray: CrumbListElementData[] = [];
  const HOME_COUNT = 1;

  const getStructuredItem = ({title, pathName}: Crumb, position: number) => {
    const item = {
      '@type': 'ListItem',
      position,
      item: pathName ? `${process.env.NEXT_PUBLIC_BASE_URL}${pathName || ''}` : '',
      name: title,
    };
    crumbListElementArray.push(item);
  };

  data.forEach((crumb, index) => {
    getStructuredItem(crumb, index + HOME_COUNT + 1);
  });

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: HOME_COUNT,
      item: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      name: 'Home',
    },
    ...crumbListElementArray,
    {
      '@type': 'ListItem',
      position: crumbListElementArray.length + HOME_COUNT + 1,
      name: breadCrumbTitle,
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
};

export const getLocalBusinessSchema = (): WithContext<EntertainmentBusiness> => ({
  '@context': 'https://schema.org',
  '@type': 'EntertainmentBusiness',
  name: 'Waterlyst',
  isAccessibleForFree: true,
  openingHours: 'Mo-Su',
  url: process.env.NEXT_PUBLIC_BASE_URL,
  areaServed: 'IR',
  email: 'mailto:jane-doe@xyz.edu',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rasht',
    addressRegion: 'Gilan',
    postalCode: '94086',
    streetAddress: 'District 2 Motahhari Blvd',
  },
  geo: {
    '@type': 'GeoCoordinates',
    longitude: '49.59389723629701',
    latitude: '37.27634796425523',
  },
});

export const getPersonSchema = (author: UserOutputType): WithContext<Person> => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: `${author?.firstName} ${author?.lastName}`,
  url: author?.website ?? '',
  image: `${process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL}/${author?.avatar?._id}`,
});

export const getFAQSchema = (faqs: FaqInputType[]): WithContext<FAQPage> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const searchActionSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: process.env.NEXT_PUBLIC_BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${process.env.NEXT_PUBLIC_BASE_URL}/search?q={query}`,
    query: 'required',
  },
};

export const getAggregateRatingSchema = ({
  ratingValue,
  ratingCount,
  name,
  poster,
}: {
  ratingValue: number;
  ratingCount: number;
  name?: string;
  poster: string;
}): WithContext<CreativeWorkSeries> => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWorkSeries',
  name,
  image: poster,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue,
    ratingCount,
    bestRating: '10',
    worstRating: '1',
  },
});
