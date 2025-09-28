/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable consistent-return */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-namespace */

'use client';

import React, {lazy, useEffect, useMemo} from 'react';
import {css} from '@styled/css';
import parse, {Element, HTMLReactParserOptions} from 'html-react-parser';

import {IconChevronRight} from '@/assets';
import {SnapCarousel} from '@/components/atoms/snap-carousel';
import RatingInline from '@/components/molecules/article-body/rate-inline';

import MonacoEditor from './MonacoEditor';

type GalleryItem = {href?: string; src: string; alt?: string};

interface HtmlManipulationProps {
  htmlString: string;
  className: string;
}
interface ElementInfo {
  text: string | null;
  id?: string;
}
interface TOCTree {
  h2: ElementInfo;
  h3List?: ElementInfo[];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        value?: string;
        'read-only'?: boolean;
      };
    }
  }
}

// ---------- helpers (SSR-safe, no DOMParser) ----------
const getTextContent = (node: any): string => {
  let text = '';
  if (!node) return text;
  const stack = [node as any];
  while (stack.length) {
    const n = stack.pop();
    if (!n) continue;
    if (n.type === 'text' && typeof n.data === 'string') text += n.data;
    if (Array.isArray(n.children))
      for (let i = n.children.length - 1; i >= 0; i--) stack.push(n.children[i]);
  }
  return text.trim();
};

const generateIdfromText = (text: string) => text.replace(/\s+/g, '-').toLowerCase();

const containsAnySpecialString = (element: Element, specialStrings: string[]): boolean => {
  let contains = false;
  (function traverse(el: Element) {
    el.children?.forEach((child: any) => {
      if (child.type === 'text' && typeof child.data === 'string') {
        if (specialStrings.some(str => child.data.includes(str))) contains = true;
      } else if (child instanceof Element || child?.type === 'tag') {
        traverse(child);
      }
    });
  })(element);
  return contains;
};

// Build TOC by walking the html with html-react-parser in a no-op pass
const buildTOCTree = (htmlString: string): TOCTree[] => {
  const toc: TOCTree[] = [];
  parse(htmlString, {
    replace: (node: any) => {
      if (!(node instanceof Element)) return;
      if (node.type === 'tag' && (node.name === 'h2' || node.name === 'h3')) {
        const text = getTextContent(node);
        const id = generateIdfromText(text || '');
        if (node.name === 'h2') {
          toc.push({h2: {text, id}, h3List: []});
        } else if (node.name === 'h3') {
          toc.at(-1)?.h3List?.push({text, id});
        }
      }
      return undefined; // no transform during pre-pass
    },
  });
  return toc;
};

