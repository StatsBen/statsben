import React from "react";
import "./menu.css";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  render() {
    return (
      <div id="expanded-menu-container">
        <div id="inner-fixed-menu-container">
          <div id="inner-relative-menu-container">
            <h3 id="menu-header">filter</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
