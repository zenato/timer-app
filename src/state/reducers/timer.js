// @flow

import {
  UPDATE_TIME,
  UPDATE_SOUND,
  SOUND_MODAL,
  START,
  PAUSE,
  DONE,
} from '../actions/types';
import type { Action } from '../actions/timer';


type State = {
  min: number,
  sec: number,
  sound: number,
  showSoundModal: boolean,
  start: boolean,
  pause: boolean,
};

const initialState: State = {
  min: 0,
  sec: 10,
  sound: 1,
  showSoundModal: false,
  start: false,
  pause: false,
};

export default function counter(state: State = initialState, action: Action): State {
  switch (action.type) {
    case UPDATE_TIME:
      return {
        ...state,
        min: action.min,
        sec: action.sec,
      };
    case UPDATE_SOUND:
      return {
        ...state,
        sound: action.sound,
      };
    case SOUND_MODAL:
      return {
        ...state,
        showSoundModal: action.show,
      };
    case START:
      return {
        ...state,
        start: true,
      };
    case PAUSE:
      return {
        ...state,
        pause: action.pause,
      };
    case DONE:
      return {
        ...state,
        start: false,
        pause: false,
      };
    default:
      return state;
  }
}
