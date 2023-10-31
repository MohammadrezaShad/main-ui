import {usePathname} from 'next/navigation';

export const useMatch = (target: string) => {
  const pathname = usePathname();

  const targetSegments = target.split('/');
  const pathnameSegments = pathname.split('/');

  const isDynamicSegment = (segment: string) => segment.startsWith(':');

  const match = targetSegments.every((segment, index) => {
    if (isDynamicSegment(segment)) {
      return true;
    }

    return segment === pathnameSegments[index];
  });

  return match;
};
