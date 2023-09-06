'use client';

import React from 'react';
import {enableReactUse} from '@legendapp/state/config/enableReactUse';

enableReactUse();

type LegendProviderProps = {
  children: React.ReactNode;
};

export default function LegendProvider({children}: LegendProviderProps) {
  return <main>{children}</main>;
}
