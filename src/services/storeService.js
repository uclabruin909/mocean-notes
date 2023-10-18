import store from 'src/store';
import { UPDATE_ACTIVE_NOTES_TAB } from 'src/constants/actions';

class StoreServiceClass {
  getState() {
    return store.getState() || {};
  }

  dispatchAction(actionObj) {
    store.dispatch(actionObj);
  }

  updateActiveNotesTab(tabNum) {
    this.dispatchAction({ type: UPDATE_ACTIVE_NOTES_TAB, activeTab: tabNum });
  }

  getSelectedBodyParts() {
    const { selectedBodyPart, selectedBodyCategory, selectedBodySpecific } = this.getState();
    return { selectedBodyPart, selectedBodyCategory, selectedBodySpecific };
  }

  getSelectedRestriction() {
    const { selectedRestriction = [] } = this.getState();
    return selectedRestriction;
  }

  getSelectedManualActions() {
    const { selectedManualJoint, selectedManualMuscle, selectedManualNerve } = this.getState();
    return { selectedManualJoint, selectedManualMuscle, selectedManualNerve };
  }

  getSelectedMovements() {
    const { selectedMovementQuality, selectedMovementType, selectedMovementTasks } =
      this.getState();
    return { selectedMovementQuality, selectedMovementType, selectedMovementTasks };
  }

  getSelectedTherexPurposes() {
    const { selectedTherexPurposes = [] } = this.getState();
    return selectedTherexPurposes;
  }

  getSelectedCues() {
    const { selectedCues = [] } = this.getState();
    return selectedCues;
  }

  getSelectedResults() {
    const { selectedResults = [] } = this.getState();
    return selectedResults;
  }
}

const StoreService = new StoreServiceClass();
export default StoreService;
