'use client';
import {first, second, third} from '@/assets';
import {Articles, Divider, RecentArticles} from '@/components';
import {Slider} from '@/components/organisms/slider';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Pagination} from './articles.styled';

interface Props {
  posts: Array<any>;
  articles: Array<any>;
}

const images = [
  {
    src: first,
    alt: 'First',
    title: 'Deoxygenation of temperate rivers',
    subtitle:
      'Oxygen concentrations are a key aspect of water quality, with low levels linked to ecosystem stress. Research indicates that oxygen levels will decrease in hundreds of rivers across the USA and Central Europe under climate change.',
    date: '14 September 2023',
    href: '',
  },
  {
    src: second,
    alt: 'Second',
    title: 'Deoxygenation of temperate rivers',
    subtitle:
      'Oxygen concentrations are a key aspect of water quality, with low levels linked to ecosystem stress. Research indicates that oxygen levels will decrease in hundreds of rivers across the USA and Central Europe under climate change.',
    date: '14 September 2023',
    href: '',
  },
  {
    src: third,
    alt: 'Third',
    title: 'Deoxygenation of temperate rivers',
    subtitle:
      'Oxygen concentrations are a key aspect of water quality, with low levels linked to ecosystem stress. Research indicates that oxygen levels will decrease in hundreds of rivers across the USA and Central Europe under climate change.',
    date: '14 September 2023',
    href: '',
  },
];

const Page = ({posts, articles}: Props) => {
  return (
    <>
      <Box>
        <Slider slides={images} />
      </Box>
      <RecentArticles posts={posts} />
      <Divider label='Keep Reading' />
      <Articles articles={articles} />
      <div
        className={css({
          mt: 6,
          mb: -6,
        })}
      >
        <Pagination
          nextLabel='>'
          onPageChange={() => {}}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={12}
          previousLabel='<'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
          renderOnZeroPageCount={null}
        />
      </div>
      <span
        className={css({
          color: 'gray4',
          fontWeight: 300,
          fontSize: '14px',
          textAlign: 'center',
        })}
      >
        Showing Result 11-20 of 114
      </span>
    </>
  );
};

export default Page;
