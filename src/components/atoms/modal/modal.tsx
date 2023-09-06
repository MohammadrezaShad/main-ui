'use client';

import * as React from 'react';
import {createPortal} from 'react-dom';

export default function Modal({children}: React.PropsWithChildren) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return mounted ? createPortal(<>{children}</>, document.body) : null;
}
