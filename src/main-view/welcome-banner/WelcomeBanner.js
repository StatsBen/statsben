require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../globals";

const WelcomeContainer = props => {
  const bannerHeight = Math.max(window.innerHeight - 100, 400);
  return (
    <div
      css={css`
        width: 100%;
        height: ${bannerHeight}px;
        overflow: hidden;
      `}
    >
      {props.children}
    </div>
  );
};

const WelcomeImage = () => {
  const bannerHeight = Math.max(window.innerHeight - 100, 400);
  return (
    <div
      css={css`
        position: absolute;
        width: 100%;
        height: ${bannerHeight}px;
        background: url(${globals.bannerImgs.baker});
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
        opacity: 0.5;
      `}
    />
  );
};

const WelcomeTextContainer = props => {
  const topMargin = Math.max(window.innerHeight / 2 - 100, 150);
  console.log("top margin is: " + topMargin);
  return (
    <div
      css={css`
        position: absolute;
        width: 100%;
        height: 3em;
        top: ${topMargin}px;
        color: ${globals.colours.darkGray};
        text-align: center;
        background-blend-mode: lighten;
      `}
    >
      {props.children}
    </div>
  );
};

const Title = props => {
  return (
    <div
      css={css`
        font-family: ${globals.fonts.accent};
        font-size: 3.5em;
        font-weight: 900;
      `}
    >
      {props.children}
    </div>
  );
};

const SubTitle = props => {
  return (
    <div
      css={css`
        margin-bottom: 1.5em;
        font-family: ${globals.fonts.accent};
        font-size: 1.2em;
        font-weight: 900;
      `}
    >
      {props.children}
    </div>
  );
};

const WelcomeBanner = () => {
  return (
    <WelcomeContainer>
      <WelcomeImage />
      <WelcomeTextContainer>
        <Title>Ben Clark</Title>
        <SubTitle>{`Climber, skier, employable person.`}</SubTitle>
        <SubTitle>
          {`Welcome to my personal website,`} <br />
          {`Here's a log of things I've done, mostly climbing-related.`}
        </SubTitle>
      </WelcomeTextContainer>
    </WelcomeContainer>
  );
};

export default WelcomeBanner;
