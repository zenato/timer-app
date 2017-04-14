import {
  UPDATE_TIME,
  UPDATE_SOUND,
  SOUND_MODAL,
  START,
  PAUSE,
  DONE,
} from '../actions/types';

const initialState = {
  min: 0,
  sec: 10,
  sound: 1,
  showSoundModal: false,
  start: false,
  pause: false,
};

export default function counter(state = initialState, action = {}) {
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
