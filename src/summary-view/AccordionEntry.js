import React from "react";
// import Entry from "../Entry";

class AccordionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  static Collapsed = entry => <div>{entry.name}</div>;

  static Expanded = () => <div>lil test</div>;

  render() {
    const { entry } = this.props;
    return <AccordionEntry.Collapsed {...entry} />;
  }
}

export default AccordionEntry;
