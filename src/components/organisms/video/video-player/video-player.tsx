/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import {observer} from '@legendapp/state/react';
import {css, cx} from '@styled/css';
import {token} from '@styled/tokens';
import Slider from 'rc-slider';

import {
  IconCPause,
  IconCPlay,
  IconFullscreen,
  IconFullscreenExit,
  IconSetting,
  IconSpeed,
  IconVideoPause,
  IconVideoPlay,
  IconVolumeOff,
  IconVolumeOn,
} from '@/assets';
import {Popup, Radio, Spinner} from '@/components';
import {useVideoPlayer} from '@/hooks';
import {formatTime} from '@/utils';

import 'rc-slider/assets/index.css';

import * as S from './video-player.styled';

interface VideoPlayerProps {
  className?: string;
  src: string;
  poster?: string;
}

export default observer(function VideoPlayer({className, src, poster}: VideoPlayerProps) {
  const {
    videoState$,
    speeds,
    qualities,
    handleMouseEnter,
    handleMouseLeave,
    onTimeUpdate,
    handlePlayPause,
    handleSliderHover,
    handleSliderLeave,
    handleTimeUpdate,
    handleVolumeUpdate,
    handleToggleMute,
    handleFullscreen,
    handleSpeedChange,
    handleChangeQuality,
    progressBoxRef,
    fullScreenVideoRef,
    progressTooltipRef,
    videoRef,
    qualityPopperRef,
    speedSettingRef,
  } = useVideoPlayer(src);

  const defaultClassName = css({});
  const videoPlayerClass = cx(defaultClassName, className);
  const hasLoading =
    videoState$.showLoading.get() &&
    (videoState$.isPlaying.get() || !videoState$.isMetaLoaded.get());
  const hasPlayPauseButton =
    videoState$.isControlsVisible.get() &&
    (!videoState$.showLoading.get() || !videoState$.isPlaying.get());

  const IconVolume =
    // eslint-disable-next-line no-nested-ternary
    videoState$.volume.get() <= 0.2
      ? IconVolumeOn
      : videoState$.volume.get() <= 0.5
      ? IconVolumeOn
      : IconVolumeOn;

  return (
    <S.Container
      className={videoPlayerClass}
      ref={fullScreenVideoRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hasLoading ? (
        <S.SpinnerWrap>
          <Spinner value={75} h='60px' w='60px' />
        </S.SpinnerWrap>
      ) : null}
      <S.Video
        ref={videoRef}
        key={src}
        poster={poster}
        crossOrigin='anonymous'
        onTimeUpdate={onTimeUpdate}
        onClick={handlePlayPause}
      />
      {(videoState$.isControlsVisible.get() || true) && (
        <S.Controls active={videoState$.showControls.get() && videoState$.isPlaying.get()}>
          <S.ProgressWrap
            ref={progressBoxRef}
            onMouseMove={handleSliderHover}
            onMouseLeave={handleSliderLeave}
            style={
              {
                '--bw': `${videoState$.bufferedProgress.get()}%`,
              } as React.CSSProperties
            }
          >
            <Slider
              value={videoState$.progress.get()}
              onChange={handleTimeUpdate}
              activeDotStyle={{boxShadow: 'none !importnat', border: 'none !important'}}
              styles={{
                handle: {
                  border: 'none',
                  width: '8px',
                  height: '8px',
                  opacity: '0',
                  marginTop: '-2px',
                  transition: 'opacity 0.3s',
                },
                rail: {
                  cursor: 'pointer',
                  background: 'rgba(241, 240, 242, 0.32)',
                },
                track: {
                  zIndex: '1',
                  background: token('colors.primary'),
                },
              }}
            />
            {videoState$.hoverTime.get() === null ? null : (
              <S.TimeOverlay
                ref={progressTooltipRef}
                style={{
                  left:
                    videoState$.position.get() != null
                      ? `${videoState$.position.get() * 100}%`
                      : '0',
                }}
              >
                <S.TimeText>{formatTime(videoState$.hoverTime.get() as number)}</S.TimeText>
              </S.TimeOverlay>
            )}
          </S.ProgressWrap>
          <S.Settings>
            <S.RightSettings>
              <S.OptionButton className={css({mr: 0})} onClick={handleFullscreen}>
                {videoState$.isFullscreen.get() ? <IconFullscreenExit /> : <IconFullscreen />}
              </S.OptionButton>
              <Popup
                content={
                  <S.SettingsOverlay>
                    <S.OptionTitle>کیفیت</S.OptionTitle>
                    {qualities.map(item => (
                      <S.SettingsOption
                        key={item.value}
                        onClick={() => handleChangeQuality(item.value)}
                      >
                        <Radio
                          value={item.value}
                          checked={videoState$.currentLevel.get() === item.value}
                        />
                        <S.OptionLabel
                          color={
                            videoState$.currentLevel.get() === item.value
                              ? 'primary'
                              : 'text.primary'
                          }
                          className={css({pr: 3})}
                        >
                          {item.label}
                        </S.OptionLabel>
                      </S.SettingsOption>
                    ))}
                  </S.SettingsOverlay>
                }
              >
                <S.OptionButton ref={qualityPopperRef} className='quality-setting'>
                  <IconSetting />
                </S.OptionButton>
              </Popup>
              <Popup
                content={
                  <S.SettingsOverlay>
                    <S.OptionTitle>سرعت پخش</S.OptionTitle>
                    {speeds.map(item => (
                      <S.SettingsOption
                        key={item.value}
                        onClick={() => handleSpeedChange(item.value)}
                      >
                        <Radio
                          value={item.value}
                          checked={videoState$.speed.get() === item.value}
                        />
                        <S.OptionLabel
                          color={
                            videoState$.speed.get() === item.value ? 'primary' : 'text.primary'
                          }
                          className={css({pr: 3})}
                        >
                          {item.label}
                        </S.OptionLabel>
                      </S.SettingsOption>
                    ))}
                  </S.SettingsOverlay>
                }
              >
                <S.OptionButton ref={speedSettingRef} className='speed-setting'>
                  <IconSpeed />
                </S.OptionButton>
              </Popup>
            </S.RightSettings>
            <S.LeftSettings>
              <S.DurationText className={css({opacity: videoState$.totalDuration.get() ? 1 : 0})}>
                {videoState$.totalDuration.get()} / {videoState$.currentTime.get() || '00:00'}
              </S.DurationText>
              <S.Volume>
                <S.VolumeProgress>
                  <Slider
                    value={videoState$.volume.get()}
                    onChange={handleVolumeUpdate}
                    min={0}
                    max={1}
                    step={0.01}
                    styles={{
                      handle: {
                        border: 'none',
                        width: '8px',
                        height: '8px',
                        opacity: '0',
                        marginTop: '-2px',
                        transition: 'opacity 0.3s',
                      },
                      rail: {
                        cursor: 'pointer',
                        background: 'rgba(241, 240, 242, 0.32)',
                      },
                      track: {
                        zIndex: '1',
                        background: token('colors.primary'),
                      },
                    }}
                  />
                </S.VolumeProgress>
                <S.VolumeIcon onClick={handleToggleMute}>
                  {videoState$.isMuted.get() || videoState$.volume.get() === 0 ? (
                    <IconVolumeOff />
                  ) : (
                    <IconVolume />
                  )}
                </S.VolumeIcon>
              </S.Volume>
              <S.PlayButton onClick={handlePlayPause}>
                {videoState$.isPlaying.get() ? <IconCPause /> : <IconCPlay />}
              </S.PlayButton>
            </S.LeftSettings>
          </S.Settings>
        </S.Controls>
      )}

      {hasPlayPauseButton ? (
        <S.Button
          active={videoState$.showControls.get() || !videoState$.isPlaying.get()}
          isPlaying={videoState$.isPlaying.get()}
          onClick={handlePlayPause}
        >
          {videoState$.isPlaying.get() ? <IconVideoPause /> : <IconVideoPlay />}
        </S.Button>
      ) : null}
    </S.Container>
  );
});
