import React from 'react';

const ArticleBody = ({content, className}: {content: string; className?: string}) => {
  return (
    <div className={className}>
      {React.createElement('div', {dangerouslySetInnerHTML: {__html: content}})}
    </div>
  );
};

export default ArticleBody;
