import {css} from '@styled/css';

import {BarChart} from '../_components/bar-chart';
import PlatformCard from '../_components/platform-card';
import StatCard from '../_components/stat-card';

export default function Dashboard() {
  return (
    <main className={css({flex: '1', p: '6'})}>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1',
          md: {gridTemplateColumns: '3'},
          gap: '4',
          mb: '6',
        })}
      >
        <StatCard title='Calls Number' value='9999' bgColor='#e05d9c' />
        <StatCard title='Website Clicks' value='9999' bgColor='#7e68c9' />
        <StatCard title='Location Clicks' value='9999' bgColor='#4bb6e8' />
      </div>

      <div
        className={css({
          borderWidth: '1px',
          borderColor: 'blue.400',
          rounded: 'lg',
          p: '6',
          mb: '6',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            mb: '6',
            gap: '4',
          })}
        >
          <h2 className={css({fontSize: '2xl', lineHeight: '2xl', fontWeight: 'medium'})}>
            Visit statistics
          </h2>
          <div className={css({pos: 'relative'})}>
            <select
              className={css({
                appearance: 'none',
                bgColor: 'white',
                pt: '2',
                pb: '2',
                pl: '4',
                pr: '10',
                color: 'gray.700',
              })}
            >
              <option>January 2025</option>
              <option>February 2025</option>
              <option>March 2025</option>
            </select>
            <div
              className={css({
                pointerEvents: 'none',
                pos: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                display: 'flex',
                alignItems: 'center',
                pl: '2',
                pr: '2',
                color: 'gray.700',
              })}
            >
              <svg
                className={css({fill: 'current', h: '4', w: '4'})}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>

        <BarChart />
      </div>

      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1',
          md: {gridTemplateColumns: '3'},
          gap: '4',
        })}
      >
        <PlatformCard platform='Amazon' value='9999' />
        <PlatformCard platform='eBay' value='9999' />
        <PlatformCard platform='Wallmart' value='9999' />
      </div>
    </main>
  );
}
