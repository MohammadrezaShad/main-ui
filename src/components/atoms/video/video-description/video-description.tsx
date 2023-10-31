import {css} from '@styled/css';
import Image from 'next/image';

import {IconShare} from '@/assets';
import ImdbLogo from '@/assets/images/imdb-logo.png';

import * as S from './video-description.styled';

export default function VideoDescription() {
  return (
    <S.Container>
      <S.Block>
        <S.Box>
          <S.Title>فیلم Transformers: Rise of the Beasts 2023</S.Title>
          <S.Imdb className={css({hideBelow: 'md'})}>
            <Image
              src={ImdbLogo}
              alt='imdb icon'
              height={20}
              width={40}
              quality={100}
              className={css({ml: 2})}
            />
            <S.ImdbRate>10/</S.ImdbRate> <S.ImdbScore>6.2</S.ImdbScore>
          </S.Imdb>
          <S.Share className={css({hideBelow: 'md'})}>
            <IconShare />
          </S.Share>
        </S.Box>
        <S.SubTitle>اکشن، علمی تخیلی، ماجراجویی | 2023 | آمریکا</S.SubTitle>
        <S.Box
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            hideFrom: 'md',
          })}
        >
          <S.Imdb className={css({mr: 'unset'})}>
            <Image
              src={ImdbLogo}
              alt='imdb icon'
              height={20}
              width={40}
              quality={100}
              className={css({ml: 2})}
            />
            <S.ImdbRate>10/</S.ImdbRate> <S.ImdbScore>6.2</S.ImdbScore>
          </S.Imdb>
          <S.Share>
            <IconShare />
          </S.Share>
        </S.Box>
      </S.Block>
      <S.Description>
        <S.Text>
          تبدیل‌شوندگان: ظهور جانوران هفتمین فیلم از مجموعه فیلم های تبدیل‌شوندگان و ادامه ای بر
          فیلم (Bumblebee 2018) می باشد. در خلاصه داستان این فیلم آمده است که چهار نوجوان اهل شهر
          کلیولند رویای خلاص شدن از بخش فقیر نشین شهر و تبدیل شدن به اسکیت بور سوارهای حرفه ای را
          دارند اما سرقت یک ماشین آن ها را در رادار یک رئیس گروه خلافکار قرار می دهد...
        </S.Text>
        <S.Caption>
          کارگردان : <S.CaptionText>استیون کیپل جونیور</S.CaptionText>
        </S.Caption>
        <S.Caption>
          نویسنده‌ : <S.CaptionText>جوبی هارولد، دارنل متایر، جاش پیترز</S.CaptionText>
        </S.Caption>
        <S.Caption>
          ستارگان : <S.CaptionText> میشل یو، پیت دیویدسون، پیتر دینکلیج </S.CaptionText>
        </S.Caption>
      </S.Description>
    </S.Container>
  );
}
