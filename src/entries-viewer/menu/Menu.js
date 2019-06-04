import React from "react";
import "./menu.css";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  render() {
    return <div style={{ display: "none" }}>menu</div>;
  }
}

export default Menu;
