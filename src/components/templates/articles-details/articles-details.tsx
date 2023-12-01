import {IconChevronDown} from '@/assets';
import {
  ArticleBody,
  ArticleInfo,
  AuthButton,
  PostDate,
  PrimarySubtitle,
  PrimaryTitle,
  Questions,
  RecentArticles,
  Review,
  Tags,
  UserInfo,
} from '@/components';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import Image from 'next/image';

interface Props {
  posts: Array<any>;
}

const Page = ({posts}: Props) => {
  return (
    <div>
      <PostDate date='24 January 2022' />

      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          gap: 4,
          mb: '4',
          mt: '3',
        })}
      >
        <PrimaryTitle title='The water crisis is worsening. Researchers must tackle it together' />
        <PrimarySubtitle
          text='It’s unacceptable that millions living in poverty still lack access to safe water and basic
        sanitation. Nature Water will help researchers to find a way forward.'
        />
      </div>
      <ArticleInfo />
      <article
        className={css({
          textStyle: 'body',
          color: 'text.primary',
        })}
      >
        <Image
          alt=''
          src='https://cloudfront-us-east-2.images.arcpublishing.com/reuters/63ZWKIKM4JIVLI3KHQRNTG5KH4.jpg'
          width={960}
          height={540}
          className={css({
            objectFit: 'cover',
            mb: '8',
          })}
        />

        <Box
          className={flex({
            alignItems: 'center',
            justifyContent: 'space-between',
            p: '6',
            backgroundColor: 'gray1',
            mb: '6'
          })}
        >
          <h6
            className={css({
              textStyle: 'h4',
              color: 'text.primary',
            })}
          >
            Download or read the full article as a PDF
          </h6>
          <Box
            className={flex({
              alignItems: 'center',
              gap: '4',
            })}
          >
            <AuthButton
              text='Read File'
              variant='outlined'
              className={css({
                '& span': {color: 'gray4'},
                w: 'max-content',
                px: 4,
                py: 3,
                border: '1px solid token(colors.gray3)',
              })}
            />
            <AuthButton
              text='Download'
              variant='contained'
              className={css({
                '& span': {color: 'text.invert'},
                w: 'max-content',
                px: 4,
                py: 3,
                bg: 'primary',
              })}
            />
          </Box>
        </Box>

        <ArticleBody />
      </article>
      <Tags />
      <Questions />
      <UserInfo />

      <div
        className={css({
          pb: '8',
          borderBottom: '1px solid token(colors.gray3)',
          mb: '10',
        })}
      >
        <h3
          className={css({
            textStyle: 'headline3',
            color: 'text.primary',
            mb: '6',
          })}
        >
          Related Articles
        </h3>

        <RecentArticles posts={posts} />
      </div>

      <h3
        className={css({
          textStyle: 'headline3',
          color: 'text.primary',
        })}
      >
        Reviews
      </h3>

      <Review />
      <Review>
        <Review>
          <button
            className={css({
              color: 'primary',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: '4',
            })}
          >
            More Comments
            <IconChevronDown fill='#44BAEB' />
          </button>
        </Review>
      </Review>
    </div>
  );
};

export default Page;
