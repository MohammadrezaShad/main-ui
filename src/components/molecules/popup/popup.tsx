'use client';

import React, {LegacyRef, useState} from 'react';
import {usePopper} from 'react-popper';
import {useClickAway} from 'react-use';
import {css} from '@styled/css';

type PopupProps = {
  children: React.ReactNode;
  content: React.ReactNode;
};

const Popup = ({children, content}: PopupProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const popperRef = React.useRef<HTMLDivElement | null>(null);

  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    placement: 'top-end',
    modifiers: [
      {
        name: 'arrow',
        options: {element: arrowElement},
      },
    ],
  });

  const togglePopup = () => {
    setVisible(prevVis => !prevVis);
  };

  const renderChildren = () =>
    React.Children.map(children, child =>
      React.cloneElement(child as React.ReactElement, {
        ref: setReferenceElement,
        onClick: togglePopup,
      }),
    );

  useClickAway(popperRef, () => setVisible(false));

  return (
    <div className={css({display: 'flex'})} ref={popperRef}>
      {renderChildren()}

      {visible && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          ref={setPopperElement as LegacyRef<HTMLDivElement>}
          style={{...styles.popper, zIndex: 100}}
          {...attributes.popper}
          onClick={() => setVisible(false)}
        >
          {content}
          <div ref={setArrowElement as LegacyRef<HTMLDivElement>} style={styles.arrow} />
        </div>
      )}
    </div>
  );
};

export default Popup;
