import { globals } from "../globals";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const headshotLink = `https://firebasestorage.googleapis.com/v0/b/adventures-41a04.appspot.com/o/images%2F50920387_10213129485099123_7818371419812659200_o.jpg?alt=media&token=cc8d0586-44a6-4ca9-b64b-d8b6eacd8ace`;

const headshot = (
  <img
    src={headshotLink}
    alt="Ben making a funny face"
    css={css`
      float: right;
      height: 13em;
      padding: 2em 5% 0 0;
    `}
  />
);

const containerCSS = css`
  display: flex;
  flex-direction: row;
  width: ${0.9 * (window.innerWidth - 140)};
  min-width: 35em;
  margin: 0 5% 4em 5%;
  padding: 0 0 4em 0;
  border-bottom: thin solid ${globals.colours.lightGray};
  object-fit: contain;
`;

const leftCSS = css`
  flex: 1 1 0;
`;

const rightCSS = css`
  flex: 0 0 auto;
`;

const primaryHeaderCSS = css`
  display: block;
  padding: 0.5em 0 0 0;
  margin: 0;
`;

const taglineCSS = css`
  display: block;
  clear: both;
  padding: 0;
  font-family: ${globals.fonts.accent};
  color: ${globals.colours.darkGray};
`;

const subtitleCSS = css`
  display: block;
  clear: both;
  padding: 1em 0;
  width: 80%;
  max-width: 25em;
  color: ${globals.colours.darkGray};
  text-align: justify;
`;

const Header = () => {
  return (
    <div css={containerCSS}>
      <div css={leftCSS}>
        <h1 css={primaryHeaderCSS}>Ben Clark</h1>
        <span css={taglineCSS}>Climber, skier, employable person.</span>
        <span css={subtitleCSS}>
          Welcome to my personal website. Here&apos;s a brief log of things
          I&apos;ve done (mostly climbing-related). You can filter the logs
          using the buttons on the left.
        </span>
      </div>
      <div css={rightCSS}>{headshot}</div>
    </div>
  );
};

export default Header;
