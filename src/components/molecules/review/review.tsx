import {css} from '@styled/css';

import {IconComment, IconHeart, IconReport} from '@/assets';
import {Avatar} from '@/components';
import type {CommentType, UserOutputType} from '@/graphql';
import {formatDate} from '@/utils/format-date';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

function getAuthorName(author: UserOutputType) {
  if (!author) return 'Unknow Author';
  if (author.displayName) return author.displayName;
  if (author.firstName && author.lastName) return `${author.firstName} ${author.lastName}`;
  if (author.username) return author.username;
  return 'Unknow Author';
}

const Review = ({children, comment}: {children?: React.ReactNode; comment: CommentType}) => (
  <div
    className={css({
      display: 'flex',
      gap: 4,
      py: 6,
      '&:not(:last-of-type)': {
        borderBottom: '1px solid token(colors.gray2)',
      },
    })}
  >
    <Avatar
      size={48}
      src={
        comment.createUser?.avatar?.filename
          ? `${IMAGE_STORAGE_URL}/${comment.createUser?.avatar?.filename}-${comment.createUser?.avatar?._id}`
          : ''
      }
      alt=''
    />
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
        <div
          className={css({
            textStyle: 'subtitle1',
            color: 'text.primary',
          })}
        >
          {getAuthorName(comment.createUser!)}
        </div>
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
          {formatDate(comment.updatedAt)}
        </time>
      </div>

      <p
        className={css({
          textStyle: 'body',
          color: 'text.primary',
          mb: '4',
        })}
      >
        {comment.content}
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
            type='button'
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
            type='button'
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
            type='button'
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

export default Review;
