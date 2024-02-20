import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useCallback} from 'react';

export const useUpdateSearchParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value === '') {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      if (name !== 'page' && params.has('page')) {
        params.delete('page');
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );
};
