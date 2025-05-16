/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import {useState} from 'react';
import {toast} from 'react-toastify';
import {css, cx} from '@styled/css';
import {useQuery} from '@tanstack/react-query';

import {CityType, CompanyType, CountryType, searchCities, searchCountries} from '@/graphql';
import {Weekday, WorktimeType} from '@/graphql/generated/types';
import {updateCompany} from '@/graphql/mutation/business/update-business';

interface Props {
  company: CompanyType;
}

export default function BusinessInfoPage({company}: Props) {
  const [activeTab, setActiveTab] = useState('Information');

  const [companyInfo, setCompanyInfo] = useState({
    name: company.title || '',
    about: company.about || '',
    email: company.email || '',
    phone: company.callNumber || '',
    website: company.website || '',
    address: company.address || '',
  });

  const [keywords, setKeywords] = useState<string[]>(company.keywords || []);
  const [newKeyword, setNewKeyword] = useState('');

  const [socialMedia, setSocialMedia] = useState([
    {platform: 'Facebook', url: company.facebook || ''},
    {platform: 'Twitter', url: company.twitter || ''},
    {platform: 'Instagram', url: company.instagram || ''},
  ]);

  const [workingHours, setWorkingHours] = useState<WorktimeType[]>(
    company.worktimes || [
      {day: Weekday.Monday, isOpened: false, startTime: null, finishTime: null},
      {day: Weekday.Tuesday, isOpened: false, startTime: null, finishTime: null},
      {day: Weekday.Wednesday, isOpened: false, startTime: null, finishTime: null},
      {day: Weekday.Thursday, isOpened: false, startTime: null, finishTime: null},
      {day: Weekday.Friday, isOpened: false, startTime: null, finishTime: null},
      {day: Weekday.Saturday, isOpened: false, startTime: null, finishTime: null},
      {day: Weekday.Sunday, isOpened: false, startTime: null, finishTime: null},
    ],
  );

  const [products, setProducts] = useState(company.productAndServices || []);

  const [countryInputValue, setCountryInputValue] = useState('');
  const [cityInputValue, setCityInputValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>(company.country?._id || '');
  const [selectedCity, setSelectedCity] = useState<string>(company.city?._id || '');

  const handleCompanyInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setCompanyInfo({
      ...companyInfo,
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

  const handleSocialMediaChange = (index: number, field: any, value: any) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index] = {...updatedSocialMedia[index], [field]: value};
    setSocialMedia(updatedSocialMedia);
  };

  const addSocialMedia = () => {
    setSocialMedia([...socialMedia, {platform: 'Instagram', url: ''}]);
  };

  const removeSocialMedia = (index: number) => {
    setSocialMedia(socialMedia.filter((_, i) => i !== index));
  };

  const handleWorkingHoursChange = (
    index: number,
    field: 'isOpened' | 'startTime' | 'finishTime',
    value: boolean | string | {hour: number; minute: number; meridiem: string},
  ) => {
    const newWorkingHours = [...workingHours];

    if (field === 'isOpened') {
      newWorkingHours[index] = {
        ...newWorkingHours[index],
        isOpened: value as boolean,
      };
    } else if (field === 'startTime' || field === 'finishTime') {
      if (typeof value === 'string') {
        const [hours, minutes] = value.split(':');
        const hour24 = Number(hours);
        const minute = Number(minutes);

        let hour12 = hour24 % 12;
        if (hour12 === 0) hour12 = 12;

        newWorkingHours[index] = {
          ...newWorkingHours[index],
          [field]: {
            hour: hour12,
            minute,
            meridiem: hour24 >= 12 ? 'PM' : 'AM',
          },
        };
      } else {
        newWorkingHours[index] = {
          ...newWorkingHours[index],
          [field]: value as {hour: number; minute: number; meridiem: string},
        };
      }
    }

    setWorkingHours(newWorkingHours);
  };

  const removeWorkingHour = (index: number) => {
    setWorkingHours(workingHours.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index] = value;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, '']);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await updateCompany({
        id: company._id,
        title: companyInfo.name,
        about: companyInfo.about,
        email: companyInfo.email,
        callNumber: companyInfo.phone,
        website: companyInfo.website,
        address: companyInfo.address,
        keywords,
        facebook: socialMedia.find(sm => sm.platform === 'Facebook')?.url,
        twitter: socialMedia.find(sm => sm.platform === 'Twitter')?.url,
        instagram: socialMedia.find(sm => sm.platform === 'Instagram')?.url,
        productAndServices: products,
        worktimes: workingHours.map(wh => ({
          day: wh.day,
          isOpened: wh.isOpened,
          startTime: wh.startTime
            ? {
                hour: wh.startTime.hour,
                minute: wh.startTime.minute,
                meridiem: wh.startTime.meridiem,
              }
            : undefined,
          finishTime: wh.finishTime
            ? {
                hour: wh.finishTime.hour,
                minute: wh.finishTime.minute,
                meridiem: wh.finishTime.meridiem,
              }
            : undefined,
        })),
      });

      if (response.success) {
        toast.success('Company information updated successfully');
      }
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error('Failed to update company information');
    }
  };

  const countryQuery = useQuery({
    queryKey: ['get-countries', countryInputValue],
    queryFn: () => searchCountries({count: 1000, text: countryInputValue}),
  });

  const countries: CountryType[] = countryQuery.data?.results || [];

  const handleCountryInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setCountryInputValue(value);
    await countryQuery.refetch();
  };

  const handleSelectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);
    setCompanyInfo(prev => ({
      ...prev,
      country: countryId,
    }));
    setSelectedCity('');
    setCompanyInfo(prev => ({
      ...prev,
      city: '',
    }));
  };

  const cityQuery = useQuery({
    queryKey: ['get-cities', selectedCountry, cityInputValue],
    queryFn: () => searchCities({count: 1000, parent: selectedCountry, text: cityInputValue}),
    enabled: !!selectedCountry,
  });

  const cities: CityType[] = cityQuery.data?.results || [];

  const handleCityInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setCityInputValue(value);
    await cityQuery.refetch();
  };

  const handleSelectCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    setCompanyInfo(prev => ({
      ...prev,
      city: cityId,
    }));
  };

  return (
    <div
      className={css({
        maxW: '5xl',
        bgColor: 'white',
        w: 'full',
      })}
    >
      <div className={css({display: 'flex', borderBottomWidth: '1px', borderColor: 'gray.300'})}>
        {['Information', 'Working Hours', 'Product & Services'].map(tab => (
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
                >
                  Company Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={companyInfo.name}
                  onChange={handleCompanyInfoChange}
                  className={css({
                    w: 'full',
                    p: '2',
                    borderWidth: '1px',
                    borderColor: 'gray.300',
                    rounded: '0',
                    h: '12',
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
                  Website
                </label>
                <input
                  type='text'
                  name='website'
                  value={companyInfo.website}
                  onChange={handleCompanyInfoChange}
                  className={css({
                    w: 'full',
                    p: '2',
                    borderWidth: '1px',
                    borderColor: 'gray.300',
                    rounded: '0',
                    h: '12',
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
                  Phone
                </label>
                <input
                  type='text'
                  name='phone'
                  value={companyInfo.phone}
                  onChange={handleCompanyInfoChange}
                  className={css({
                    w: 'full',
                    p: '2',
                    borderWidth: '1px',
                    borderColor: 'gray.300',
                    rounded: '0',
                    h: '12',
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
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={companyInfo.email}
                  onChange={handleCompanyInfoChange}
                  className={css({
                    w: 'full',
                    p: '2',
                    borderWidth: '1px',
                    borderColor: 'gray.300',
                    rounded: '0',
                    h: '12',
                    _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                  })}
                />
              </div>

              <div className={css({mt: '2', mb: '4'})}>
                <label className={css({display: 'block', mb: '2', fontWeight: 'medium'})}>
                  Country
                </label>
                <select
                  name='country'
                  value={selectedCountry}
                  onChange={handleSelectCountry}
                  className={css({
                    w: 'full',
                    p: '2',
                    borderWidth: '1px',
                    borderColor: 'gray.300',
                    h: '12',
                    borderRadius: 'sm',
                    _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                  })}
                >
                  <option value=''>Select a country</option>
                  {countries.map(country => (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={css({mt: '2', mb: '4'})}>
                <label className={css({display: 'block', mb: '2', fontWeight: 'medium'})}>
                  City
                </label>
                <select
                  name='city'
                  value={selectedCity}
                  onChange={handleSelectCity}
                  disabled={!selectedCountry}
                  className={css({
                    w: 'full',
                    p: '2',
                    borderWidth: '1px',
                    borderColor: 'gray.300',
                    borderRadius: 'sm',
                    h: '12',
                    _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                    _disabled: {opacity: '0.5', cursor: 'not-allowed'},
                  })}
                >
                  <option value=''>Select a city</option>
                  {cities.map(city => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
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
                Address
              </label>
              <input
                type='text'
                name='address'
                value={companyInfo.address}
                onChange={handleCompanyInfoChange}
                className={css({
                  w: 'full',
                  p: '2',
                  borderWidth: '1px',
                  borderColor: 'gray.300',
                  rounded: '0',
                  h: '12',
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
                  rounded: '0',
                  h: '12',
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

            <div className={css({mt: '6'})}>
              <h2
                className={css({fontSize: 'lg', lineHeight: 'lg', fontWeight: 'medium', mb: '4'})}
              >
                Social Media
              </h2>
              <div className={css({mt: '4', mb: '4'})}>
                {socialMedia.map((social, index) => (
                  <div
                    key={index}
                    className={css({display: 'flex', mb: '4', gap: '2', alignItems: 'end'})}
                  >
                    <select
                      value={social.platform}
                      onChange={e => handleSocialMediaChange(index, 'platform', e.target.value)}
                      className={css({
                        w: '40',
                        p: '2',
                        borderWidth: '1px',
                        borderColor: 'gray.300',
                        rounded: '0',
                        h: '12',
                        _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                      })}
                    >
                      <option value='Instagram'>Instagram</option>
                      <option value='Facebook'>Facebook</option>
                      <option value='x.com'>x.com</option>
                      <option value='LinkedIn'>LinkedIn</option>
                      <option value='YouTube'>YouTube</option>
                      <option value='TikTok'>TikTok</option>
                    </select>
                    <div className={css({flex: '1'})}>
                      <label
                        className={css({
                          display: 'block',
                          fontSize: 'xs',
                          lineHeight: 'xs',
                          color: 'gray.500',
                          mb: '1',
                        })}
                      >
                        URL
                      </label>
                      <input
                        type='text'
                        value={social.url}
                        onChange={e => handleSocialMediaChange(index, 'url', e.target.value)}
                        placeholder='Enter URL...'
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
                      onClick={() => removeSocialMedia(index)}
                      className={css({
                        p: '2',
                        color: 'red.500',
                        _hover: {color: 'red.700'},
                        alignSelf: 'flex-end',
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
                ))}
                {socialMedia.length > 0 && socialMedia[socialMedia.length - 1].url === '' ? (
                  <div
                    className={css({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    })}
                  >
                    <button
                      type='button'
                      onClick={addSocialMedia}
                      className={css({p: '2', color: 'gray.500', _hover: {color: 'gray.700'}})}
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
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <div className={css({mt: '6'})}>
              <h2
                className={css({fontSize: 'lg', lineHeight: 'lg', fontWeight: 'medium', mb: '4'})}
              >
                About
              </h2>
              <div className={css({mt: '2', mb: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                >
                  About
                </label>
                <textarea
                  name='about'
                  value={companyInfo.about}
                  onChange={handleCompanyInfoChange}
                  rows={8}
                  className={css({
                    w: 'full',
                    p: '2',
                    borderWidth: '1px',
                    rounded: '0',
                    borderColor: 'gray.300',
                    _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                  })}
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'Working Hours' && (
          <div className={css({mt: '6', mb: '4'})}>
            <h3 className={css({textStyle: 'h3', fontWeight: 'bold', mb: '4'})}>Working Hours</h3>
            {workingHours.map((time, index) => (
              <div
                key={time.day}
                className={css({mb: '4', display: 'flex', gap: '2', w: 'full', alignItems: 'end'})}
              >
                <div className={css({display: 'flex', gap: '2', alignItems: 'end'})}>
                  <label
                    className={css({
                      flex: '1',
                      minWidth: '100px',
                      h: '12',
                      borderWidth: '1px',
                      borderColor: 'gray.300',
                      borderRadius: 'sm',
                      p: '2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    })}
                  >
                    {time.day.charAt(0) + time.day.slice(1).toLowerCase()}
                  </label>
                  <div className={css({display: 'flex', gap: '2'})}>
                    <select
                      value={time.isOpened ? 'open' : 'closed'}
                      onChange={e =>
                        handleWorkingHoursChange(index, 'isOpened', e.target.value === 'open')
                      }
                      className={css({
                        p: '2',
                        borderWidth: '1px',
                        borderColor: 'gray.300',
                        borderRadius: 'sm',
                        h: '12',
                        minWidth: '128px',
                        color: time.isOpened ? 'green.500' : 'red.500',
                        _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                      })}
                    >
                      <option className={css({color: 'green.500'})} value='open'>
                        Open
                      </option>
                      <option className={css({color: 'red.500'})} value='closed'>
                        Closed
                      </option>
                    </select>
                  </div>
                </div>
                {time.isOpened && (
                  <div className={css({display: 'flex', gap: '4', ml: '4', flex: '1'})}>
                    <div className={css({w: 'full'})}>
                      <label className={css({display: 'block', mb: '1', fontSize: 'sm'})}>
                        Start Time
                      </label>
                      <input
                        type='time'
                        value={`${time.startTime?.hour?.toString().padStart(2, '0') || '09'}:${time.startTime?.minute?.toString().padStart(2, '0') || '00'}`}
                        onChange={e => {
                          const [hour, minute] = e.target.value.split(':');
                          handleWorkingHoursChange(index, 'startTime', {
                            hour: Number(hour) > 12 ? Number(hour) - 12 : Number(hour),
                            minute: Number(minute),
                            meridiem: Number(hour) >= 12 ? 'PM' : 'AM',
                          });
                        }}
                        className={css({
                          p: '2',
                          h: '12',
                          borderWidth: '1px',
                          borderColor: 'gray.300',
                          borderRadius: 'sm',
                          w: 'full',
                          _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                        })}
                      />
                    </div>
                    <div className={css({w: 'full'})}>
                      <label className={css({display: 'block', mb: '1', fontSize: 'sm'})}>
                        End Time
                      </label>
                      <input
                        type='time'
                        value={`${time.finishTime?.hour?.toString().padStart(2, '0') || '05'}:${time.finishTime?.minute?.toString().padStart(2, '0') || '00'}`}
                        onChange={e => {
                          const [hour, minute] = e.target.value.split(':');
                          handleWorkingHoursChange(index, 'finishTime', {
                            hour: Number(hour) > 12 ? Number(hour) - 12 : Number(hour),
                            minute: Number(minute),
                            meridiem: Number(hour) >= 12 ? 'PM' : 'AM',
                          });
                        }}
                        className={css({
                          p: '2',
                          h: '12',
                          w: 'full',
                          borderWidth: '1px',
                          borderColor: 'gray.300',
                          borderRadius: 'sm',
                          _focus: {ring: 'none', ringOffset: 'none', shadow: '1'},
                        })}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Product & Services' && (
          <div className={css({mt: '4', mb: '4'})}>
            {products.map((product, index) => (
              <div key={index} className={css({display: 'flex', alignItems: 'center', gap: '4'})}>
                <button
                  type='button'
                  className={css({color: 'gray.400'})}
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
                    Product & Services
                  </label>
                  <input
                    type='text'
                    value={product}
                    onChange={e => handleProductChange(index, e.target.value)}
                    placeholder='Enter Product & Services...'
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

                <button
                  type='button'
                  onClick={() => removeProduct(index)}
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
              onClick={addProduct}
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
              Add a service
            </button>
          </div>
        )}

        <div className={css({mt: '8', display: 'flex', gap: '2'})}>
          <button
            type='submit'
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
            })}
          >
            Save Changes
          </button>
          <button
            type='button'
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
            })}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
