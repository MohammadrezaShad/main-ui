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
      establishedYear
      googleMap
      plusCode
      youtube
      products {
          status
          _id
          about
          amazon
          category {
            _id
            title
            slug
          }
          createdAt
          eBay
          features {
            icon
            isMainFeature
            name
            value
          }
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
          isActive
          keywords
          rate
          sellerCompany {
            _id
            website
            title
            slug
            rate
            callNumber
            city {
              _id
              name
            }
            country {
              _id
              name
            }
          }
          slug
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
          updatedAt
          variations {
            _id
            cost
            createdAt
            isAvailable
            stock
            updatedAt
            variationAttributes {
              icon
              isMainFeature
              name
              value
            }
          }
          wallmart
        }
        _id
        about
        productAndServices
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
        city {
          _id
          createdAt
          name
          parent {
            _id
            cca2
            cca3
            createdAt
            name
            officialName
            updatedAt
          }
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
        linkdin
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
    return null as any;
  }
  return response.data.company.findCompanyBySlug;
}
