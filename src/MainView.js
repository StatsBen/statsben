import React from "react";
// import Entry from "./Entry";
import Loading from "./Loading";
import MainMenu from "./modals/MainMenu";
import MenuButton from "./MenuButton";
import Modal from "./Modal";
import PaginationCarousel from "./PaginationCarousel";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
    const { loading, showMenuModal } = this.state;

    return (
      <div>
        {showMenuModal && (
          <Modal>
            <MainMenu close={this.hideMenu} />
          </Modal>
        )}

        <MenuButton showMenu={this.showMenu} />

        {loading && <Loading />}

        {/* {<Entry />} */}

        {!loading && <PaginationCarousel />}
      </div>
    );
  }
}

export default MainView;
