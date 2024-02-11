import {Metadata} from 'next';

import {ProfileView} from '@/components';

export const metadata: Metadata = {
  robots: {
    index: false,
    nocache: true,
  },
};

const Page = async () => <ProfileView />;

export default Page;
