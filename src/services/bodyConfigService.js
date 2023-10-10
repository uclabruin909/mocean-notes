import BodyConfig from 'src/configs/body-config';

class BodyConfigServiceClass {
  constructor(configs) {
    this._configs = configs;
  }

  getConfigByKey(configKey) {
    return this._configs[configKey] || {};
  }

  getSelectionConfig(selectionKey) {
    const { selectionConfig } = this._configs;

    return selectionConfig[selectionKey] || {};
  }

  getBodyParts() {
    if (window.document) window.navigator.clipboard.writeText(this._test);
    const { bodyPart: bodyPartConfig } = this._configs;

    return Object.keys(bodyPartConfig) || [];
  }

  getBodyPartCategories(bodyPartName) {
    const { bodyPart: bodyPartConfig } = this._configs;
    const bodyPartObject = bodyPartConfig[bodyPartName];

    return Object.keys(bodyPartObject);
  }

  getBodyPartSpecifics(bodyPartName, bodyPartCategory) {
    const { bodyPart: bodyPartConfig } = this._configs;

    return bodyPartConfig[bodyPartName][bodyPartCategory] || [];
  }

  getRestrictions() {
    return this._configs.restrictions;
  }

  getRestrictionCategories() {
    return Object.keys(this.getRestrictions());
  }

  // manual related functions
  getManualJointActionText(actionName) {
    const configKey = 'manualJoint';
    const manualActions = this.getConfigByKey(configKey);
    const foundAction = manualActions.find((action) => action.name === actionName);

    return foundAction ? foundAction['text'] : '';
  }

  getManualMuscleActionText(actionName) {
    const configKey = 'manualMuscle';
    const manualActions = this.getConfigByKey(configKey);
    const foundAction = manualActions.find((action) => action.name === actionName);

    return foundAction ? foundAction['text'] : '';
  }

  getManualNerveActionText(actionName) {
    const configKey = 'manualNerve';
    const manualActions = this.getConfigByKey(configKey);
    const foundAction = manualActions.find((action) => action.name === actionName);

    return foundAction ? foundAction['text'] : '';
  }

  getResultText(resultName) {
    const configKey = 'result';
    const resultsOptions = this.getConfigByKey(configKey);
    const foundAction = resultsOptions.find((action) => action.name === resultName);

    return foundAction ? foundAction['text'] : '';
  }
}

const BodyConfigService = new BodyConfigServiceClass(BodyConfig);
export default BodyConfigService;
