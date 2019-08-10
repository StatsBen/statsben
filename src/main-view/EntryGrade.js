require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { formatter } from "../utils/formatter";
import { globals } from "../globals";

const EntryGrade = props => {
  const { gradeObject } = props;
  let gradeString = "(";
  let gradeHasContents = false;

  for (var grade in gradeObject) {
    if (gradeObject.hasOwnProperty(grade)) {
      let value = gradeObject[grade];
      if (value) {
        gradeString += formatter.prettyByGradeName(value, grade) + ", ";
        gradeHasContents = true;
      }
    }
  }

  // Remove surrepttitiously added final comma
  gradeString = gradeString.substring(0, gradeString.length - 2);

  gradeString += ")";

  return (
    <div
      css={css`
        display: ${gradeHasContents ? "block" : "none"};
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px 8% 0 10%;
        width: auto;
        max-width: 20%;
        color: ${globals.fonts.charcoal};
        font-family: ${globals.fonts.accent};
        text-align: right;
      `}
    >
      {gradeString}
    </div>
  );
};

export default EntryGrade;
