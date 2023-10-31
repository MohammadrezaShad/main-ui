import React from 'react';
import ReactSkeleton, {SkeletonProps} from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

const Skeleton: React.FC<SkeletonProps> = (props: SkeletonProps) => {
  const {className, ...otherProps} = props;

  return <ReactSkeleton className={className} {...otherProps} />;
};

export default Skeleton;
Skeleton.displayName = 'Skeleton';
