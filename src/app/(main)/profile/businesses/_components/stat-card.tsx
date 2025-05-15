import {css} from '@styled/css';

interface StatCardProps {
  title: string;
  value: string;
  bgColor: string;
}

export default function StatCard({title, value, bgColor}: StatCardProps) {
  return (
    <div className={css({color: 'white', rounded: 'lg', p: '6', bgColor})}>
      <div
        className={css({display: 'flex', justifyContent: 'space-between', alignItems: 'center'})}
      >
        <div className={css({display: 'flex', flexDir: 'column'})}>
          <h3
            className={css({
              fontSize: 'lg',
              lineHeight: 'lg',
              fontWeight: 'medium',
              mb: '4',
              color: 'white',
            })}
          >
            {title}
          </h3>
          <div className={css({display: 'flex', alignItems: 'center'})}>
            <div className={css({mr: '4'})}>
              <svg
                width='40'
                height='40'
                viewBox='0 0 40 40'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect x='4' y='20' width='4' height='10' fill='white' fillOpacity='0.6' />
                <rect x='12' y='14' width='4' height='16' fill='white' fillOpacity='0.8' />
                <rect x='20' y='10' width='4' height='20' fill='white' />
                <rect x='28' y='16' width='4' height='14' fill='white' fillOpacity='0.7' />
              </svg>
            </div>
            <span className={css({fontSize: '5xl', lineHeight: '5xl', fontWeight: 'bold'})}>
              {value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
