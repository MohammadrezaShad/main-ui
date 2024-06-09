import {Ubuntu} from 'next/font/google';

import HtmlManipulation from './html-manipulation';

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const ArticleBody = ({content, className}: {content: string; className?: string}) => (
  <div className={`article ${ubuntu.className} ${className}`}>
    <HtmlManipulation htmlString={content} className='fr-file' />
  </div>
);

export default ArticleBody;
