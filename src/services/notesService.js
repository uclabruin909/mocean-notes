import BodyConfigService from './bodyConfigService';
import StoreService from './storeService';
import {
  getRandomInteger,
  joinWordsWithFinalChar,
} from 'src/views/notes/components/sections/utils';

class NotesServiceClass {
  constructor() {
    this._previouslyConstructedNotes = null;
  }

  generateDailyNotesText() {
    try {
      const bodyPartText = this.getBodyPartText();
      const manualActionText = this.getManualText();
      const therexPurposeText = this.getTherexPurposeText();
      const movementText = this.getMovementText();
      const cuesText = this.getCuesText();
      const resultsText = this.getResultsText();

      const result = `
      ${bodyPartText} 

      ${manualActionText}

      ${therexPurposeText}
  
      ${movementText}

      ${cuesText}
      
      ${resultsText}        
      `;

      const formatedResult = result
        .split('\n')
        .map((line) => line.trim())
        .join('\n');

      this._previouslyConstructedNotes = formatedResult;

      return this._previouslyConstructedNotes;
    } catch (error) {
      console.error('Error while constructing daily notes:', error);
    }
  }

  // 1st line: Body Part
  getBodyPartText() {
    const selectedRestriction = StoreService.getSelectedRestriction();
    const { selectedBodyPart, selectedBodyCategory, selectedBodySpecific } =
      StoreService.getSelectedBodyParts();

    const formattedRestriction = joinWordsWithFinalChar(selectedRestriction);
    const formattedBodyPart = selectedBodyPart.replace('_', ' ');
    const formattedBodyCategory = selectedBodyCategory.replace('_', ' ');
    console.log('selectedRestriction', selectedRestriction);

    const bodyPart = `${selectedBodySpecific} (${formattedBodyPart} ${formattedBodyCategory})`;
    const text = `Patient present with ${bodyPart} ${formattedRestriction}.`;
    console.log('text:', text);

    return text;
  }

  // 2nd line: Manual
  getManualText() {
    const { selectedManualJoint, selectedManualMuscle, selectedManualNerve } =
      StoreService.getSelectedManualActions();
    const manualJointTextList = selectedManualJoint.map((manualJoint) => {
      return BodyConfigService.getManualJointActionText(manualJoint);
    });
    const manualMuscleTextList = selectedManualMuscle.map((manualMuscle) => {
      return BodyConfigService.getManualMuscleActionText(manualMuscle);
    });
    const manualNerveTextList = selectedManualNerve.map((manualNerve) => {
      return BodyConfigService.getManualNerveActionText(manualNerve);
    });

    const selectedManualActions = [
      ...selectedManualJoint,
      ...selectedManualMuscle,
      ...selectedManualNerve,
    ];
    const manualActionTexts = [
      ...manualJointTextList,
      ...manualMuscleTextList,
      ...manualNerveTextList,
    ];
    const formattedManualActions = joinWordsWithFinalChar(selectedManualActions);
    const formattedManualTexts = joinWordsWithFinalChar(manualActionTexts);
    console.log('selectedManualActions:', selectedManualActions);
    console.log('manualActionTexts:', manualActionTexts);
    const text = `PT performed ${formattedManualActions} ${formattedManualTexts}.`;
    console.log('text:', text);

    return text;
  }

  // 3nd line: Therex Purposes
  getTherexPurposeText() {
    const selectedTherexPurposes = StoreService.getSelectedTherexPurposes();
    const formattedTherexPurposes = joinWordsWithFinalChar(selectedTherexPurposes);
    const text = `The patient performed therapeutic exercises and neuro re-training activities to enhance ${formattedTherexPurposes}.`;

    console.log('therex text:', text);
    return text;
  }

  // 4th line: Movement
  getMovementText() {
    const { selectedMovementQuality, selectedMovementType, selectedMovementTasks } =
      StoreService.getSelectedMovements();
    const formattedQualityText = joinWordsWithFinalChar(selectedMovementQuality);
    const formattedTypeText = joinWordsWithFinalChar(selectedMovementType);
    const formattedTasksText = joinWordsWithFinalChar(selectedMovementTasks);
    const text = `The patient demonstrated ${formattedQualityText} ${formattedTypeText} during ${formattedTasksText}.`;

    console.log('movement text:', text);
    return text;
  }

  // 5th line: Cues
  getCuesText() {
    const selectedCues = StoreService.getSelectedCues();
    const selectedTherexPurposes = StoreService.getSelectedTherexPurposes();
    // randomly select 1 of the therex purposes
    const randomTherexIndex = getRandomInteger(0, selectedTherexPurposes.length - 1);

    const formatedCuesText = joinWordsWithFinalChar(selectedCues);
    const selectedPurposeText = selectedTherexPurposes[randomTherexIndex];
    const text = `PT provided ${formatedCuesText} to facilitate ${selectedPurposeText}.`;

    console.log('Cues text:', text);
    return text;
  }

  // 6th line: Result
  getResultsText() {
    const selectedResults = StoreService.getSelectedResults();
    const resultsTextList = selectedResults.map((resultName) => {
      return BodyConfigService.getResultText(resultName);
    });
    const formatedResultsText = joinWordsWithFinalChar(resultsTextList);
    const text = `Following the session ${formatedResultsText}.`;

    console.log('Results text:', text);
    return text;
  }
}

const NotesService = new NotesServiceClass();
export default NotesService;
