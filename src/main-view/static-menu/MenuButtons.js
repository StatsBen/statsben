require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../globals";

const MenuButtons = props => {
  const sharedButtonCSS = css`
    position: relative;
    display: block;
    float: left;
    margin: 20px 0 0 20px;
    padding: 5px;
    font-size: 1.2em;
    font-family: inherit;
    font-weight: 400;
    background: none;
    border: none;
    outline: none;
    color: #222222;
    background: #ffffff;
    user-select: none;
    &:hover {
      cursor: pointer;
    }
  `;

  // const FilterButton = () => {
  //   return (
  //     <button
  //       className="menu-toggle"
  //       onClick={props.toggleMenu}
  //       css={sharedButtonCSS}
  //     >
  //       {props.expanded ? "Close" : "Filter"}
  //     </button>
  //   );
  // };

  const TopButton = () => {
    return (
      <button
        className="menu-toggle"
        onClick={props.scrollToTop}
        css={sharedButtonCSS}
      >
        Top
      </button>
    );
  };

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: ${globals.sizes.menuWidth + "px"};
        height: auto;
        z-index: 999;
      `}
    >
      {/* <FilterButton /> */}
      <TopButton />
    </div>
  );
};

export default MenuButtons;
