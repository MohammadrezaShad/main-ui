import {styled} from '@styled/jsx';

export const Container = styled('div', {
  base: {
    pos: 'relative',
    pt: '56.25%',
    h: 0,
  },
});

export const Video = styled('video', {
  base: {
    width: '100%',
    height: '100%',
    zIndex: '1',
    position: 'absolute',
    top: '0',
    rounded: 'xl',
    overflow: 'hidden',
    objectFit: 'cover', // Preserve the aspect ratio of the video source
    backgroundColor: 'black',
    '&::-webkit-media-controls-enclosure': {
      display: ' none !important',
    },
  },
});

export const SpinnerWrap = styled('div', {
  base: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: '999',
    transform: 'translate(-50%, -50%)',
  },
});

export const Button = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    right: '50%',
    zIndex: 1,
    transform: 'translate(50%,-50%)',
    w: '60px',
    h: '60px',
    rounded: '50%',
    opacity: '0',
    visibility: 'hidden',
    transition: 'all 0.3s',
    cursor: 'pointer',
    '& PATH': {
      fill: 'text.primary',
    },
    bg: 'primary',
    '& > svg': {
      ml: '2px',
    },
  },
  variants: {
    active: {
      true: {
        opacity: '1',
        visibility: 'visible',
      },
    },
    isPlaying: {
      true: {
        '& > svg': {
          w: '30px',
          h: '30px',
          ml: 0,
        },
      },
    },
  },
});

export const Controls = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    pb: 3,
    position: 'absolute',
    zIndex: '10',
    bottom: '0',
    width: '100%',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s',
    pr: 4,
    pl: 4,
    bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.83) 100%)',
    borderBottomRadius: 'xl',
  },
  variants: {
    active: {
      true: {
        opacity: '1',
        visibility: 'visible',
      },
    },
  },
});

export const ProgressWrap = styled('div', {
  base: {
    position: 'relative',
    display: 'flex',
    '& .rc-slider': {
      cursor: 'pointer',
      _hover: {
        '& .rc-slider-handle': {
          opacity: '1 !important',
        },
      },
      '& .rc-slider-handle': {
        _active: {
          boxShadow: 'none !important',
          border: 'none !important',
        },
      },
    },
    '& .rc-slider-rail': {
      '&::after': {
        position: 'absolute',
        content: "''",
        left: '0',
        top: '0',
        width: 'var(--bw)',
        backgroundColor: 'rgba(241, 240, 242, 0.64)',
        height: '100%',
        zIndex: '1',
      },
    },
  },
});

export const TimeOverlay = styled('div', {
  base: {
    bg: 'backgroundVariant',
    p: 2,
    mb: 3,
    rounded: 'lg',
    position: 'absolute',
    top: '-40px',
    transform: 'translateX(-50%)',
  },
});

export const TimeText = styled('div', {
  base: {
    textStyle: 'caption',
    color: 'text.primary',
  },
});

export const Settings = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const LeftSettings = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
  },
});

export const DurationText = styled('div', {
  base: {
    textStyle: 'body2',
    color: 'text.invert',
    mt: 2,
  },
});

export const Volume = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 4,
    paddingLeft: 4,
    '&:hover > div:first-child': {
      width: '60px',
      opacity: '1',
      paddingLeft: 2,
    },
  },
});

export const VolumeIcon = styled('div', {
  base: {
    color: 'white',
    width: '24px',
    display: 'flex',
    cursor: 'pointer',
  },
});

export const VolumeProgress = styled('div', {
  base: {
    display: 'flex',
    width: '0',
    transition: 'width 0.3s ease-in-out, opacity 0s linear 0.2s, padding 0s linear 0.2s',
    opacity: '0',
    '& .rc-slider': {
      cursor: 'pointer',
      _hover: {
        '& .rc-slider-handle': {
          opacity: '1 !important',
        },
      },
      '& .rc-slider-handle': {
        _active: {
          boxShadow: 'none !important',
          border: 'none !important',
        },
      },
    },
    '& .rc-slider-rail': {
      '&::after': {
        position: 'absolute',
        content: "''",
        left: '0',
        top: '0',
        width: 'var(--bw)',
        backgroundColor: 'rgba(241, 240, 242, 0.64)',
        height: '100%',
        zIndex: '1',
      },
    },
  },
});

export const PlayButton = styled('div', {
  base: {
    display: 'inline-flex',
    cursor: 'pointer',
    '& path': {
      fill: 'background',
    },
  },
});

export const RightSettings = styled('div', {
  base: {
    display: 'flex',
  },
});

export const OptionButton = styled('button', {
  base: {
    display: 'inline-flex',
    cursor: 'pointer',
    mr: 4,

    '& > svg': {
      h: '24px',
    },
    '&.quality-setting': {
      '& path': {
        fill: 'background',
      },
    },
    '&.speed-setting': {
      '& svg': {
        w: '24px',
        h: '24px',
      },
    },
  },
});

export const SettingsOverlay = styled('div', {
  base: {
    bg: 'backgroundVariant',
    p: 4,
    mb: 6,
    rounded: 'lg',
    minW: '180px',
  },
});

export const SettingsOption = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:not(:last-child)': {
      mb: 4,
    },
  },
});

export const OptionTitle = styled('div', {
  base: {
    textStyle: 'h4',
    color: 'text.primary',
    mb: 2,
  },
});

export const OptionLabel = styled('div', {
  base: {
    textStyle: 'body2',
    color: 'text.primary',
    mt: 1,
  },
});
