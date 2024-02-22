import {css} from '@styled/css';

import {useState} from 'react';
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
    <nav
      className={css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4',
        pl: '5',
        pr: '5',
        mt: '10',
        fontSize: 'base',
        lineHeight: 'base',
        textAlign: 'center',
        color: 'neutral.500',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
      })}
    >
      {countryList.map(country => (
        <Tab
          key={country.name}
          name={country.name}
          isSelected={selectedCountry === country.name}
          onSelect={handleCountrySelect}
        />
      ))}
    </nav>
  );
};

export default Tabs;
