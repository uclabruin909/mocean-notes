import NotesService from '../../../../services/notesService';

export const standardizeWord = (word) => {
  return NotesService.standardizeWord(word);
};

//Generic config utils
export const getConfigByKey = (configKey) => {
  return NotesService.getConfigByKey(configKey);
};

export const getSelectionRangeByKey = (selectionConfigKey) => {
  const { minSelection, maxSelection } = NotesService.getSelectionConfig(selectionConfigKey);

  return { minSelection, maxSelection };
};

// Restrictions section utils
export const getRestrictionsConfig = () => {
  return NotesService.getRestrictions();
};

export const getRestrictionCategories = () => {
  return NotesService.getRestrictionCategories();
};

export const getRestrictionSelectionRange = () => {
  const selectionConfigKey = 'restrictions';

  return getSelectionRangeByKey(selectionConfigKey);
};

// Movement section utils
const MOVEMENT_CONFIG_KEY = 'movement';

export const getMovementConfig = () => {
  return getConfigByKey(MOVEMENT_CONFIG_KEY);
};

// by 'quality', 'types', 'tasks'
export const getSelectionRangeByMovementCategory = (movementCategory) => {
  const movementSelectionRangeConfig = NotesService.getSelectionConfig(MOVEMENT_CONFIG_KEY);

  return movementSelectionRangeConfig[movementCategory] || {};
};
