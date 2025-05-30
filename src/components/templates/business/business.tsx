'use client';

import {useState} from 'react';
import {css, cx} from '@styled/css';
import {Box} from '@styled/jsx';
import {useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import {useParams} from 'next/navigation';

import {IconStar} from '@/assets';
import {Ratings, Star} from '@/components/molecules/corporate-card/corporate-card.styled';
import {CookieName} from '@/constants';
import {CompanyType} from '@/graphql';
import {findCompanyBySlug} from '@/graphql/query/companies/find-company-by-slug';

import {Gallery} from './gallery.tab';
import {InfoBox} from './info-box';
import {Overview} from './overview.tab';
import {Products} from './products.tab';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const TabContent = ({activeTab, company}: {activeTab: string; company: CompanyType}) => {
  if (activeTab === 'overview') {
    return <Overview about={company?.about || ''} services={company?.productAndServices} />;
  }
  if (activeTab === 'products') {
    return <Products company={company} />;
  }
  if (activeTab === 'gallery') {
    return <Gallery slides={company?.gallery || []} />;
  }

  return null;
};

const BusinessPage = () => {
  const token = getCookie(CookieName.AUTH_TOKEN);
  const [activeTab, setActiveTab] = useState('overview');

  const params = useParams();
  const {data, refetch} = useQuery({
    queryKey: ['get-company', params.slug],
    queryFn: () => findCompanyBySlug({slug: params.slug as string}, token),
  });
  const company = data?.result;

  return (
    <div className={css({width: '100%'})}>
      <div
        style={{
          backgroundImage: `url(${IMAGE_STORAGE_URL}/${company?.cover?.filename}-${company?.cover?._id})`,
        }}
        className={css({
          width: '100%',
          mb: '[100px]',
          pb: '8',
          borderBottom: '1px solid #ccc',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '[160px]',
          pos: 'relative',
          mdDown: {
            mb: '[240px]',
          },
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mdDown: {
              flexDirection: 'column-reverse',
            },
          })}
        >
          <Box
            mt='4'
            className={css({
              position: 'absolute',
              top: '70%',
              left: '[227px]',
              mdDown: {
                top: '200%',
                left: '50% !important',
                transform: 'translateX(-50%)',
              },
            })}
          >
            <Ratings>
              {[...Array(5)].map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Star key={index} bgColor={index < (company?.rate || 0) ? 'primary' : 'gray3'}>
                  <IconStar
                    className={css({
                      w: '4',
                      h: '4',
                      color: 'white',
                    })}
                  />
                </Star>
              ))}
            </Ratings>
          </Box>
          <div
            className={css({
              display: 'flex',
              alignItems: 'end',
              pos: 'absolute',
              bottom: '-50%',
              ps: '[43px]',
              mdDown: {
                flexDirection: 'column',
                // pos: 'static',
                bottom: '-100%',
                ps: '0',
                alignItems: 'center',
              },
            })}
          >
            <Image
              unoptimized
              width={160}
              height={160}
              src={`${IMAGE_STORAGE_URL}/${company?.profileImage?.filename}-${company?.profileImage?._id}`}
              alt='Business Avatar'
              className={css({
                borderRadius: '50%',
                width: '160px',
                height: '160px',
                mr: '6',
                mdDown: {mr: '0'},
              })}
            />
            <div>
              <h1
                className={css({
                  textStyle: 'h1',
                  color: '#333333',
                  mt: '[33px]',
                  mdDown: {
                    mt: '6',
                  },
                })}
              >
                {company?.title}
              </h1>
              <p
                className={css({
                  textStyle: 'body',
                  color: '#333333',
                  mdDown: {textAlign: 'center'},
                })}
              >
                {company?.city?.name}, {company?.country?.name}
                <span className={css({mx: '2', color: '#E3E3E3', hideBelow: 'md'})}>|</span>
                <span className={css({display: 'inline-flex', alignItems: 'center', gap: 2})}>
                  {company?.categories?.map(category => (
                    <Link key={category._id} href={`/categories/${category._id}`}>
                      {category.slug}
                    </Link>
                  ))}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={css({
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          gap: '8',
          px: '4',
          mdDown: {
            mt: '20',
            flexDirection: 'column',
          },
        })}
      >
        <div className={css({flex: '3', p: '8', mdDown: {w: 'full', p: '4'}})}>
          <div
            className={css({
              display: 'flex',
              gap: '6',
              borderBottom: '1px solid #E3E3E3',
              mb: '6',
              mdDown: {w: 'full'},
            })}
          >
            <button
              type='button'
              className={cx(
                css({
                  pb: '2.5',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'overview' ? '2px solid #44BAEB' : 'none',
                  fontWeight: '500',
                  mdDown: {
                    w: 'full',
                  },
                }),
              )}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              type='button'
              className={cx(
                css({
                  pb: '2.5',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'products' ? '2px solid #44BAEB' : 'none',
                  fontWeight: '500',
                  mdDown: {
                    w: 'full',
                  },
                }),
              )}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button
              type='button'
              className={cx(
                css({
                  pb: '2.5',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'gallery' ? '2px solid #44BAEB' : 'none',
                  fontWeight: '500',
                  mdDown: {
                    w: 'full',
                  },
                }),
              )}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
          </div>

          <TabContent activeTab={activeTab} company={company as CompanyType} />
        </div>

        <InfoBox company={company as CompanyType} />
      </div>
    </div>
  );
};

export default BusinessPage;
