/* eslint-disable no-restricted-syntax */

'use client';

import {useCallback} from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
import {useRouter} from 'nextjs-toploader/app';

type UpdateValue = string | null | undefined;
type Updates = Record<string, UpdateValue>;
type Options = {replace?: boolean; scroll?: boolean};

export const useUpdateSearchParam = () => {
  const router = useRouter(); // from nextjs-toploader/app
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (nameOrUpdates: string | Updates, value?: UpdateValue, opts?: Options) => {
      // Clone current params safely
      const params = new URLSearchParams(searchParams?.toString());

      // Helper to set/delete
      const apply = (k: string, v: UpdateValue) => {
        if (v === '' || v == null) params.delete(k);
        else params.set(k, String(v));
      };

      // Track whether any non-page param changed to reset `page`
      let nonPageChanged = false;

      if (typeof nameOrUpdates === 'string') {
        const k = nameOrUpdates;
        apply(k, value);
        if (k !== 'page') nonPageChanged = true;
      } else {
        for (const [k, v] of Object.entries(nameOrUpdates)) {
          apply(k, v);
          if (k !== 'page') nonPageChanged = true;
        }
      }

      // Reset `page` if other filters changed
      if (nonPageChanged && params.has('page')) params.delete('page');

      // Preserve hash (if any) from current URL
      const hash = typeof window !== 'undefined' ? window.location.hash : '';

      const qs = params.toString();
      const url = `${pathname}${qs ? `?${qs}` : ''}${hash}`;

      if (opts?.replace) router.replace(url, {scroll: opts.scroll ?? false});
      else router.push(url, {scroll: opts?.scroll ?? false});
    },
    [router, pathname, searchParams],
  );
};
