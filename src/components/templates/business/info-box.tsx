import {css} from '@styled/css';
import {Box} from '@styled/jsx';
import Link from 'next/link';

import {IconFacebook, IconInstagram, IconX} from '@/assets';
import {CompanyType} from '@/graphql';

interface Props {
  company: CompanyType;
}

function InfoBox({company}: Props) {
  return (
    <div
      className={css({
        flex: '1',
        p: '6',
        mt: '8',
        mdDown: {
          w: 'full',
          bg: 'gray1',
        },
      })}
    >
      <Box display='flex' gap={4} mb={6}>
        {company?.callNumber ? (
          <Link
            href={`tel:${company?.callNumber}`}
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgColor: 'transparent',
              borderRadius: 0,
              border: '1px solid #E3E3E3',
              w: '1/2',
              py: '3',
              color: '#6E7072',
              _hover: {
                bgColor: '#E3E3E3',
              },
            })}
          >
            Call
          </Link>
        ) : null}
        {company?.website ? (
          <Link
            href={company?.website}
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgColor: 'primary',
              borderRadius: 0,
              border: '1px solid #E3E3E3',
              w: '1/2',
              py: '3',
              color: 'white',
              _hover: {
                bgColor: 'primary.light',
              },
            })}
          >
            Website
          </Link>
        ) : null}
      </Box>
      <h3 className={css({textStyle: 'headline3', mb: '4'})}>Information</h3>
      {company?.registeredDate ? (
        <p className={css({display: 'flex', flexDir: 'column', mb: '6'})}>
          <strong className={css({textStyle: 'headline6', color: '#333333', mb: '2'})}>
            Registered Since:
          </strong>
          <span className={css({color: 'gray4'})}>
            {new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(
              new Date(company.registeredDate),
            )}
          </span>
        </p>
      ) : null}
      <p className={css({display: 'flex', flexDir: 'column', mb: '6'})}>
        <strong className={css({textStyle: 'headline6', color: '#333333', mb: '2'})}>Email:</strong>
        <span className={css({color: 'gray4'})}>{company?.email}</span>
      </p>
      <p className={css({display: 'flex', flexDir: 'column'})}>
        <strong className={css({textStyle: 'headline6', color: '#333333', mb: '2'})}>
          Address:
        </strong>
        <span className={css({color: 'gray4'})}>{company?.address}</span>
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
        {company?.worktimes?.map(workTime => (
          <li
            key={workTime.day}
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <span
              className={css({textStyle: 'h4', color: 'text.primary', textTransform: 'capitalize'})}
            >
              {workTime.day.toLowerCase()}
            </span>
            {workTime.isOpened ? (
              <span className={css({textStyle: 'body2', color: 'text.primary'})}>
                {String(workTime.startTime?.hour).padStart(2, '0')}:
                {String(workTime.startTime?.minute).padStart(2, '0')} {workTime.startTime?.meridiem}{' '}
                - {String(workTime.finishTime?.hour).padStart(2, '0')}:
                {String(workTime.finishTime?.minute).padStart(2, '0')}{' '}
                {workTime.finishTime?.meridiem}
              </span>
            ) : (
              <span className={css({textStyle: 'body2', color: 'danger'})}>Closed</span>
            )}
          </li>
        ))}
      </ul>
      <Box my={6}>
        <ul className={css({display: 'flex', alignItems: 'center', gap: '4'})}>
          {company?.twitter ? (
            <li>
              <Link href={`https://twitter.com/${company?.twitter}`}>
                <IconX className={css({w: '6', h: '6', color: 'text.primary'})} />
              </Link>
            </li>
          ) : null}
          {company?.instagram ? (
            <li>
              <Link href={`https://instagram.com/${company?.instagram}`}>
                <IconInstagram className={css({w: '6', h: '6', color: 'text.primary'})} />
              </Link>
            </li>
          ) : null}
          {company?.facebook ? (
            <li>
              <Link href={`https://facebook.com/${company?.facebook}`}>
                <IconFacebook className={css({w: '6', h: '6', color: 'text.primary'})} />
              </Link>
            </li>
          ) : null}
        </ul>
      </Box>
      <p className={css({display: 'flex', flexDir: 'column', mb: '6'})}>
        <strong className={css({textStyle: 'headline6', color: '#333333', mb: '2'})}>
          Keywords:
        </strong>
        <div className={css({display: 'flex', alignItems: 'center', gap: '2'})}>
          {company?.keywords?.map(keyword => (
            <span
              key={keyword}
              className={css({
                bgColor: 'success',
                color: 'white',
                rounded: 'md',
                p: '1',
                textStyle: 'captionB',
                w: 'fit',
              })}
            >
              {keyword}
            </span>
          ))}
        </div>
      </p>
    </div>
  );
}

export {InfoBox};
