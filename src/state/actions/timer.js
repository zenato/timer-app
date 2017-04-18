// @flow

import {
  UPDATE_TIME,
  UPDATE_SOUND,
  SOUND_MODAL,
  START,
  PAUSE,
  DONE,
} from './types';

type Action = {
  type: string,
  min?: number,
  sec?: number,
  sound?: number,
  show?: boolean,
  pause?: boolean,
};

const updateTime = ({ min, sec }: { min: number, sec: number}): Action => ({ type: UPDATE_TIME, min, sec });

const updateSound = (id: number): Action => ({ type: UPDATE_SOUND, sound: id });

const toggleSoundModal = (show: boolean): Action => ({ type: SOUND_MODAL, show });

const start = (): Action => ({ type: START });

const pause = (): Action => ({ type: PAUSE, pause: true });

const resume = (): Action => ({ type: PAUSE, pause: false });

const done = (): Action => ({ type: DONE });

export {
  updateTime,
  updateSound,
  toggleSoundModal,
  start,
  pause,
  resume,
  done,
};

export type {
  Action,
};
