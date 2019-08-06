import { globals } from "../globals";

const validator = {
  /* returns a boolean, true if valid, false if not */
  validateEntryAttrByName(entry, name) {
    let valid = true;

    // STUB

    return valid;
  },

  validateEntireEntry(entry) {
    let valid = false;

    //STUB

    return valid;
  },

  validateBoolean(input) {
    let valid = true;
    if (typeof input != "boolean") {
      valid = false;
    }
    return valid;
  },

  validateDate(input) {
    let valid = true;
    try {
      // eslint-disable-next-line
      let testDate = new Date(input);
    } catch (e) {
      valid = false;
    }
    return valid;
  },

  validateNumber(input) {
    let valid = true;
    if (typeof input != "number") {
      valid = false;
    }
    return valid;
  },

  validateString(input) {
    let valid = true;
    if (typeof input != "string") {
      valid = false;
    }
    return valid;
  },

  validateCommitmentGrade(grade) {
    let valid = true;

    //STUB

    return valid;
  },

  validateDistance(dist) {
    let valid = true;

    //STUB

    return valid;
  },

  validateIceGrade(grade) {
    let valid = true;

    //STUB

    return valid;
  },

  validateYDSGrade(grade) {
    let valid = true;

    //STUB

    return valid;
  },

  validateScramblingGrade(grade) {
    let valid = true;

    //STUB

    return valid;
  },

  validateVert(vert) {
    let valid = true;

    //STUB

    return valid;
  },

  verifyAttributeExistsInEntryDefinition(attr) {
    // STUB
    return true;
  }
};

export { validator };
