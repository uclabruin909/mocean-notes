import NotesService from '../../../../services/notesService';

// Restrictions section utils
export const getRestrictionsConfig = () => {
  return NotesService.getRestrictions();
};

export const getRestrictionCategories = () => {
  return NotesService.getRestrictionCategories();
};

export const getRestrictionSelectionRange = () => {
  const selectionConfigKey = 'restrictions';
  const { minSelection, maxSelection } = NotesService.getSelectionConfig(selectionConfigKey);

  return { minSelection, maxSelection };
};
