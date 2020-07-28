import React from "react";
import MenuButton from "./MenuButton";
import PaginationCarousel from "./PaginationCarousel";

class MainView extends React.Component {
  render() {
    return (
      <div>
        <MenuButton />
        <PaginationCarousel />
      </div>
    );
  }
}

export default MainView;
