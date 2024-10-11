import {useState} from 'react';
import {css} from '@styled/css';

import {IconChevronLeft, IconChevronRight} from '@/assets';

import {Pagination} from '../articles/articles.styled';
import CategorySelect from './category-select';
import ProductCard from './product-card';

const Products: React.FC = () => {
  const [category, setCategory] = useState('');

  const products = [
    {
      title: 'Proteus Water Level/Sump Monitor Sensor',
      company: 'Ultra Tec Water Treatment LLC',
      rating: 3.5,
      waterRating: 7,
      price: '$99.50',
      location: 'Dubai, UAE',
      keywords: ['Keyword', 'Water', 'Sensor'],
    },
    {
      title: 'Proteus Water Level/Sump Monitor Sensor',
      company: 'Ultra Tec Water Treatment LLC',
      rating: 3.5,
      waterRating: 7,
      price: '$99.50',
      location: 'Dubai, UAE',
      keywords: ['Keyword', 'Water', 'Sensor'],
    },
    {
      title: 'Proteus Water Level/Sump Monitor Sensor',
      company: 'Ultra Tec Water Treatment LLC',
      rating: 3.5,
      waterRating: 7,
      price: '$99.50',
      location: 'Dubai, UAE',
      keywords: ['Keyword', 'Water', 'Sensor'],
    },
    {
      title: 'Proteus Water Level/Sump Monitor Sensor',
      company: 'Ultra Tec Water Treatment LLC',
      rating: 3.5,
      waterRating: 7,
      price: '$99.50',
      location: 'Dubai, UAE',
      keywords: ['Keyword', 'Water', 'Sensor'],
    },
    {
      title: 'Proteus Water Level/Sump Monitor Sensor',
      company: 'Ultra Tec Water Treatment LLC',
      rating: 3.5,
      waterRating: 7,
      price: '$99.50',
      location: 'Dubai, UAE',
      keywords: ['Keyword', 'Water', 'Sensor'],
    },
    {
      title: 'Proteus Water Level/Sump Monitor Sensor',
      company: 'Ultra Tec Water Treatment LLC',
      rating: 3.5,
      waterRating: 7,
      price: '$99.50',
      location: 'Dubai, UAE',
      keywords: ['Keyword', 'Water', 'Sensor'],
    },
  ];

  const categories = ['All', 'Water Softeners', 'Sensors'];

  const filteredProducts = products.filter(
    product => category === 'All' || category === '' || product.keywords.includes(category),
  );

  const handleCallClick = () => {
    console.log('Call button clicked');
  };

  const handleWebsiteClick = () => {
    console.log('Website button clicked');
  };

  return (
    <div className={css({px: '6', py: '4'})}>
      <CategorySelect categories={categories} onChange={setCategory} />
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4',
          mt: '4',
          mb: '8',
        })}
      >
        {filteredProducts.map(product => (
          <ProductCard
            key={`${product.title}-${product.company}`}
            title={product.title}
            company={product.company}
            rating={product.rating}
            waterRating={product.waterRating}
            price={product.price}
            location={product.location}
            keywords={product.keywords}
            onCallClick={handleCallClick}
            onWebsiteClick={handleWebsiteClick}
          />
        ))}
      </div>
      <Pagination
        nextLabel={<IconChevronRight className={css({w: '6', h: '6'})} />}
        onPageChange={current => {}}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={12}
        previousLabel={<IconChevronLeft />}
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
  );
};

export {Products};
