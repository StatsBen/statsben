import React from "react";
import "./nav-bar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { header: <span>{`Ben Clark`}</span>, op: 1 };
  }

  handleScroll = () => {
    if (window.scrollY > 100 && this.state.op == 0) {
      return;
    } else if (window.scrollY < 100) {
      this.setState({ op: 1 - window.scrollY / 100 });
    } else {
      this.setState({ op: 0 });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.setState({ op: 1 });
  }

  render() {
    let { header } = this.state;
    return (
      <div id="nav-bar">
        <div id="nav-bar-header" style={{ opacity: this.state.op }}>
          {header}
        </div>
      </div>
    );
  }
}

export default NavBar;
