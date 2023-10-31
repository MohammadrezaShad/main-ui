import {PopperProps} from 'react-popper/typings/react-popper';
import {useObservable} from '@legendapp/state/react';

type PopperPlacementType = PopperProps<unknown>['placement'];

export type PopperState = {
  open: boolean;
  anchorEl: null | HTMLElement;
  placement: PopperPlacementType;
};

export function usePopper(options: {id?: string; placement?: PopperPlacementType}) {
  const {id: popperId, placement: popperPlacement} = options;
  const popperState$ = useObservable<PopperState>({
    open: false,
    anchorEl: null,
    placement: undefined,
  });
  const open = popperState$.open.get();
  const anchorEl = popperState$.anchorEl.get();
  const handleMouseEvent = async (event: React.MouseEvent<HTMLElement>, show?: boolean) => {
    popperState$.anchorEl.set(event.currentTarget);
    if (show === undefined) {
      popperState$.open.set(!open);
    } else {
      popperState$.open.set(show);
    }
    popperState$.placement.set(popperPlacement);
    return event.currentTarget;
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? popperId || 'popper' : undefined;

  return {popperState$, handleMouseEvent, id};
}
