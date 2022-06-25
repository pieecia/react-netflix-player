import * as React from 'react';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { IconButton, Slider, Stack, styled, Typography } from '@mui/material';
import { ReactPlayerProps } from 'react-player';
import { format } from 'date-fns';
import { FullscreenRounded, VolumeDownRounded, VolumeUpRounded } from '@mui/icons-material';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';

const StyledPlayerControls = styled('div')`
  position: absolute;
  padding: 10px;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  .video-player__slider {
    width: 100%;
    color: #fff;
    box-sizing: border-box;

    &--seek {
      margin-left: 12px;
      margin-right: 12px;
    }

    &--sound {
      width: 100px;
    }

    .MuiSlider-track {
      border: none;
    }

    .MuiSlider-thumb {
      background-color: #fff;

      &:before: {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
      }

      &:hover,
      &.Mui-focusVisible,
      &.Mui-active {
        box-shadow: none;
      }
    }
  }
`;

const PlayerControls: React.FC<ReactPlayerProps> = (props) => {
  const { state, dispatch, wrapperRef, playerRef } = props;

  const handleSound = (_event: Event, newValue: number | number[]) => {
    dispatch({ type: 'VOLUME', payload: newValue });
  };

  const handleFullscreen = () => {
    screenfull.toggle(findDOMNode(wrapperRef.current) as Element);
  };

  const handleSeek = (_event: Event, newValue: number | number[]) => {
    playerRef.current.seekTo(newValue as number);
  };

  const renderSeekSlider = () => {
    return (
      <Slider
        aria-label="Time"
        className={'video-player__slider video-player__slider--seek'}
        min={0}
        max={state.duration}
        step={0.01}
        value={state.progress.playedSeconds}
        onChange={handleSeek}
      />
    );
  };

  const renderPlayButton = () => {
    return (
      <IconButton onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}>
        {state.playing ? (
          <PauseRounded sx={{ fontSize: '2rem', color: 'white' }} />
        ) : (
          <PlayArrowRounded sx={{ fontSize: '2rem', color: 'white' }} />
        )}
      </IconButton>
    );
  };

  const renderSoundSlider = () => {
    return (
      <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
        <VolumeDownRounded sx={{ fontSize: '1.5rem', color: 'white' }} />
        <Slider
          aria-label="Volume"
          className={'video-player__slider video-player__slider--sound'}
          max={1}
          step={0.01}
          value={state.volume}
          onChange={handleSound}
        />
        <VolumeUpRounded sx={{ fontSize: '1.5rem', color: 'white' }} />
      </Stack>
    );
  };

  const renderDurationText = () => {
    return (
      <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
        <Typography variant="body2" color="white">
          {format(new Date(state.progress.playedSeconds * 1000), 'mm:ss')}
          {' / '}
          {format(new Date(state.duration * 1000), 'mm:ss')}
        </Typography>
      </Stack>
    );
  };

  const renderFullscreenButton = () => {
    return (
      <IconButton onClick={handleFullscreen}>
        <FullscreenRounded sx={{ fontSize: '2rem', color: 'white' }} />
      </IconButton>
    );
  };

  return (
    <StyledPlayerControls className={'video-player__controls'}>
      <Stack direction="row" alignItems="center">
        {renderSeekSlider()}
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          {renderPlayButton()} {renderSoundSlider()} {renderDurationText()}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          {renderFullscreenButton()}
        </Stack>
      </Stack>
    </StyledPlayerControls>
  );
};

export default PlayerControls;
