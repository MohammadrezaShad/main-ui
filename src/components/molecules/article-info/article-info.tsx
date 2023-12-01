import {
  IconCollection,
  IconEmail,
  IconFacebook,
  IconInstagram,
  IconLink,
  IconTwitter,
} from '@/assets';
import {Avatar} from '@/components';
import {css} from '@styled/css';
import Link from 'next/link';

const ArticleInfo = () => {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: '8',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        })}
      >
        {/** AVATAR */}
        <Avatar src='https://i.pravatar.cc/40?u=JohnDoe' size={40} />

        {/** NAME */}
        <span
          className={css({
            textStyle: 'body2',
            color: 'text.primary',
          })}
        >
          By John Doe
        </span>

        {/** DIVIDER */}
        <div className={css({h: 4, w: 0.25, bg: 'gray3'})} />

        <span
          className={css({
            textStyle: 'body2',
            color: 'text.primary',
          })}
        >
          4 minutes read
        </span>

        {/** DIVIDER */}
        <div className={css({h: 4, w: 0.25, bg: 'gray3'})} />

        {/** BOOKMARK ICON
         * !TODO: ADD ONCLICK EVENT HANDLER
         * !TODO: CHANGE SVG FILL BASED ON CLICK
         */}
        <button>
          <IconCollection />
        </button>
      </div>

      {/** SOCIAL ICONS */}
      <ul
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        })}
      >
        <li>
          <Link
            className={css({
              display: 'grid',
              placeItems: 'center',
            })}
            href=''
          >
            <IconTwitter className={css({fill: '#272727', w: 6, h: 6})} />
          </Link>
        </li>
        <li>
          <Link
            className={css({
              display: 'grid',
              placeItems: 'center',
            })}
            href=''
          >
            <IconInstagram className={css({fill: '#272727', w: 6, h: 6})} />
          </Link>
        </li>
        <li>
          <Link
            className={css({
              display: 'grid',
              placeItems: 'center',
            })}
            href=''
          >
            <IconFacebook className={css({fill: '#272727', w: 6, h: 6})} />
          </Link>
        </li>
        <li>
          <Link
            className={css({
              display: 'grid',
              placeItems: 'center',
            })}
            href=''
          >
            <IconEmail className={css({fill: '#272727', w: 6, h: 6})} />
          </Link>
        </li>
        <li>
          <Link
            className={css({
              display: 'grid',
              placeItems: 'center',
            })}
            href=''
          >
            <IconLink className={css({fill: '#272727', w: 6, h: 6})} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ArticleInfo;
