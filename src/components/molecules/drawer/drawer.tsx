'use client';

import React from 'react';
import RcDrawer, {DrawerProps} from 'rc-drawer';

import 'rc-drawer/assets/index.css';

import motionProps from './motion';

const Drawer: React.FC<DrawerProps> = ({children, ...props}) => (
  <RcDrawer {...props} {...motionProps} forceRender>
    {children}
  </RcDrawer>
);
export default Drawer;
