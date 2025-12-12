/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable consistent-return */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-namespace */

'use client';

import React, {lazy, useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
    if (Array.isArray(n.children)) {
      for (let i = n.children.length - 1; i >= 0; i--) {
        stack.push(n.children[i]);
      }
    }
  }
  return text.trim();
};

const generateIdfromText = (text: string) => text.replace(/\s+/g, '-').toLowerCase();

// Build TOC – we define our own IDs: `heading-${slug}`
const buildTOCTree = (htmlString: string): TOCTree[] => {
  const toc: TOCTree[] = [];
  parse(htmlString, {
    replace: (node: any) => {
      if (!(node instanceof Element)) return;
      if (node.type === 'tag' && (node.name === 'h2' || node.name === 'h3')) {
        const text = getTextContent(node);
        const slug = generateIdfromText(text || '');
        const id = `heading-${slug}`;

        if (node.name === 'h2') {
          toc.push({h2: {text, id}, h3List: []});
        } else if (node.name === 'h3') {
          toc.at(-1)?.h3List?.push({text, id});
        }
      }
      return undefined;
    },
  });
  return toc;
};

// ---------- component ----------
const HtmlManipulation: React.FC<HtmlManipulationProps> = ({htmlString, className}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Precompute TOC once per htmlString (SSR-safe)
  const tocTree = useMemo(() => buildTOCTree(htmlString), [htmlString]);

  // Ensure h2/h3 inside this component have ids aligned with TOC logic
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const headings = root.querySelectorAll('h2, h3');
    headings.forEach(h => {
      const text = h.textContent?.trim() || '';
      if (!text) return;
      const slug = generateIdfromText(text);
      const id = `heading-${slug}`;
      h.id = id; // always sync DOM with TOC
    });
  }, [htmlString]);

  const [showFloatingToc, setShowFloatingToc] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  // Show floating button only when TOC card is NOT in view
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !tocTree.length) {
      setShowFloatingToc(false);
      return;
    }

    const tocEl = root.querySelector('[data-toc-root="true"]') as HTMLElement | null;
    if (!tocEl) {
      setShowFloatingToc(false);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (!entry) return;
        // If TOC is visible -> hide button; if not visible -> show button
        setShowFloatingToc(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      },
    );

    observer.observe(tocEl);

    return () => {
      observer.disconnect();
    };
  }, [tocTree.length, htmlString]);

  const handleTocNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
      setIsTocOpen(false);
    }
  }, []);

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

      // ⭐ rating
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

      // ---------- table of content block ----------
      const classList = (domNode.attribs?.class || '').split(' ').filter(Boolean);
      if (classList.includes('table-of-content')) {
        return (
          <aside
            data-toc-root='true'
            className={css({
              borderRadius: 'lg',
              borderWidth: 1,
              borderColor: 'gray3',
              backgroundColor: 'backgroundSecondary',
              p: 4,
              mb: 8,
              boxShadow: '0 14px 32px rgba(15, 23, 42, 0.10)',
            })}
          >
            <div
              className={css({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              })}
            >
              <div className={css({fontWeight: 600, fontSize: 'lg'})}>Table of contents</div>
              <span
                className={css({
                  fontSize: 'xs',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'gray5',
                })}
              >
                Article guide
              </span>
            </div>

            <p
              className={css({
                fontSize: 'sm',
                color: 'gray5',
                mb: 3,
              })}
            >
              Quickly jump to the main sections of this article.
            </p>

            <div
              className={css({
                display: 'flex',
                flexDir: 'column',
                gap: 1,
              })}
            >
              {tocTree.map((item, index) => (
                <div key={item.h2.id || index}>
                  <button
                    type='button'
                    className={css({
                      width: '100%',
                      textAlign: 'left',
                      p: 2,
                      borderRadius: 'md',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 600,
                      fontSize: 'sm',
                      color: 'text.primary',
                      backgroundColor: 'transparent',
                      _hover: {backgroundColor: 'gray2'},
                      transition: 'background-color 0.15s ease-out',
                    })}
                    onClick={() => handleTocNavigate(item.h2.id as string)}
                  >
                    <span>
                      {index + 1}. {item.h2.text}
                    </span>
                    <IconChevronRight
                      className={css({
                        transition: 'transform 0.15s ease-out',
                        mr: '2',
                        width: 4,
                        height: 4,
                      })}
                    />
                  </button>

                  {item.h3List && item.h3List.length > 0 && (
                    <div
                      className={css({
                        pl: 4,
                        mt: 1,
                        display: 'flex',
                        flexDir: 'column',
                        gap: 1,
                      })}
                    >
                      {item.h3List.map((h3, h3Index) => (
                        <button
                          key={h3.id || h3Index}
                          type='button'
                          className={css({
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: 'sm',
                            color: 'text.secondary',
                            borderRadius: 'md',
                            px: 2,
                            py: 1,
                            backgroundColor: 'transparent',
                            _hover: {backgroundColor: 'gray2'},
                            transition: 'background-color 0.15s ease-out',
                          })}
                          onClick={() => handleTocNavigate(h3.id as string)}
                        >
                          {index + 1}.{h3Index + 1} {h3.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
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

  return (
    <div ref={containerRef} className={className}>
      {reactElements}

      {/* Floating TOC – only when TOC block is NOT visible */}
      {showFloatingToc && tocTree.length > 0 && (
        <>
          <button
            type='button'
            aria-label='Open table of contents'
            onClick={() => setIsTocOpen(true)}
            className={css({
              position: 'fixed',
              bottom: {base: '94px', md: 6},
              left: {base: 4, md: 8},
              zIndex: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 2,
              borderRadius: '8px',
              borderWidth: 1,
              borderColor: 'gray3',
              backgroundColor: 'backgroundSecondary',
              boxShadow: '0 9px 20px rgba(15, 23, 42, 0.35)',
              fontSize: 'sm',
              cursor: 'pointer',
              _hover: {transform: 'translateY(-2px)'},
              transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
            })}
          >
            <span>Contents</span>
            <IconChevronRight className={css({width: 4, height: 4})} />
          </button>

          {isTocOpen && (
            <div
              className={css({
                position: 'fixed',
                inset: 0,
                zIndex: 100,
                backgroundColor: 'rgba(15, 23, 42, 0.45)',
                display: 'flex',
                justifyContent: 'flex-end',
              })}
              onClick={() => setIsTocOpen(false)}
            >
              <div
                className={css({
                  width: {base: '100%', md: '360px'},
                  maxWidth: '100%',
                  height: '100%',
                  backgroundColor: 'background',
                  p: 4,
                  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.55)',
                  display: 'flex',
                  flexDir: 'column',
                  gap: 3,
                })}
                onClick={e => e.stopPropagation()}
              >
                <div
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1,
                  })}
                >
                  <span className={css({fontWeight: 600, fontSize: 'md'})}>Table of contents</span>
                  <button
                    type='button'
                    onClick={() => setIsTocOpen(false)}
                    className={css({
                      px: 2,
                      py: 1,
                      fontSize: 'sm',
                      borderRadius: 'md',
                      borderWidth: 1,
                      borderColor: 'gray3',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      _hover: {backgroundColor: 'gray1'},
                    })}
                  >
                    Close
                  </button>
                </div>

                <div
                  className={css({
                    fontSize: 'sm',
                    color: 'gray5',
                    mb: 2,
                  })}
                >
                  Tap a section to jump directly to it.
                </div>

                <div
                  className={css({
                    flex: 1,
                    overflowY: 'auto',
                    pr: 1,
                    display: 'flex',
                    flexDir: 'column',
                    gap: 1,
                  })}
                >
                  {tocTree.map((item, index) => (
                    <div key={item.h2.id || index}>
                      <button
                        type='button'
                        className={css({
                          width: '100%',
                          textAlign: 'left',
                          p: 2,
                          borderRadius: 'md',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontWeight: 600,
                          fontSize: 'sm',
                          color: 'text.primary',
                          backgroundColor: 'transparent',
                          _hover: {backgroundColor: 'gray2'},
                          transition: 'background-color 0.15s ease-out',
                        })}
                        onClick={() => {
                          setIsTocOpen(false);
                          handleTocNavigate(item.h2.id as string);
                        }}
                      >
                        <span>
                          {index + 1}. {item.h2.text}
                        </span>
                        <IconChevronRight
                          className={css({
                            transition: 'transform 0.15s ease-out',
                            mr: '2',
                            width: 4,
                            height: 4,
                          })}
                        />
                      </button>

                      {item.h3List && item.h3List.length > 0 && (
                        <div
                          className={css({
                            pl: 4,
                            mt: 1,
                            mb: 1,
                            display: 'flex',
                            flexDir: 'column',
                            gap: 1,
                          })}
                        >
                          {item.h3List.map((h3, h3Index) => (
                            <button
                              key={h3.id || h3Index}
                              type='button'
                              className={css({
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: 'sm',
                                color: 'text.secondary',
                                borderRadius: 'md',
                                px: 2,
                                py: 1,
                                backgroundColor: 'transparent',
                                _hover: {backgroundColor: 'gray2'},
                                transition: 'background-color 0.15s ease-out',
                              })}
                              onClick={() => {
                                setIsTocOpen(false);
                                handleTocNavigate(h3.id as string);
                              }}
                            >
                              {index + 1}.{h3Index + 1} {h3.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HtmlManipulation;
