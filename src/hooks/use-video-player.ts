/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import {useClickAway} from 'react-use';
import {useObservable} from '@legendapp/state/react';
import Hls from 'hls.js';

import {usePopper} from '@/hooks';
import {formatTime} from '@/utils';

export interface VideoState {
  isFullscreen: boolean;
  levels: any[];
  currentLevel: number;
  progress: number;
  bufferedProgress: number;
  totalDuration: string;
  currentTime: string;
  isPlaying: boolean;
  isMuted: boolean;
  isControlsVisible: boolean;
  showLoading: boolean;
  isMetaLoaded: boolean;
  speed: number;
  volume: number;
  showControls: boolean;
  hoverTime: number | null;
  position: number | null;
}

export const useVideoPlayer = (src: string) => {
  const videoState$ = useObservable<VideoState>({
    isFullscreen: false,
    levels: [],
    currentLevel: 0,
    progress: 0,
    bufferedProgress: 0,
    totalDuration: '',
    currentTime: '',
    isPlaying: false,
    isMuted: false,
    isControlsVisible: false,
    showLoading: true,
    isMetaLoaded: true,
    speed: 1,
    volume: 1,
    showControls: true,
    hoverTime: null,
    position: null,
  });

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hlsRef = React.useRef<Hls | null>(null);
  const fullScreenVideoRef = React.useRef<HTMLDivElement>(null);
  const progressBoxRef = React.useRef<HTMLDivElement>(null);
  const progressTooltipRef = React.useRef<HTMLDivElement>(null);
  const qualityPopperRef = React.useRef<HTMLButtonElement>(null);
  const qualitySettingRef = React.useRef<HTMLButtonElement>(null);
  const speedPopperRef = React.useRef<HTMLDivElement>(null);
  const speedSettingRef = React.useRef<HTMLButtonElement>(null);

  const speedList = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const {
    popperState$: qualityPopperState$,
    handleMouseEvent: handleQualityMouseEvent,
    id: qualityPopperId,
  } = usePopper({
    id: `video-quality-popper`,
    placement: 'top-start',
  });

  const {
    popperState$: speedPopperState$,
    handleMouseEvent: handleSpeedMouseEvent,
    id: speedPopperId,
  } = usePopper({
    id: `video-speed-popper`,
    placement: 'top-start',
  });

  const qualities = videoState$.levels.get().map((level, value) => {
    const label = level.name || level.label || `${level.height}p`;
    return {
      value,
      label,
    };
  });
  qualities.unshift({label: 'خودکار(بر اساس سرعت اینترنت شما)', value: -1});

  const speeds = speedList.map(level => {
    const label = `${level}x`;
    return {
      value: level,
      label,
    };
  });

  const handleCloseQualityPopper = React.useCallback((e: Event) => {
    if (qualitySettingRef.current?.contains(e.target as Node)) return;
    qualityPopperState$.open.set(false);
  }, []);
  useClickAway(qualityPopperRef, handleCloseQualityPopper);

  const handleCloseSpeedPopper = React.useCallback((e: Event) => {
    if (speedSettingRef.current?.contains(e.target as Node)) return;
    speedPopperState$.open.set(false);
  }, []);
  useClickAway(speedPopperRef, handleCloseSpeedPopper);

  const handleChangeQuality = React.useCallback((level: number) => {
    if (hlsRef.current) {
      // Use the hls instance to change the current level
      hlsRef.current.currentLevel = level;
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      // Use the native HLS API to change the current track
      const videoElement = videoRef.current as HTMLVideoElement;
      const tracks = Array.from(videoElement.textTracks);

      tracks.forEach((track, index) => {
        // Enable or disable the track based on the selected level
        track.mode = level === index ? 'showing' : 'disabled';
      });
    }

    videoState$.currentLevel.set(level); // Update the state with the current level
  }, []);

  const handleTimeUpdate = (value: number | number[]) => {
    const videoElement = videoRef.current as HTMLVideoElement;
    const currTime = ((value as number) / 100) * videoElement.duration;
    videoElement.currentTime = currTime;
    const formattedCurrentTime = formatTime(currTime);
    videoState$.currentTime.set(formattedCurrentTime);
    videoState$.progress.set(value as number);
  };

  const handlePlayPause = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        videoElement.playbackRate = videoState$.speed.get(); // Set the playback rate
        videoElement.muted = videoState$.isMuted.get(); // Set the mute state
        videoState$.isPlaying.set(true);
      } else {
        videoElement.pause();
        videoState$.isPlaying.set(false);
      }
    }
  };

  const handleFullscreen = () => {
    const videoParentElement = fullScreenVideoRef.current as any;
    const isFullscreen = videoState$.isFullscreen.get();
    if (videoParentElement) {
      if (!isFullscreen) {
        if (videoParentElement.requestFullscreen) {
          videoParentElement.requestFullscreen();
        } else if (videoParentElement.mozRequestFullScreen) {
          videoParentElement.mozRequestFullScreen();
        } else if (videoParentElement.webkitRequestFullscreen) {
          videoParentElement.webkitRequestFullscreen();
        } else if (videoParentElement.msRequestFullscreen) {
          videoParentElement.msRequestFullscreen();
        }
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
    videoState$.isFullscreen.set(!isFullscreen);
  };

  const handleSpeedChange = (value: number) => {
    const selectedSpeed = value;
    videoState$.speed.set(selectedSpeed);
    videoRef.current && (videoRef.current.playbackRate = selectedSpeed);
  };

  const handleVolumeUpdate = (value: number | number[]) => {
    const selectedVolume = value as number;
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoState$.volume.set(selectedVolume);
    videoState$.isMuted.set(selectedVolume === 0); // Update the mute state based on the volume level
    videoElement.volume = selectedVolume;
    videoElement.muted = selectedVolume === 0;
  };

  const handleToggleMute = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      videoState$.isMuted.set(videoElement.muted);
    }
  };

  const handleSliderHover = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = progressBoxRef.current as HTMLDivElement as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const pos = (event.clientX - rect.left) / rect.width;
    const sliderRect = (progressBoxRef.current as HTMLDivElement).getBoundingClientRect();
    const hoverPosition = event.clientX - sliderRect.left;
    const hoverProgress = (hoverPosition / sliderRect.width) * 100;
    const duration = videoRef.current?.duration || 0;
    const finalProgress = hoverProgress < 0 ? 0 : hoverProgress;
    const progressBoxWidth = progressBoxRef.current?.clientWidth;
    const progressTooltipWidth = progressTooltipRef.current?.clientWidth;
    const gap = (progressTooltipWidth as number) / 2 / (progressBoxWidth as number);
    // eslint-disable-next-line no-nested-ternary
    const newPos = pos + gap > 1 ? 1 - gap : pos - gap < 0 ? gap : pos;

    videoState$.position.set(newPos);
    videoState$.hoverTime.set((duration * finalProgress) / 100);
  };

  const handleSliderLeave = () => {
    videoState$.hoverTime.set(null);
  };

  const handleMouseEnter = () => {
    videoState$.showControls.set(true);
  };

  const handleMouseLeave = () => {
    videoState$.showControls.set(false);
    if (videoState$.isPlaying.get()) {
      speedPopperState$.open.set(false);
      qualityPopperState$.open.set(false);
    }
  };

  const onTimeUpdate = () =>
    videoRef.current &&
    videoState$.progress.set((videoRef.current.currentTime / videoRef.current.duration) * 100);

  React.useEffect(() => {
    if (!src) return;

    if (Hls.isSupported()) {
      // Use hls.js for browsers that support MSE
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current as HTMLVideoElement);
      hlsRef.current = hls; // Store a reference to the hls instance

      // Listen to the manifest parsed event to get the quality levels
      hls.on(Hls.Events.MANIFEST_PARSED, (_, data: {levels: React.SetStateAction<any[]>}) => {
        videoState$.levels.set(data.levels); // Update the state with the levels array
        videoState$.currentLevel.set(hls.currentLevel); // Update the state with the current level
      });

      // // Listen to the level switch event to update the current level
      // hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
      //   console.log('call');
      //   setCurrentLevel(data.level); // Update the state with the current level
      // });
    } else if (
      videoRef.current?.canPlayType('application/vnd.apple.mpegurl') // Use optional chaining to avoid errors if videoRef.current is null or undefined
    ) {
      // Use native HLS support for Safari browsers
      videoRef.current.src = src;

      // Listen to the loadedmetadata event to get the text tracks
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoState$.levels.set(Array.from(videoRef.current?.textTracks as ArrayLike<TextTrack>)); // Update the state with the tracks array
        videoState$.currentLevel.set(-1); // Set the current level to -1 for auto mode
      });
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (hlsRef.current) {
        // Use hls.destroy() to clean up the hls instance when the component unmounts
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const updateBufferedProgress = () => {
        if (videoElement.buffered.length > 0) {
          const buffered = videoElement.buffered.end(0);
          const nextBufferedProgress = (buffered / videoElement.duration) * 100;
          videoState$.bufferedProgress.set(nextBufferedProgress);
        }
      };
      videoElement.addEventListener('progress', updateBufferedProgress);
      return () => {
        videoElement.removeEventListener('progress', updateBufferedProgress);
      };
    }
  }, []);

  React.useEffect(() => {
    const video = videoRef.current as HTMLVideoElement;

    const handleMetadataLoaded = () => {
      const formattedTotalDuration = formatTime(video.duration);
      videoState$.showLoading.set(false);
      videoState$.totalDuration.set(formattedTotalDuration);
      videoState$.isControlsVisible.set(true);
      videoState$.isMetaLoaded.set(true);
    };

    const handleCurrentTimeTimeUpdate = () => {
      const formattedCurrentTime = formatTime(video.currentTime);
      videoState$.currentTime.set(formattedCurrentTime);
    };

    const handleWaiting = () => {
      videoState$.showLoading.set(true);
    };

    const handlePlaying = () => {
      videoState$.showLoading.set(false);
    };

    const handleVideoEnd = () => {
      video.currentTime = 0;
      videoState$.isPlaying.set(false);
    };

    video.addEventListener('loadedmetadata', handleMetadataLoaded);
    video.addEventListener('timeupdate', handleCurrentTimeTimeUpdate);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('', handlePlaying);
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadataLoaded);
      video.removeEventListener('timeupdate', handleCurrentTimeTimeUpdate);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  React.useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (
        fullScreenVideoRef.current &&
        !fullScreenVideoRef.current.contains(event.target as Node)
      ) {
        videoState$.showControls.set(false);
        return;
      }
      videoState$.showControls.set(true);
    };

    // Attach the touch event listeners when the component mounts
    document.addEventListener('touchstart', handleTouchStart);

    // Clean up the touch event listeners when the component unmounts
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return {
    videoState$,
    fullScreenVideoRef,
    hlsRef,
    videoRef,
    qualityPopperRef,
    qualitySettingRef,
    speedPopperRef,
    speedSettingRef,
    progressBoxRef,
    progressTooltipRef,
    speedPopperState$,
    qualityPopperState$,
    qualityPopperId,
    speedPopperId,
    qualities,
    speeds,
    handleQualityMouseEvent,
    handleSpeedMouseEvent,
    handleChangeQuality,
    handleTimeUpdate,
    handlePlayPause,
    handleFullscreen,
    handleSpeedChange,
    handleVolumeUpdate,
    handleToggleMute,
    handleSliderHover,
    handleSliderLeave,
    handleMouseEnter,
    handleMouseLeave,
    onTimeUpdate,
  };
};
