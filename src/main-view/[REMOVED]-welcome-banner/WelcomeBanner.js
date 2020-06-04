require("react");
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../globals";
import RandomizedWelcomeImage from "./RandomizedWelcomeImage";

const bannerHeight = Math.max(window.innerHeight - 100, 400);

const WelcomeContainer = props => {
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

const Vignette = () => {
  return (
    <div
      css={css`
        position: absolute;
        width: 100%;
        height: ${bannerHeight}px;
        background: radial-gradient(
          rgba(255, 255, 255, 0.3),
          rgba(150, 150, 150, 0.2),
          rgba(50, 50, 50, 0.8)
        );
        background-attachment: fixed;
        z-index: 5;
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
        z-index: 6;
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
        user-select: none;
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
        user-select: none;
      `}
    >
      {props.children}
    </div>
  );
};

const WelcomeBanner = () => {
  return (
    <WelcomeContainer>
      <RandomizedWelcomeImage />
      <Vignette />
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
