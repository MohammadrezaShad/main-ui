import {useCallback} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

export const useUpdateSearchParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (nameOrUpdates: string | Record<string, string>, value?: string) => {
      const params = new URLSearchParams(searchParams);

      if (typeof nameOrUpdates === 'string') {
        // Single param update
        const name = nameOrUpdates;
        if (value === '') {
          params.delete(name);
        } else {
          params.set(name, value as string);
        }
        if (name !== 'page' && params.has('page')) {
          params.delete('page');
        }
      } else {
        // Multiple params update
        Object.entries(nameOrUpdates).forEach(([name, paramValue]) => {
          if (paramValue === '') {
            params.delete(name);
          } else {
            params.set(name, paramValue);
          }
          if (name !== 'page' && params.has('page')) {
            params.delete('page');
          }
        });
      }

      router.push(`${pathname}?${params.toString()}`, {scroll: false});
    },
    [router, pathname, searchParams],
  );
};
