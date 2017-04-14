import {
  UPDATE_TIME,
  UPDATE_SOUND,
  SOUND_MODAL,
  START,
  PAUSE,
  DONE,
} from './types';

const updateTime = ({ min, sec }) => ({ type: UPDATE_TIME, min, sec });

const updateSound = sound => ({ type: UPDATE_SOUND, sound });

const toggleSoundModal = show => ({ type: SOUND_MODAL, show });

const start = () => ({ type: START });

const pause = () => ({ type: PAUSE, pause: true });

const resume = () => ({ type: PAUSE, pause: false });

const done = () => ({ type: DONE });

export {
  updateTime,
  updateSound,
  toggleSoundModal,
  start,
  pause,
  resume,
  done,
};
