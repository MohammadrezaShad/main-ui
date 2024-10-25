import {css} from '@styled/css';

import {Avatar} from '@/components/atoms';
import {User} from '@/graphql';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const TopUser = ({
  user,
  rank,
  isCurrentUser,
}: {
  user: User;
  rank: number;
  isCurrentUser: boolean;
}) => {
  const generateBackgroundColor = () => {
    if (isCurrentUser) return '#E7FDF6';
    if (rank % 2 === 0) return '#F7F7F7';
    return 'white';
  };

  return (
    <div
      style={{backgroundColor: generateBackgroundColor()}}
      className={css({
        display: 'flex',
        gap: '[61px]',
        px: '4',
        py: '2',
        border: isCurrentUser ? '1px solid token(colors.success)' : 'none',
      })}
    >
      <div className={css({fontSize: 32, color: 'gray.400', fontWeight: 300})}>{rank}.</div>
      <div className={css({display: 'flex', gap: '4'})}>
        <Avatar
          src={
            user.avatar ? `${IMAGE_STORAGE_URL}/${user.avatar?.filename}-${user.avatar?._id}` : ''
          }
          alt=''
          size={48}
        />
        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
            flex: '1',
            mt: 'auto',
            mb: 'auto',
          })}
        >
          <div
            className={css({
              fontSize: 'base',
              lineHeight: 'base',
              fontWeight: 'medium',
              whiteSpace: 'nowrap',
              color: 'text.primary',
              textTransform: 'capitalize',
            })}
          >
            {`${user.firstName} ${user.lastName}`}
          </div>
          <p className={css({mt: '2', fontSize: 'sm', lineHeight: 'sm', color: 'gray4'})}>
            Score: 0
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopUser;
