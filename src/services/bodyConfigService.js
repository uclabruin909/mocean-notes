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
}

const BodyConfigService = new BodyConfigServiceClass(BodyConfig);
export default BodyConfigService;
