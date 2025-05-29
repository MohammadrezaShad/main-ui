/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */

'use client';

import {useEffect, useRef, useState} from 'react';
import {toast} from 'react-toastify';
import {css, cx} from '@styled/css';
import {useQueryClient} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';
import slugify from 'slugify';

import {IconArrowRight, IconEyeOpen, IconRedirect} from '@/assets';
import AsyncSelect from '@/components/templates/products/async-select';
import {
  createProduct,
  CreateProductInput,
  ProductCategoryType,
  ProductType,
  searchProductCategories,
  StatusType,
  updateProduct,
  uploadImage,
} from '@/graphql';
import {Box} from '@styled/jsx';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

interface Props {
  product?: ProductType;
}

export default function ProductForm({product}: Props) {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productInfo, setProductInfo] = useState({
    title: '',
    description: '',
    status: 'PUBLISH' as 'DRAFT' | 'PUBLISH',
  });

  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState<string>('');

  const [shops, setShops] = useState<any>([]);

  const [features, setFeatures] = useState([{name: '', value: ''}]);

  const [images, setImages] = useState<any[]>([]);

  const [variations, setVariations] = useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryType | null>(null);

  const [activeTab, setActiveTab] = useState('Information');

  const [draggedFeatureIndex, setDraggedFeatureIndex] = useState(null);
  const [dragOverFeatureIndex, setDragOverFeatureIndex] = useState(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const addKeyword = () => {
    if (newKeyword.trim() !== '') {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const handleShopChange = (index: number, field: any, value: any) => {
    const updatedShops: any = [...shops];
    updatedShops[index] = {...updatedShops[index], [field]: value};
    setShops(updatedShops);
  };

  const addShop = () => {
    const availableShops = getAvailableShops();
    if (availableShops.length > 0) {
      setShops([...shops, {platform: availableShops[0], url: ''}]);
    }
  };

  const removeShop = (index: number) => {
    setShops(shops.filter((_: any, i: number) => i !== index));
  };

  const handleFeatureChange = (index: number, field: any, value: any) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = {...updatedFeatures[index], [field]: value};
    setFeatures(updatedFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, {name: '', value: ''}]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureDragStart = (index: any) => {
    setDraggedFeatureIndex(index);
  };

  const handleFeatureDragOver = (e: any, index: any) => {
    e.preventDefault();
    setDragOverFeatureIndex(index);
  };

  const handleFeatureDrop = (e: any) => {
    e.preventDefault();

    if (
      draggedFeatureIndex === null ||
      dragOverFeatureIndex === null ||
      draggedFeatureIndex === dragOverFeatureIndex
    ) {
      return;
    }

    const updatedFeatures = [...features];
    const draggedFeature = updatedFeatures[draggedFeatureIndex];

    updatedFeatures.splice(draggedFeatureIndex, 1);

    updatedFeatures.splice(dragOverFeatureIndex, 0, draggedFeature);

    setFeatures(updatedFeatures);
    setDraggedFeatureIndex(null);
    setDragOverFeatureIndex(null);
  };

  const handleFeatureDragEnd = () => {
    setDraggedFeatureIndex(null);
    setDragOverFeatureIndex(null);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploaded = await uploadImage(file, {alt: file.name});
        const image = uploaded?.image;
        if (image) {
          setImages([
            ...images,
            {
              path: `${IMAGE_STORAGE_URL}/${image?.filename}-${image?._id}`,
              isMain: images.length === 0,
              name: image.filename,
              _id: image._id,
            },
          ]);
        }
      } catch (err) {
        alert('Image upload failed');
      }
    }
    if (e.target) e.target.value = '';
  };

  const handleSetMainImage = (id: number) => {
    const updatedImages = images.map((image, i) => ({
      ...image,
      isMain: image._id === id,
    }));

    setImages(updatedImages);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...images];
    const wasMain = updatedImages[index].isMain;

    updatedImages.splice(index, 1);

    if (wasMain && updatedImages.length > 0) {
      updatedImages[0].isMain = true;
    }

    setImages(updatedImages);
  };

  const handleDuplicateImage = (index: number) => {
    const imageToDuplicate = images[index];
    const newImage = {
      ...imageToDuplicate,
      isMain: false,
    };

    setImages([...images, newImage]);
  };

  const addVariationAttribute = () => {
    const defaultAttributes = [];

    defaultAttributes.push({name: 'Color', value: '#000000', icon: '', isMainFeature: false});

    if (selectedCategory?.variationAttributes) {
      selectedCategory.variationAttributes.forEach((attr: any) => {
        if (attr.options && attr.options.length > 0) {
          defaultAttributes.push({
            name: attr.name,
            value: attr.options[0],
            icon: '',
            isMainFeature: false,
          });
        }
      });
    }

    const newVariation = {
      cost: 0,
      stock: 0,
      isAvailable: true,
      variationAttributes: defaultAttributes,
    };

    setVariations([...variations, newVariation]);
  };

  const removeVariationAttribute = (index: number) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const addCustomVariationAttribute = (variationIndex: number) => {
    const updatedVariations = [...variations];
    updatedVariations[variationIndex].variationAttributes.push({
      name: '',
      value: '',
      icon: '',
      isMainFeature: false,
    });
    setVariations(updatedVariations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!productInfo.title) {
        setError('Please enter a product title');
        setIsSubmitting(false);
        return;
      }

      const validShops = shops.reduce((acc: any, item: any) => {
        const key = item.platform.toLowerCase() === 'walmart' ? 'wallmart' : item.platform;
        if (item.url) {
          acc[key as keyof typeof acc] = item.url;
        }
        return acc;
      }, {});

      const input: CreateProductInput = {
        title: productInfo.title,
        slug: slugify(productInfo.title, {remove: /[*+~.()'"!:@]/g, lower: true, trim: true}),
        category: selectedCategory?._id,
        sellerCompany: params.businessId as string,
        variations: variations.map(variation => ({
          cost: variation.cost,
          stock: variation.stock,
          isAvailable: variation.isAvailable,
          variationAttributes: variation.variationAttributes.map((attr: any) => ({
            name: attr.name,
            value: attr.value,
            icon: attr.icon || '',
            isMainFeature: attr.isMainFeature || false,
          })),
        })),
        thumbnail: images.find(image => image.isMain)?._id,
        about: productInfo.description,
        features: features
          .filter(feature => feature.name && feature.value)
          .map((feature, index) => ({
            name: feature.name,
            value: feature.value,
            isMainFeature: index === 0,
          })),
        images: images.map(img => img._id),
        status: productInfo.status as StatusType,
        isActive: true,
        keywords,
        ...validShops,
      };

      const action = product ? updateProduct : createProduct;

      if (product) {
        (input as any).id = product._id;
      }

      const response = await action(input as any);

      if (response.success) {
        queryClient.invalidateQueries({queryKey: ['search-business-products', 'search-product']});
        toast.success('Product created successfully');
        router.push(`/profile/businesses/${params.businessId}/products`);
      } else {
        setError('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setError(
        error instanceof Error ? error.message : 'An error occurred while creating the product',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvailableShops = () => {
    const allShops = ['amazon', 'eBay', 'walmart'];
    const selectedShops = shops.map((shop: any) => shop.platform);
    return allShops.filter(shop => !selectedShops.includes(shop));
  };

  useEffect(() => {
    if (product) {
      setProductInfo({
        title: product.title,
        description: product.about || '',
        status: 'PUBLISH' as 'DRAFT' | 'PUBLISH',
      });
      setVariations(product.variations || []);
      if (product.images)
        setImages(
          product.images.map(image => ({
            path: `${IMAGE_STORAGE_URL}/${image?.filename}-${image?._id}`,
            isMain: images.length === 0,
            name: image.filename,
            _id: image._id,
          })),
        );
      setFeatures(
        product.features ? [...product.features, {name: '', value: ''}] : [{name: '', value: ''}],
      );
      setKeywords(product.keywords || []);
      setSelectedCategory(product.category);
      setShops([
        {
          platform: 'amazon',
          url: product.amazon || '',
        },
        {
          platform: 'eBay',
          url: product.eBay || '',
        },
        {
          platform: 'walmart',
          url: product.wallmart || '',
        },
      ]);
    }
  }, [product]);

  return (
    <div
      className={css({
        ml: 'auto',
        mr: 'auto',
        bgColor: 'white',
        rounded: '0',
        w: 'full',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          w: '100%',
          p: {lgDown: 4},
          px: '6',
          py: '10',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
          })}
        >
          <Link href={`/profile/businesses/${params.businessId}/products`}>
            <IconArrowRight
              className={css({
                fill: 'gray3',
                transform: 'rotate(180deg)',
              })}
            />
          </Link>
          <h1
            className={css({
              textStyle: 'headline3',
              color: 'text.primary',
            })}
          >
            {productInfo.title}
          </h1>
        </div>
        <Box display='flex' alignItems='center' gap='2'>
          {product ? (
            <Box display='flex' flexDir='column' gap={4}>
              <div className={css({w: 'full', display: 'flex', alignItems: 'center', gap: '2'})}>
                <IconEyeOpen className={css({w: '6', h: '6', color: 'gray4'})} />
                <p className={css({fontSize: 'sm', color: 'gray.600'})}>{product.view}</p>
              </div>
              <div className={css({w: 'full', display: 'flex', alignItems: 'center', gap: '2'})}>
                <IconRedirect className={css({w: '6', h: '6', color: 'gray4'})} />
                <p className={css({fontSize: 'sm', color: 'gray.600'})}>{product.redirect}</p>
              </div>
            </Box>
          ) : null}
          <select
            name='status'
            value={productInfo.status}
            onChange={handleInputChange}
            className={css({
              p: '2',
              borderWidth: '1px',
              borderColor: 'gray3',
              h: '12',
              rounded: '0',
              minW: '[121px]',
              _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
            })}
          >
            <option value='DRAFT'>Draft</option>
            <option value='PUBLISH'>Publish</option>
          </select>
        </Box>
      </div>
      <div className={css({display: 'flex', borderBottomWidth: '1px', borderColor: 'gray3'})}>
        {['Information', 'Features', 'Images', 'Variations'].map(tab => (
          <button
            type='button'
            key={tab}
            className={cx(
              css({
                pl: '6',
                pr: '6',
                pt: '3',
                pb: '3',
                fontWeight: 'medium',
                fontSize: 'sm',
                lineHeight: 'sm',
                cursor: 'pointer',
              }),
              activeTab === tab
                ? css({color: 'blue.500', borderBottomWidth: '2px', borderColor: 'blue.500'})
                : css({color: 'gray.500', _hover: {color: 'gray.700'}}),
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={css({p: '6'})}>
        {activeTab === 'Information' && (
          <>
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: '1',
                md: {gridTemplateColumns: '2'},
                gap: '6',
              })}
            >
              <div className={css({mt: '2', mb: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                  htmlFor='title'
                >
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  value={productInfo.title}
                  onChange={handleInputChange}
                  className={css({
                    w: 'full',
                    p: '2',
                    borderWidth: '1px',
                    borderColor: 'gray.300',
                    h: '12',
                    rounded: '0',
                    _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                  })}
                />
              </div>

              <div className={css({mt: '2', mb: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                >
                  Product Category
                </label>
                <div
                  className={css({
                    border: '1px solid token(colors.gray.300)',
                    height: '12',
                    display: 'flex',
                    alignItems: 'center',
                  })}
                >
                  <AsyncSelect
                    loadOptions={async (inputValue: string) => {
                      const response = await searchProductCategories({
                        page: 1,
                        count: 50,
                        text: inputValue,
                      });
                      return response.results?.map(result => ({
                        id: result._id,
                        value: result._id,
                        label: result.title,
                      })) as any;
                    }}
                    onChange={selectedOption => {
                      setSelectedCategory({
                        _id: selectedOption?.id,
                        title: selectedOption?.label,
                      } as ProductCategoryType);
                    }}
                    placeholder={selectedCategory ? selectedCategory.title : 'Select a category...'}
                    defaultOptions
                    className={{
                      h: {
                        mdDown: '64px',
                      },
                    }}
                  />
                </div>
              </div>

              <div className={css({mt: '2', mb: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                >
                  Keywords
                </label>
                <div
                  className={css({
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '2',
                    p: '2',
                    borderWidth: '1px',
                    borderColor: 'gray.300',
                    h: '12',
                    rounded: '0',
                  })}
                >
                  {keywords.map((keyword, index) => (
                    <div
                      key={index}
                      className={css({
                        display: 'flex',
                        alignItems: 'center',
                        bgColor: 'gray.100',
                        rounded: '0',
                        pl: '2',
                        pr: '2',
                        pt: '1',
                        pb: '1',
                      })}
                    >
                      <span className={css({fontSize: 'sm', lineHeight: 'sm'})}>{keyword}</span>
                      <button
                        type='button'
                        onClick={() => removeKeyword(index)}
                        className={css({ml: '1', color: 'gray.400', _hover: {color: 'gray.600'}})}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type='text'
                    value={newKeyword}
                    onChange={e => setNewKeyword(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addKeyword();
                      }
                    }}
                    placeholder='Add keyword...'
                    className={css({
                      flex: '1',
                      minW: '100px',
                      ring: 'none',
                      ringOffset: 'none',
                      fontSize: 'sm',
                      lineHeight: 'sm',
                    })}
                  />
                </div>
              </div>
            </div>

            <div className={css({mt: '2', mb: '2'})}>
              <label
                className={css({
                  display: 'block',
                  fontSize: 'sm',
                  lineHeight: 'sm',
                  color: 'gray.500',
                })}
              >
                About Product
              </label>
              <textarea
                name='description'
                value={productInfo.description}
                onChange={handleInputChange}
                rows={6}
                className={css({
                  w: 'full',
                  p: '2',
                  borderWidth: '1px',
                  borderColor: 'gray.300',
                  rounded: '0',
                  _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                })}
              />
            </div>

            <div className={css({mt: '6'})}>
              <h2
                className={css({fontSize: 'lg', lineHeight: 'lg', fontWeight: 'medium', mb: '4'})}
              >
                Online Shops
              </h2>
              <div className={css({mt: '4', mb: '4'})}>
                {shops.map((shop: any, index: number) => (
                  <div key={index} className={css({display: 'flex', gap: '2', mb: '6'})}>
                    <select
                      value={shop.platform}
                      onChange={e => handleShopChange(index, 'platform', e.target.value)}
                      className={css({
                        w: '40',
                        p: '2',
                        borderWidth: '1px',
                        borderColor: 'gray.300',
                        h: '12',
                        rounded: '0',
                        _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                      })}
                    >
                      <option value={shop.platform}>{shop.platform}</option>
                      {getAvailableShops().map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <input
                      type='text'
                      value={shop.url}
                      onChange={e => handleShopChange(index, 'url', e.target.value)}
                      placeholder='Enter URL...'
                      className={css({
                        flex: '1',
                        p: '2',
                        borderWidth: '1px',
                        borderColor: 'gray.300',
                        h: '12',
                        rounded: '0',
                        _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                      })}
                    />
                    <button
                      type='button'
                      onClick={() => removeShop(index)}
                      className={css({p: '2', color: 'red.500', _hover: {color: 'red.700'}})}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M3 6h18' />
                        <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                        <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={addShop}
                  disabled={getAvailableShops().length === 0}
                  className={cx(
                    css({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      w: 'full',
                      p: '2',
                      borderWidth: '1px',
                      borderColor: 'gray.300',
                      h: '12',
                      borderStyle: 'dashed',
                      rounded: '0',
                    }),
                    getAvailableShops().length === 0
                      ? css({color: 'gray.300', borderColor: 'gray.200', cursor: 'not-allowed'})
                      : css({
                          color: 'gray.500',
                          _hover: {color: 'gray.700', borderColor: 'gray.400'},
                        }),
                  )}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className={css({mr: '1'})}
                  >
                    <path d='M12 5v14' />
                    <path d='M5 12h14' />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Features' && (
          <div className={css({mt: '4', mb: '4'})}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={cx(
                  css({display: 'flex', alignItems: 'center', gap: '4'}),
                  dragOverFeatureIndex === index
                    ? css({borderWidth: '2px', borderColor: 'blue.300', rounded: '0'})
                    : '',
                )}
                draggable={feature.name !== '' || feature.value !== ''}
                onDragStart={() => handleFeatureDragStart(index)}
                onDragOver={e => handleFeatureDragOver(e, index)}
                onDrop={handleFeatureDrop}
                onDragEnd={handleFeatureDragEnd}
              >
                <button
                  type='button'
                  className={css({
                    color: 'gray.400',
                    cursor: 'grab',
                    _active: {cursor: 'grabbing'},
                  })}
                  aria-label='Drag to reorder'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='4' y1='8' x2='20' y2='8' />
                    <line x1='4' y1='16' x2='20' y2='16' />
                  </svg>
                </button>

                <div className={css({flex: '1', mt: '2', mb: '2'})}>
                  <label
                    className={css({
                      display: 'block',
                      fontSize: 'sm',
                      lineHeight: 'sm',
                      color: 'gray.500',
                    })}
                  >
                    Feature Key
                  </label>
                  <input
                    type='text'
                    value={feature.name}
                    onChange={e => handleFeatureChange(index, 'name', e.target.value)}
                    placeholder='Feature Key'
                    className={css({
                      w: 'full',
                      p: '2',
                      borderWidth: '1px',
                      borderColor: 'gray.300',
                      h: '12',
                      rounded: '0',
                      _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                    })}
                  />
                </div>

                <div className={css({flex: '1', mt: '2', mb: '2'})}>
                  <label
                    className={css({
                      display: 'block',
                      fontSize: 'sm',
                      lineHeight: 'sm',
                      color: 'gray.500',
                    })}
                  >
                    Feature Value
                  </label>
                  <input
                    type='text'
                    value={feature.value}
                    onChange={e => handleFeatureChange(index, 'value', e.target.value)}
                    placeholder='Feature Value'
                    className={css({
                      w: 'full',
                      p: '2',
                      borderWidth: '1px',
                      borderColor: 'gray.300',
                      h: '12',
                      rounded: '0',
                      _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                    })}
                  />
                </div>

                <button
                  type='button'
                  onClick={() => removeFeature(index)}
                  className={css({p: '2', color: 'red.500', _hover: {color: 'red.700'}, mt: '6'})}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M3 6h18' />
                    <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                    <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={addFeature}
              className={css({
                p: '2',
                color: 'gray.500',
                _hover: {color: 'gray.700'},
                mt: '6',
                display: 'flex',
                alignItems: 'center',
                gap: '2',
                cursor: 'pointer',
              })}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M12 5v14' />
                <path d='M5 12h14' />
              </svg>
              Add feature
            </button>
          </div>
        )}

        {activeTab === 'Images' && (
          <div className={css({mt: '6', mb: '6'})}>
            <div
              className={css({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '6',
              })}
            >
              <button
                type='button'
                onClick={handleImageUpload}
                className={css({
                  pl: '4',
                  pr: '4',
                  pt: '2',
                  pb: '2',
                  bgColor: 'white',
                  borderWidth: '1px',
                  borderColor: 'gray.300',
                  rounded: '0',
                  color: 'gray.700',
                  _hover: {bgColor: 'gray.50'},
                })}
              >
                Add New Image
              </button>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                accept='image/*'
                className={css({display: 'none'})}
              />
            </div>

            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: '1',
                md: {gridTemplateColumns: '3'},
                gap: '6',
              })}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={css({
                    borderWidth: '1px',
                    borderColor: 'gray3',
                    rounded: '0',
                    overflow: 'hidden',
                  })}
                >
                  <div className={css({pos: 'relative', h: '48', bgColor: 'gray.100'})}>
                    <Image
                      src={image.path}
                      alt={`Product image ${index + 1}`}
                      fill
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  <div
                    className={css({
                      p: '3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    })}
                  >
                    <div className={css({display: 'flex', alignItems: 'center'})}>
                      <div
                        className={cx(
                          css({
                            w: '5',
                            h: '5',
                            borderWidth: '1px',
                            borderColor: 'gray.300',
                            rounded: 'rounded',
                            mr: '2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }),
                          image.isMain
                            ? css({bgColor: 'teal.500', borderColor: 'teal.500'})
                            : css({borderColor: 'gray.300'}),
                        )}
                        onClick={() => handleSetMainImage(image._id)}
                      >
                        {image.isMain && (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='white'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <polyline points='20 6 9 17 4 12' />
                          </svg>
                        )}
                      </div>
                      <span className={css({fontSize: 'sm', lineHeight: 'sm'})}>Main Image</span>
                    </div>
                    <div className={css({display: 'flex'})}>
                      <button
                        type='button'
                        onClick={() => handleDuplicateImage(index)}
                        className={css({p: '1', color: 'gray.500', _hover: {color: 'gray.700'}})}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
                          <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
                        </svg>
                      </button>
                      <button
                        type='button'
                        onClick={() => handleDeleteImage(index)}
                        className={css({
                          p: '1',
                          color: 'red.500',
                          _hover: {color: 'red.700'},
                          ml: '2',
                        })}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M3 6h18' />
                          <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                          <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Variations' && (
          <div className={css({mt: '4', mb: '4'})}>
            <div
              className={css({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '2',
              })}
            >
              <h2 className={css({fontSize: 'lg', lineHeight: 'lg', fontWeight: 'medium'})}>
                Product Variations
              </h2>
              <button
                type='button'
                onClick={addVariationAttribute}
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  pl: '4',
                  pr: '4',
                  pt: '2',
                  pb: '2',
                  bgColor: 'blue.500',
                  color: 'white',
                  rounded: '0',
                  _hover: {bgColor: 'blue.600'},
                })}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className={css({mr: '1'})}
                >
                  <path d='M12 5v14' />
                  <path d='M5 12h14' />
                </svg>
                Add Variation
              </button>
            </div>

            {variations.map((variation, index) => (
              <div
                key={index}
                className={css({
                  p: '2',
                  mb: '2',
                  pt: '8',
                  borderWidth: '1px',
                  borderColor: 'gray.300',
                  rounded: '0',
                  pos: 'relative',
                })}
              >
                <button
                  type='button'
                  onClick={() => removeVariationAttribute(index)}
                  className={css({
                    pos: 'absolute',
                    right: '2',
                    top: '2',
                    p: '1',
                    color: 'gray.500',
                    _hover: {color: 'gray.700'},
                  })}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='18' y1='6' x2='6' y2='18' />
                    <line x1='6' y1='6' x2='18' y2='18' />
                  </svg>
                </button>

                <div
                  className={css({
                    display: 'grid',
                    gridTemplateColumns: '1',
                    md: {gridTemplateColumns: '3'},
                    gap: '4',
                  })}
                >
                  <div>
                    <label
                      className={css({
                        display: 'block',
                        fontSize: 'sm',
                        lineHeight: 'sm',
                        color: 'gray.500',
                        mb: '1',
                      })}
                    >
                      Cost
                    </label>
                    <input
                      type='number'
                      value={variation.cost}
                      onChange={e => {
                        const newVariations = [...variations];
                        newVariations[index].cost = Number.parseFloat(e.target.value);
                        setVariations(newVariations);
                      }}
                      className={css({
                        w: 'full',
                        p: '2',
                        borderWidth: '1px',
                        borderColor: 'gray.300',
                        h: '12',
                        rounded: '0',
                        _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                      })}
                    />
                  </div>
                  <div>
                    <label
                      className={css({
                        display: 'block',
                        fontSize: 'sm',
                        lineHeight: 'sm',
                        color: 'gray.500',
                        mb: '1',
                      })}
                    >
                      Stock
                    </label>
                    <input
                      type='number'
                      value={variation.stock}
                      onChange={e => {
                        const newVariations = [...variations];
                        newVariations[index].stock = Number(e.target.value);
                        setVariations(newVariations);
                      }}
                      className={css({
                        w: 'full',
                        p: '2',
                        borderWidth: '1px',
                        borderColor: 'gray.300',
                        h: '12',
                        rounded: '0',
                        _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                      })}
                    />
                  </div>
                  <div className={css({display: 'flex', alignItems: 'center'})}>
                    <label
                      className={css({
                        pos: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                      })}
                    >
                      <input
                        type='checkbox'
                        checked={variation.isAvailable}
                        onChange={e => {
                          const newVariations = [...variations];
                          newVariations[index].isAvailable = e.target.checked;
                          setVariations(newVariations);
                        }}
                      />
                      <span
                        className={css({
                          ml: '3',
                          fontSize: 'sm',
                          lineHeight: 'sm',
                          fontWeight: 'medium',
                          color: 'gray.700',
                        })}
                      >
                        Available
                      </span>
                    </label>
                  </div>
                </div>

                <h3
                  className={css({
                    fontSize: 'base',
                    lineHeight: 'base',
                    fontWeight: 'medium',
                    mt: '4',
                    mb: '2',
                  })}
                >
                  Category Variation Attributes
                </h3>
                <div
                  className={css({
                    display: 'grid',
                    gridTemplateColumns: '1',
                    md: {gridTemplateColumns: '3'},
                    gap: '4',
                  })}
                >
                  {variation.variationAttributes
                    .filter(
                      (attr: any) =>
                        selectedCategory?.variationAttributes?.find(
                          (va: any) => va.name === attr.name,
                        ) || attr.name === 'Color',
                    )
                    .map((attr: any, attrIndex: number) => {
                      const variationAttrIndex = variation.variationAttributes.indexOf(attr);
                      return (
                        <div key={attrIndex}>
                          {attr.name === 'Color' ? (
                            <div>
                              <label
                                className={css({
                                  display: 'block',
                                  fontSize: 'sm',
                                  lineHeight: 'sm',
                                  color: 'gray.500',
                                  mb: '1',
                                })}
                              >
                                {attr.name}
                              </label>
                              <input
                                type='color'
                                value={attr.value || '#000000'}
                                onChange={e => {
                                  const newVariations = [...variations];
                                  newVariations[index].variationAttributes[
                                    variationAttrIndex
                                  ].value = e.target.value;
                                  setVariations(newVariations);
                                }}
                                className={css({
                                  w: 'full',
                                  h: '10',
                                  p: '1',
                                  borderWidth: '1px',
                                  borderColor: 'gray.300',
                                  rounded: '0',
                                })}
                              />
                            </div>
                          ) : (
                            <div>
                              <label
                                className={css({
                                  display: 'block',
                                  fontSize: 'sm',
                                  lineHeight: 'sm',
                                  color: 'gray.500',
                                  mb: '1',
                                })}
                              >
                                {attr.name}
                              </label>
                              <select
                                value={attr.value}
                                onChange={e => {
                                  const newVariations = [...variations];
                                  newVariations[index].variationAttributes[
                                    variationAttrIndex
                                  ].value = e.target.value;
                                  setVariations(newVariations);
                                }}
                                className={css({
                                  w: 'full',
                                  p: '2',
                                  borderWidth: '1px',
                                  borderColor: 'gray.300',
                                  h: '12',
                                  rounded: '0',
                                  _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                                })}
                              >
                                {selectedCategory?.variationAttributes
                                  ?.find((va: any) => va.name === attr.name)
                                  ?.options?.map((option: any) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>

                <div className={css({mt: '6'})}>
                  <div className={css({display: 'flex', alignItems: 'center', gap: '2', mb: '2'})}>
                    <h3
                      className={css({fontSize: 'base', lineHeight: 'base', fontWeight: 'medium'})}
                    >
                      Custom Variation Attributes
                    </h3>
                    <button
                      type='button'
                      onClick={() => addCustomVariationAttribute(index)}
                      className={css({
                        display: 'flex',
                        alignItems: 'center',
                        pl: '3',
                        pr: '3',
                        pt: '1',
                        pb: '1',
                        fontSize: 'sm',
                        lineHeight: 'sm',
                        borderWidth: '1px',
                        borderColor: 'gray.300',
                        h: '12',
                        rounded: '0',
                        _hover: {bgColor: 'gray.50'},
                      })}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className={css({mr: '1'})}
                      >
                        <path d='M12 5v14' />
                        <path d='M5 12h14' />
                      </svg>
                      Add Custom Attribute
                    </button>
                  </div>

                  {variation.variationAttributes
                    .filter(
                      (attr: any) =>
                        !selectedCategory?.variationAttributes?.find(
                          (va: any) => va.name === attr.name,
                        ) && attr.name !== 'Color',
                    )
                    .map((attr: any, attrIndex: number) => {
                      const customAttrIndex = variation.variationAttributes.indexOf(attr);
                      return (
                        <div
                          key={`custom-${attrIndex}`}
                          className={css({display: 'flex', gap: '2', mb: '2'})}
                        >
                          <div className={css({flex: '1'})}>
                            <label
                              className={css({
                                display: 'block',
                                fontSize: 'sm',
                                lineHeight: 'sm',
                                color: 'gray.500',
                                mb: '1',
                              })}
                            >
                              Name
                            </label>
                            <input
                              type='text'
                              value={attr.name}
                              onChange={e => {
                                const newVariations = [...variations];
                                newVariations[index].variationAttributes[customAttrIndex].name =
                                  e.target.value;
                                setVariations(newVariations);
                              }}
                              className={css({
                                w: 'full',
                                p: '2',
                                borderWidth: '1px',
                                borderColor: 'gray.300',
                                h: '12',
                                rounded: '0',
                                _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                              })}
                            />
                          </div>
                          <div className={css({flex: '1'})}>
                            <label
                              className={css({
                                display: 'block',
                                fontSize: 'sm',
                                lineHeight: 'sm',
                                color: 'gray.500',
                                mb: '1',
                              })}
                            >
                              Value
                            </label>
                            <input
                              type='text'
                              value={attr.value}
                              onChange={e => {
                                const newVariations = [...variations];
                                newVariations[index].variationAttributes[customAttrIndex].value =
                                  e.target.value;
                                setVariations(newVariations);
                              }}
                              className={css({
                                w: 'full',
                                p: '2',
                                borderWidth: '1px',
                                borderColor: 'gray.300',
                                h: '12',
                                rounded: '0',
                                _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                              })}
                            />
                          </div>
                          <div className={css({flex: '1'})}>
                            <label
                              className={css({
                                display: 'block',
                                fontSize: 'sm',
                                lineHeight: 'sm',
                                color: 'gray.500',
                                mb: '1',
                              })}
                            >
                              Icon
                            </label>
                            <input
                              type='text'
                              value={attr.icon || ''}
                              onChange={e => {
                                const newVariations = [...variations];
                                newVariations[index].variationAttributes[customAttrIndex].icon =
                                  e.target.value;
                                setVariations(newVariations);
                              }}
                              className={css({
                                w: 'full',
                                p: '2',
                                borderWidth: '1px',
                                borderColor: 'gray.300',
                                h: '12',
                                rounded: '0',
                                _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                              })}
                            />
                          </div>
                          <div className={css({display: 'flex', alignItems: 'flex-end', mb: '1'})}>
                            <label
                              className={css({
                                pos: 'relative',
                                display: 'inline-flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                              })}
                            >
                              <input
                                type='checkbox'
                                checked={attr.isMainFeature || false}
                                onChange={e => {
                                  const newVariations = [...variations];
                                  newVariations[index].variationAttributes[
                                    customAttrIndex
                                  ].isMainFeature = e.target.checked;
                                  setVariations(newVariations);
                                }}
                              />
                              <span
                                className={css({
                                  ml: '3',
                                  fontSize: 'sm',
                                  lineHeight: 'sm',
                                  fontWeight: 'medium',
                                  color: 'gray.700',
                                })}
                              >
                                Main Feature
                              </span>
                            </label>
                          </div>
                          <button
                            type='button'
                            onClick={() => {
                              const newVariations = [...variations];
                              newVariations[index].variationAttributes.splice(customAttrIndex, 1);
                              setVariations(newVariations);
                            }}
                            className={css({
                              p: '2',
                              color: 'red.500',
                              _hover: {color: 'red.700'},
                              alignSelf: 'flex-end',
                              mb: '1',
                            })}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='20'
                              height='20'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <line x1='18' y1='6' x2='6' y2='18' />
                              <line x1='6' y1='6' x2='18' y2='18' />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={css({mt: '8', display: 'flex', gap: '2'})}>
          <button
            type='submit'
            disabled={isSubmitting}
            className={css({
              pl: '6',
              pr: '6',
              pt: '2',
              pb: '2',
              bgColor: 'blue.500',
              color: 'white',
              rounded: '0',
              _hover: {bgColor: 'blue.600'},
              _focus: {ring: 'none', ringOffset: 'none', shadow: '2'},
              _disabled: {
                bgColor: 'gray.300',
                cursor: 'not-allowed',
                _hover: {bgColor: 'gray.300'},
              },
            })}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type='button'
            disabled={isSubmitting}
            className={css({
              pl: '6',
              pr: '6',
              pt: '2',
              pb: '2',
              bgColor: 'gray.200',
              color: 'gray.700',
              rounded: '0',
              _hover: {bgColor: 'gray.300'},
              _focus: {ring: 'none', ringOffset: 'none', shadow: '2'},
              _disabled: {
                bgColor: 'gray.100',
                cursor: 'not-allowed',
                _hover: {bgColor: 'gray.100'},
              },
            })}
          >
            Cancel
          </button>
        </div>

        {error && (
          <div
            className={css({
              mt: '4',
              p: '3',
              bgColor: 'red.50',
              borderWidth: '1px',
              borderColor: 'red.200',
              rounded: '0',
              color: 'red.700',
            })}
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
