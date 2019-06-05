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
                  {`${type} add~`}
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

  render() {
    return (
      <div id="expanded-menu-container">
        <div id="inner-fixed-menu-container">
          <div id="inner-relative-menu-container">
            <h3 id="menu-header">filter</h3>
            {this.buildTypeFilterButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
