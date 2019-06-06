import React from "react";
import "./menu.css";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  buildTypeFilterButtons = () => {
    const { addType, removeType, activeTypeFilters } = this.props;
    return (
      <div id="category-filters">
        {this.props.types.map(type => {
          return (
            <div
              className={`type-filter-button-container`}
              key={`filter-button-for-${type}`}
            >
              {activeTypeFilters.includes(type) ? (
                <button
                  className={`type-filter-button active`}
                  type={type}
                  onClick={removeType}
                >
                  {type}
                </button>
              ) : (
                <button
                  className={`type-filter-button inactive`}
                  type={type}
                  onClick={addType}
                >
                  {type}
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  toggleMenu = event => {
    event.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  };

  scrollToTop = event => {
    event.preventDefault();
    window.scrollTo(0, 0);
  };

  render() {
    let expansionW = {
      width: this.state.expanded ? "150px" : "0"
    };

    let expansionC = {
      color: this.state.expanded ? "#eeeeee" : "#222222"
    };

    return (
      <div id="expandable-menu-outer" style={expansionW}>
        <div id="toggle-button-container">
          <button
            className="menu-toggle"
            onClick={this.toggleMenu}
            style={expansionC}
          >
            Filter
          </button>
          <button
            className="menu-toggle"
            onClick={this.scrollToTop}
            style={expansionC}
          >
            Top
          </button>
        </div>
        <div id="menu-container" style={expansionW}>
          <div id="expandable-menu-container">
            <div id="expandable-filters-menu">
              {this.buildTypeFilterButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
