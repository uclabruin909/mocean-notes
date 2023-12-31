import {
  getRandomInteger,
  joinWordsWithFinalChar,
} from 'src/views/notes/components/sections/utils';
import { AUTO_SELECTION_COMPLETE } from 'src/constants/actions';

import StoreService from './storeService';
import BodyConfigService from './bodyConfigService';

const selectionKeyMap = {
  bodyPart: 'selectedBodyPart',
  bodyCategory: 'selectedBodyCategory',
  bodySpecific: 'selectedBodySpecific',
  restrictions: 'selectedRestriction',
  manualJoint: 'selectedManualJoint',
  manualMuscle: 'selectedManualMuscle',
  manualNerve: 'selectedManualNerve',
  therex: 'selectedTherexPurposes',
  movementQuality: 'selectedMovementQuality',
  movementTypes: 'selectedMovementType',
  movementTasks: 'selectedMovementTasks',
  cues: 'selectedCues',
  result: 'selectedResults',
};

class SelectionServiceClass {
  constructor() {
    this._selectionOrder = [
      this.autoSelectBodyPart.bind(this),
      this.autoSelectBodyCategory.bind(this),
      this.autoSelectBodySpecific.bind(this),
      this.autoSelectRestrictions.bind(this),
      this.autoSelectManualJointActions.bind(this),
      this.autoSelectManualMuscleActions.bind(this),
      this.autoSelectManualNerveActions.bind(this),
      this.autoSelectTherexPurpose.bind(this),
      this.autoSelectMovementQuality.bind(this),
      this.autoSelectMovementTypes.bind(this),
      this.autoSelectMovementTasks.bind(this),
      this.autoSelectCues.bind(this),
      this.autoSelectResults.bind(this),
    ];
  }

  // function to auto-select any non-completed selections
  autoSelectMain(dispatchAction = false) {
    try {
      let newSelectionState = {};

      this._selectionOrder.forEach((autoSelectFunc) => {
        const newChunkState = autoSelectFunc(newSelectionState);
        newSelectionState = { ...newSelectionState, ...newChunkState };
      });

      if (dispatchAction) {
        StoreService.dispatchAction({
          type: AUTO_SELECTION_COMPLETE,
          ...newSelectionState,
        });
      }

      return newSelectionState;
    } catch (error) {
      console.log('Error while auto selecting');
    }
  }

  autoSelectBodyPart() {
    const key = 'bodyPart';
    const { completed, selection, selectionKey } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {};

    if (completed) {
      baseSelectionState[selectionKey] = selection;

      return baseSelectionState;
    }

    // if not completed, get list of options
    const bodyPartsList = BodyConfigService.getBodyParts() || [];
    const randomIndex = getRandomInteger(0, bodyPartsList.length - 1);
    const autoSelection = bodyPartsList[randomIndex];

    baseSelectionState[selectionKey] = autoSelection;

    return baseSelectionState;
  }

  autoSelectBodyCategory(stateOverride) {
    const key = 'bodyCategory';
    const { completed, selection, selectionKey } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = selection;

      return baseSelectionState;
    }

    // if not completed, get list of options.  based on current selectedBodyPart
    const { selectedBodyPart } = stateOverride || StoreService.getSelectedBodyParts();

    if (!selectedBodyPart) {
      console.error('selectedBodyPart needs to be completed');
      return {};
    }
    const categoriesForBodyPart = BodyConfigService.getBodyPartCategories(selectedBodyPart);
    const randomIndex = getRandomInteger(0, categoriesForBodyPart.length - 1);
    const autoSelection = categoriesForBodyPart[randomIndex];

    baseSelectionState[selectionKey] = autoSelection;

