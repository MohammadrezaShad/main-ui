import React, {lazy, Suspense} from 'react';
import {css} from '@styled/css';
import parse, {domToReact, HTMLReactParserOptions} from 'html-react-parser';

import MonacoEditor from './MonacoEditor';

interface HtmlManipulationProps {
  htmlString: string;
  className: string;
}

const HtmlManipulation: React.FC<HtmlManipulationProps> = ({htmlString, className}) => {
  const getFileExtension = (url: string): string => {
    const extensionMatch = url.match(/\.([0-9a-z]+)(?:[\\?#]|$)/i);
    return extensionMatch ? extensionMatch[1] : '';
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
      if (domNode.name === 'pre' && domNode.attribs?.content) {
        const codeContent = domNode.attribs.content.replace(/"/g, '"');
        const language = domNode.attribs.language || 'javascript';

        return (
          <div key={domNode.attribs.content} style={{marginBottom: '20px'}}>
            <MonacoEditor code={codeContent} language={language} />
          </div>
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

      return undefined;
    },
  };

  const reactElements = parse(htmlString, options);

  return <div>{reactElements}</div>;
};

export default HtmlManipulation;
