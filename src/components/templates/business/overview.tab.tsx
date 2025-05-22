/* eslint-disable react/no-array-index-key */
import {css} from '@styled/css';

import {IconTickCircle} from '@/assets';
import {Maybe} from '@/graphql';

interface Props {
  about: string;
  services: Maybe<string[]> | undefined;
}

const Overview = ({about, services}: Props) => (
  <div>
    <h2 className={css({textStyle: 'headline3', color: '#333333'})}>About</h2>
    <div className={css({whiteSpace: 'pre-line'})}>{about}</div>
    {services?.length ? (
      <div className={css({mt: '6'})}>
        <h2 className={css({textStyle: 'headline3', color: '#333333'})}>Product & Services</h2>
        <ul
          className={css({
            mt: '2',
            listStyle: 'none',
            display: 'flex',
            flexDir: 'column',
            gap: '3',
            pl: '4',
          })}
        >
          {services?.map((service, index) => (
            <li
              key={index}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '2',
                textTransform: 'capitalize',
              })}
            >
              <IconTickCircle
                className={css({
                  w: '5',
                  h: '5',
                  color: 'success',
                })}
              />
              {service}
            </li>
          ))}
        </ul>
      </div>
    ) : null}
  </div>
);

export {Overview};
