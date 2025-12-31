/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import {useMemo, useState} from 'react';
import {toast} from 'react-toastify';
import {css, cx} from '@styled/css';
import {Box, Flex} from '@styled/jsx';
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

type TabKey = 'overview' | 'products' | 'gallery';

const TabContent = ({activeTab, company}: {activeTab: TabKey; company: CompanyType}) => {
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

const buildImageUrl = (file?: {filename?: string | null; _id?: string | null} | null) => {
  if (!IMAGE_STORAGE_URL) return '';
  if (!file?.filename || !file?._id) return '';
  return `${IMAGE_STORAGE_URL}/${file.filename}-${file._id}`;
};

const BusinessPage = () => {
  const token = getCookie(CookieName.AUTH_TOKEN);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [pendingStar, setPendingStar] = useState<number | null>(null);

  const params = useParams();
  const slug = params.slug as string;

  const queryClient = useQueryClient();

  const {data} = useQuery({
    queryKey: ['get-company', slug],
    queryFn: () => findCompanyBySlug({slug}, token),
  });

  const company = data?.result as CompanyType | undefined;

  const coverSrc = buildImageUrl(company?.cover as any);
  const avatarSrc = buildImageUrl(company?.profileImage as any);

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
      {/* ===================== HERO (fixed cover sizing + clean card) ===================== */}
      <section
        className={css({
          position: 'relative',
          width: 'full',
          minH: {base: '[260px]', md: '[360px]'},
          borderBottom: '1px solid #EAEAEA',
        })}
      >
        {/* Cover image behind everything */}
        {coverSrc ? (
          <Image
            unoptimized
            src={coverSrc}
            alt={`${company?.title || 'Business'} cover`}
            fill
            priority
            sizes='100vw'
            className={css({
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'scale(1.02)',
            })}
          />
        ) : (
          <div
            className={css({
              position: 'absolute',
              inset: 0,
              bgGradient: 'to-br',
              gradientFrom: 'gray.200',
              gradientVia: 'gray.300',
              gradientTo: 'gray.400',
            })}
          />
        )}

        {/* Gradient overlay for readability */}
        <div
          className={css({
            position: 'absolute',
            inset: 0,
            bgGradient: 'to-b',
            gradientFrom: 'rgba(0,0,0,0.05)',
            gradientVia: 'rgba(0,0,0,0.25)',
            gradientTo: 'rgba(0,0,0,0.55)',
          })}
        />

        {/* Hero content */}
        <div
          className={css({
            position: 'relative',
            zIndex: 2,
            maxW: '[1200px]',
            mx: 'auto',
            px: {base: '4', md: '8'},
            height: 'full',
            minH: {base: '[260px]', md: '[360px]'},
            display: 'flex',
            alignItems: 'flex-end',
            pb: {base: '5', md: '8'},
          })}
        >
          {/* Light card */}
          <div
            className={css({
              width: 'full',
              borderRadius: '16px',
              bgColor: 'rgba(255,255,255,0.96)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
              p: {base: '4', md: '6'},
            })}
          >
            <Flex
              gap='6'
              alignItems={{base: 'flex-start', md: 'center'}}
              justifyContent='space-between'
              flexDirection={{base: 'column', md: 'row'}}
            >
              {/* Left: avatar + title/meta */}
              <Flex gap='4' alignItems={{base: 'flex-start', md: 'center'}} flexWrap='wrap'>
                {/* Avatar (correct size) */}
                <div
                  className={css({
                    width: '[88px]',
                    height: '[88px]',
                    md: {width: '[110px]', height: '[110px]'},
                    borderRadius: 'full',
                    overflow: 'hidden',
                    bgColor: 'white',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                    flex: '0 0 auto',
                  })}
                >
                  {avatarSrc ? (
                    <Image
                      unoptimized
                      src={avatarSrc}
                      alt='Business Avatar'
                      width={110}
                      height={110}
                      className={css({width: 'full', height: 'full', objectFit: 'cover'})}
                    />
                  ) : (
                    <div
                      className={css({
                        width: 'full',
                        height: 'full',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'gray.600',
                        fontSize: 'xs',
                      })}
                    >
                      —
                    </div>
                  )}
                </div>

                <div>
                  <h1 className={css({textStyle: 'h1', color: '#111', lineHeight: 'short'})}>
                    {company?.title || '—'}
                  </h1>

                  <p
                    className={css({
                      mt: '1',
                      textStyle: 'body',
                      color: '#444',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '2',
                      alignItems: 'center',
                    })}
                  >
                    <span>{cityNames.length ? cityNames.join(', ') : '—'}</span>
                    {company?.country?.name ? <span>, {company.country.name}</span> : null}
                    <span className={css({mx: '2', color: '#E3E3E3'})}>|</span>
                    <span className={css({display: 'inline-flex', gap: '2', flexWrap: 'wrap'})}>
                      {company?.categories?.slice(0, 6)?.map(category => (
                        <Link
                          key={category._id}
                          href={`/categories/${category._id}`}
                          className={css({
                            color: '#2B7DB5',
                            _hover: {textDecoration: 'underline'},
                          })}
                        >
                          {category.slug}
                        </Link>
                      ))}
                    </span>
                  </p>

                  {/* Meta row */}
                  <div
                    className={css({
                      mt: '2.5',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4',
                      color: '#666',
                      fontSize: 'sm',
                    })}
                  >
                    {establishedYear ? <span>Established: {establishedYear}</span> : null}

                    {plusCode ? (
                      <span>
                        Plus Code:{' '}
                        <a
                          className={css({color: '#2B7DB5', _hover: {textDecoration: 'underline'}})}
                          href={plusCodeLink}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {plusCode}
                        </a>
                      </span>
                    ) : null}

                    {youtubeUrl ? (
                      <a
                        className={css({color: '#2B7DB5', _hover: {textDecoration: 'underline'}})}
                        href={youtubeUrl}
                        target='_blank'
                        rel='noreferrer'
                      >
                        YouTube
                      </a>
                    ) : null}

                    {googleMapUrl ? (
                      <a
                        className={css({color: '#2B7DB5', _hover: {textDecoration: 'underline'}})}
                        href={googleMapUrl}
                        target='_blank'
                        rel='noreferrer'
                      >
                        Google Map
                      </a>
                    ) : null}
                  </div>
                </div>
              </Flex>

              {/* Right: Rating (clean, not absolute positioned) */}
              <Box>
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

                  {isSaving ? (
                    <div
                      className={css({
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2',
                        background: 'rgba(255,255,255,0.65)',
                        rounded: 'md',
                      })}
                    >
                      <Spinner />
                      <span className={css({fontSize: 'xs', color: '#333'})}>Saving…</span>
                    </div>
                  ) : null}
                </div>

                <div className={css({mt: '2', fontSize: 'xs', color: '#666', textAlign: 'right'})}>
                  Tap to rate
                </div>
              </Box>
            </Flex>
          </div>
        </div>
      </section>

      {/* ===================== CONTENT ===================== */}
      <div
        className={css({
          maxW: '[1200px]',
          mx: 'auto',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          gap: '8',
          px: {base: '4', md: '8'},
          py: {base: '6', md: '8'},
          mdDown: {flexDirection: 'column'},
        })}
      >
        <div className={css({flex: '3', w: 'full'})}>
          {/* Tabs */}
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
                  fontWeight: '600',
                  color: activeTab === 'overview' ? '#111' : '#666',
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
                  fontWeight: '600',
                  color: activeTab === 'products' ? '#111' : '#666',
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
                  fontWeight: '600',
                  color: activeTab === 'gallery' ? '#111' : '#666',
                }),
              )}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
          </div>

          {company ? <TabContent activeTab={activeTab} company={company} /> : null}
        </div>

        {company ? <InfoBox company={company} /> : null}
      </div>
    </div>
  );
};

export default BusinessPage;
