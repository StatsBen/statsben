import { globals } from "../globals";
import { parser } from "./parser";

const validator = {
  /* returns a boolean, true if valid, false if not */
  validateEntryAttrByName(entry, name) {
    let valid = true;

    // STUB

    return valid;
  },

  validateEntireEntry(entry) {
    let valid = true;

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

  validateValueByType(value, type) {
    let valid = true;

    if (value == null) return valid;

    if (type == "string") {
      try {
        valid = this.validateString(value);
      } catch (e) {
        console.error(`${value} isn't a valid value for type ${type}`);
        throw new Error("Validation Error");
      }
    } else if (type == "date") {
      try {
        valid = this.validateDate(value);
      } catch (e) {
        console.error(`${value} isn't a valid value for type ${type}`);
        throw new Error("Validation Error");
      }
    } else if (type == "commitmentGrade") {
      try {
        let g = parser.parseCommitmentGrade(value);
        valid = this.validateCommitmentGrade(g);
      } catch (e) {
        console.error(`${value} isn't a valid value for type ${type}`);
        throw new Error("Validation Error");
      }
    } else if (type == "distance") {
      try {
        let g = parser.parseDistance(value);
        valid = this.validateDistance(g);
      } catch (e) {
        console.error(`${value} isn't a valid value for type ${type}`);
        throw new Error("Validation Error");
      }
    } else if (type == "iceGrade") {
      try {
        let g = parser.parseIceGrade(value);
        valid = validator.validateIceGrade(g);
      } catch (e) {
        console.error(`${value} isn't a valid value for type ${type}`);
        throw new Error("Validation Error");
      }
    } else if (type == "ydsGrade") {
      try {
        let g = parser.parseYDSGrade(value);
        valid = validator.validateYDSGrade(g);
      } catch (e) {
        console.error(`${value} isn't a valid value for type ${type}`);
        throw new Error("Validation Error");
      }
    } else if (type == "scramblingGrade") {
      try {
        let g = parser.parseScramblingGrade(value);
        valid = validator.validateScramblingGrade(g);
      } catch (e) {
        console.error(`${value} isn't a valid value for type ${type}`);
        throw new Error("Validation Error");
      }
    } else if (type == "vert") {
      try {
        let g = parser.parseVert(value);
        valid = validator.validateVert(g);
      } catch (e) {
        console.error(`${value} isn't a valid value for type ${type}`);
        throw new Error("Validation Error");
      }
    } else {
      console.error(
        `Validator.validateValueByType didn't recognize the provided type: ${type}`
      );
      throw new Error("Error in Validate Value By Type");
    }

    return valid;
  },

  verifyAttributeExistsInEntryDefinition(attr) {
    // STUB
    return true;
  }
};

export { validator };
