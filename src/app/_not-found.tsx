import {css} from '@styled/css';
import {flex} from '@styled/patterns';

import NotFoundImage from '@/assets/images/404-2.svg';

const NotFound = () => (
  <div
    className={flex({
      flexDir: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      h: 'full',
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
