import {notFound, redirect} from 'next/navigation';

import {findCategoryById} from '@/graphql/query/categories/find-category-by-id';

const Page = async ({params: initalParams}: {params: {categoryId: string}}) => {
  const params = await initalParams;
  const categorty = await findCategoryById({id: params.categoryId});

  if (categorty) {
    redirect(`/articles/categories/${categorty.slug}`);
  }

  if (!categorty) {
    notFound();
  }

  return null;
};

export default Page;
