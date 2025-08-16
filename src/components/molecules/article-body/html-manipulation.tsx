/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-namespace */

'use client';

import React, {lazy, Suspense, useEffect} from 'react';
import {css} from '@styled/css';
import parse, {domToReact, HTMLReactParserOptions} from 'html-react-parser';

import {IconChevronRight} from '@/assets';
import {SnapCarousel} from '@/components/atoms/snap-carousel';

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
const generateIdfromText = (text: string) => text.replace(/\s+/g, '-').toLowerCase();
const getTOCTree = (htmlString: string): TOCTree[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const elements = Array.from(doc.body.children);

  return elements.reduce((acc, item) => {
    const {tagName, textContent: text} = item;
    const id = generateIdfromText(text || '');

    if (tagName === 'H2') {
      acc.push({h2: {text, id}, h3List: []});
    }
    if (tagName === 'H3') {
      acc.at(-1)?.h3List?.push({text, id});
    }
    return acc;
  }, [] as TOCTree[]);
};

const HtmlManipulation: React.FC<HtmlManipulationProps> = ({htmlString, className}) => {
  const getFileExtension = (url: string): string => {
    const extensionMatch = url.match(/\.([0-9a-z]+)(?:[\\?#]|$)/i);
    return extensionMatch ? extensionMatch[1] : '';
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
      if (domNode.name === 'pre' && domNode.attribs?.content) {
        const codeContent = domNode.attribs.content.replace(/"/g, '"');
        const language = domNode.attribs.language || 'python';

        return (
          <div key={domNode.attribs.content} style={{marginBottom: '20px'}}>
            <MonacoEditor code={codeContent} language={language} />
          </div>
        );
      }

      if (
        domNode.name === 'div' &&
        (domNode.attribs?.class?.split(' ').includes('gallery') ||
          domNode.attribs?.['data-element'] === 'gallery')
      ) {
        const items = extractGalleryItems(domNode);
        if (!items.length) return undefined;

        const minWidth = Number(domNode.attribs?.['data-min-width'] || 240);
        const gap = Number(domNode.attribs?.['data-gap'] || 8);

        return (
          <SnapCarousel
            key={`gallery-${items.length}`}
            items={items}
            rounded='lg'
            loop // set true if you want infinite
            showDots
            ariaLabel='Post gallery'
          />
        );
      }

      if (domNode.attribs && domNode.attribs.class === className && domNode.name === 'a') {
        const extension = getFileExtension(domNode.attribs.href);
        const Component = getComponentByExtension(extension) as any;
        return (
          <span
            className={css({
              display: 'inline-flex',
              w: 'max-content',
              alignItems: 'center',
              gap: '1',
              px: '1',
            })}
            key={domNode.attribs.href}
          >
            <Suspense>
              <Component className={css({w: '4', h: '4'})} />
            </Suspense>
            {domToReact([domNode])}
          </span>
        );
      }

      if (domNode.attribs?.class === 'table-of-content') {
        const tocTree = getTOCTree(htmlString);
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

  useEffect(() => {
    const loadMathLive = async () => {
      const {MathfieldElement} = await import('mathlive');
      MathfieldElement.fontsDirectory = '/fonts/mathlive/';
    };
    loadMathLive();
  }, []);

  return <div>{reactElements}</div>;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
    }
  }
}

export default HtmlManipulation;
