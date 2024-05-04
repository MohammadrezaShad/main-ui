import {css, cx} from '@styled/css';
import {getCookie} from 'cookies-next';

import {IconCollection} from '@/assets';
import {Avatar} from '@/components';
import {CookieName} from '@/constants';
import {Maybe, UserOutputType} from '@/graphql/generated/types';
import Link from 'next/link';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const ArticleInfo = ({
  author,
  readingDuration,
  className,
  articleId,
  handleToggleBookmark,
  isBookmark,
}: {
  author: UserOutputType | null;
  readingDuration?: Maybe<number>;
  className?: string;
  articleId: string;
  handleToggleBookmark: any;
  isBookmark: boolean;
}) => {
  const token = getCookie(CookieName.AUTH_TOKEN);

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
        <Avatar
          src={author?.avatar?._id ? `${IMAGE_STORAGE_URL}/${author.avatar?._id}` : undefined}
          size={40}
        />

        {/** NAME */}
        <div
          className={css({
            textStyle: 'body2',
            color: 'text.primary',
          })}
        >
          By&nbsp;
          {author ? (
            <Link href={`/author/${author._id}`}>{author.displayName}</Link>
          ) : (
            <span>Unknown Author</span>
          )}
        </div>

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

        {token ? (
          <button
            className={css({cursor: 'pointer'})}
            type='button'
            onClick={() => handleToggleBookmark(articleId)}
          >
            <IconCollection
              className={css({
                fill: isBookmark ? 'token(colors.primary)' : 'gray4',
              })}
            />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ArticleInfo;
