import notesConfig from '../views/notes/config';

class NotesService {
  constructor(configs) {
    this._configs = configs;

    this._test = `hello 
    \ni am doing a test 
    \nline 3`;
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

export default new NotesService(notesConfig);
