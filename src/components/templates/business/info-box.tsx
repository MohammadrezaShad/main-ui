import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import Link from 'next/link';

import {IconFacebook, IconInstagram, IconX} from '@/assets';
import {Button} from '@/components/atoms';

function InfoBox() {
  return (
    <div
      className={css({
        flex: '1',
        p: '6',
        mt: '8',
        bgColor: '#F7F7F7',
      })}
    >
      <Box display='flex' gap={4} mb={6}>
        <Button
          className={css({
            bgColor: 'transparent',
            borderRadius: 0,
            border: '1px solid #E3E3E3',
            color: '#6E7072',
            w: '1/2',
          })}
        >
          Call
        </Button>
        <Button className={css({borderRadius: 0, w: '1/2'})}>Website</Button>
      </Box>
      <h3 className={css({textStyle: 'headline3', mb: '4'})}>Information</h3>
      <p className={css({display: 'flex', flexDir: 'column', mb: '6'})}>
        <strong className={css({textStyle: 'headline6', color: '#333333', mb: '2'})}>
          Registered Since:
        </strong>
        <span className={css({color: 'gray4'})}>March, 2007</span>
      </p>
      <p className={css({display: 'flex', flexDir: 'column', mb: '6'})}>
        <strong className={css({textStyle: 'headline6', color: '#333333', mb: '2'})}>Email:</strong>
        <span className={css({color: 'gray4'})}>marketing@ultratecuae.com</span>
      </p>
      <p className={css({display: 'flex', flexDir: 'column'})}>
        <strong className={css({textStyle: 'headline6', color: '#333333', mb: '2'})}>
          Address:
        </strong>
        <span className={css({color: 'gray4'})}>
          Wasit St - Samnan - Halwan Suburb - Sharjah - United Arab Emirate
        </span>
      </p>

      <ul
        className={css({
          display: 'flex',
          flexDir: 'column',
          gap: '2',
          bgColor: 'gray2',
          p: '6',
          mt: '6',
          listStyle: 'none',
        })}
      >
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <span className={css({textStyle: 'h4', color: 'text.primary'})}>Monday</span>
          <span className={css({textStyle: 'body2', color: 'text.primary'})}>
            8:30 AM - 6:00 PM
          </span>
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <span className={css({textStyle: 'h4', color: 'text.primary'})}>Tuesday</span>
          <span className={css({textStyle: 'body2', color: 'text.primary'})}>
            8:30 AM - 6:00 PM
          </span>
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <span className={css({textStyle: 'h4', color: 'text.primary'})}>Wednesday</span>
          <span className={css({textStyle: 'body2', color: 'text.primary'})}>
            8:30 AM - 6:00 PM
          </span>
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <span className={css({textStyle: 'h4', color: 'text.primary'})}>Thursday</span>
          <span className={css({textStyle: 'body2', color: 'text.primary'})}>
            8:30 AM - 6:00 PM
          </span>
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <span className={css({textStyle: 'h4', color: 'text.primary'})}>Friday</span>
          <span className={css({textStyle: 'body2', color: 'text.primary'})}>
            8:30 AM - 6:00 PM
          </span>
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <span className={css({textStyle: 'h4', color: 'danger'})}>Saturday</span>
          <span className={css({textStyle: 'body2', color: 'danger'})}>Closed</span>
        </li>
        <li
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <span className={css({textStyle: 'h4', color: 'danger'})}>Sunday</span>
          <span className={css({textStyle: 'body2', color: 'danger'})}>Closed</span>
        </li>
      </ul>
      <Box my={6}>
        <ul className={css({display: 'flex', alignItems: 'center', gap: '4'})}>
          <li>
            <Link href='twitter.com'>
              <IconX className={css({w: '6', h: '6', color: 'text.primary'})} />
            </Link>
          </li>
          <li>
            <Link href='instagram.com'>
              <IconInstagram className={css({w: '6', h: '6', color: 'text.primary'})} />
            </Link>
          </li>
          <li>
            <Link href='instagram.com'>
              <IconFacebook className={css({w: '6', h: '6', color: 'text.primary'})} />
            </Link>
          </li>
        </ul>
      </Box>
      <p className={css({display: 'flex', flexDir: 'column', mb: '6'})}>
        <strong className={css({textStyle: 'headline6', color: '#333333', mb: '2'})}>
          Keywords:
        </strong>
        <span
          className={css({
            bgColor: 'success',
            color: 'white',
            rounded: 'md',
            p: '1',
            textStyle: 'captionB',
            w: 'fit',
          })}
        >
          Water Softener
        </span>
      </p>
    </div>
  );
}

export {InfoBox};
