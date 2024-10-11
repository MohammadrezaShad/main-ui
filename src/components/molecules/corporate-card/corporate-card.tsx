import {css} from '@styled/css';
import {Box} from '@styled/jsx';

import {IconCalendar, IconLocation, IconStar} from '@/assets';

import {
  CardDivider,
  CardFooter,
  CardFooterButton,
  CardInfo,
  CardSubtitle,
  CardTitle,
  Container,
  Details,
  HeaderImage,
  Ratings,
  Star,
  Wrap,
} from './corporate-card.styled';

const CorporateCard = ({
  corporate,
}: {
  corporate: {
    id: string;
    title: string;
    img: string;
    type: string;
    address: string;
    dateJoined: string;
  };
}) => (
  <Container key={corporate.id}>
    <Wrap>
      <HeaderImage
        width={128}
        height={128}
        loading='lazy'
        alt={corporate.title}
        src={corporate.img}
      />
      <CardTitle>{corporate.title}</CardTitle>
      <CardSubtitle>{corporate.type}</CardSubtitle>
      <Box mt='4'>
        <Ratings>
          <Star bgColor='primary'>
            <IconStar className={css({w: '4', h: '4', color: 'white'})} />
          </Star>
          <Star bgColor='primary'>
            <IconStar className={css({w: '4', h: '4', color: 'white'})} />
          </Star>
          <Star bgColor='primary'>
            <IconStar className={css({w: '4', h: '4', color: 'white'})} />
          </Star>
          <Star bg='gray3'>
            <IconStar className={css({w: '4', h: '4', color: 'white'})} />
          </Star>
          <Star bg='gray3'>
            <IconStar className={css({w: '4', h: '4', color: 'white'})} />
          </Star>
        </Ratings>
      </Box>
      <CardDivider />
      <Box mt='6' w='full'>
        <Details mb='3'>
          <IconLocation />
          <CardInfo>{corporate.address}</CardInfo>
        </Details>
        <Details>
          <IconCalendar />
          <CardInfo>{corporate.dateJoined}</CardInfo>
        </Details>
      </Box>
      <CardFooter>
        <CardFooterButton>Call</CardFooterButton>
        <CardFooterButton>Website</CardFooterButton>
      </CardFooter>
    </Wrap>
  </Container>
);

export default CorporateCard;
