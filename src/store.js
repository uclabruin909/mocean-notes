import { createStore } from 'redux';
import * as ACTIONS from './constants/actions';

const getPercentageComplete = (state) => {
  const propsToCheck = ['selectedBodyPart', 'selectedBodyCategory', 'selectedBodySpecific'];

  let countDone = 0;
  propsToCheck.forEach((prop) => {
    if (state[prop]) {
      countDone++;
    }
  });

  if (countDone === 0) return 0;
  return Math.floor((countDone / propsToCheck.length) * 100);
};

const initialState = {
  sidebarShow: false,
  completionPercentage: 0,
  isAutoGenerationEnabled: false,
  isBodyPartSelectionComplete: false,
  selectedBodyPart: undefined,
  selectedBodyCategory: undefined,
  selectedBodySpecific: undefined,
  // restriction selection
  selectedRestriction: [],
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set': {
      return { ...state, ...rest };
    }
    case ACTIONS.SET_BODY_SELECTION: {
      const newState = { ...state, ...rest };
      const { selectedBodyPart, selectedBodyCategory, selectedBodySpecific } = newState;
      const isBodyPartSelectionComplete =
        !!selectedBodyPart && !!selectedBodyCategory && !!selectedBodySpecific;
      const completionPercentage = getPercentageComplete(newState);

      return {
        ...newState,
        isBodyPartSelectionComplete,
        completionPercentage,
      };
    }
    case ACTIONS.RESET_BODY_SELECTION: {
      const newState = {
        ...state,
        isBodyPartSelectionComplete: false,
        selectedBodyPart: undefined,
        selectedBodyCategory: undefined,
        selectedBodySpecific: undefined,
      };

      return newState;
    }
    case ACTIONS.UPDATE_RESTRICTION_SELECTION: {
      const newState = {
        ...state,
        selectedRestriction: rest.selectedRestriction || [],
      };

      return newState;
    }
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
