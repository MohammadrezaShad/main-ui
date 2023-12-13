'use client';

import Select from 'react-select';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {useQuery} from '@tanstack/react-query';

import {IconSearch} from '@/assets';
import {CorporateCard, Divider} from '@/components';
import {searchCategories} from '@/graphql/query/categories';

import {
  Cards,
  Container,
  Content,
  Hero,
  HeroShade,
  HeroWrapper,
  SearchButton,
  SearchContainer,
  TitleWrapper,
  Underline,
} from './home.styled';

const options = [{id: 1, value: '', label: 'Category'}];
const cities = [{id: 1, value: 'amsterdam', label: 'Amsterdam'}];
const corporates = [
  {
    id: '1',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Fresh Water Corp',
    type: 'Whole Seller',
    ratings: '3',
    address: 'Palermo, Italy',
    dateJoined: 'Since March, 2007',
    tel: '',
    website: '',
  },
  {
    id: '2',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Fresh Water Corp',
    type: 'Whole Seller',
    ratings: '3',
    address: 'Palermo, Italy',
    dateJoined: 'Since March, 2007',
    tel: '',
    website: '',
  },
  {
    id: '3',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Fresh Water Corp',
    type: 'Whole Seller',
    ratings: '3',
    address: 'Palermo, Italy',
    dateJoined: 'Since March, 2007',
    tel: '',
    website: '',
  },
  {
    id: '4',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Fresh Water Corp',
    type: 'Whole Seller',
    ratings: '3',
    address: 'Palermo, Italy',
    dateJoined: 'Since March, 2007',
    tel: '',
    website: '',
  },
  {
    id: '5',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Fresh Water Corp',
    type: 'Whole Seller',
    ratings: '3',
    address: 'Palermo, Italy',
    dateJoined: 'Since March, 2007',
    tel: '',
    website: '',
  },
  {
    id: '6',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Fresh Water Corp',
    type: 'Whole Seller',
    ratings: '3',
    address: 'Palermo, Italy',
    dateJoined: 'Since March, 2007',
    tel: '',
    website: '',
  },
  {
    id: '7',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Fresh Water Corp',
    type: 'Whole Seller',
    ratings: '3',
    address: 'Palermo, Italy',
    dateJoined: 'Since March, 2007',
    tel: '',
    website: '',
  },
  {
    id: '8',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Fresh Water Corp',
    type: 'Whole Seller',
    ratings: '3',
    address: 'Palermo, Italy',
    dateJoined: 'Since March, 2007',
    tel: '',
    website: '',
  },
];

export default function Home() {
  const {data} = useQuery({
    queryKey: ['test-categories'],
    queryFn: () => searchCategories({count: 24}),
  });

  return (
    <Container>
      <Hero>
        <HeroShade />
        <HeroWrapper>
          <Content>
            <TitleWrapper>
              Experienced Corporates are
              <br />
              ready to contact with you.
            </TitleWrapper>
            <Underline />
            <SearchContainer>
              <Box
                className={flex({
                  alignItems: 'center',
                })}
                flex={1}
              >
                <Box p={6} w='1/3'>
                  <Select
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      control: (baseStyles: any, state: any) => ({
                        ...baseStyles,
                        border: state.isFocused ? '1px solid #6E7072' : 0,
                        cursor: 'pointer',
                      }),
                    }}
                    defaultValue={options[0]}
                    options={options}
                  />
                </Box>

                <Box p={6} w='1/3'>
                  <Select
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      control: (baseStyles: any, state: any) => ({
                        ...baseStyles,
                        border: state.isFocused ? '1px solid #6E7072' : 0,
                        cursor: 'pointer',
                      }),
                    }}
                    defaultValue={options[0]}
                    options={options}
                  />
                </Box>
                <Box p={6} w='1/3'>
                  <Select
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      control: (baseStyles: any, state: any) => ({
                        ...baseStyles,
                        border: state.isFocused ? '1px solid #6E7072' : 0,
                        cursor: 'pointer',
                      }),
                    }}
                    defaultValue={cities[0]}
                    options={cities}
                  />
                </Box>
              </Box>
              <SearchButton>
                <IconSearch />
              </SearchButton>
            </SearchContainer>
          </Content>
        </HeroWrapper>
      </Hero>
      <Divider label='Top Rated Corporates' />
      <Cards>
        {corporates.map(corporate => (
          <CorporateCard corporate={corporate} key={corporate.id} />
        ))}
      </Cards>
    </Container>
  );
}
