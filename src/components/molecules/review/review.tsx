import {IconComment, IconHeart, IconReport, IconUser} from '@/assets';
import { Avatar } from '@/components';
import {css} from '@styled/css';

const Review = ({children}: {children?: React.ReactNode}) => {
  return (
    <div
      className={css({
        display: 'flex',
        gap: 4,
        py: 6,
        '&:not(:last-of-type)': {
          borderBottom: '1px solid token(colors.gray2)',
        }
      })}
    >
      <Avatar size={48} />
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          })}
        >
          <h6
            className={css({
              textStyle: 'subtitle1',
              color: 'text.primary',
            })}
          >
            Sergio Aquinna
          </h6>
          <time
            className={css({
              textStyle: 'body2',
              color: 'gray4',
              position: 'relative',
              _before: {
                display: 'block',
                content: "''",
                width: 1,
                height: 1,
                rounded: 'full',
                backgroundColor: 'gray4',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: -3,
              },
            })}
          >
            8:41 AM
          </time>
        </div>

        <p
          className={css({
            textStyle: 'body',
            color: 'text.primary',
            mb: '4',
          })}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Viverra justo nec ultrices dui sapien eget. Suspendisse
          in est ante in nibh mauris. Facilisis sed odio morbi quis commodo. Egestas maecenas
          pharetra convallis posuere morbi leo.{' '}
        </p>

        <ul
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          })}
        >
          <li>
            <button
              className={css({
                color: 'primary',
                display: 'flex',
                placeContent: 'center',
                gap: 1,
              })}
            >
              <IconComment fill='#44BAEB' />
              Reply
            </button>
          </li>
          <li>
            <button
              className={css({
                color: 'primary',
                display: 'flex',
                placeContent: 'center',
                gap: 1,
              })}
            >
              <IconHeart fill='#44BAEB' />
              Like (23)
            </button>
          </li>
          <li>
            <button
              className={css({
                color: 'primary',
                display: 'flex',
                placeContent: 'center',
                gap: 1,
              })}
            >
              <IconReport fill='#44BAEB' />
              Report
            </button>
          </li>
        </ul>
        {children}
      </div>
    </div>
  );
};

export default Review;
