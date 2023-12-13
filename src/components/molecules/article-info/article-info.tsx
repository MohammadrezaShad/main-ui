import {css, cx} from '@styled/css';

import {IconCollection} from '@/assets';
import {Avatar} from '@/components';
import {CreateBookmarkInput, Maybe, UserOutputType} from '@/graphql/generated/types';
import {addBookmark} from '@/graphql/mutation/bookmark/add-bokmark';
import {useMutation} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';

const ArticleInfo = ({
  author,
  readingDuration,
  className,
  articleId,
}: {
  author: UserOutputType;
  readingDuration?: Maybe<number>;
  className?: string;
  articleId: string;
}) => {
  const token = getCookie('authToken');
  const {mutate, data, error, isLoading} = useMutation({
    mutationFn: (input: CreateBookmarkInput) => addBookmark(input, token!),
  }) as any;

  const handleToggleBookmark = async () => {
    if (!token) return;
    await mutate({multimedia: articleId});
  };

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

        <button className={css({cursor: 'pointer'})} type='button' onClick={handleToggleBookmark}>
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
