import React from "react";
import {
  EntryContainer,
  EntryDate,
  EntryContentContainer,
  EntryContents,
  EntryHeaderContainer,
  EntryTitle,
  EntryDetails
} from "./EntryComponents";
import { addCaptionToImgFromAltText } from "../utils/image-caption-script";
import { formatter } from "../utils/formatter";

// const demoProps = {
//   entry: {
//     date: "{nanoseconds: 0, seconds: 1593068400}",
//     html:
//       "<div><span>I had the pleasure of following Alex Geary up Vertical Poetry on Victor Lake Wall. That's a really fun route, and the exposure on pitch 5/6 is pretty thrilling!</span>\n<img class='large' alt='A photo of myself on top of pitch 5 (photo by Alex Geary)' src='https://firebasestorage.googleapis.com/v0/b/adventures-41a04.appspot.com/o/images%2FIMG_6063.jpg?alt=media&token=2f0487c0-0ac9-4f92-92de-2fa566dd0200' />",
//     types: "{alpine: false, certifications: false, hiking: fals…}",
//     range: "Monashees",
//     longForm: null,
//     grade: "{alpine: null, commitment: null, distance: null, ic…}",
//     name: "Victor Lake Wall"
//   }
// };

class Entry extends React.Component {
  componentDidMount() {
    addCaptionToImgFromAltText(this.element);
  }

  buildDateString(entry) {
    const date = new Date(entry.date.toDate());
    const rawDay = date.getDate();
    const day = rawDay < 10 ? "0" + rawDay : rawDay;
    const rawMonth = date.getMonth() + 1;
    const month = rawMonth < 10 ? "0" + rawMonth : rawMonth;
    const dateStr = day + "-" + month + "-" + date.getFullYear();
    return dateStr;
  }

  buildGradeString(gradeObject) {
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
    return gradeHasContents ? gradeString : "";
  }

  render() {
    const { entry } = this.props;
    // const dateStr = this.buildDateString(entry);
    const gradeStr = this.buildGradeString(entry.grade);

    return (
      <EntryContainer ref={r => (this.element = r)}>
        <EntryContentContainer>
          <EntryHeaderContainer>
            <EntryTitle>{entry.name}</EntryTitle>
            <EntryDetails>
              <div>{entry.range}</div>
              <div>{gradeStr}</div>
            </EntryDetails>
          </EntryHeaderContainer>
          <EntryContents
            dangerouslySetInnerHTML={{ __html: entry.html }}
          ></EntryContents>
        </EntryContentContainer>
        {/* <EntryDate>{dateStr}</EntryDate> */}
      </EntryContainer>
    );
  }
}

export default Entry;
