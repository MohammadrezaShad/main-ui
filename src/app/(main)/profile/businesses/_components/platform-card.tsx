import {css} from '@styled/css';

interface PlatformCardProps {
  platform: string;
  value: number;
}

export default function PlatformCard({platform, value}: PlatformCardProps) {
  return (
    <div className={css({borderWidth: '1px', borderColor: 'gray.200', rounded: '0', p: '6'})}>
      <h3
        className={css({
          fontSize: 'lg',
          lineHeight: 'lg',
          fontWeight: 'medium',
          color: 'gray.700',
          mb: '4',
        })}
      >
        {platform}
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
            <rect x='4' y='20' width='4' height='10' fill='#E5E7EB' />
            <rect x='12' y='14' width='4' height='16' fill='#E5E7EB' />
            <rect x='20' y='10' width='4' height='20' fill='#E5E7EB' />
            <rect x='28' y='16' width='4' height='14' fill='#E5E7EB' />
          </svg>
        </div>
        <span
          className={css({
            fontSize: '5xl',
            lineHeight: '5xl',
            fontWeight: 'bold',
            color: 'gray.800',
          })}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
