require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../globals";

const WelcomeContainer = () => {
  const bannerHeight = Math.max(window.innerHeight - 100, 400);

  return (
    <div
      css={css`
        width: 100%;
        height: ${bannerHeight}px;
        background: url(${globals.bannerImgs.abbot});
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
      `}
    />
  );
};

const WelcomeBanner = () => {
  return <WelcomeContainer>Welcome</WelcomeContainer>;
};

export default WelcomeBanner;
