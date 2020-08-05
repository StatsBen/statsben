import React from "react";
import Entry from "./Entry";
import MainMenu from "./modals/MainMenu";
import MenuButton from "./MenuButton";
import Modal from "./Modal";
import PaginationCarousel from "./PaginationCarousel";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuModal: false
    };
  }

  showMenu = () => {
    this.setState({ showMenuModal: true });
  };

  hideMenu = () => {
    this.setState({ showMenuModal: false });
  };

  render() {
    const { showMenuModal } = this.state;

    return (
      <div>
        {showMenuModal && (
          <Modal>
            <MainMenu close={this.hideMenu} />
          </Modal>
        )}

        <MenuButton showMenu={this.showMenu} />
        <Entry />
        <PaginationCarousel />
      </div>
    );
  }
}

export default MainView;
