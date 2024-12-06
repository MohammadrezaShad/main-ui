/* eslint-disable @typescript-eslint/no-namespace */
import React, {useEffect, useRef} from 'react';

import '@/components/star-rating';

const StarRatingComponent: React.FC<{rating: number; total?: number}> = ({rating, total = 10}) => {
  const ratingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ratingRef.current) {
      ratingRef.current.setAttribute('rating', rating.toString());
      ratingRef.current.setAttribute('total-stars', total.toString());
    }
  }, [rating, total]);

  return (
    <div>
      <star-rating ref={ratingRef as React.RefObject<HTMLElement>} />
    </div>
  );
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'star-rating': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
export default StarRatingComponent;
