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

// Therex purpose utils
const THEREX_PURPOSE_CONFIG_KEY = 'therex';

export const getTherexPuposeConfig = () => {
  return getConfigByKey(THEREX_PURPOSE_CONFIG_KEY);
};

export const getTherexPuposeSelectionRange = () => {
  return getSelectionRangeByKey(THEREX_PURPOSE_CONFIG_KEY);
};

// Cues utils
const CUES_CONFIG_KEY = 'cues';

export const getCueOptions = () => {
  return getConfigByKey(CUES_CONFIG_KEY);
};

export const getCueSelectionRange = () => {
  return getSelectionRangeByKey(CUES_CONFIG_KEY);
};

// Results utils
const RESULT_CONFIG_KEY = 'result';

export const getResultOptions = () => {
  const resultsItemList = getConfigByKey(RESULT_CONFIG_KEY) || [];
  return resultsItemList.map((resultItem) => resultItem.name);
};

export const getResultSelectionRange = () => {
  return getSelectionRangeByKey(RESULT_CONFIG_KEY);
};
