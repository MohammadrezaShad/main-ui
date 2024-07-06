import {useState} from 'react';
import {css} from '@styled/css';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Tab from './Tab';

const countryList = [
  {name: 'All', highlight: true},
  {name: 'India'},
  {name: 'Pakistan'},
  {name: 'South Africa'},
  {name: 'Egypt'},
  {name: 'Mexico'},
  {name: 'Iran'},
  {name: 'United Arab Emirates'},
  {name: 'Jordan'},
  {name: 'Syria'},
  {name: 'Turkey'},
  {name: 'More'},
];

const Tabs = () => {
  const [selectedCountry, setSelectedCountry] = useState('All');

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  return (
    <div
      className={css({
        w: 'full',
        mx: 'auto',
        maxW: '[1200px]',
      })}
    >
      <Swiper
        slidesPerView={12}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 12,
          },
        }}
      >
        {countryList.map(country => (
          <SwiperSlide key={country.name}>
            <Tab
              key={country.name}
              name={country.name}
              isSelected={selectedCountry === country.name}
              onSelect={handleCountrySelect}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Tabs;
