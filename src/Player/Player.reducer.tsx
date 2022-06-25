import { ReactPlayerProps } from 'react-player';

const INITIAL_STATE: ReactPlayerProps = {
  playing: false,
  controls: false,
  volume: 0.8,
  light: true,
  progress: {
    playedSeconds: 0,
  },
  duration: 0,
};

const reducer = (state: ReactPlayerProps, action: ReactPlayerProps) => {
  switch (action.type) {
    case 'PLAY':
      return { ...state, playing: true };
    case 'PAUSE':
      return { ...state, playing: false };
    case 'TOGGLE_PLAY':
      return { ...state, playing: !state.playing };
    case 'DURATION':
      return { ...state, duration: action.payload };
    case 'SEEK':
      return { ...state, progress: { playedSeconds: action.payload } };
    case 'VOLUME':
      return { ...state, volume: action.payload };
    case 'LIGHT':
      return { ...state, light: action.payload };
    default:
      return state;
  }
};

export { reducer, INITIAL_STATE };
