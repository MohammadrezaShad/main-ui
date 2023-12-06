import {ProfileDetails, ProfileSidebar} from '@/components';
import {css} from '@styled/css';
import {flex} from '@styled/patterns';

export default function Template({children}: {children: React.ReactNode}) {
  return (
    <div
      className={flex({
        flexDirection: 'column',
        alignItems: 'center',
      })}
    >
      <div
        className={flex({
          w: 'full',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          gap: '5',
          mt: '6',
          px: '5',
        })}
      >
        <ProfileSidebar />
        <div className={css({display: 'flex', flex: 1, flexDir: 'column', rowGap: 8})}>
          {children}
        </div>
        <ProfileDetails />
      </div>
    </div>
  );
}
