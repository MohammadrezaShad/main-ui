import {useState} from 'react';
import {css} from '@styled/css';

import {IconChevronLeft, IconChevronRight} from '@/assets';
import {CompanyType} from '@/graphql';

import {Pagination} from '../articles/articles.styled';
import CategorySelect from './category-select';
import ProductCard from './product-card';

const Products: React.FC<{company: CompanyType}> = ({company}) => {
  const [category, setCategory] = useState('');

  const products = company?.products || [];

  const categories = ['All'];
  products.forEach(product => categories.push(product.category.title));

  const filteredProducts = products.filter(
    product => category === 'All' || category === '' || product?.category?.title === category,
  );
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
          mdDown: {
            gridTemplateColumns: '1',
          },
        })}
      >
        {filteredProducts.map(
          product =>
            product.isActive &&
            product.status === 'PUBLISH' && (
              <ProductCard
                key={product._id}
                id={product.slug as string}
                title={product.title}
                thumbnail={product.thumbnail || undefined}
                company={product.sellerCompany.title || ''}
                companyId={product.sellerCompany.slug as string}
                rating={product.sellerCompany.rate || 0}
                waterRating={product.rate || 0}
                price={product?.variations?.[0]?.cost?.toString() || ''}
                location={`${product.sellerCompany.country?.name}, ${product.sellerCompany.city?.name}`}
                keywords={product.keywords || []}
                phoneNumber={product.sellerCompany.callNumber || ''}
                website={product.sellerCompany.website || ''}
              />
            ),
        )}
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
        className={css({
          display: 'none',
        })}
      />
    </div>
  );
};

export {Products};
