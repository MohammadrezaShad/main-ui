import {ProfileView} from '@/components';
import {Metadata} from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    nocache: true,
  },
};

const Page = async () => <ProfileView />;

export default Page;
