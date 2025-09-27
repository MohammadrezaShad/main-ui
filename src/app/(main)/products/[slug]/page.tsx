// app/products/[slug]/page.tsx (or wherever this file lives)
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import type {Metadata} from 'next';
import {unstable_noStore as noStore} from 'next/cache';

import {ProductView} from '@/components';
import {findProductBySlug} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL || '';

/* -------------------------- helpers for metadata -------------------------- */
function absUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (!SITE_URL) return undefined;
  // ensure single slash
  return `${SITE_URL.replace(/\/+$/, '')}/${String(pathOrUrl).replace(/^\/+/, '')}`;
}

function primaryImage(product: any): string | undefined {
  const thumb = product?.thumbnail;
  if (thumb?.filename && thumb?._id) {
    return `${IMAGE_STORAGE_URL}/${thumb.filename}-${thumb._id}`;
  }
  const img = product?.images?.[0];
  if (img?.filename && img?._id) {
    return `${IMAGE_STORAGE_URL}/${img.filename}-${img._id}`;
  }
  return undefined;
}

function shortText(s?: string | null, max = 160) {
  if (!s) return '';
  const clean = s.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

function lowestPrice(product: any): number | undefined {
  const prices = (product?.variations || [])
    .map((v: any) => Number(v?.cost))
    .filter((n: number) => Number.isFinite(n));
  if (!prices.length) return undefined;
  return Math.min(...prices);
}

/* ----------------------------- generateMetadata ---------------------------- */
export async function generateMetadata({
  params: initalParams,
}: {
  params: {slug: string};
}): Promise<Metadata> {
  noStore();

  const params = await initalParams;

  // Fetch product directly (server-side)
  const data = await findProductBySlug({slug: params.slug});
  const product = data?.result;

  // Fallback if not found
  if (!product) {
    const title = 'Product not found';
    const url = absUrl(`/products/${params.slug}`);
    return {
      title,
      description: 'This product could not be found.',
      alternates: {canonical: url},
      openGraph: {
        title,
        description: 'This product could not be found.',
        url,
        type: 'website',
      },
      robots: {index: false, follow: false},
    };
  }

  const title = product?.title
    ? `${product.title} — ${product?.category?.title ?? 'Product'}`
    : 'Product';

  const description =
    shortText(product?.about) ||
    shortText(product?.features?.map((f: any) => `${f?.name}: ${f?.value}`).join(' • '), 160) ||
    'See details, features, and pricing.';

  const imageUrl = primaryImage(product);
  const pageUrl = absUrl(`/products/${product?.slug || params.slug}`);
  const keywords: string[] = Array.isArray(product?.keywords) ? product.keywords : [];

  // If you track price, expose minimal OG product data
  const price = lowestPrice(product);

  return {
    title,
    description,
    keywords,
    alternates: {canonical: pageUrl},
    openGraph: {
      // ✅ use an allowed type
      type: 'website',
      url: pageUrl,
      siteName: 'YourSite',
      title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: product?.thumbnail?.width || product?.images?.[0]?.width || 1200,
              height: product?.thumbnail?.height || product?.images?.[0]?.height || 630,
              alt: product?.thumbnail?.alt || product?.images?.[0]?.alt || product?.title || '',
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
    // You can still add product-specific OG tags as custom meta:
    other: {
      ...(price ? {'product:price:amount': String(price)} : {}),
      ...(price ? {'product:price:currency': 'USD'} : {}), // change currency if needed
      ...(product?.sellerCompany?.title ? {'product:brand': product.sellerCompany.title} : {}),
      ...(product?.category?.title ? {'product:category': product.category.title} : {}),
    },
    robots: {index: !!product?.isActive, follow: true},
  };
}

/* ---------------------------------- Page ---------------------------------- */

const Page = async ({params: initalParams}: {params: {slug: string}}) => {
  const params = await initalParams;

  noStore();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-product', params.slug],
    queryFn: () => findProductBySlug({slug: params.slug}),
  });
  const dehydratedState = dehydrate(queryClient);

  // (Optional) also produce JSON-LD for richer SEO
  // We read the product from the same server fetch to avoid extra round-trips here.
  const data = await findProductBySlug({slug: params.slug});
  const product = data?.result;
  const ogImage = product ? primaryImage(product) : undefined;
  const price = product ? lowestPrice(product) : undefined;

  const jsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: shortText(product.about) || undefined,
        image: ogImage ? [ogImage] : undefined,
        brand: product?.sellerCompany?.title || undefined,
        category: product?.category?.title || undefined,
        sku: product._id,
        offers: price
          ? {
              '@type': 'Offer',
              priceCurrency: 'USD', // change if you have real currency
              price,
              availability: product?.variations?.some((v: any) => v?.isAvailable)
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
              url: absUrl(`/products/${product.slug}`),
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
      {/* JSON-LD for SEO */}
      {jsonLd ? (
        <script
          type='application/ld+json'
          // Note: this is safe because jsonLd is produced server-side
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      ) : null}

      <Hydrate state={dehydratedState}>
        <ProductView />
      </Hydrate>
    </div>
  );
};

export default Page;
