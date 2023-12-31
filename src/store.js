import { createStore } from 'redux';
import * as ACTIONS from './constants/actions';

const collateralStateUpdate = (oldState, newState) => {
  let collateralState = {};

  if (oldState.selectedBodyPart !== newState.selectedBodyPart) {
    collateralState = {
      ...collateralState,
      selectedTherexPurposes: [],
      selectedMovementQuality: [],
      selectedMovementType: [],
      selectedMovementTasks: [],
    };
  }
  if (oldState.selectedBodyCategory !== newState.selectedBodyCategory) {
    collateralState = {
      ...collateralState,
      selectedRestriction: [],
    };
  }

  return collateralState;
};

const getSelectionCompletedFromCompletionStatus = (completionStatusObj) => {
  return !!(
    completionStatusObj.bodyPart &&
    completionStatusObj.bodyCategory &&
    completionStatusObj.bodySpecific &&
    completionStatusObj.restrictions &&
    completionStatusObj.manualJoint &&
    completionStatusObj.manualMuscle &&
    completionStatusObj.manualNerve &&
    completionStatusObj.therex &&
    completionStatusObj.movementQuality &&
    completionStatusObj.movementTypes &&
    completionStatusObj.movementTasks &&
    completionStatusObj.cues &&
    completionStatusObj.result
  );
};

const defaultModalState = {
  isVisible: false,
  title: '',
  bodyText: '',
  primaryBtnText: '',
  primaryBtnCb: undefined,
  secondaryBtnText: undefined,
  secondaryBtnCb: undefined,
};

export const defaultCompletionStatus = {
  bodyPart: false,
  bodyCategory: false,
  bodySpecific: false,
  restrictions: false,
  manualJoint: false,
  manualMuscle: false,
  manualNerve: false,
  therex: false,
  movementQuality: false,
  movementTypes: false,
  movementTasks: false,
  cues: false,
  result: false,
};

