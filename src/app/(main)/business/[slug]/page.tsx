// app/companies/[slug]/page.tsx
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import type {Metadata} from 'next';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

import {BusinessView} from '@/components';
import {CookieName} from '@/constants';
import {findCompanyBySlug} from '@/graphql/query/companies/find-company-by-slug';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

/* ---------- ENV HELPERS ---------- */
const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL || '';

const absUrl = (pathOrUrl?: string | null) => {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (!SITE_URL) return undefined;
  return `${SITE_URL.replace(/\/+$/, '')}/${String(pathOrUrl).replace(/^\/+/, '')}`;
};

const shortText = (s?: string | null, max = 160) => {
  if (!s) return '';
  const clean = s.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
};

const primaryImage = (company: any): string | undefined => {
  const p = company?.profileImage;
  if (p?.filename && p?._id) return `${IMAGE_STORAGE_URL}/${p.filename}-${p._id}`;
  const c = company?.cover;
  if (c?.filename && c?._id) return `${IMAGE_STORAGE_URL}/${c.filename}-${c._id}`;
  return undefined;
};

const socialLinks = (c: any) =>
  [c?.facebook, c?.instagram, c?.twitter, c?.linkdin, c?.youtube].filter(Boolean) as string[];

/* ---------- generateMetadata ---------- */
export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
  const token = (await cookies()).get(CookieName.AUTH_TOKEN)?.value;
  const data = await findCompanyBySlug({slug: params.slug}, token);
  const company = data?.result;

  const pageUrl = absUrl(`/companies/${params.slug}`);

  if (!company) {
    return {
      title: 'Business not found',
      description: 'This business could not be found.',
      alternates: {canonical: pageUrl},
      openGraph: {
        type: 'website',
        url: pageUrl,
        title: 'Business not found',
        description: 'This business could not be found.',
      },
      robots: {index: false, follow: false},
    };
  }

  const city = Array.isArray(company.city) ? company.city[0]?.name : '';
  const country = company?.country?.name;
  const locationSuffix = [city, country].filter(Boolean).join(', ');

  const title = company.title
    ? `${company.title}${locationSuffix ? ` — ${locationSuffix}` : ''}`
    : 'Business';

  const description =
    shortText(company.about) ||
    shortText(
      Array.isArray(company.productAndServices)
        ? company.productAndServices.join(' • ')
        : company.productAndServices,
      160,
    ) ||
    'Company profile, services, and contact info.';

  const imageUrl = primaryImage(company);
  const keywords: string[] = Array.isArray(company?.keywords) ? company.keywords : [];

  return {
    title,
    description,
    keywords,
    alternates: {canonical: pageUrl},
    openGraph: {
      type: 'website', // Next.js OG type union doesn't include "business" or "product"
      url: pageUrl,
      siteName: 'YourSite',
      title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: company?.profileImage?.width || company?.cover?.width || 1200,
              height: company?.profileImage?.height || company?.cover?.height || 630,
              alt: company?.profileImage?.alt || company?.cover?.alt || company?.title || '',
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    // Sprinkle business meta as custom tags if you want
    other: {
      ...(company?.callNumber ? {'business:contact_data:phone_number': company.callNumber} : {}),
      ...(company?.website ? {'business:contact_data:website': company.website} : {}),
      ...(city ? {'place:location:city': city} : {}),
      ...(country ? {'place:location:country': country} : {}),
    },
    robots: {index: true, follow: true},
  };
}

/* ---------- Page (with server prefetch + JSON-LD) ---------- */
const Page = async ({params: initalParams}: {params: {slug: string}}) => {
  const params = await initalParams;

  const token = (await cookies()).get(CookieName.AUTH_TOKEN)?.value;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['get-company', params.slug],
    queryFn: () => findCompanyBySlug({slug: params.slug}, token),
  });

  const dehydratedState = dehydrate(queryClient);
  const data: any = queryClient.getQueryData(['get-company', params.slug]);
  if (!data) {
    redirect('/not-found');
  }
  const company = data?.result;
  const pageUrl = absUrl(`/companies/${params.slug}`);

  const sameAs = socialLinks(company);
  const city = Array.isArray(company?.city) ? company?.city[0]?.name : '';

  const jsonLd = company
    ? {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness', // or "Organization" if not a local business
        name: company.title,
        description: shortText(company.about) || undefined,
        url: pageUrl,
        image: primaryImage(company) ? [primaryImage(company)] : undefined,
        telephone: company?.callNumber || undefined,
        sameAs: sameAs.length ? sameAs : undefined,
        address:
          company?.address || city || company?.country?.name
            ? {
                '@type': 'PostalAddress',
                streetAddress: company?.address || undefined,
                addressLocality: city || undefined,
                addressCountry: company?.country?.name || undefined,
              }
            : undefined,
        aggregateRating:
          Number.isFinite(Number(company?.rate)) && (company?.rate || 0) > 0
            ? {
                '@type': 'AggregateRating',
                ratingValue: Number(company.rate).toFixed(1),
                reviewCount: undefined, // fill if you store it
              }
            : undefined,
      }
    : null;

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        mx: 'auto',
        maxWidth: '1920px',
      })}
    >
      {jsonLd ? (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      ) : null}

      <Hydrate state={dehydratedState}>
        <BusinessView />
      </Hydrate>
    </div>
  );
};

export default Page;
