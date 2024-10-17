import {css} from '@styled/css';

import {IconTickCircle} from '@/assets';
import HtmlManipulation from '@/components/molecules/article-body/html-manipulation';

interface Props {
  about: string;
}

const Overview = ({about}: Props) => (
  <div>
    <h2 className={css({textStyle: 'headline3', color: '#333333'})}>About</h2>
    <HtmlManipulation htmlString={about} className='fr-file' />
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
        <li
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
          Water Ionizer
        </li>
        <li
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
          Water Softening
        </li>
        <li
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
          Reverse Osmosis
        </li>
        <li
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
          Self Cleaning Filters
        </li>
        <li
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
          copper silver lonization
        </li>
        <li
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
          filters fitting and parts
        </li>
        <li
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
          accessories
        </li>
        <li
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
          water quality testers
        </li>
      </ul>
    </div>
  </div>
);

export {Overview};
