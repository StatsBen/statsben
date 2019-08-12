import { globals } from "../globals";

const parser = {
  poopError(methodName, input, extraMessage, error) {
    console.error("Error in parser." + methodName + "!");
    console.error("couldn't parse input '" + input + "'");
    if (extraMessage) console.error(extraMessage);
    if (error) throw error;
  },

  parseAlpineGrade(raw) {
    if (raw === "" || raw == null) return raw; // Empty things are fine :)

    const e = new Error("Failed to parse alpine grade");
    const alpRegExp = /(F|PD|AD|D)[+-]?$/;

    if (typeof raw == "string") {
      if (alpRegExp.test(raw)) {
        try {
          let ag = raw.match(alpRegExp)[0];
          return ag;
        } catch (e) {
          this.poopError("parseAlpineGrade", raw, null, e);
        }
      } else {
        this.poopError("parseAlpineGrade", raw, "not an alpine grade", e);
      }
    } else {
      this.poopError("parseAlpineGrade", raw, "unrecognized type", e);
    }
  },

  parseBoolean(raw) {
    if (raw === "" || raw == null) return false;

    if (typeof raw == "boolean") {
      return raw;
    } else if (typeof raw == "string") {
      if (raw.includes("true")) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  parseDate(raw) {
    if (raw == "" || raw == null) return raw; // Empty things are fine :)

    let rawJSDate = null;
    try {
      rawJSDate = raw.toDate(); // this'll make a JS date from a Firestore timestamp!
      return raw;
    } catch (e) {
      console.log("not a Firestore Timestamp, turns out...");
      rawJSDate = raw;
    }

    try {
      if (rawJSDate instanceof Date) return rawJSDate;

      let test = new Date(rawJSDate);

      if (test == "Invalid Date") {
        let e = new Error("Failed to parse Date");
        this.poopError("parseDate", raw, null, e);
      } else {
        return test;
      }
    } catch (e) {
      this.poopError("parseDate", raw, null, e);
    }
  },

  parseCommitmentGrade(raw) {
    if (raw === "" || raw == null) return raw; // Empty things are fine :)

    const e = new Error("Couldn't parse commitment grade.");
    const gradeRegExp = /(?<![VI])(IV|V|VI|I+)$/;
    const numRegExp = /\d+/g;

    if (typeof raw == "number") {
      if (raw < 1) {
        this.poopError("parseCommitmentGrade", raw, "Too small!", e);
      } else if (raw > 6) {
        this.poopError("parseCommitmentGrade", raw, "Too big!", e);
      } else {
        return raw;
      }
    } else if (typeof raw == "string") {
      if (gradeRegExp.test(raw)) {
        try {
          let gradeTxt = raw.match(gradeRegExp)[0];
          let grade = null;
          if (gradeTxt == "I") grade = 1;
          else if (gradeTxt == "II") grade = 2;
          else if (gradeTxt == "III") grade = 3;
          else if (gradeTxt == "IIII") grade = 4;
          else if (gradeTxt == "IV") grade = 4;
          else if (gradeTxt == "V") grade = 5;
          else if (gradeTxt == "VI") grade = 6;
          if (grade != null && grade > 0 && grade <= 6) {
            return grade;
          } else {
            this.poopError("parseCommitmentGrade", raw, null, e);
          }
        } catch (e) {
          this.poopError("parseCommitmentGrade", raw, null, e);
        }
      } else if (numRegExp.test(numRegExp)) {
        try {
          let gradeTxt = raw.match(gradeRegExp)[0];
          let grade = parseInt(gradeTxt);
          if (grade > 0 && grade <= 6) {
            return grade;
          } else {
            this.poopError("parseCommitmentGrade", raw, null, e);
          }
        } catch (e) {
          this.poopError("parseCommitmentGrade", raw, null, e);
        }
      } else {
        this.poopError("parseCommitmentGrade", raw, null, e);
      }
    } else {
      this.poopError("parseCommitmentGrade", raw, "unrecognized input type", e);
    }
  },

  parseDistance(raw) {
    if (raw === "" || raw == null) return raw; // Empty things are fine :)

    const e = new Error("Couldn't parse distance");
    var dKmRegExp = /[0-9]+km/;
    var dMiRegExp = /[0-9]+mi/;

    if (typeof raw == "number") {
      if (raw > 0) {
        return raw;
      } else {
        this.poopError("parseDistance", raw, "no negative distances!", e);
      }
    } else if (typeof raw == "string") {
      if (dKmRegExp.test(raw)) {
        try {
          let distStr = raw.match(dKmRegExp)[0];
          let distSubStr = distStr.substring(0, distStr.indexOf("km"));
          let dist = parseInt(distSubStr);
          if (dist > 0) {
            return dist;
          } else {
            this.poopError("parseDistance", raw, "no negative distances!", e);
          }
        } catch (e) {
          this.poopError("parseDistance", raw, null, e);
        }
      } else if (dMiRegExp.test(raw)) {
        try {
          let rawDist = raw.match(dMiRegExp)[0];
          var slicedDist = rawDist.substring(0, rawDist.indexOf("mi"));
          var convertedDist = Math.round(parseInt(slicedDist) * 1.60934);
          if (convertedDist > 0) {
            return convertedDist;
          } else {
            this.poopError("parseDistance", raw, "no negative distances!", e);
          }
        } catch (e) {
          this.poopError("ParseDistance", raw, null, e);
        }
      } else {
        this.poopError(
          "parseDistance",
          raw,
          "Input wasn't a number or didn't have units. Make sure to include 'mi' or 'km' at the end!",
          e
        );
      }
    } else {
      this.poopError("parseCommitmentGrade", raw, "unrecognized input type", e);
    }
  },

  parseIceGrade(raw) {
    if (raw === "" || raw == null) return raw; // Empty things are fine :)

    const e = new Error("Couldn't parse ice grade");
    const iceRegExp = /(WI[1-6][+-]?|AI[1-6][+-]?)/;

    if (typeof raw == "string") {
      if (iceRegExp.test(raw)) {
        try {
          let grade = raw.match(iceRegExp)[0];
          if (grade && grade != "undefined") {
            return grade;
          }
        } catch (e) {
          this.poopError("parseIceGrade", raw, "regex parsing failed", e);
        }
      } else {
        this.poopError("parseIceGrade", raw, "Must include WI or AI", e);
      }
    } else {
      this.poopError("parseIceGrade", raw, "Must include WI or AI", e);
    }
  },

  parseYDS(raw) {
    if (raw === "" || raw == null) return raw; // Empty things are fine :)

    const e = new Error("Couldn't parse YDS Grade");
    const ydsRegExp = /5\.([2-9][+-]?|1[0-5][abcd]?)$/;

    if (typeof raw == "number") raw = raw.toString();

    if (typeof raw == "string") {
      if (ydsRegExp.test(raw)) {
        try {
          let grade = raw.match(ydsRegExp)[0];
          return grade;
        } catch (e) {
          this.poopError("parseYDS", raw, null, e);
        }
      } else {
        this.poopError("parseYDS", raw, "Invalid YDS Grade", e);
      }
    } else {
      this.poopError("parseYDS", raw, "Must be a string", e);
    }
  },

  parseScramblingGrade(raw) {
    if (raw === "" || raw == null) return raw; // Empty things are fine :)

    const e = new Error("Couldn't parse scrambling grade");
    const numRegExp = /(?<!\d)[1-5](?!\d)/;

    if (typeof raw == "number") {
      if (raw > 0 && raw < 6) {
        return raw;
      } else {
        this.poopError("parseScramblingGrade", raw, "too large or small", e);
      }
    } else if (typeof raw == "string") {
      if (numRegExp.test(raw)) {
        try {
          let nStr = raw.match(numRegExp);
          let n = parseInt(nStr);
          if (n) return n;
          else this.poopError("parseScramblingGrade", raw, null, e);
        } catch (e) {
          this.poopError("parseScramblingGrade", raw, null, e);
        }
      } else {
        this.poopError("parseScramblingGrade", raw, null, e);
      }
    } else {
      this.poopError("parseScramblingGrade", raw, "unrecognized type", e);
    }
  },

  parseVert(raw) {
    if (raw === "" || raw === null) return raw; // Empty things are fine :)

    const e = new Error("Couldn't parse vert");
    const vertRegExp = /(?<!,)((\d{1,3}(,\d{3})*)|\d+)m?$/;

    if (typeof raw == "number") {
      if (raw > 0) {
        return raw;
      } else {
        this.poopError("parseVert", raw, "vert must be a positive integer.", e);
      }
    } else if (typeof raw == "string") {
      if (vertRegExp.test(raw)) {
        try {
          let rawVert = raw.match(vertRegExp)[0];
          let commasRemoved = rawVert.replace(/,/g, "");
          let vert = parseInt(commasRemoved);
          if (vert && vert > 0) {
            return vert;
          } else {
            this.poopError("parseVert", raw, "vert must be positive", e);
          }
        } catch (e) {
          this.poopError("parseVert", raw, null, e);
        }
      } else {
        this.poopError("parseVert", raw, "invalid vert value", e);
      }
    } else {
      this.poopError("parseVert", raw, "unrecognized type", e);
    }
  },

  parseAttrByTypeName(raw, type) {
    if (type != "boolean") {
      if (raw === "" || raw === null) return raw; // Empty things are fine :)
    }

    switch (type) {
      case "alpineGrade":
        try {
          return this.parseAlpineGrade(raw);
        } catch (e) {
          this.poopError(
            "parseFullEntry",
            raw,
            "failed in parseAlpineGrade",
            e
          );
        }
        break;
      case "commitmentGrade":
        try {
          return this.parseCommitmentGrade(raw);
        } catch (e) {
          this.poopError(
            "parseFullEntry",
            raw,
            "failed in parseCommitmentGrade",
            e
          );
        }
        break;
      case "date":
        try {
          return this.parseDate(raw);
        } catch (e) {
          this.poopError("parseFullEntry", raw, "failed in parseDate", e);
        }
        break;
      case "distance":
        try {
          return this.parseDistance(raw);
        } catch (e) {
          this.poopError("parseFullEntry", raw, "failed in parseDistance", e);
        }
        break;
      case "iceGrade":
        try {
          return this.parseIceGrade(raw);
        } catch (e) {
          this.poopError("parseFullEntry", raw, "failed in parseIceGrade", e);
        }
        break;
      case "ydsGrade":
        try {
          return this.parseYDS(raw);
        } catch (e) {
          this.poopError("parseFullEntry", raw, "failed in parseYDSGrade", e);
        }
        break;
      case "scramblingGrade":
        try {
          return this.parseScramblingGrade(raw);
        } catch (e) {
          this.poopError(
            "parseFullEntry",
            raw,
            "failed in parseScramblingGrade",
            e
          );
        }
        break;
      case "vert":
        try {
          return this.parseVert(raw);
        } catch (e) {
          this.poopError("parseFullEntry", raw, "failed in parseVert", e);
        }
        break;

      case "boolean":
        return this.parseBoolean(raw);
      case "string":
        return raw;
      case "number":
        return raw;
      case "html":
        return raw;

      default:
        this.poopError(
          "parseFullEntry",
          raw,
          "unrecognized unit",
          new Error("Couldn't parse input by type")
        );
    }
  },

  parseEntireEntry(raw) {
    let refined = {};

    globals.entryDefinition.attributes.map(attr => {
      let name = attr.name;
      let unit = attr.hasOwnProperty("unit") ? attr.unit : null;

      if (!raw.hasOwnProperty(name)) {
        console.error("Failed to parse whole entry.");
        console.error("Entry was missing attribute '" + name + "'");
        throw new Error("Couldn't parse entire entry");
      }

      let attrToParse = raw[name];

      if (unit != null) {
        refined[name] = this.parseAttrByTypeName(attrToParse, unit);
      } else if (attr.type == "object") {
        attr.objectFields.map(field => {
          try {
            let fToParse = raw[name][field.name];
            if (!refined.hasOwnProperty(name)) {
              refined[name] = {};
            }
            if (field.hasOwnProperty("unit")) {
              refined[name][field.name] = this.parseAttrByTypeName(
                fToParse,
                field.unit
              );
            } else {
              refined[name][field.name] = this.parseAttrByTypeName(
                fToParse,
                field.type
              );
            }
          } catch (e) {
            console.error(
              "Failed to parse '" +
                field.name +
                "' with '" +
                raw[name][field.name] +
                "'"
            );
            console.error(e.message);
          }
        });
      } else {
        refined[name] = this.parseAttrByTypeName(attrToParse, attr.type);
      }
    });

    if (refined.hasOwnProperty("[object Object]"))
      delete refined["[object Object]"];

    if (raw.hasOwnProperty("[object Object]")) delete raw["[object Object]"];

    return refined;
  }
};

export { parser };
