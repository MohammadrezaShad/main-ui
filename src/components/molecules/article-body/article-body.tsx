import {Ubuntu} from 'next/font/google';
import React from 'react';

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const ArticleBody = ({content, className}: {content: string; className?: string}) => (
  <div className={`${ubuntu.className} ${className}`}>
    {React.createElement('div', {dangerouslySetInnerHTML: {__html: content}})}
  </div>
);

export default ArticleBody;
