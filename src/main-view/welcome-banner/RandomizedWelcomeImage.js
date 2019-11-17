import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../globals";

class RandomizedWelcomeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: null,
      height: 0
    };
  }

  componentDidMount = () => {
    const banners = Object.keys(globals.bannerImgs);
    const nBanners = banners.length;
    const randomIndex = Math.floor(Math.random() * nBanners);
    const randomKey = banners[randomIndex];
    console.log("Showing banner: " + randomKey);
    const randomBanner = globals.bannerImgs[randomKey];
    this.setState({
      banner: randomBanner,
      height: Math.max(window.innerHeight - 100, 400)
    });
  };

  render() {
    const { banner, height } = this.state;
    const bg = banner ? `url(${banner})` : globals.colours.accentBlue;

    return (
      <div
        css={css`
        position: absolute;
        width: 100%;
        height: ${height}px;
        /* background: url(${globals.bannerImgs.furnace}); */
        background: ${bg};
				background-color: ${globals.colours.accentBlue};
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
        opacity: 0.5;
      `}
      />
    );
  }
}

export default RandomizedWelcomeImage;
