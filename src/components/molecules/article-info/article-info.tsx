import {IconCollection} from '@/assets';
import {Avatar} from '@/components';
import {Maybe, UserOutputType} from '@/graphql/generated/types';
import {css, cx} from '@styled/css';

const ArticleInfo = ({
  author,
  readingDuration,
  className,
}: {
  author: UserOutputType;
  readingDuration?: Maybe<number>;
  className?: string;
}) => {
  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }),
      )}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        })}
      >
        {/** AVATAR */}
        <Avatar src={author.avatar?.filename} size={40} />

        {/** NAME */}
        <span
          className={css({
            textStyle: 'body2',
            color: 'text.primary',
          })}
        >
          By {author.displayName}
        </span>

        {/** DIVIDER */}
        {readingDuration ? (
          <>
            <div className={css({h: 4, w: 0.25, bg: 'gray3'})} />

            <span
              className={css({
                textStyle: 'body2',
                color: 'text.primary',
              })}
            >
              {readingDuration}&nbsp;minutes read
            </span>
          </>
        ) : null}

        {/** DIVIDER */}
        <div className={css({h: 4, w: 0.25, bg: 'gray3'})} />

        {/** BOOKMARK ICON
         * !TODO: ADD ONCLICK EVENT HANDLER
         * !TODO: CHANGE SVG FILL BASED ON CLICK
         */}
        <button>
          <IconCollection
            className={css({
              fill: 'gray4',
            })}
          />
        </button>
      </div>
    </div>
  );
};

export default ArticleInfo;
