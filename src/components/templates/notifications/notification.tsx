import {IconInfo} from '@/assets';
import {css} from '@styled/css';
import {flex} from '@styled/patterns';

export default function Profile() {
  return (
    <div
      className={flex({
        flexDir: 'column',
        justifyContent: 'start',
        flex: '1',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexGrow: '1',
          flexDir: 'column',
          mt: '7',
          alignItems: 'flex-start',
        })}
      >
        <h3
          className={css({
            textStyle: 'h3',
            color: 'text.primary',
          })}
        >
          Notifications
        </h3>
        {/** Empty state */}
        <div
          className={flex({
            alignSelf: 'center',
            flex: 0,
            flexBasis: '0%',
            flexDir: 'column',
            alignItems: 'center',
            my: 'auto',
          })}
        >
          <IconInfo
            clasName={css({
              w: '16',
              h: '16',
            })}
          />
          <p
            className={css({
              textStyle: 'body',
              textAlign: 'center',
              mt: '5',
              color: 'gray4',
            })}
          >
            No notifications yet
          </p>
        </div>
      </div>
    </div>
  );
}
