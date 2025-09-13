/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import {useRef, useState} from 'react';
import {toast} from 'react-toastify';
import {css, cx} from '@styled/css';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Image from 'next/image';

import AsyncSelect from '@/components/templates/products/async-select';
import {
  CityType,
  CompanyType,
  CountryType,
  searchCities,
  searchCountries,
  uploadImage,
} from '@/graphql';
import {StatusType, Weekday, WorktimeType} from '@/graphql/generated/types';
import {updateCompany} from '@/graphql/mutation/business/update-business';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

interface Props {
  company: CompanyType;
}

type LabeledId = {id: string; label: string};

export default function BusinessInfoPage({company}: Props) {
  const [activeTab, setActiveTab] = useState<
    'Information' | 'Working Hours' | 'Product & Services'
  >('Information');
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- cover (keep your previous UX) ---
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
  const [isCoverRemoved, setIsCoverRemoved] = useState(false);

  // --- form state aligned with Add page ---
  const [companyInfo, setCompanyInfo] = useState({
    title: company.title || '',
    about: company.about || '',
    email: company.email || '',
    callNumber: company.callNumber || '',
    website: company.website || '',
    address: company.address || '',
    status: (company.status as StatusType) || 'PUBLISH',
    latitude: company.latitude ?? 0,
    longitude: company.longitude ?? 0,
    establishedYear: company.establishedYear ?? undefined,
    youtube: (company as any).youtube || '',
    googleMap: (company as any).googleMap || '',
    plusCode: (company as any).plusCode || '',
  });

  const [keywords, setKeywords] = useState<string[]>(company.keywords || []);
  const [newKeyword, setNewKeyword] = useState('');

  const [socialMedia, setSocialMedia] = useState<
    {platform: 'Facebook' | 'LinkedIn' | 'Instagram' | 'Twitter' | string; url: string}[]
  >([
    {platform: 'Facebook', url: (company as any).facebook || ''},
    {platform: 'LinkedIn', url: (company as any).linkdin || (company as any).linkedin || ''},
    {platform: 'Instagram', url: (company as any).instagram || ''},
    {platform: 'Twitter', url: (company as any).twitter || ''},
  ]);

  const [workingHours, setWorkingHours] = useState<WorktimeType[]>(
    company.worktimes?.length
      ? company.worktimes
      : [
          {day: Weekday.Monday, isOpened: false, startTime: null, finishTime: null},
          {day: Weekday.Tuesday, isOpened: false, startTime: null, finishTime: null},
          {day: Weekday.Wednesday, isOpened: false, startTime: null, finishTime: null},
          {day: Weekday.Thursday, isOpened: false, startTime: null, finishTime: null},
          {day: Weekday.Friday, isOpened: false, startTime: null, finishTime: null},
          {day: Weekday.Saturday, isOpened: false, startTime: null, finishTime: null},
          {day: Weekday.Sunday, isOpened: false, startTime: null, finishTime: null},
        ],
  );

  const [products, setProducts] = useState<string[]>(company.productAndServices || []);

  // --- Country & City state now mirrors Add page (AsyncSelect + multi city) ---
  const initialCountry: LabeledId | null = company.country
    ? {
        id: (company.country as CountryType)._id,
        label: (company.country as CountryType).name as string,
      }
    : null;

  // Support both legacy single city and new multi-cities
  const initialCities: LabeledId[] =
    Array.isArray(company.city) && company.city.length
      ? company.city.map((c: CityType) => ({id: c._id, label: c.name}))
      : [];

  const [selectedCountry, setSelectedCountry] = useState<LabeledId | null>(initialCountry);
  const [selectedCities, setSelectedCities] = useState<LabeledId[]>(initialCities);

  const mutation = useMutation({
    mutationFn: async (payload: {newCoverFile: File | null; removeCover: boolean}) => {
      let coverId: string | null | undefined;

      if (payload.newCoverFile) {
        const uploaded = await uploadImage(payload.newCoverFile, {});
        coverId = uploaded?.image?._id;
      } else if (payload.removeCover) {
        coverId = null;
      }

      // Build update payload to match Add page schema
      const updatePayload: any = {
        id: company._id,
        ...companyInfo,
        // numbers for lat/lng
        latitude: parseFloat((companyInfo.latitude as any)?.toString() || '0'),
        longitude: parseFloat((companyInfo.longitude as any)?.toString() || '0'),
        // map socials to fields (keep backend's 'linkdin' typo for compat)
        facebook: socialMedia.find(sm => sm.platform === 'Facebook')?.url || '',
        linkdin: socialMedia.find(sm => sm.platform === 'LinkedIn')?.url || '',
        instagram: socialMedia.find(sm => sm.platform === 'Instagram')?.url || '',
        twitter: socialMedia.find(sm => sm.platform === 'Twitter')?.url || '',
        keywords,
        productAndServices: products,
        // country as single id, city as array of ids
        country: selectedCountry?.id,
        city: selectedCities.map(c => c.id),
        // worktimes same mapping as Add
        worktimes: workingHours.map(wh => ({
          day: wh.day,
          isOpened: wh.isOpened,
          startTime: wh.startTime
            ? {
                hour: wh.startTime.hour,
                minute: wh.startTime.minute,
                meridiem: (wh.startTime as any).meridiem,
              }
            : undefined,
          finishTime: wh.finishTime
            ? {
                hour: wh.finishTime.hour,
                minute: wh.finishTime.minute,
                meridiem: (wh.finishTime as any).meridiem,
              }
            : undefined,
        })),
      };

      if (coverId !== undefined) {
        updatePayload.cover = coverId;
      }

      return updateCompany(updatePayload);
    },
    onSuccess: () => {
      toast.success('Company information updated successfully');
      queryClient.invalidateQueries({queryKey: ['find-business', company._id]});
    },
    onError: (error: Error) => {
      toast.error(`Failed to update company: ${error.message}`);
    },
  });

  const handleCompanyInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setCompanyInfo(prev => ({...prev, [name]: value}));
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      setIsCoverRemoved(false);
      const reader = new FileReader();
      reader.onloadend = () => setCoverImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCover = () => {
    setCoverImageFile(null);
    setCoverImagePreview('');
    setIsCoverRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeKeyword = (index: number) => setKeywords(keywords.filter((_, i) => i !== index));
  const addKeyword = () => {
    if (newKeyword.trim() !== '') {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const handleSocialMediaChange = (index: number, field: 'platform' | 'url', value: string) => {
    const updated = [...socialMedia];
    updated[index] = {...updated[index], [field]: value};
    setSocialMedia(updated);
  };
  const addSocialMedia = () => setSocialMedia([...socialMedia, {platform: 'Instagram', url: ''}]);
  const removeSocialMedia = (index: number) =>
    setSocialMedia(socialMedia.filter((_, i) => i !== index));

  const handleWorkingHoursChange = (
    index: number,
    field: 'isOpened' | 'startTime' | 'finishTime',
    value: boolean | string | {hour: number; minute: number; meridiem: string},
  ) => {
    const next = [...workingHours];
    if (field === 'isOpened') {
      next[index] = {...next[index], isOpened: value as boolean};
    } else if (typeof value === 'string') {
      const [hours, minutes] = value.split(':');
      const hour24 = Number(hours);
      const minute = Number(minutes);
      let hour12 = hour24 % 12;
      if (hour12 === 0) hour12 = 12;
      next[index] = {
        ...next[index],
        [field]: {hour: hour12, minute, meridiem: hour24 >= 12 ? 'PM' : 'AM'},
      } as any;
    } else {
      next[index] = {...next[index], [field]: value as any};
    }
    setWorkingHours(next);
  };

  const handleProductChange = (index: number, value: string) => {
    const updated = [...products];
    updated[index] = value;
    setProducts(updated);
  };
  const addProduct = () => setProducts([...products, '']);
  const removeProduct = (index: number) => setProducts(products.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      newCoverFile: coverImageFile,
      removeCover: isCoverRemoved,
    });
  };

  const currentCoverUrl =
    coverImagePreview ||
    (company.cover && !isCoverRemoved
      ? `${IMAGE_STORAGE_URL}/${(company.cover as any).filename}-${(company.cover as any)._id}`
      : '');

  return (
    <div className={css({maxW: '5xl', bgColor: 'white', w: 'full'})}>
      <div
        className={css({
          display: 'flex',
          borderBottomWidth: '1px',
          borderColor: 'gray.300',
          mdDown: {w: 'full'},
        })}
      >
        {(['Information', 'Working Hours', 'Product & Services'] as const).map(tab => (
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
                mdDown: {px: 1, flex: '1'},
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
            {/* Cover (unchanged UX) */}
            <div className={css({mb: 6})}>
              <label
                className={css({
                  display: 'block',
                  fontSize: 'sm',
                  lineHeight: 'sm',
                  color: 'gray.500',
                  mb: '2',
                })}
              >
                Cover Image
              </label>
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleCoverImageChange}
                className={css({display: 'none'})}
              />
              <div
                className={css({
                  w: 'full',
                  h: '250px',
                  borderWidth: '1px',
                  borderColor: 'gray.300',
                  bgColor: 'gray.50',
                  pos: 'relative',
                  overflow: 'hidden',
                })}
              >
                {currentCoverUrl ? (
                  <Image
                    src={currentCoverUrl}
                    alt='Company Cover'
                    layout='fill'
                    objectFit='cover'
                  />
                ) : (
                  <div
                    className={css({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      w: 'full',
                      h: 'full',
                      color: 'gray.400',
                    })}
                  >
                    No cover image
                  </div>
                )}
                <div
                  className={css({pos: 'absolute', bottom: 4, right: 4, display: 'flex', gap: 2})}
                >
                  <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    className={css({
                      bgColor: 'white',
                      color: 'gray.800',
                      rounded: 'md',
                      p: 2,
                      border: '1px solid token(colors.gray3)',
                      cursor: 'pointer',
                      _hover: {bgColor: 'gray.100'},
                    })}
                  >
                    Change
                  </button>
                  {currentCoverUrl && (
                    <button
                      type='button'
                      onClick={handleRemoveCover}
                      className={css({
                        bgColor: 'red.600',
                        color: 'white',
                        rounded: 'md',
                        p: 2,
                        cursor: 'pointer',
                        _hover: {bgColor: 'red.700'},
                      })}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Grid – mirrors Add page fields */}
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: '1',
                md: {gridTemplateColumns: '2'},
                gap: '6',
              })}
            >
              {/* Name */}
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
                  name='title'
                  value={companyInfo.title}
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

              {/* Website */}
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

              {/* Phone */}
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
                  name='callNumber'
                  value={companyInfo.callNumber}
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

              {/* Email */}
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

              {/* Country (AsyncSelect) */}
              <div className={css({mt: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                >
                  Country
                </label>
                <AsyncSelect
                  loadOptions={async (inputValue: string) => {
                    const resp = await searchCountries({count: 50, text: inputValue});
                    return (resp.results || []).map((c: CountryType) => ({
                      id: c._id,
                      value: c._id,
                      label: c.name,
                    })) as any;
                  }}
                  onChange={(opt: any) => {
                    const next = opt ? {id: opt.id, label: opt.label} : null;
                    setSelectedCountry(next);
                    // clear cities if country changes
                    setSelectedCities([]);
                  }}
                  placeholder={selectedCountry ? selectedCountry.label : 'Select a country...'}
                  defaultOptions
                  className={{
                    border: '1px solid token(colors.gray3)',
                    height: '48px',
                    rounded: 'none',
                  }}
                  // prefill
                  defaultValue={
                    selectedCountry
                      ? {
                          id: selectedCountry.id,
                          value: selectedCountry.id,
                          label: selectedCountry.label,
                        }
                      : undefined
                  }
                />
              </div>

              {/* Cities (Async multi, depends on country) */}
              <div className={css({mt: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                >
                  City (you can select multiple)
                </label>
                <AsyncSelect
                  key={selectedCountry?.id || 'no-country'}
                  isMulti
                  isDisabled={!selectedCountry?.id}
                  loadOptions={async (inputValue: string) => {
                    if (!selectedCountry?.id) return [];
                    const resp = await searchCities({
                      count: 100,
                      parent: selectedCountry.id,
                      text: inputValue,
                    });
                    return (resp.results || []).map((c: CityType) => ({
                      id: c._id,
                      value: c._id,
                      label: c.name,
                    })) as any;
                  }}
                  onChange={(opts: any) => {
                    const arr = Array.isArray(opts) ? opts : opts ? [opts] : [];
                    const next = arr.map((o: any) => ({id: o.id, label: o.label}));
                    setSelectedCities(next);
                  }}
                  placeholder={
                    selectedCities.length
                      ? `${selectedCities.length} cities selected`
                      : !selectedCountry?.id
                        ? 'Select country first'
                        : 'Select cities...'
                  }
                  defaultOptions
                  className={{
                    border: '1px solid token(colors.gray3)',
                    minHeight: '48px',
                    rounded: 'none',
                  }}
                  // prefill
                  defaultValue={
                    selectedCities.length
                      ? selectedCities.map(c => ({id: c.id, value: c.id, label: c.label}))
                      : undefined
                  }
                />
              </div>

              {/* Latitude */}
              <div className={css({mb: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                >
                  Latitude
                </label>
                <input
                  type='number'
                  name='latitude'
                  value={(companyInfo.latitude as number) ?? ''}
                  onChange={handleCompanyInfoChange}
                  placeholder='Enter latitude'
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

              {/* Longitude */}
              <div className={css({mb: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                >
                  Longitude
                </label>
                <input
                  type='number'
                  name='longitude'
                  value={(companyInfo.longitude as number) ?? ''}
                  onChange={handleCompanyInfoChange}
                  placeholder='Enter longitude'
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

              {/* Established Year */}
              <div className={css({mt: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                >
                  Established Year
                </label>
                <input
                  type='number'
                  name='establishedYear'
                  min={1800}
                  max={new Date().getFullYear()}
                  value={(companyInfo as any).establishedYear || ''}
                  onChange={handleCompanyInfoChange}
                  placeholder='e.g. 2008'
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

              {/* YouTube */}
              <div className={css({mt: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                >
                  YouTube
                </label>
                <input
                  type='text'
                  name='youtube'
                  value={(companyInfo as any).youtube || ''}
                  onChange={handleCompanyInfoChange}
                  placeholder='Channel or video URL'
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

              {/* Google Map */}
              <div className={css({mt: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                >
                  Google Map URL
                </label>
                <input
                  type='text'
                  name='googleMap'
                  value={(companyInfo as any).googleMap || ''}
                  onChange={handleCompanyInfoChange}
                  placeholder='Google Maps link'
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

              {/* Plus Code */}
              <div className={css({mt: '2'})}>
                <label
                  className={css({
                    display: 'block',
                    fontSize: 'sm',
                    lineHeight: 'sm',
                    color: 'gray.500',
                  })}
                >
                  Plus Code
                </label>
                <input
                  type='text'
                  name='plusCode'
                  value={(companyInfo as any).plusCode || ''}
                  onChange={handleCompanyInfoChange}
                  placeholder='e.g. 7FG8+5V'
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
            </div>

            {/* Address */}
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

            {/* Keywords */}
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
                  placeholder='Type and press enter'
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

            {/* Socials */}
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
                      <option value='Twitter'>Twitter</option>
                      <option value='LinkedIn'>LinkedIn</option>
                      <option value='YouTube'>YouTube</option>
                      <option value='TikTok'>TikTok</option>
                      <option value='x.com'>x.com</option>
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
                <div
                  className={css({display: 'flex', alignItems: 'center', justifyContent: 'center'})}
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
              </div>
            </div>

            {/* About */}
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

            {/* Status */}
            <div className={css({mt: '2', mb: '4'})}>
              <label
                className={css({
                  display: 'block',
                  mb: '2',
                  fontSize: 'sm',
                  lineHeight: 'sm',
                  color: 'gray.500',
                })}
              >
                Status
              </label>
              <select
                name='status'
                value={companyInfo.status}
                onChange={handleCompanyInfoChange}
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
                <option value='' disabled>
                  Select Status
                </option>
                <option value='DRAFT'>Draft</option>
                <option value='PUBLISH'>Publish</option>
              </select>
            </div>
          </>
        )}

        {activeTab === 'Working Hours' && (
          <div className={css({mt: '6', mb: '4'})}>
            <h3 className={css({textStyle: 'h3', fontWeight: 'bold', mb: '4'})}>Working Hours</h3>
            {workingHours.map((time, index) => (
              <div
                key={time.day}
                className={css({
                  mb: '4',
                  display: 'flex',
                  gap: '2',
                  w: 'full',
                  alignItems: 'end',
                  mdDown: {flexDirection: 'column', alignItems: 'start'},
                })}
              >
                <div
                  className={css({
                    display: 'flex',
                    gap: '2',
                    alignItems: 'end',
                    mdDown: {w: 'full'},
                  })}
                >
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
                  <div
                    className={css({
                      display: 'flex',
                      gap: '4',
                      ml: '4',
                      flex: '1',
                      mdDown: {ml: 0, w: 'full'},
                    })}
                  >
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
            disabled={mutation.isPending}
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
              _disabled: {bgColor: 'gray.400', cursor: 'not-allowed'},
            })}
          >
            {mutation.isPending ? 'Saving...' : 'Save Changes'}
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