const initialState = {
  isSelectionCompleted: false,
  isOffCanvasVisible: false,
  lastGeneratedNoteTimestamp: undefined,
  sidebarShow: true,
  activeTab: 1,

  // body selection begins
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
  modalState: {
    ...defaultModalState,
  },
  completionStatus: {
    ...defaultCompletionStatus,
  },
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set': {
      return { ...state, ...rest };
    }
    case ACTIONS.AUTO_SELECTION_COMPLETE: {
      const {
        selectedBodyPart,
        selectedBodyCategory,
        selectedBodySpecific,
        selectedRestriction,
        selectedManualJoint,
        selectedManualMuscle,
        selectedManualNerve,
        selectedMovementQuality,
        selectedMovementType,
        selectedMovementTasks,
        selectedTherexPurposes,
        selectedCues,
        selectedResults,
      } = rest;

      const newState = {
        ...state,
        ...(!!selectedBodyPart ? { selectedBodyPart } : {}),
        ...(!!selectedBodyCategory ? { selectedBodyCategory } : {}),
        ...(!!selectedBodySpecific ? { selectedBodySpecific } : {}),
        ...(!!selectedRestriction ? { selectedRestriction } : {}),
        ...(!!selectedManualJoint ? { selectedManualJoint } : {}),
        ...(!!selectedManualMuscle ? { selectedManualMuscle } : {}),
        ...(!!selectedManualNerve ? { selectedManualNerve } : {}),
        ...(!!selectedMovementQuality ? { selectedMovementQuality } : {}),
        ...(!!selectedMovementType ? { selectedMovementType } : {}),
        ...(!!selectedMovementTasks ? { selectedMovementTasks } : {}),
        ...(!!selectedTherexPurposes ? { selectedTherexPurposes } : {}),
        ...(!!selectedCues ? { selectedCues } : {}),
        ...(!!selectedResults ? { selectedResults } : {}),
      };

      return newState;
    }
    case ACTIONS.UPDATE_COMPLETION_STATUS: {
      const {
        bodyPart,
        bodyCategory,
        bodySpecific,
        restrictions,
        manualJoint,
        manualMuscle,
        manualNerve,
        therex,
        movementQuality,
        movementTypes,
        movementTasks,
        cues,
        result,
      } = rest;

      const newCompletionStatus = {
        ...state.completionStatus,
        ...(!!bodyPart ? { bodyPart } : {}),
        ...(!!bodyCategory ? { bodyCategory } : {}),
        ...(!!bodySpecific ? { bodySpecific } : {}),
        ...(!!restrictions ? { restrictions } : {}),
        ...(!!manualJoint ? { manualJoint } : {}),
        ...(!!manualMuscle ? { manualMuscle } : {}),
        ...(!!manualNerve ? { manualNerve } : {}),
        ...(!!therex ? { therex } : {}),
        ...(!!movementQuality ? { movementQuality } : {}),
        ...(!!movementTypes ? { movementTypes } : {}),
        ...(!!movementTasks ? { movementTasks } : {}),
        ...(!!cues ? { cues } : {}),
        ...(!!result ? { result } : {}),
      };

      const isSelectionCompleted = getSelectionCompletedFromCompletionStatus(newCompletionStatus);

      const newState = {
        ...state,
        completionStatus: {
          ...newCompletionStatus,
        },
        ...(isSelectionCompleted ? { isSelectionCompleted } : {}),
      };

      return newState;
    }
    case ACTIONS.NOTES_HAVE_BEEN_GENERATED: {
      const { timestamp } = rest;
      const newState = {
        ...state,
        ...(!!timestamp ? { lastGeneratedNoteTimestamp: timestamp } : {}),
      };

      return newState;
    }
    case ACTIONS.UPDATE_MODAL_STATE: {
      const { modalState } = rest;
      const newState = {
        ...state,
        modalState: {
          // completely replace all prior configs
          ...modalState,
        },
      };

      return newState;
    }
    case ACTIONS.UPDATE_MODAL_VISIBILITY: {
      const { visibility } = rest;
      const { modalState: previousModalState } = state;
      const newState = {
        ...state,
        modalState: {
          ...previousModalState,
          isVisible: visibility,
        },
      };

      return newState;
    }
    case ACTIONS.UPDATE_OFFCANVAS_VISIBILITY: {
      const { visibility } = rest;
      const newState = {
        ...state,
        isOffCanvasVisible: visibility,
      };

      return newState;
    }
    case ACTIONS.TOGGLE_OFFCANVAS_VISIBILITY: {
      const { isOffCanvasVisible } = state;
      const newState = {
        ...state,
        isOffCanvasVisible: !isOffCanvasVisible,
      };

      return newState;
    }
    // BASE BODY SELECTION ACTIONS
    case ACTIONS.SET_BODY_SELECTION: {
      const { selectedBodyPart, selectedBodyCategory, selectedBodySpecific } = rest;
      const newState = {
        ...state,
        ...(!!selectedBodyPart ? { selectedBodyPart } : {}),
        ...(!!selectedBodyCategory ? { selectedBodyCategory } : {}),
        ...(!!selectedBodySpecific ? { selectedBodySpecific } : {}),
      };

      const collateralState = collateralStateUpdate(state, newState);

      return { ...newState, ...collateralState };
    }
    case ACTIONS.RESET_BODY_SELECTION: {
      const { isOffCanvasVisible, lastGeneratedNoteTimestamp, sidebarShow, activeTab } = state;
      const newState = {
        ...initialState,
        isOffCanvasVisible,
        lastGeneratedNoteTimestamp,
        sidebarShow,
        activeTab,
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
    // change active tab
    case ACTIONS.UPDATE_ACTIVE_NOTES_TAB: {
      const { activeTab } = rest;
      const newState = {
        ...state,
        activeTab: activeTab,
      };

      return newState;
    }

    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
