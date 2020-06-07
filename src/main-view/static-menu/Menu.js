import React from "react";
import { globals } from "../../globals";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import MenuButtons from "./MenuButtons";

class Menu extends React.Component {
  containerCSS = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 8em;
    padding-top: 5em;
    background: black;
    height: ${window.innerHeight + "px"};
  `;

  btnOuterCSS = css`
    width: 80%;
    margin: 0.75em 0.5em;
    border-bottom: thin solid ${globals.colours.lightGray};
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
    color: ${globals.colours.lightGray};
    user-select: none;
    &:hover {
      cursor: pointer;
      color: ${globals.colours.white};
    }
  `;

  render() {
    const { addType, removeType, activeFilters } = this.props;

    return (
      <div css={this.containerCSS}>
        <MenuButtons
          toggleMenu={this.toggleMenu}
          scrollToTop={this.props.scrollToTop}
        />

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
    );
  }
}

export default Menu;
