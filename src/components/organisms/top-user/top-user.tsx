import {Avatar} from '@/components/atoms';
import {User} from '@/graphql';
import {css} from '@styled/css';

const TopUser = ({
  user,
  rank,
  isCurrentUser,
}: {
  user: User;
  rank: number;
  isCurrentUser: boolean;
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        gap: '[61px]',
        backgroundColor: isCurrentUser ? '#E7FDF6' : rank % 2 === 0 ? 'white' : 'gray.100',
        px: '4',
        py: '2',
        border: isCurrentUser ? '1px solid token(colors.success)' : 'none',
      })}
    >
      <div className={css({fontSize: 32, color: 'gray.400', fontWeight: 300})}>{rank}.</div>
      <div className={css({display: 'flex', gap: '4'})}>
        <Avatar src={user.avatar?._id} size={48} />
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
