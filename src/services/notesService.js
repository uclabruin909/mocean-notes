import notesConfig from '../views/notes/config';

class NotesService {
  constructor(configs) {
    this._configs = configs;
  }

  getBodyParts() {
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
}

export default new NotesService(notesConfig);
