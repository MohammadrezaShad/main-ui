import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';

import {CompanyQuery, FindCompanyInput} from '../../generated/types';

export async function findCompanyById(
  input: FindCompanyInput,
  token?: string,
): Promise<CompanyQuery['findCompanyById']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query Result($input: FindCompanyInput!) {
  company {
    findCompanyById(input: $input) {
      result {
        _id
        title
        about
        address
        callNumber
        categories {
          _id
          title
          slug
        }
        city {
          _id
          createdAt
          name
          toponymName
          updatedAt
        }
        country {
          _id
          cca2
          cca3
          createdAt
          name
          officialName
          updatedAt
        }
        cover {
          _id
          alt
          createdAt
          filename
          format
          height
          preview
          updatedAt
          width
        }
        createUser {
          _id
        }
        email
        facebook
        gallery {
          _id
          createdAt
          image {
            _id
            alt
            createdAt
            filename
            format
            height
            preview
            updatedAt
            width
          }
          updatedAt
        }
        instagram
        linkdin
        keywords
        productAndServices
        products {
          _id
          about
          category {
            _id
            title
            slug
          }
          isActive
          keywords
          images {
            _id
            alt
            createdAt
            filename
            format
            height
            preview
            updatedAt
            width
          }
          slug
          status
          thumbnail {
            _id
            alt
            createdAt
            filename
            format
            height
            preview
            updatedAt
            width
          }
          title
          rate
        }
        rate
        profileImage {
          _id
          alt
          createdAt
          filename
          format
          height
          preview
          updatedAt
          width
        }
        slug
        status
        twitter
        website
        worktimes {
          day
          finishTime {
            hour
            meridiem
            minute
          }
          isOpened
          startTime {
            hour
            meridiem
            minute
          }
        }
      }
    }
  }
}`,
    variables: {input},
    headers: {Authorization: `Bearer ${token}`, 'client-id': clientId},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.company.findCompanyById;
}
