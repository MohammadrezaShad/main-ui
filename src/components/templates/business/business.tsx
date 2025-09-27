/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import {useMemo, useState} from 'react';
import {toast} from 'react-toastify';
import {css, cx} from '@styled/css';
import {Box} from '@styled/jsx';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import {useParams} from 'next/navigation';

import {IconStar} from '@/assets';
import {Ratings, Star} from '@/components/molecules/corporate-card/corporate-card.styled';
import {CookieName} from '@/constants';
import {CityType, CompanyType} from '@/graphql';
import {giveRating} from '@/graphql/query/companies/company-rate';
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
  if (activeTab === 'products') return <Products company={company} />;
  if (activeTab === 'gallery') return <Gallery slides={company?.gallery || []} />;
  return null;
};

// tiny spinner SVG
function Spinner() {
  return (
    <svg width='18' height='18' viewBox='0 0 50 50' aria-hidden>
      <circle
        cx='25'
        cy='25'
        r='20'
        stroke='currentColor'
        strokeWidth='5'
        fill='none'
        strokeLinecap='round'
        strokeDasharray='31.4 188.4'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          from='0 25 25'
          to='360 25 25'
          dur='0.8s'
          repeatCount='indefinite'
        />
      </circle>
    </svg>
  );
}

const BusinessPage = () => {
  const token = getCookie(CookieName.AUTH_TOKEN);
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingStar, setPendingStar] = useState<number | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  const queryClient = useQueryClient();

  const {data} = useQuery({
    queryKey: ['get-company', slug],
    queryFn: () => findCompanyBySlug({slug}, token),
  });

  const company = data?.result as CompanyType | undefined;

  const cityNames = Array.isArray(company?.city)
    ? (company?.city as Array<CityType>).map(c => c?.name).filter(Boolean)
    : [];

  const establishedYear = company?.establishedYear
    ? new Date(company.establishedYear as any).getFullYear()
    : null;

  const plusCode = company?.plusCode || '';
  const plusCodeLink = plusCode ? `https://maps.google.com/?q=${encodeURIComponent(plusCode)}` : '';
  const youtubeUrl = company?.youtube || '';
  const googleMapUrl = company?.googleMap || '';

  // rating shown from server (0..5)
  const serverRating = useMemo(() => {
    const r = Number(company?.rate ?? 0);
    return Number.isNaN(r) ? 0 : Math.max(0, Math.min(5, r));
  }, [company?.rate]);

  // optimistic rating while saving
  const displayedRating = pendingStar ?? serverRating;

  // toast ids to avoid duplicate stacking
  const TOAST_OK_ID = 'company-rate-ok';
  const TOAST_ERR_ID = 'company-rate-err';

  const rateMutation = useMutation({
    mutationFn: (score: number) =>
      giveRating({
        company: company!._id,
        rate: score, // 1..5
      }),
    onMutate: async score => {
      setPendingStar(score);
      await queryClient.cancelQueries({queryKey: ['get-company', slug]});
      const previous = queryClient.getQueryData(['get-company', slug]);

      queryClient.setQueryData(['get-company', slug], (old: any) => {
        if (!old?.result) return old;
        return {...old, result: {...old.result, rate: score}};
      });

      return {previous};
    },
    onError: (err, _score, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(['get-company', slug], ctx.previous);
      toast.dismiss(TOAST_OK_ID);
      toast.error((err as Error)?.message || 'Rating failed', {toastId: TOAST_ERR_ID});
    },
    onSuccess: () => {
      toast.dismiss(TOAST_ERR_ID);
      toast.success('Thanks for your rating!', {toastId: TOAST_OK_ID});
    },
    onSettled: () => {
      setPendingStar(null);
      queryClient.invalidateQueries({queryKey: ['get-company', slug]});
    },
  });

  const isSaving = rateMutation.isPending;

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
          mdDown: {mb: '[240px]'},
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mdDown: {flexDirection: 'column-reverse'},
          })}
        >
          {/* stars + loader overlay */}
          <Box
            mt='4'
            className={css({
              position: 'absolute',
              top: '70%',
              left: '[227px]',
              mdDown: {top: '200%', left: '50% !important', transform: 'translateX(-50%)'},
              zIndex: 10,
            })}
          >
            <div className={css({position: 'relative', display: 'inline-block'})}>
              <Ratings
                role='group'
                aria-label='Rate this business'
                aria-busy={isSaving ? 'true' : 'false'}
                className={css({
                  cursor: !company ? 'not-allowed' : 'pointer',
                  userSelect: 'none',
                  opacity: !company ? 0.6 : 1,
                })}
              >
                {Array.from({length: 5}).map((_, i) => {
                  const idx = i + 1;
                  const filled = idx <= displayedRating;
                  return (
                    <button
                      key={i}
                      type='button'
                      aria-label={`Rate ${idx} star${idx > 1 ? 's' : ''}`}
                      disabled={!company || isSaving}
                      onClick={() => rateMutation.mutate(idx)}
                      className={css({
                        appearance: 'none',
                        background: 'none',
                        border: 'none',
                        p: 0,
                        m: 0,
                        lineHeight: 0,
                        cursor: !company || isSaving ? 'not-allowed' : 'pointer',
                      })}
                    >
                      <Star bgColor={filled ? 'primary' : 'gray3'}>
                        <IconStar className={css({w: '4', h: '4', color: 'white'})} />
                      </Star>
                    </button>
                  );
                })}
              </Ratings>

              {isSaving && (
                <div
                  className={css({
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2',
                    background: 'rgba(255,255,255,0.6)',
                    rounded: 'md',
                  })}
                >
                  <Spinner />
                  <span className={css({fontSize: 'xs', color: '#333'})}>Saving…</span>
                </div>
              )}
            </div>
          </Box>

          <div
            className={css({
              display: 'flex',
              alignItems: 'end',
              pos: 'absolute',
              bottom: '-50%',
              ps: '[43px]',
              mdDown: {flexDirection: 'column', bottom: '-100%', ps: '0', alignItems: 'center'},
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
                  mdDown: {mt: '6'},
                })}
              >
                {company?.title}
              </h1>

              {/* Location + categories */}
              <p
                className={css({
                  textStyle: 'body',
                  color: '#333333',
                  mdDown: {textAlign: 'center'},
                })}
              >
                {cityNames.length ? cityNames.join(', ') : '—'}
                {company?.country?.name ? `, ${company.country.name}` : ''}
                <span className={css({mx: '2', color: '#E3E3E3', hideBelow: 'md'})}>|</span>
                <span className={css({display: 'inline-flex', alignItems: 'center', gap: 2})}>
                  {company?.categories?.map(category => (
                    <Link key={category._id} href={`/categories/${category._id}`}>
                      {category.slug}
                    </Link>
                  ))}
                </span>
              </p>

              {/* Meta row */}
              <div
                className={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '3',
                  color: 'gray.600',
                  fontSize: 'sm',
                  mt: '2',
                })}
              >
                {establishedYear ? <span>Established: {establishedYear}</span> : null}
                {plusCode ? (
                  <span>
                    Plus Code:{' '}
                    {plusCodeLink ? (
                      <a
                        className={css({color: 'blue.600', _hover: {textDecoration: 'underline'}})}
                        href={plusCodeLink}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {plusCode}
                      </a>
                    ) : (
                      plusCode
                    )}
                  </span>
                ) : null}
                {youtubeUrl ? (
                  <span>
                    <a
                      className={css({color: 'blue.600', _hover: {textDecoration: 'underline'}})}
                      href={youtubeUrl}
                      target='_blank'
                      rel='noreferrer'
                    >
                      YouTube
                    </a>
                  </span>
                ) : null}
                {googleMapUrl ? (
                  <span>
                    <a
                      className={css({color: 'blue.600', _hover: {textDecoration: 'underline'}})}
                      href={googleMapUrl}
                      target='_blank'
                      rel='noreferrer'
                    >
                      Google Map
                    </a>
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={css({
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          gap: '8',
          px: '4',
          mdDown: {mt: '20', flexDirection: 'column'},
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
                  mdDown: {w: 'full'},
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
                  mdDown: {w: 'full'},
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
                  mdDown: {w: 'full'},
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
