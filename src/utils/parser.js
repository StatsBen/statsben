const parser = {
  parseDate(raw) {
    try {
      return new Date(raw);
    } catch (e) {
      console.error(
        "Error in parser.parseDate: couldnt make Date object from input"
      );
      throw e;
    }
  },

  parseCommitmentGrade(raw) {
    if (typeof raw == "number") {
      if (raw < 1 || raw > 6) {
        console.error(
          "Error in parser.parseCommitmentGrade: input was too big or too small."
        );
        throw new Error("Couldnt parse commitment grade");
      } else {
        return raw;
      }
    } else if (typeof raw == "string") {
      let num = raw.match(/\d+/g);
      if (num[0] == "undefined") {
        console.error(
          "Error in parser.parseCommitmentGrade: the provided string had no number in it."
        );
        throw new Error("couldnt parse commitment grade: no number provided");
      }
      let parsedNum = null;
      try {
        parsedNum = parseInt(num);
      } catch (e) {
        console.error(
          "Error in parseCommitmentGrade: extracted " +
            num +
            "from the provided string but couldnt make a grade from it."
        );
        throw e;
      }

      if (parsedNum < 1 || parsedNum > 6) {
        console.error(
          "Error in parser.parseCommitmentGrade: input was too big or too small."
        );
        throw new Error("Couldnt parse commitment grade");
      } else if (parsedNum == null) {
        console.error(
          "Error in parseCommitmentGrade: extracted " +
            num +
            "from the provided string but couldnt make a grade from it."
        );
        throw new Error("couldnt parse commitment grade");
      } else {
        return parsedNum;
      }
    } else {
      console.error(
        "Error in parser.parseCommitmentGrade: Unrecognized input type"
      );
      throw new Error("Couldnt parse commitment grade");
    }
  },

  parseDistance(raw) {
    //STUB
    return 50;
  },

  parseIceGrade(raw) {
    //STUB
    return "WI4";
  },

  parseYDS(raw) {
    //STUB
    return "fart";
  },

  parseScramblingGrade(raw) {
    //STUB
    return 3;
  },

  parseVert(raw) {
    //STUB
    return 1500;
  },

  parseFullEntry(raw) {
    // STUB
    return {};
  }
};

export { parser };
