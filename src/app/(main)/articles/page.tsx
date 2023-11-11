import {ArticlesView} from '@/components';
import {css} from '@styled/css';

type article = {
  id: number;
  image: string;
  date: string;
  title: string;
  link: string;
  aspect: 'square' | 'portrait';
};

const posts: Array<Omit<article, 'aspect'>> = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1619365566184-272a34acfeb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '20 June 2023',
    title: 'Water: a commons beyond economic value',
    link: '',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1495647688236-ed6ef40cb28b?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '18 June 2023',
    title: 'Uruguay’s water crisis: prepare for future events',
    link: '',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1605247177454-a837a87f1593?q=80&w=1523&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '20 August 2023',
    title: 'Maui fires could taint the island’s waters scientists are investig...',
    link: '',
  },
];

const articles: Array<article> = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1620964780032-81ef649db4d9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '03 August 2023',
    title: 'How Beijing’s deadly floods could be avoided',
    link: '',
    aspect: 'square',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1574802406791-ef6898f311d3?q=80&w=1582&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '28 March 2023',
    title: 'Global action on water: less rhetoric and more science',
    link: '',
    aspect: 'portrait',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1620964780032-81ef649db4d9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '18 July 2023',
    title: 'Water pollution ‘timebomb’ threatens global health',
    link: '',
    aspect: 'square',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1574802406791-ef6898f311d3?q=80&w=1582&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '21 September 2022',
    title: 'The ‘Asian water tower’ is brimming with glacial melt water',
    link: '',
    aspect: 'portrait',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1519747180378-d55bc9a23efd?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '21 September 2022',
    title: 'The ‘Asian water tower’ is brimming with glacial melt water',
    link: '',
    aspect: 'portrait',
  },
  {
    id: 6,
    image:
      'https://plus.unsplash.com/premium_photo-1675096939530-e804e37b9b65?q=80&w=1611&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '21 September 2022',
    title: 'The ‘Asian water tower’ is brimming with glacial melt water',
    link: '',
    aspect: 'square',
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1519747180378-d55bc9a23efd?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '21 September 2022',
    title: 'The ‘Asian water tower’ is brimming with glacial melt water',
    link: '',
    aspect: 'portrait',
  },
  {
    id: 8,
    image:
      'https://plus.unsplash.com/premium_photo-1675096939530-e804e37b9b65?q=80&w=1611&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '21 September 2022',
    title: 'The ‘Asian water tower’ is brimming with glacial melt water',
    link: '',
    aspect: 'square',
  },
  {
    id: 9,
    image:
      'https://images.unsplash.com/photo-1575893240675-17e719ffa7c5?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '21 September 2022',
    title: 'The ‘Asian water tower’ is brimming with glacial melt water',
    link: '',
    aspect: 'square',
  },
  {
    id: 10,
    image:
      'https://images.unsplash.com/photo-1533066636271-fdbe3e84ad80?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '21 September 2022',
    title: 'The ‘Asian water tower’ is brimming with glacial melt water',
    link: '',
    aspect: 'portrait',
  },
  {
    id: 11,
    image:
      'https://images.unsplash.com/photo-1575893240675-17e719ffa7c5?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '21 September 2022',
    title: 'The ‘Asian water tower’ is brimming with glacial melt water',
    link: '',
    aspect: 'square',
  },
  {
    id: 12,
    image:
      'https://images.unsplash.com/photo-1533066636271-fdbe3e84ad80?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '21 September 2022',
    title: 'The ‘Asian water tower’ is brimming with glacial melt water',
    link: '',
    aspect: 'portrait',
  },
];

const Page = () => {
  return (
    <div className={css({display: 'flex', flexDir: 'column', rowGap: 8})}>
      <ArticlesView posts={posts} articles={articles} />
    </div>
  );
};

export default Page;