    return baseSelectionState;
  }

  // requires selected bodyPart and bodyCategory
  autoSelectBodySpecific(stateOverride) {
    const key = 'bodySpecific';
    const { completed, selection, selectionKey } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = selection;

      return baseSelectionState;
    }

    // if not completed, get list of options.  based on current selectedBodyPart amd selectedBodyCategory
    const { selectedBodyPart, selectedBodyCategory } = {
      ...StoreService.getSelectedBodyParts(),
      ...baseSelectionState,
    };
    if (!selectedBodyPart || !selectedBodyCategory) {
      console.error('selectedBodyPart and selectedBodyCategory needs to be completed');
      return {};
    }

    const specificsForBodyPart = BodyConfigService.getBodyPartSpecifics(
      selectedBodyPart,
      selectedBodyCategory,
    );
    const randomIndex = getRandomInteger(0, specificsForBodyPart.length - 1);
    const autoSelection = specificsForBodyPart[randomIndex];

    baseSelectionState[selectionKey] = autoSelection;

    return baseSelectionState;
  }

  // based on bodycategory
  autoSelectRestrictions(stateOverride) {
    const key = 'restrictions';
    const {
      completed,
      selection: selectionArray,
      selectionKey,
      remaining,
    } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = [...selectionArray];

      return baseSelectionState;
    }

    // if not completed, get list of options.  based on current selectedBodyCategory
    const { selectedBodyCategory } = {
      ...StoreService.getSelectedBodyParts(),
      ...baseSelectionState,
    };
    if (!selectedBodyCategory) {
      console.error('selectedBodyCategory needs to be completed');
      return {};
    }

    const restrictionsConfig = BodyConfigService.getConfigByKey(key);
    // filter out selections that may already be selected
    const restrictionsList = restrictionsConfig[selectedBodyCategory].filter((item) => {
      return !selectionArray.includes(item);
    });
    const randomIndexes = [];

    while (randomIndexes.length < remaining) {
      const randomIndex = getRandomInteger(0, restrictionsList.length - 1);
      // if already selected, then re-try
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      } else {
        continue;
      }
    }

    const autoSelections = randomIndexes.map((index) => {
      return restrictionsList[index];
    });

    baseSelectionState[selectionKey] = autoSelections;

    return baseSelectionState;
  }

  autoSelectManualJointActions(stateOverride) {
    const key = 'manualJoint';
    const {
      completed,
      selection: selectionArray,
      selectionKey,
      remaining,
    } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = [...selectionArray];

      return baseSelectionState;
    }

    const manualJointActions = BodyConfigService.getConfigByKey(key).map(
      (actionItem) => actionItem.name,
    );
    // filter out selections that may already be selected
    const filteredActions = manualJointActions.filter((item) => {
      return !selectionArray.includes(item);
    });
    const randomIndexes = [];

    while (randomIndexes.length < remaining) {
      const randomIndex = getRandomInteger(0, filteredActions.length - 1);
      // if already selected, then re-try
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      } else {
        continue;
      }
    }

    const autoSelections = randomIndexes.map((index) => {
      return filteredActions[index];
    });

    baseSelectionState[selectionKey] = autoSelections;

    return baseSelectionState;
  }

  autoSelectManualMuscleActions(stateOverride) {
    const key = 'manualMuscle';
    const {
      completed,
      selection: selectionArray,
      selectionKey,
      remaining,
    } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = [...selectionArray];

      return baseSelectionState;
    }

    const manualMuscleActions = BodyConfigService.getConfigByKey(key).map(
      (actionItem) => actionItem.name,
    );
    // filter out selections that may already be selected
    const filteredActions = manualMuscleActions.filter((item) => {
      return !selectionArray.includes(item);
    });
    const randomIndexes = [];

    while (randomIndexes.length < remaining) {
      const randomIndex = getRandomInteger(0, filteredActions.length - 1);
      // if already selected, then re-try
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      } else {
        continue;
      }
    }

    const autoSelections = randomIndexes.map((index) => {
      return filteredActions[index];
    });

    baseSelectionState[selectionKey] = autoSelections;

    return baseSelectionState;
  }

  autoSelectManualNerveActions(stateOverride) {
    const key = 'manualNerve';
    const {
      completed,
      selection: selectionArray,
      selectionKey,
      remaining,
    } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = [...selectionArray];

      return baseSelectionState;
    }

    const manualNerveActions = BodyConfigService.getConfigByKey(key).map(
      (actionItem) => actionItem.name,
    );
    // filter out selections that may already be selected
    const filteredActions = manualNerveActions.filter((item) => {
      return !selectionArray.includes(item);
    });
    const randomIndexes = [];

    while (randomIndexes.length < remaining) {
      const randomIndex = getRandomInteger(0, filteredActions.length - 1);
      // if already selected, then re-try
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      } else {
        continue;
      }
    }

    const autoSelections = randomIndexes.map((index) => {
      return filteredActions[index];
    });

    baseSelectionState[selectionKey] = autoSelections;

    return baseSelectionState;
  }

  autoSelectTherexPurpose(stateOverride) {
    const key = 'therex';
    const {
      completed,
      selection: selectionArray,
      selectionKey,
      remaining,
    } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = [...selectionArray];

      return baseSelectionState;
    }

    // if not completed, get list of options.  based on current selected body part
    const { selectedBodyPart } = {
      ...StoreService.getSelectedBodyParts(),
      ...baseSelectionState,
    };
    if (!selectedBodyPart) {
      console.error('selectedBodyCategory needs to be completed');
      return {};
    }

    const therexConfig = BodyConfigService.getConfigByKey(key);
    // filter out selections that may already be selected
    const therexList = therexConfig[selectedBodyPart].filter((item) => {
      return !selectionArray.includes(item);
    });
    const randomIndexes = [];

    while (randomIndexes.length < remaining) {
      const randomIndex = getRandomInteger(0, therexList.length - 1);
      // if already selected, then re-try
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      } else {
        continue;
      }
    }

    const autoSelections = randomIndexes.map((index) => {
      return therexList[index];
    });

    baseSelectionState[selectionKey] = autoSelections;

    return baseSelectionState;
  }

  autoSelectMovementQuality(stateOverride) {
    const key = 'movementQuality';
    const {
      completed,
      selection: selectionArray,
      selectionKey,
      remaining,
    } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = [...selectionArray];

      return baseSelectionState;
    }

    // if not completed, get list of options.  based on current selected body part
    const { selectedBodyPart } = {
      ...StoreService.getSelectedBodyParts(),
      ...baseSelectionState,
    };
    if (!selectedBodyPart) {
      console.error('selectedBodyCategory needs to be completed');
      return {};
    }

    const configKey = 'movement';
    const subType = 'quality';
    const movementConfig = BodyConfigService.getConfigByKey(configKey);
    // filter out selections that may already be selected
    const movementQualityList = movementConfig[selectedBodyPart][subType].filter((item) => {
      return !selectionArray.includes(item);
    });
    const randomIndexes = [];

    while (randomIndexes.length < remaining) {
      const randomIndex = getRandomInteger(0, movementQualityList.length - 1);
      // if already selected, then re-try
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      } else {
        continue;
      }
    }

    const autoSelections = randomIndexes.map((index) => {
      return movementQualityList[index];
    });

    baseSelectionState[selectionKey] = autoSelections;

    return baseSelectionState;
  }

  autoSelectMovementTypes(stateOverride) {
    const key = 'movementTypes';
    const {
      completed,
      selection: selectionArray,
      selectionKey,
      remaining,
    } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = [...selectionArray];

      return baseSelectionState;
    }

    // if not completed, get list of options.  based on current selected body part
    const { selectedBodyPart } = {
      ...StoreService.getSelectedBodyParts(),
      ...baseSelectionState,
    };
    if (!selectedBodyPart) {
      console.error('selectedBodyCategory needs to be completed');
      return {};
    }

    const configKey = 'movement';
    const subType = 'types';
    const movementConfig = BodyConfigService.getConfigByKey(configKey);
    // filter out selections that may already be selected
    const movementTypesList = movementConfig[selectedBodyPart][subType].filter((item) => {
      return !selectionArray.includes(item);
    });
    const randomIndexes = [];

    while (randomIndexes.length < remaining) {
      const randomIndex = getRandomInteger(0, movementTypesList.length - 1);
      // if already selected, then re-try
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      } else {
        continue;
      }
    }

    const autoSelections = randomIndexes.map((index) => {
      return movementTypesList[index];
    });

    baseSelectionState[selectionKey] = autoSelections;

    return baseSelectionState;
  }

  autoSelectMovementTasks(stateOverride) {
    const key = 'movementTasks';
    const {
      completed,
      selection: selectionArray,
      selectionKey,
      remaining,
    } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = [...selectionArray];

      return baseSelectionState;
    }

    // if not completed, get list of options.  based on current selected body part
    const { selectedBodyPart } = {
      ...StoreService.getSelectedBodyParts(),
      ...baseSelectionState,
    };
    if (!selectedBodyPart) {
      console.error('selectedBodyCategory needs to be completed');
      return {};
    }

    const configKey = 'movement';
    const subType = 'tasks';
    const movementConfig = BodyConfigService.getConfigByKey(configKey);
    // filter out selections that may already be selected
    const movementTasksList = movementConfig[selectedBodyPart][subType].filter((item) => {
      return !selectionArray.includes(item);
    });
    const randomIndexes = [];

    while (randomIndexes.length < remaining) {
      const randomIndex = getRandomInteger(0, movementTasksList.length - 1);
      // if already selected, then re-try
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      } else {
        continue;
      }
    }

    const autoSelections = randomIndexes.map((index) => {
      return movementTasksList[index];
    });

    baseSelectionState[selectionKey] = autoSelections;

    return baseSelectionState;
  }

  autoSelectCues(stateOverride) {
    const key = 'cues';
    const {
      completed,
      selection: selectionArray,
      selectionKey,
      remaining,
    } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = [...selectionArray];

      return baseSelectionState;
    }

    const cuesList = BodyConfigService.getConfigByKey(key);
    // filter out selections that may already be selected
    const filteredCues = cuesList.filter((item) => {
      return !selectionArray.includes(item);
    });
    const randomIndexes = [];

    while (randomIndexes.length < remaining) {
      const randomIndex = getRandomInteger(0, filteredCues.length - 1);
      // if already selected, then re-try
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      } else {
        continue;
      }
    }

    const autoSelections = randomIndexes.map((index) => {
      return filteredCues[index];
    });

    baseSelectionState[selectionKey] = autoSelections;

    return baseSelectionState;
  }

  autoSelectResults(stateOverride) {
    const key = 'result';
    const {
      completed,
      selection: selectionArray,
      selectionKey,
      remaining,
    } = this.getCompletionStatusByKey(key);
    const baseSelectionState = {
      ...(!!stateOverride ? { ...stateOverride } : {}),
    };

    if (completed) {
      baseSelectionState[selectionKey] = [...selectionArray];

      return baseSelectionState;
    }

    const resultList = BodyConfigService.getConfigByKey(key).map((item) => item.name);
    // filter out selections that may already be selected
    const filteredResults = resultList.filter((item) => {
      return !selectionArray.includes(item);
    });
    const randomIndexes = [];

    while (randomIndexes.length < remaining) {
      const randomIndex = getRandomInteger(0, filteredResults.length - 1);
      // if already selected, then re-try
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      } else {
        continue;
      }
    }

    const autoSelections = randomIndexes.map((index) => {
      return filteredResults[index];
    });

    baseSelectionState[selectionKey] = autoSelections;

    return baseSelectionState;
  }

  // key = 'bodyPart', 'bodyCategory', etc
  getCompletionStatusByKey(key) {
    const isInitialBodySelection =
      key === 'bodyPart' || key === 'bodyCategory' || key === 'bodySpecific';
    const selectionKey = selectionKeyMap[key];

    if (!selectionKey) {
      console.error('unable to get selectionKey using key:', key);
      return;
    }

    let selectedItems = [];
    const selection = StoreService.getState()[selectionKey];
    if (isInitialBodySelection && selection) {
      selectedItems = [selection];
    } else if (!isInitialBodySelection && Array.isArray(selection)) {
      selectedItems = [...selection];
    }

    const itemCount = selectedItems.length;
    const { minSelection } = BodyConfigService.getSelectionConfig(key);

    const remaining = itemCount < minSelection ? minSelection - itemCount : 0;
    const completed = remaining === 0 ? true : false;

    return { completed, remaining, selection, selectionKey };
  }

  constructCompletionStatusMap() {
    const completionStatusMap = Object.keys(selectionKeyMap).reduce((map, itemKey) => {
      const { completed } = this.getCompletionStatusByKey(itemKey);
      map[itemKey] = completed;

      return map;
    }, {});

    return completionStatusMap;
  }
}

const SelectionService = new SelectionServiceClass();
export default SelectionService;
