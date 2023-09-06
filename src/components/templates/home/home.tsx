'use client';

import {useObservable, useSelector} from '@legendapp/state/react';
import {useObservableQuery} from '@legendapp/state/react-hooks/useObservableQuery';
import {Box} from '@styled/jsx';

import Badge from '@/components/atoms/badge';
import Button from '@/components/atoms/button';
import RadioButton from '@/components/atoms/radio-button';
import Switch from '@/components/atoms/switch';
import TextField from '@/components/atoms/text-field/text-field';
import {gqlFetch} from '@/service/fetch';

async function getData() {
  const res = await gqlFetch(
    process.env.NEXT_PUBLIC_API as string,
    `query SearchCachedTrendLinks {
          trendLinks {
            searchCachedTrendLinks {
              error
              results {
                _id
                link

                title
              }
              status
              success
              totalCount
              totalPages
            }
          }
    }`,
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
export default function Home() {
  const settings$ = useObservable({
    checki: true,
  });
  const query$ = useObservableQuery(
    {
      queryKey: ['hydrate-data'],
      queryFn: () => getData(),
      staleTime: Infinity,
    },
    {},
  );
  const isChecked = useSelector(() => settings$.checki.get());
  const handleChange = () => settings$.checki.set(!isChecked);

  return (
    <>
      {/* <Checkbox checked={isChecked} onChange={handleChange} /> */}
      <Badge>red</Badge>
      <Switch />
      <RadioButton />
      <Button>blue</Button>
      <Box w='500px' p='5'>
        <TextField title='red' />
      </Box>
    </>
  );
}
