/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import React from 'react';
import {enableReactUse} from '@legendapp/state/config/enableReactUse';

enableReactUse();

type LegendProviderProps = {
  children: React.ReactNode;
};

export default function LegendProvider({children}: LegendProviderProps) {
  return <React.Fragment>{children}</React.Fragment>;
}
