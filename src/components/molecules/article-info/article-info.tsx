import {
  IconCollection,
  IconEmail,
  IconFacebook,
  IconInstagram,
  IconLink,
  IconTwitter,
} from '@/assets';
import {Avatar, SocialMediaLinks} from '@/components';
import {css} from '@styled/css';

const socialMediaLinks = [
  {icon: IconTwitter, href: ''},
  {icon: IconInstagram, href: ''},
  {icon: IconFacebook, href: ''},
  {icon: IconEmail, href: ''},
  {icon: IconLink, href: ''},
];

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
      <SocialMediaLinks links={socialMediaLinks} />
    </div>
  );
};

export default ArticleInfo;
