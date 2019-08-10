import moment from "moment";

const formatter = {
  prettyDate(raw) {
    if (raw instanceof Date) {
      return moment(raw.valueOf()).format("MM - DD - YY");
    } else {
      console.error(
        "Error in formatter.prettyDate: argument must be an instance of Date."
      );
      throw new Error("prettyDate couldnt make a date out of the given input");
    }
  },

  /* Capitalize only the first letter of a sentence */
  toSentenceCase(raw) {
    return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
  },

  prettyScramblingGrade(raw) {
    if (typeof raw != "number") {
      console.error(
        "argument passed to formatter.prettyScramblingGrade must be a number, dummy!"
      );
      throw new Error(
        "prettyScramblingGrade couldnt make a scrambling grade out of the given input"
      );
    } else {
      if (raw > 5 || raw < 1) {
        console.error(
          "Error in formatter.prettyScramblingGrade: argument must be between 0 and 6"
        );
        throw new Error(
          "prettyScramblingGrade couldnt make a scrambling grade out of the number provided"
        );
      } else {
        return "class " + raw.toString();
      }
    }
  },

  prettyCommitmentGrade(raw) {
    if (typeof raw != "number") {
      console.error(
        "argument passed to formatter.prettyCommitmentGrade must be a number, dummy!"
      );
      throw new Error(
        "prettyCommitmentGrade couldnt make a commitment grade out of the given input"
      );
    } else {
      if (raw > 6 || raw < 1) {
        console.error(
          "Error in formatter.prettyCommitmentGrade: argument must be between 0 and 7"
        );
        throw new Error(
          "prettyCommitmentGrade couldnt make a commitment grade out of the number provided"
        );
      } else {
        switch (raw) {
          case 1:
            return "grade I";
          case 2:
            return "grade II";
          case 3:
            return "grade III";
          case 4:
            return "grade IV";
          case 5:
            return "grade V";
          case 6:
            return "grade VI";
          default:
            throw new Error("unknown error in formatter.prettyCommitmentGrade");
        }
      }
    }
  },

  prettyDistance(raw) {
    if (typeof raw != "number") {
      console.error(
        "argument passed to formatter.prettyDistance must be a number, dummy!"
      );
      throw new Error(
        "prettyDistance couldnt make a distance out of the given input"
      );
    } else {
      if (raw <= 0) {
        console.error(
          "Error in formatter.prettyDistance: argument must be greater than 0"
        );
        throw new Error(
          "prettyDistance couldnt make a distance out of the given input"
        );
      } else {
        return raw.toString() + "km";
      }
    }
  },

  prettyVert(raw) {
    if (typeof raw != "number") {
      console.error(
        "argument passed to formatter.prettyDistance must be a number, dummy!"
      );
      throw new Error(
        "prettyDistance couldnt make a distance out of the given input"
      );
    } else {
      if (raw <= 0) {
        console.error(
          "Error in formatter.prettyDistance: argument must be greater than 0"
        );
        throw new Error(
          "prettyDistance couldnt make a distance out of the given input"
        );
      } else {
        return raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "m";
      }
    }
  },

  prettyByGradeName(raw, gradeType) {
    switch (gradeType) {
      case "commitment":
        return this.prettyCommitmentGrade(raw);
      case "distance":
        return this.prettyDistance(raw);
      case "ice":
        return raw; // No formatting needed!
      case "rock":
        return raw; // No formatting needed!
      case "scramble":
        return this.prettyScramblingGrade(raw);
      case "vert":
        return this.prettyVert(raw);
      default:
        console.error(
          "Uh oh, formatter.prettyGradeByName didnt recognize that grade type!"
        );
        return raw;
    }
  }
};

export { formatter };
