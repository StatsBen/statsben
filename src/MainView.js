import React from "react";
import Entry from "./Entry";
import MenuButton from "./MenuButton";
import PaginationCarousel from "./PaginationCarousel";

class MainView extends React.Component {
  render() {
    return (
      <div>
        <MenuButton />
        <Entry />
        <PaginationCarousel />
      </div>
    );
  }
}

export default MainView;