// ---------- component ----------
const HtmlManipulation: React.FC<HtmlManipulationProps> = ({htmlString, className}) => {
  // Precompute TOC once per htmlString (SSR-safe)
  const tocTree = useMemo(() => buildTOCTree(htmlString), [htmlString]);

  const getFileExtension = (url: string): string => {
    const extensionMatch = url?.match(/\.([0-9a-z]+)(?:[\\?#]|$)/i);
    return extensionMatch ? extensionMatch[1].toLowerCase() : '';
  };

  const extractGalleryItems = (divNode: any): GalleryItem[] => {
    const items: GalleryItem[] = [];
    const children = Array.isArray(divNode.children) ? divNode.children : [];
    for (const child of children) {
      if (child?.name !== 'a') continue;
      const href = child.attribs?.href;
      const img = (child.children || []).find((c: any) => c?.name === 'img');
      const src = img?.attribs?.src;
      if (!src) continue;
      items.push({href, src, alt: img?.attribs?.alt});
    }
    return items;
  };

  const getComponentByExtension = (extension: string) => {
    switch (extension) {
      case 'pdf':
        return lazy(() => import('../../../assets/vectors/icons/pdf.svg'));
      case 'txt':
        return lazy(() => import('../../../assets/vectors/icons/txt.svg'));
      case 'doc':
      case 'docx':
        return lazy(() => import('../../../assets/vectors/icons/docx.svg'));
      case 'mp3':
      case 'aac':
      case 'ogg':
        return lazy(() => import('../../../assets/vectors/icons/mp3.svg'));
      case 'mp4':
      case 'webm':
      case 'mkv':
        return lazy(() => import('../../../assets/vectors/icons/mp4.svg'));
      case 'ppt':
      case 'pptx':
        return lazy(() => import('../../../assets/vectors/icons/pptx.svg'));
      case 'xls':
      case 'xlsx':
        return lazy(() => import('../../../assets/vectors/icons/xlsx.svg'));
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'heic':
      case 'webp':
      case 'gif':
        return lazy(() => import('../../../assets/vectors/icons/png.svg'));
      default:
        return lazy(() => import('../../../assets/vectors/icons/bin.svg'));
    }
  };

  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (!(domNode instanceof Element)) return;

      // ⭐ NEW: render either <star-rating> (old) or <rating-widget> (new)
      if (domNode.name === 'star-rating' || domNode.name === 'rating-widget') {
        const ratingAttr = domNode.attribs?.rating ?? domNode.attribs?.['data-rating'] ?? '0';
        const variantAttr = (domNode.attribs?.variant ??
          domNode.attribs?.['data-variant'] ??
          'drop') as 'drop' | 'star';
        const maxAttr = domNode.attribs?.max ?? domNode.attribs?.['data-max'];
        const sizeAttr = domNode.attribs?.size ?? domNode.attribs?.['data-size'];
        const showValue = (domNode.attribs?.['show-value'] ?? 'true').toLowerCase() !== 'false';

        const rating = Number(ratingAttr);

        return (
          <RatingInline
            rating={Number.isFinite(rating) ? rating : 0}
            variant={variantAttr}
            size={sizeAttr ? Number(sizeAttr) : 24}
            max={maxAttr ? Number(maxAttr) : undefined}
            showValue={showValue}
            precision={2}
          />
        );
      }

      // ---------- math-field ----------
      if (domNode.name === 'math-field' && domNode.attribs?.value) {
        const mathContent = domNode.attribs.value;
        return (
          <div key={domNode.attribs.value} style={{marginBottom: '20px'}}>
            <math-field read-only style={{width: '100%', minHeight: '50px'}}>
              {mathContent}
            </math-field>
          </div>
        );
      }

      // ---------- code block (Monaco) ----------
      if (domNode.name === 'pre' && domNode.attribs?.content) {
        const codeContent = domNode.attribs.content.replace(/"/g, '"');
        const language = domNode.attribs.language || 'python';
        return (
          <div key={domNode.attribs.content} style={{marginBottom: '20px'}}>
            <MonacoEditor code={codeContent} language={language} />
          </div>
        );
      }

      // ---------- gallery ----------
      if (
        domNode.name === 'div' &&
        (domNode.attribs?.class?.split(' ').includes('gallery') ||
          domNode.attribs?.['data-element'] === 'gallery')
      ) {
        const items = extractGalleryItems(domNode);
        if (!items.length) return undefined;

        return (
          <SnapCarousel
            key={`gallery-${items.length}`}
            items={items}
            loop
            showDots
            ariaLabel='Post gallery'
          />
        );
      }

      // ---------- wrap file links with icon (by className match) ----------
      if (domNode.name === 'rating-widget' || domNode.name === 'star-rating') {
        // supports either data-* or plain attrs
        const ratingAttr = domNode.attribs?.['data-rating'] ?? domNode.attribs?.rating ?? '0';
        const variantAttr = domNode.attribs?.['data-variant'] ?? domNode.attribs?.variant ?? 'drop';
        const sizeAttr = domNode.attribs?.size ?? domNode.attribs?.['data-size'];
        const showValue = (domNode.attribs?.['show-value'] ?? 'true').toLowerCase() !== 'false';

        const rating = Number(ratingAttr);
        const variant = (variantAttr === 'star' ? 'star' : 'drop') as 'star' | 'drop';

        return (
          <RatingInline
            rating={Number.isFinite(rating) ? rating : 0}
            variant={variant}
            size={sizeAttr ? Number(sizeAttr) : 24}
            showValue={showValue}
            precision={2}
          />
        );
      }

      // ---------- table of content block ----------
      if (domNode.attribs?.class === 'table-of-content') {
        const handleClick = (id: string) => {
          document
            .getElementById(`heading-${id}`)
            ?.scrollIntoView({behavior: 'smooth', block: 'center'});
        };
        return (
          <div className={css({borderBottom: '1px solid token(colors.gray3)', pb: 4, mb: 8})}>
            <div className={css({textStyle: 'h2', mb: 3})}>Table of contents</div>
            {tocTree.map((item, index) => (
              <div key={item.h2.id || index} className={css({fontWeight: 600})}>
                <button
                  type='button'
                  className={css({
                    textAlign: 'left',
                    p: 1,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  })}
                  onClick={() => handleClick(item.h2.id as string)}
                >
                  {item.h2.text}
                  <IconChevronRight
                    className={css({transition: 'transform', mr: '2', width: 5, height: 5})}
                  />
                </button>
                {item.h3List && item.h3List.length > 0 && (
                  <div className={css({p: 1, display: 'block'})}>
                    {item.h3List.map((h3, h3Index) => (
                      <div key={h3.id || h3Index} className={css({pl: '4', fontWeight: 400})}>
                        <button
                          type='button'
                          className={css({cursor: 'pointer'})}
                          onClick={() => handleClick(h3.id as string)}
                        >
                          {h3.text}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }

      return undefined;
    },
  };

  const reactElements = parse(htmlString, options);

  // mathlive (client-side only)
  useEffect(() => {
    const loadMathLive = async () => {
      const {MathfieldElement} = await import('mathlive');
      MathfieldElement.fontsDirectory = '/fonts/mathlive/';
    };
    loadMathLive();
  }, []);

  return <div>{reactElements}</div>;
};

export default HtmlManipulation;
