import BodyConfigService from 'src/services/bodyConfigService';

export const standardizeWord = (string) => {
  if (!string) {
    return '';
  }

  return string
    .split('_')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

// ['tom', 'dick', 'harry'] => "tom, dick and harry"
export const joinWordsWithFinalChar = (wordList = [], finalJoinChar = ' and $1') => {
  return wordList.join(', ').replace(/, ([^,]*)$/, finalJoinChar);
};

export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Generic config utils
export const getConfigByKey = (configKey) => {
  return BodyConfigService.getConfigByKey(configKey);
};

export const getSelectionRangeByKey = (selectionConfigKey) => {
  const { minSelection, maxSelection } = BodyConfigService.getSelectionConfig(selectionConfigKey);

  return { minSelection, maxSelection };
};

// Restrictions section utils
export const getRestrictionsConfig = () => {
  return BodyConfigService.getRestrictions();
};

export const getRestrictionCategories = () => {
  return BodyConfigService.getRestrictionCategories();
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
  const movementSelectionRangeConfig = BodyConfigService.getSelectionConfig(MOVEMENT_CONFIG_KEY);

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
