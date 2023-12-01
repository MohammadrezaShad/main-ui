import {IconFacebook, IconInstagram, IconLinkedIn, IconNotify, IconRG, IconTwitter} from '@/assets';
import {AuthButton, Avatar, Card, Chip, SocialMediaLinks} from '@/components';
import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import {flex} from '@styled/patterns';
import {Actions, Cards, Chips, Container, Tab, Tabs, Wrapper} from './author.styled';

const socialMediaLinks = [
  {icon: IconTwitter, href: ''},
  {icon: IconLinkedIn, href: ''},
  {icon: IconFacebook, href: ''},
  {icon: IconRG, href: ''},
  {icon: IconInstagram, href: ''},
];

export default function Author() {
  return (
    <Container>
      <Wrapper>
        <div
          className={flex({
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '5',
            w: 'full',
          })}
        >
          <Avatar size={128} src='https://i.pravatar.cc/150?u=alan' />
          <div
            className={flex({
              grow: 1,
              basis: '0%',
              flexDir: 'column',
              alignItems: 'stretch',
              w: 'full',
            })}
          >
            <div
              className={flex({
                w: 'full',
                justifyContent: 'space-between',
                gap: '5',
                alignItems: 'start',
              })}
            >
              <div
                className={flex({
                  grow: 1,
                  basis: '0%',
                  flexDir: 'column',
                  alignItems: 'stretch',
                  mt: '1',
                })}
              >
                <h3
                  className={css({
                    textStyle: 'headline3',
                    color: 'text.primary',
                  })}
                >
                  John Doe
                </h3>
                <p
                  className={css({
                    textStyle: 'body2',
                    color: 'gray4',
                  })}
                >
                  john.doe@email.com
                </p>
              </div>
              <Actions>
                <IconNotify />
                <AuthButton
                  text='Write New Article'
                  variant='contained'
                  className={css({
                    '& span': {color: 'white'},
                    w: 'max-content',
                    px: 4,
                    py: 3,
                    hideBelow: 'md',
                    bgColor: 'primary',
                  })}
                />
                <AuthButton
                  text='Follow'
                  variant='outlined'
                  className={css({
                    '& span': {color: 'gray4'},
                    w: 'max-content',
                    px: 4,
                    py: 3,
                    hideBelow: 'md',
                    border: '1px solid token(colors.gray3)',
                  })}
                />
                <AuthButton
                  text='Report'
                  variant='outlined'
                  className={css({
                    '& span': {color: 'gray4'},
                    w: 'max-content',
                    px: 4,
                    py: 3,
                    hideBelow: 'md',
                    border: '1px solid token(colors.gray3)',
                  })}
                />
              </Actions>
            </div>
            <p
              className={css({
                mt: '9',
                textStyle: 'body2',
              })}
            >
              Bachelor of Computer Engineering (Sapienza University of Rome)
            </p>
            <Chips>
              <Chip text='author' type='success' />
              <Chip text='Since: October 2018' type='simple' />
            </Chips>
          </div>
        </div>
        <Box
          className={flex({
            w: 'full',
            justifyContent: 'space-between',
            gap: '5',
            mt: '6',
            alignItems: 'center',
          })}
        >
          <Tabs>
            <Tab _isActive>
              <span>Articles</span>
            </Tab>
            <Tab>
              <span>ISI Articles & Journals</span>
            </Tab>
            <Tab>
              <span>Curriculum vitae</span>
            </Tab>
          </Tabs>
          <SocialMediaLinks links={socialMediaLinks} />
        </Box>
      </Wrapper>
      <Cards>
        <Card
          articleLink=''
          date='20 June 2023'
          imageUrl='https://images.unsplash.com/photo-1619365566184-272a34acfeb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          title='Water: a commons beyond economic value'
        />
        <Card
          articleLink=''
          date='20 June 2023'
          imageUrl='https://images.unsplash.com/photo-1619365566184-272a34acfeb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          title='Water: a commons beyond economic value'
        />
        <Card
          articleLink=''
          date='20 June 2023'
          imageUrl='https://images.unsplash.com/photo-1619365566184-272a34acfeb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          title='Water: a commons beyond economic value'
        />
        <Card
          articleLink=''
          date='20 June 2023'
          imageUrl='https://images.unsplash.com/photo-1619365566184-272a34acfeb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          title='Water: a commons beyond economic value'
        />
        <Card
          articleLink=''
          date='20 June 2023'
          imageUrl='https://images.unsplash.com/photo-1619365566184-272a34acfeb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          title='Water: a commons beyond economic value'
        />
        <Card
          articleLink=''
          date='20 June 2023'
          imageUrl='https://images.unsplash.com/photo-1619365566184-272a34acfeb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          title='Water: a commons beyond economic value'
        />
        <Card
          articleLink=''
          date='20 June 2023'
          imageUrl='https://images.unsplash.com/photo-1619365566184-272a34acfeb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          title='Water: a commons beyond economic value'
        />
        <Card
          articleLink=''
          date='20 June 2023'
          imageUrl='https://images.unsplash.com/photo-1619365566184-272a34acfeb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          title='Water: a commons beyond economic value'
        />
        <Card
          articleLink=''
          date='20 June 2023'
          imageUrl='https://images.unsplash.com/photo-1619365566184-272a34acfeb9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          title='Water: a commons beyond economic value'
        />
      </Cards>

      <Cards>
        <Card articleLink='' title='Lorem ipsum dolor sit amet consectetur' />
        <Card articleLink='' title='Lorem ipsum dolor sit amet consectetur' />
        <Card articleLink='' title='Lorem ipsum dolor sit amet consectetur' />
        <Card articleLink='' title='Lorem ipsum dolor sit amet consectetur' />
        <Card articleLink='' title='Lorem ipsum dolor sit amet consectetur' />
      </Cards>

      <Box mt='12' display='flex' justifyContent='center'>
        <AuthButton
          text='Load More'
          className={css({
            '& span': {color: 'text.invert'},
            w: 'max-content',
            px: 4,
            py: 3,
            hideBelow: 'md',
            bg: 'primary',
          })}
        />
      </Box>
    </Container>
  );
}
