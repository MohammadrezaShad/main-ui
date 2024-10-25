import {css} from '@styled/css';
import Link from 'next/link';

import {Avatar} from '@/components';
import {UserOutputType} from '@/graphql/generated/types';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const UserInfo = ({author}: {author: UserOutputType}) => {
  function getAuthorName() {
    if (!author) return 'Unknow Author';
    if (author.displayName) return author.displayName;
    if (author.firstName && author.lastName) return `${author.firstName} ${author.lastName}`;
    if (author.username) return author.username;
    return 'Unknow Author';
  }

  return (
    <div
      className={css({
        display: 'flex',
        gap: 4,
        py: 8,
        borderBottom: '1px solid token(colors.gray3)',
        mb: '11',
      })}
    >
      {/** AVATAR */}
      <Avatar
        src={
          author.avatar?._id
            ? `${IMAGE_STORAGE_URL}/${author.avatar?.filename}-${author.avatar?._id}`
            : ''
        }
        alt=''
      />
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        })}
      >
        <Link
          href={`/author/${author._id}`}
          className={css({
            textStyle: 'subtitle1',
            color: 'text.primary',
          })}
        >
          {getAuthorName()}
        </Link>
        <p
          className={css({
            textStyle: 'body2',
            color: 'text.primary',
          })}
        />
      </div>
    </div>
  );
};

export default UserInfo;
