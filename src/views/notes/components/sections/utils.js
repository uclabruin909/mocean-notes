import NotesService from '../../../../services/notesService';

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
