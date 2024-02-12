import {css} from '@styled/css';

import NotFoundImage from '@/assets/images/404.svg';

const NotFound = () => (
  <div
    className={css({
      display: 'flex',
      flexDir: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 164px)',
      mx: 'auto',
    })}
  >
    <NotFoundImage />
    <div
      className={css({
        textStyle: 'h4',
        color: 'text.primary',
        mt: '4',
      })}
    >
      PAGE NOT FOUND
    </div>
  </div>
);

export default NotFound;
