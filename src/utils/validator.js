import { globals } from "../globals";
import { parser } from "./parser";

const validator = {
  validateEntireEntry(entry) {
    try {
      parser.parseEntireEntry(entry);
      return true;
    } catch (e) {
      console.error("Failed to validate entire entry!");
      console.error(e.message);
      return false;
    }
  },

  validateBoolean(input) {
    if (typeof input != "boolean") {
      console.error("Input was not of type boolean");
      return false;
    }
    return true;
  },

  validateDate(input) {
    try {
      parser.parseDate(input);
    } catch (e) {
      console.error(`"${input}" is not a valid date!`);
      return false;
    }
    return true;
  },

  validateNumber(input) {
    if (typeof input != "number") {
      console.error(`"${input}" is not a number!`);
      return false;
    }
    return true;
  },

  validateString(input) {
    if (typeof input != "string") {
      console.error(`"${input}" is not a string!`);
      return false;
    }
    return true;
  },

  validateAlpineGrade(grade) {
    let valid = true;
    try {
      parser.parseAlpineGrade(grade);
    } catch (e) {
      console.error("Validation Error!");
      console.error(
        "Tried to validate alpine grade, but it couldn't be parsed"
      );
      valid = false;
    }
    return valid;
  },

  validateCommitmentGrade(grade) {
    let valid = true;
    try {
      parser.parseCommitmentGrade(grade);
    } catch (e) {
      console.error("Validation Error!");
      console.error(
        "Tried to validate commitment grade, but input could not be parsed"
      );
      valid = false;
    }
    return valid;
  },

  validateDistance(dist) {
    let valid = true;
    try {
      parser.parseDistance(dist);
    } catch (e) {
      console.error("Validation Error!");
      console.error("Validation Error!");
      console.error(
        "Tried to validate distance, but input could not be parsed"
      );
      valid = false;
    }
    return valid;
  },

  validateIceGrade(grade) {
    let valid = true;
    try {
      parser.parseIceGrade(grade);
    } catch (e) {
      console.error("Validation Error!");
      console.error(
        "Tried to validate ice grade, but input could not be parsed"
      );
      valid = false;
    }
    return valid;
  },

  validateYDSGrade(grade) {
    let valid = true;
    try {
      parser.parseYDS(grade);
    } catch (e) {
      console.error("Validation Error!");
      console.error(
        "Tried to validate YDS grade, but input could not be parsed"
      );
      valid = false;
    }
    return valid;
  },

  validateScramblingGrade(grade) {
    let valid = true;
    try {
      parser.parseScramblingGrade(grade);
    } catch (e) {
      console.error("Validation Error!");
      console.error(
        "Tried to validate scrambling grade, but input could not be parsed"
      );
      valid = false;
    }
    return valid;
  },

  validateVert(vert) {
    let valid = true;
    try {
      parser.parseVert(vert);
    } catch (e) {
      console.error("Validation Error!");
      console.error("Tried to validate vert, but input could not be parsed");
      valid = false;
    }
    return valid;
  },

  validateEntryAttrByName(value, type) {
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

  verifyAttributeExistsInEntryDefinition(attrToCheck) {
    let valid = false;
    globals.entryDefinition.attributes.map(attr => {
      if (attr.name == attrToCheck) valid = true;
    });
    return valid;
  }
};

export { validator };
