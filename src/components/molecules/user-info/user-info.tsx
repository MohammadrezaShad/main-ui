import {Avatar} from '@/components';
import {UserOutputType} from '@/graphql/generated/types';
import {css} from '@styled/css';

const UserInfo = ({author}: {author: UserOutputType}) => {
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
      <Avatar src={author.avatar?.filename} />

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        })}
      >
        <h6
          className={css({
            textStyle: 'subtitle1',
            color: 'text.primary',
          })}
        >
          {author.displayName}
        </h6>
        <p
          className={css({
            textStyle: 'body2',
            color: 'text.primary',
          })}
        >
          John Doe is a writer and restless explorer. He digs into buzzing metropolises, far-flung
          villages, and the serenity of nature to discover inclusive and sustainable ways to make
          lasting memories. When he's not on the move across the globe, you can still find him in
          motion closer to home, as an enthusiastic, amateur rollerskater.
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
