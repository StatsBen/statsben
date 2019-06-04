import React from "react";
import moment from "moment";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entry: props.entry || null };
  }

  render() {
    let { entry } = this.props;
    return (
      <div className={`entry-container`}>
        <div className={`entry-date`}>
          <span>{moment(entry.Date, "MM/DD/YY").format("MM - DD - YY")}</span>
        </div>
        <div className={`entry-right`}>
          <div className={`entry-title`}>
            <h3>{entry.Name}</h3>
          </div>
          <div
            className={`entry-contents`}
            dangerouslySetInnerHTML={{ __html: entry.html }}
          />
        </div>
      </div>
    );
  }
}

export default Entry;
