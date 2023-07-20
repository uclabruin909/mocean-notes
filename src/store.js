import { createStore } from 'redux';
import * as ACTIONS from './constants/actions';

const initialState = {
  sidebarShow: false,
  selectedBodyPart: undefined,
  selectedBodyCategory: undefined,
  selectedBodySpecific: undefined,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    case ACTIONS.SET_BODY_PART: {
      return {
        ...state,
        selectedBodyPart: rest.selectedBodyPart,
      };
    }
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
