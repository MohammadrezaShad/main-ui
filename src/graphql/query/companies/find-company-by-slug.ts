import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';

import {CompanyQuery, FindCompanyBySlugInput} from '../../generated/types';

export async function findCompanyBySlug(
  input: FindCompanyBySlugInput,
  token?: string,
): Promise<CompanyQuery['findCompanyBySlug']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindCompanyBySlug($input: FindCompanyBySlugInput!) {
  company {
    findCompanyBySlug(input: $input) {
      success
      result {
        _id
        about
        address
        callNumber
        categories {
          _id
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
          order
          isDescriptionApproved
          originalDescription
          postCount
          slug
          title
        }
        city
        country
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
          avatar {
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
          displayName
          email
          firstName
          username
          lastName
          nickname
        }
        createdAt
        email
        facebook
        gallery {
          _id
          company {
            _id
            slug
            title
          }
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
        keywords
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
        rate
        registeredDate
        slug
        title
        twitter
        updateUser {
          _id
          avatar {
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
          displayName
          email
          firstName
          username
          lastName
          nickname
        }
        updatedAt
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
  return response.data.company.findCompanyBySlug;
}
