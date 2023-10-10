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
  // manual selection
  selectedManualJoint: [],
  selectedManualMuscle: [],
  selectedManualNerve: [],
  // movement selection
  selectedMovementQuality: [],
  selectedMovementType: [],
  selectedMovementTasks: [],
  // therex purpose selections
  selectedTherexPurposes: [],
  // cue selections
  selectedCues: [],
  // result selections
  selectedResults: [],
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set': {
      return { ...state, ...rest };
    }
    // BASE BODY SELECTION ACTIONS
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
        ...initialState,
      };

      return newState;
    }
    // RESTRICTION SELECTION ACTIONS
    case ACTIONS.UPDATE_RESTRICTION_SELECTION: {
      const newState = {
        ...state,
        selectedRestriction: rest.selectedRestriction || [],
      };

      return newState;
    }
    // MANUAL TYPE SELECTION ACTIONS
    case ACTIONS.UPDATE_MANUAL_TYPE_SELECTION: {
      const { selectedManualJoint, selectedManualMuscle, selectedManualNerve } = rest;
      const newState = {
        ...state,
        ...(!!selectedManualJoint ? { selectedManualJoint } : {}),
        ...(!!selectedManualMuscle ? { selectedManualMuscle } : {}),
        ...(!!selectedManualNerve ? { selectedManualNerve } : {}),
      };

      return newState;
    }
    // MOVEMENT SELECTION ACTIONS
    case ACTIONS.UPDATE_MOVEMENT_SELECTION: {
      const { selectedMovementQuality, selectedMovementType, selectedMovementTasks } = rest;
      const newState = {
        ...state,
        ...(!!selectedMovementQuality ? { selectedMovementQuality } : {}),
        ...(!!selectedMovementType ? { selectedMovementType } : {}),
        ...(!!selectedMovementTasks ? { selectedMovementTasks } : {}),
      };

      return newState;
    }
    // THEREX PURPOSE SELECTION ACTIONS
    case ACTIONS.UPDATE_THEREX_PURPOSE_SELECTION: {
      const { selectedTherexPurposes } = rest;
      const newState = {
        ...state,
        ...(!!selectedTherexPurposes ? { selectedTherexPurposes } : {}),
      };

      return newState;
    }
    // CUES SELECTION ACTIONS
    case ACTIONS.UPDATE_CUES_SELECTION: {
      const { selectedCues } = rest;
      const newState = {
        ...state,
        ...(!!selectedCues ? { selectedCues } : {}),
      };

      return newState;
    }
    // RESULTS SELECTION ACTIONS
    case ACTIONS.UPDATE_RESULTS_SELECTION: {
      const { selectedResults } = rest;
      const newState = {
        ...state,
        ...(!!selectedResults ? { selectedResults } : {}),
      };

      return newState;
    }

    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
