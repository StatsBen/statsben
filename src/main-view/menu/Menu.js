import React from "react";
import "./menu.css";
import { globals } from "../../globals";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import MainMenuButtons from "./MainMenuButtons";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  containerCSS = css``;

  btnOuterCSS = css`
    width: 80%;
    margin: 10px 10% 10px 10%;
    border-bottom: thin solid #555555;
  `;

  activeCSS = css`
    background: none;
    border: none;
    outline: none;
    font-size: inherit;
    color: ${globals.colours.accentBlue};
    user-select: none;
    &:hover {
      cursor: pointer;
      color: ${globals.colours.accentBlue};
    }
  `;

  inactiveCSS = css`
    background: none;
    border: none;
    outline: none;
    font-size: inherit;
    color: ${globals.colours.white};
    user-select: none;
    &:hover {
      cursor: pointer;
      color: ${globals.colours.lightBlue};
    }
  `;

  toggleMenu = event => {
    event.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  };

  scrollToTop = event => {
    event.preventDefault();
    const top = window.innerHeight - 150;
    window.scrollTo(0, top);
  };

  render() {
    const { addType, removeType, activeFilters } = this.props;
    const expansionW = {
      width: this.state.expanded ? "200px" : "0"
    };

    return (
      <div id="expandable-menu-outer" style={expansionW}>
        <MainMenuButtons
          toggleMenu={this.toggleMenu}
          scrollToTop={this.scrollToTop}
          expanded={this.state.expanded}
        />

        <div id="menu-container" style={expansionW}>
          <div id="expandable-menu-container">
            <div id="expandable-filters-menu">
              {this.props.types.map(type => {
                const active = activeFilters.includes(type);
                return (
                  <div css={this.btnOuterCSS} key={`filter-button-for-${type}`}>
                    <button
                      onClick={active ? removeType : addType}
                      css={active ? this.activeCSS : this.inactiveCSS}
                    >
                      {type}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
