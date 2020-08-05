import React from "react";
import styled from "styled-components";
import { colours } from "./globals/colours";
import { fonts } from "./globals/fonts";
import { sizes } from "./globals/sizes";

const LoadingContainer = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  font-family: ${fonts.accent};

  @media (max-width: ${sizes.mobileBreakpoint}) {
    padding-top: 150px;
    color: black;
    font-size: 1.3em;
  }

  @media (min-width: ${sizes.mobileBreakpoint}) and (max-width: ${sizes.tabletBreakpoint}) {
    padding-top: 150px;
    color: ${colours.charcoal};
    font-size: 1.8em;
  }

  @media (min-width: ${sizes.tabletBreakpoint}) {
    padding-top: 300px;
    color: ${colours.charcoal};
    font-size: 2.5em;
  }
`;

const LilBottomBar = styled.div`
  display: inline-block;
  width: 80%;
  max-width: ${sizes.mobileBreakpoint};
  height: 2px;
  animation: shimmer 3s linear infinite;
  background-image: linear-gradient(
    90deg,
    #ffffff,
    ${colours.accentBlue},
    #ffffff,
    #ffffff
  );
  background-size: 150% 150%;
  overflow: hidden;

  @keyframes shimmer {
    0% {
      background-position: 300% 0%;
    }

    100% {
      background-position: 0% 0%;
    }
  }
`;

const Loading = () => (
  <LoadingContainer>
    loading...
    <br />
    <LilBottomBar></LilBottomBar>
  </LoadingContainer>
);

export default Loading;
